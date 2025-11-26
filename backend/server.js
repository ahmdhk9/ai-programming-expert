const express = require('express');
const app = express();

app.use(express.static('../public'));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/../public/index.html');
});

app.get('/dev', (req, res) => {
  res.sendFile(__dirname + '/../public/dev/index.html');
});

app.listen(5000, '0.0.0.0', () => {
  console.log('✅ المنصة تعمل على: http://localhost:5000');
  console.log('👨‍💻 لوحة المطور: http://localhost:5000/dev');
});
