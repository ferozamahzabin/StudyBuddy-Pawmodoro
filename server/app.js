const express = require('express');
const path = require('path');
const settingsRoutes = require('./routes/settingsRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use('/api/settings', settingsRoutes);
app.use(express.static(path.join(__dirname, '../public')));

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
