const app = require('./app');
const connectToMongoDB = require('./libs/database');

const port = process.env.PORT || 3000;

// connect to MongoDB database
connectToMongoDB();

// start server
app.listen(port, () => {
    console.log(`Express started. Listening on ${port}`);
});
