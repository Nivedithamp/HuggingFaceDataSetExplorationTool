import express from 'express';
import passport from 'passport';
import authRoutes from './router/authRoutes.js';
import datasetRoutes from './router/datasetRoutes.js';
import cors from 'cors';

const app = express();
const PORT = process.env.PORT ||4000;

cors({credentials: true, origin: true});

// Middleware to parse JSON requests
app.use(express.json());
app.use(cors());


// Initialize Passport
app.use(passport.initialize());


app.use('/', authRoutes);
app.use('/', datasetRoutes);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
});
