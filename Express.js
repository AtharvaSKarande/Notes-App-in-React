/**
 * Express JS backend.
 * packages installed :
 * nodemon -> Refresh on change in this file.
 * cors -> To allow everyone to access. (Not recomended for production)
 * 
 */

const express = require('express')
const app = express();
const port = 5000;

const cors = require('cors')
app.use(cors())

app.get('/', (request, response) =>{
    response.send("Hello World!")
})

app.get('/notes', (request, response) =>{
    const notes = [{
        text: "Google",
        link: "https://google.com"
    },{
        text: "Microsoft",
        link: "https://microsoft.com"
    },]
    
    response.json({
        notes
    })
})

app.listen(port, () =>{
    console.log(`Express is running on http://localhost:${port}`);
})