import { useState, useEffect } from "react";
import dummyNotes from "./notes/DummyNotes";
import Note from "./components/Note/Note.jsx";
import logo_img from "./notes_logo.png";
import { Button, Modal, FloatingLabel, Form } from "react-bootstrap";
import "./App.css";

function App() {
  const [Notes, setNotes] = useState([]);
  const [addNodeModal, setAddNodeModal] = useState(false);
  const [newNote, setNewNote] = useState({ _id: "", link: "", text: "" });

  const handleAddNodeModalClose = () => {
    setNewNote({
      _id: "",
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

  useEffect(() => {
    localStorage.setItem("my-notes", JSON.stringify(Notes));
  }, [Notes]);

  const loadDummyNotes = () => {
    let resp = confirm(
      "Do you want to load sample notes? Your current notes will be lost!"
    );
    if (resp) setNotes(dummyNotes);
  };

  const getAndSetNotesFromServer = () => {
    const listStringFromStorage = localStorage.getItem("my-notes");
    listStringFromStorage
      ? setNotes(JSON.parse(listStringFromStorage))
      : setNotes(dummyNotes);
  };

  const onNoteUpdate = (updatedNote) => {
    console.log(updatedNote);
    const newNoteArray = Notes.map((note) => {
      if (note._id == updatedNote._id) return updatedNote;
      return note;
    });
    setNotes(newNoteArray);
  };

  const onNoteDelete = (noteToDelete) => {
    const remainingNotes = Notes.filter((noteItem) => {
      return noteItem._id != noteToDelete._id;
    });
    setNotes(remainingNotes);
  };

  const addNode = () => {
    if (newNote.text != "") {
      const NEW_NOTE = {
        ...newNote,
        _id: new Date().toLocaleString(),
      };
      setNotes([...Notes, NEW_NOTE]);
    }
    handleAddNodeModalClose();
  };

  return (
    <>
      <nav className="navbar navbar-dark bg-dark Nav">
        <a className="navbar-brand" href="#">
          <img
            src={logo_img}
            width="30"
            height="30"
            className="d-inline-block align-top"
            alt=""
            style={{ marginLeft: `10px`, marginRight: `10px` }}
          />
          Keep Notes
        </a>
      </nav>
      <div className="App">
        <Button
          variant="primary"
          className="add-button"
          onClick={handleAddNodeModalShow}
        >
          {/* Add SVG */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            length="auto"
            fill="currentColor"
            className="bi bi-pencil-square"
            viewBox="0 0 16 16"
          >
            <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
            <path
              fillRule="evenodd"
              d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"
            />
          </svg>
        </Button>

        <Button
          variant="warning"
          className="load-button"
          onClick={loadDummyNotes}
        >
          {/* Download SVG */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            length="auto"
            fill="currentColor"
            className="bi bi-download"
            viewBox="0 0 16 16"
          >
            <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5z" />
            <path d="M7.646 11.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V1.5a.5.5 0 0 0-1 0v8.793L5.354 8.146a.5.5 0 1 0-.708.708l3 3z" />
          </svg>
        </Button>

        <Modal show={addNodeModal} onHide={handleAddNodeModalClose}>
          <Modal.Header closeButton>
            <Modal.Title>Add new Note</Modal.Title>
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
              label="Link (Optional)"
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
          {Notes.length > 0 &&
            Notes.map((item, index) => {
              return (
                <Note
                  note={item}
                  onNoteDelete={onNoteDelete}
                  onNoteUpdate={onNoteUpdate}
                  key={item._id}
                />
              );
            })}
          {Notes.length == 0 && (
            <div
              className="alert alert-info"
              role="alert"
              style={{ opacity: `0.8` }}
            >
              <h3 className="alert-heading">Woo-ha! Noting here...</h3>
              <br />
              <h6>
                You don't have any notes stored in the local storage. You can
                add a new note, or load sample notes.
              </h6>
              <hr />
              <h6 className="mb-0">
                Created by, <b>Atharva Sunil Karande.</b>
              </h6>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default App;
