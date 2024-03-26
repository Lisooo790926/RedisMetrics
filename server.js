const express = require('express');
const Redis = require('ioredis');
const app = express();
app.use(express.json());

const clusterNodes = [
    { host: '127.0.0.1', port: 7000 },
    { host: '127.0.0.1', port: 7001 },
    { host: '127.0.0.1', port: 7002 },
    { host: '127.0.0.1', port: 7003 },
    { host: '127.0.0.1', port: 7004 },
    { host: '127.0.0.1', port: 7005 },
];

const redisClient = new Redis.Cluster(clusterNodes);

redisClient.on('error', function(error) {
    console.error('Redis Error: ', error);
});

app.post('/set', (req, res) => {
    const { key, value } = req.body;
    redisClient.set(key, value, 'EX', 3600, (err, reply) => {
        if (err) return res.status(500).send({ error: err });
        res.status(200).send({ reply });
    });
});

app.get('/get/:key', (req, res) => {
    const { key } = req.params;
    redisClient.get(key, (err, value) => {
        if (err) return res.status(500).send({ error: err });
        if (value === null) return res.status(404).send({ error: 'Key not found' });
        res.status(200).send({ value });
    });
});

// Start server
const PORT = 3001; // Change the port as necessary
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
