const express = require('express');
var notesRouter = express.Router();

const Note = require("../../db/models/note.model");

notesRouter.get("/", (request, response) =>{
    Note.find((error,notes)=>{
        if(error) return console.log(error);

        response.json({
            notes: notes,
        });
    });
});

notesRouter.post("/", (request, response) =>{
    const newNode = Note(request.body);
    newNode.save().then((saved)=>{
        response.json({
                note: newNode,
                success: true
            });
    });
    
});

notesRouter.get("/:id", (request, response) =>{
    response.json({
        reply: "Note by Id.",
    });
});

notesRouter.delete("/:id", (request, response) =>{
    response.json({
        reply: "Note Deleted.",
    });
});

module.exports = {notesRouter}