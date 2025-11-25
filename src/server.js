const mongoose = require('mongoose');
const app = require('./index.js');

const PORT = process.env.PORT || 3000;

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/taskey';

mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log('Database Connected!');
    app.listen(PORT, () => {
      console.log(`Server is running on PORT: ${PORT}`);
    });
  })
  .catch((err) => {
    console.error('Failed to connect to MongoDB: ', err);
  });
