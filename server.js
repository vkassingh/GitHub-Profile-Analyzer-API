const express = require('express');
const profileRoutes = require('./routes/profileRoutes');
require('dotenv').config();

const app = express();
app.use(express.json());

// 1. Add a Root Route for the Frontend
app.get('/', (req, res) => {
    res.send(`
        
                <h2>🚀 Server is Running Smoothly!</h2>
                <p>Welcome to the frontend of your Express application.</p>
            
    `);
});

// Main App API Routes
app.use('/api/profiles', profileRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running smoothly on http://localhost:${PORT}`);
});