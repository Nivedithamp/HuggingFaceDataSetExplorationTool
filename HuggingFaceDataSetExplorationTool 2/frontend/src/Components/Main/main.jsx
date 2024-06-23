import React, {useState, useEffect} from "react";
import axios from "axios";
import { Dropdown } from 'react-bootstrap';
import Dataset from './dataset.jsx';
import './main.css';

const Main = () => {
    
    const [datasets, setDatasets] = useState([]);
    const [selectedDataset, setSelectedDataset] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
  

    useState(() => {
        axios.get('http://localhost:4000/datasets').then((response) => {
            setDatasets(response.data);
        }).catch((error) => {
            console.error('Error fetching datasets:', error);
        });
    }, []);

    




  
    const handleDatasetSelect = (event) => {
      setSelectedDataset(event.target.value);
    };
  
    const handleSearch = (event) => {
      setSearchTerm(event.target.value);
    };
  
    const filteredDatasets = datasets.filter((dataset) =>
      dataset.id.toLowerCase().includes(searchTerm.toLowerCase())
    );
  
    return (
      <div className="container">
        <h1>Main Page</h1>
        <label htmlFor="datasetSearch">Search Dataset:</label>
        <input
          type="text"
          id="datasetSearch"
          value={searchTerm}
          onChange={handleSearch}
          placeholder="Search for datasets..."
        />
        <label htmlFor="datasetSelect">Select Dataset:</label>
        <select id="datasetSelect" onChange={handleDatasetSelect}>
          <option value="">Select...</option>
          {filteredDatasets.map((dataset) => (
            <option key={dataset.id} value={dataset.id}>
              {dataset.id}
            </option>
          ))}
        </select>
        {selectedDataset && <Dataset dataset={selectedDataset} />}
      </div>
    );
  };
  
  export default Main;
