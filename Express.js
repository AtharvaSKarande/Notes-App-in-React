const express = require('express')
const app = express();
const port = 5000;

app.get('/', (request, response) =>{
    response.send("Hello World!")
})

app.get('/notes', (request, response) =>{
    const notes = [{
        text: "Google web",
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