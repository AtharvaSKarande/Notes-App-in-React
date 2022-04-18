const express = require('express');
var notesRouter = express.Router();

notesRouter.get("/", (request, response) =>{
    const notes = [{
        text: "Google",
        link: "https://google.com"
    },{
        text: "Microsoft",
        link: "https://microsoft.com"
    },]
    
    response.json({notes});
})

notesRouter.get("/dummy",(request,response) => {
    response.json({text:"Dummy"})
})

module.exports = {notesRouter}