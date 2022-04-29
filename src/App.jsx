import { useState, useEffect } from "react";
import {
  createNote,
  getNotes,
  updateNote,
  deleteNote,
} from "./services/notesServices";
import Note from "./components/Note/Note.jsx";
import { Button, Modal, FloatingLabel, Form } from "react-bootstrap";
import "./App.css";

function App() {
  const [Notes, setNotes] = useState([]);
  const [addNodeModal, setAddNodeModal] = useState(false);
  const [newNote, setNewNote] = useState({ link: "", text: "" });

  const handleAddNodeModalClose = () => {
    setNewNote({
      link: "",
      text: "",
    });
    setAddNodeModal(false);
  };
  const handleAddNodeModalShow = () => setAddNodeModal(true);

  // App component renders the first time.
  useEffect(() => {
    getAndSetNotesFromServer();
  }, []);

  const getAndSetNotesFromServer = async () => {
    const notes = await getNotes();
    setNotes(notes);
  };

  const onNoteUpdate = async (updatedNote) => {
    const noteFromServer = await updateNote(updatedNote);

    const newNoteArray = Notes.map((note) => {
      if (note._id === updatedNote._id) return noteFromServer;
      return note;
    });
    setNotes(newNoteArray);
  };

  const onNoteDelete = async (noteToDelete) => {
    await deleteNote(noteToDelete._id);

    const remainingNotes = Notes.filter((noteItem) => {
      return noteItem._id != noteToDelete._id;
    });
    setNotes(remainingNotes);
  };

  const addNode = async () => {
    if (newNote.text != "") {
      const savedNote = await createNote(newNote);
      setNotes([...Notes, savedNote]);
    }
    handleAddNodeModalClose();
  };

  return (
    <div className="App">
      <Button
        variant="dark"
        className="add-button"
        onClick={handleAddNodeModalShow}
      >
        <div className="add-button-text">+</div>
      </Button>

      <Modal show={addNodeModal} onHide={handleAddNodeModalClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add Note</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <FloatingLabel controlId="floatingTextarea2" label="Text">
            <Form.Control
              onChange={(event) => {
                const newVal = event.currentTarget.value;
                setNewNote({ ...newNote, text: newVal });
              }}
              as="textarea"
              placeholder="Leave a comment here"
              style={{ height: "100px" }}
            />
          </FloatingLabel>
          <FloatingLabel
            controlId="floatingTextarea"
            label="Link"
            className="mb-3 note-link"
          >
            <Form.Control
              type="url"
              placeholder="Enter URL here"
              onChange={(event) => {
                const newLink = event.currentTarget.value;
                setNewNote({ ...newNote, link: newLink });
              }}
            />
          </FloatingLabel>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={handleAddNodeModalClose}>
            Close
          </Button>
          <Button
            variant={newNote.text.length > 0 ? "success" : "secondary"}
            onClick={addNode}
          >
            Add note
          </Button>
        </Modal.Footer>
      </Modal>

      <div className="notes-list">
        {Notes.map((item, index) => {
          return (
            <Note
              note={item}
              onNoteDelete={onNoteDelete}
              onNoteUpdate={onNoteUpdate}
              key={item._id}
            />
          );
        })}
      </div>
    </div>
  );
}

export default App;
