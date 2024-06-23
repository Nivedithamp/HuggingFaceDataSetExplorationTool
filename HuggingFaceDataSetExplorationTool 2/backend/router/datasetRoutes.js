import express from 'express';
import axios from 'axios';



const router = express.Router();

router.get('/datasets', async (req, res) => {
    try {
        if(req.limit === undefined) req.limit = 20;
        const response = await axios.get(`https://huggingface.co/api/datasets?limit=${req.limit}`);
        res.json(response.data);
    } catch (error) {
        console.error('Error fetching datasets:', error);
        res.status(500).json({ message: 'Internal server error.' });
    }
}); 

router.get('/datasets/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const response = await axios.get(`https://huggingface.co/api/datasets/${id}`);
        res.json(response.data);
    } catch (error) {
        console.error('Error fetching dataset:', error);
        res.status(500).json({ message: 'Internal server error.' });
    }
});


router.get('/datasets/firstRows/:id', async (req, res) => {
    try {
        const { id } = req.params;
        console.log(id);

        const response_splits = await axios.get(`https://datasets-server.huggingface.co/splits?dataset=${id}`);
        const split = response_splits.data['splits'][0]['split'];
        const config = response_splits.data['splits'][0]['config'];
        console.log(`https://datasets-server.huggingface.co/first-rows?dataset=${id}&config=${config}&split=${split}`);
        const response = await axios.get(`https://datasets-server.huggingface.co/first-rows?dataset=${id}&config=${config}&split=${split}`);
        res.json(response.data);
    } catch (error) {
        console.error('Error fetching dataset:', error);
        res.status(500).json({ message: 'Internal server error!.' });
    }
});


export default router;