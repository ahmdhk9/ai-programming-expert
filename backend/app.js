const express = require('express');
const app = express();

app.use(express.json());

// Routes
app.use('/api/content', require('./routes/content'));
app.use('/api', require('./routes/api'));

// Frontend
app.use(express.static('../web/pages'));

app.listen(3000, () => console.log('✅ Backend جاهز على 3000'));

module.exports = app;
