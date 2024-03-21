'use strict';

const app = require('./app');
const port =  process.env.PORT || 3000;

// start server
app.listen(port, () => {
    console.log(`Express started. Listening on ${port}`);
});
