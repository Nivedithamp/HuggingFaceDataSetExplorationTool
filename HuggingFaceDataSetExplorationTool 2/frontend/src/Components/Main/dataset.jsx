import React, {useState, useEffect} from "react";
import axios from "axios";
import "./dataset.css";


const Dataset = ({dataset}) => {
        
        const [datasetMetadata, setDatasetMetadata] = useState({});
        const [firstRows, setFirstRows] = useState({});
       

        useEffect(() => {
            axios.get(`http://localhost:4000/datasets/${dataset}`).then((response) => {
                setDatasetMetadata({...response.data});
                console.log(response.data);
            }).catch((error) => {
                console.error('Error fetching datasets:', error);
                setDatasetMetadata({});
            });
        }, [dataset]);


        useEffect(() => {
            axios.get(`http://localhost:4000/datasets/firstRows/${dataset}`).then((response) => {
                setFirstRows({...response.data});
                console.log(response.data);
            }).catch((error) => {
                setFirstRows({});
                console.error('Error fetching firstRows:', error);
            });
        }, [dataset]);

        if("features" in firstRows){
            let IndexMap = {}
            for(let i=0; i<firstRows.features.length; i++){
                IndexMap[firstRows.features[i].name] = i
            }
            let rowLength = IndexMap.length;
            var Rows = [];
            for(let i=0; i<firstRows["rows"].length; i++){
                let row = firstRows["rows"][i]["row"];
                let cur_row = new Array(rowLength).fill(null);
                for(let i in row){
                    if(Array.isArray(row[i])){
                        row[i] = row[i].join(" ");
                    }
                    cur_row[IndexMap[i]] = row[i];
                }
                
                Rows.push(cur_row);
            }
            console.log(Rows);

        }


    
    
        return (
            <div>
                <h1 className="name">Dataset: {dataset}</h1>
                {/* <p>Dataset Name: {datasetMetadata.cardData.pretty_name}</p> */}
                <p><b>Description:</b> {datasetMetadata.description}</p>
                <p>{datasetMetadata.createdAt}</p>
                
                {/* make table scrollable */}
                <div className="table-container">
                    <table className="table-class">
                        <thead>
                            <tr>{
                                "features" in firstRows && firstRows.features.map((feature) => (
                                    <th>{feature.name}</th>
                                ))}
                            </tr>
                            
                        </thead>
                        <tbody>
                            {
                                "features" in firstRows && Rows.map((row) => (
                                    <tr>{
                                        row.map((cell) => (
                                            <td>{cell}</td>
                                        ))
                            
                                    }</tr>
                                ))
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        )
    };


export default Dataset;