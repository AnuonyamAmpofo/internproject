const express = require('express');
const app = express();
const cors = require('cors');
const db = require('./src/db'); // your database connection
const taskRoutes = require('./src/Routes/tasks');

app.use(cors());
app.use(express.json());

// 👉 Serve the tones statically
app.use('/tones', express.static('public/tones'));
app.use('/tasks', taskRoutes);
 

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));