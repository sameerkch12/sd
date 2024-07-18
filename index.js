const express = require('express');
const { ndown } = require('nayan-media-downloader');
const cors = require('cors');
const https = require('https'); // Use https module

const app = express();
const port = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.post('/download', async (req, res) => {
    const { url } = req.body;
    try {
        const data = await ndown(url);
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});

// Use https module for https URLs
setInterval(() => {
    https.get('https://sd-01jq.onrender.com/download', (res) => {
        console.log(`Server hit with status code: ${res.statusCode}`);
    }).on('error', (e) => {
        console.error(`Got error: ${e.message}`);
    });
}, 5 * 60 * 1000); // Add the missing comma
