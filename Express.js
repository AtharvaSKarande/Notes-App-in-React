/**
 * Express JS backend.
 * To run ...>npm run startExpress
 * 
 * packages installed :
 * nodemon -> Refresh on change in this file.
 * cors -> To allow everyone to access. (Not recomended for production)
 * 
 */

const express = require('express')
const cors = require('cors');
const app = express();
const port = 5000;
const {notesRouter} = require("./api/v1/index")

app.use(cors());

app.get('/', (request, response) =>{
    response.send("Hello World!");
});

app.use("/notes",notesRouter);

app.listen(port, () =>{
    console.log(`Express is running on http://localhost:${port}`);
})