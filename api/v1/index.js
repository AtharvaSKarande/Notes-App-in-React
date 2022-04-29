const express = require("express");
const noteModel = require("../../db/models/note.model");
var notesRouter = express.Router();

const Note = require("../../db/models/note.model");

// Get all notes.
notesRouter.get("/", (request, response) => {
  Note.find({}, (error, notes) => {
    if (error) return console.log(error);

    response.json({
      notes: notes,
    });
  });
});

// Add a new note.
notesRouter.post("/", (request, response) => {
  const newNode = Note(request.body);
  newNode.save().then((saved) => {
    response.json({
      note: newNode,
      success: true,
    });
  });
});

// Get a note by id.
notesRouter.get("/:id", (request, response) => {
  const noteId = request.params.id;
  noteModel.findById(noteId, (error, note) => {
    if (error) return console.log(error);

    if (!note) {
      response.status(404).json({
        message: "Note not found.",
      });
    } else {
      response.json({
        reply: "Note by Id success.",
        note,
      });
    }
  });
});

// Update a note by id.
notesRouter.put("/:id", (request, response) => {
  const noteId = request.params.id;
  const updatedNote = request.body;

  noteModel.findByIdAndUpdate(
    noteId,
    updatedNote,
    { new: true },
    (error, note) => {
      if (error) return console.log(error);

      if (!note) {
        response.status(404).json({
          message: "Note not found for Updation.",
        });
      } else {
        response.json({
          reply: "Updating note by Id success.",
          note,
        });
      }
    }
  );
});

// Delete a note by id.
notesRouter.delete("/:id", (request, response) => {
  const noteId = request.params.id;
  noteModel.findByIdAndRemove(noteId, (error, deletedNote) => {
    if (error) return console.log(error);

    if (!deletedNote) {
      response.status(404).json({
        message: "Note not found for deletion.",
      });
    } else {
      response.json({
        reply: "Delete note by Id success.",
      });
    }
  });
});

module.exports = { notesRouter };
