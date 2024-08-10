const mongoose = require('mongoose');
const Customer = require('../db/models/Customer.model');

const handleDBStats = async (req, res) => {
    const collectionName = 'customers';
    const retryLimit = 1; // Retry only once
    let attempt = 0;

    while (attempt <= retryLimit) {
        try {
            // Access the native MongoDB driver
            const db = mongoose.connection.db;

            // Fetch collection statsc
                const {storageSize, dataSize} = await db.stats(1024);

            // Extract relevant information
            // const totalSize = stats.totalSize; // Total size including data and indexes
            // const usedSize = stats.storageSize; // Size allocated for storage

            // Send response
            res.json({
               storageSize, dataSize
            });

            // Exit after successful response
            return;
        } catch (err) {
            if (attempt < retryLimit) {
                attempt++;
                console.error(`Attempt ${attempt} failed. Retrying...`, err.stack);
            } else {
                // Send error response after retrying
                console.error('Error fetching collection stats:', err.stack);
                res.status(500).json({ error: 'Error fetching collection stats' });
                return;
            }
        }
    }
};




const handleErrorLog = (req, res) => {
    // Extract error data from the request body
    const error  = req.body;

    // Validate that error data exists and is an object
    if (!error || typeof error !== 'object') {
        console.warn('Invalid error data received.');
        return res.status(400).json({ message: 'Invalid error data received.' });
    }

    // Log the received error
    console.warn('Received error from front-end:');
    console.error(error);

    // Send a success response
    res.status(200).json({ message: 'Contact developer for unexpected error resolution' });
};

module.exports = { handleDBStats, handleErrorLog };
