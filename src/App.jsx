import { useState, useEffect } from "react";
import axios from "axios";
import dummyNotes from "./notes/DummyNotes";
import Note from "./components/Note/Note.jsx";
import "./App.css";

function App() {
  const [Notes, setNotes] = useState([]);

  // App component renders the first time.
  useEffect(() => {
    const listStringFromStorage = localStorage.getItem("my-notes");
    if (listStringFromStorage) setNotes(JSON.parse(listStringFromStorage));
    else setNotes(dummyNotes);
  }, []);

  useEffect(() => {
    const noteStr = JSON.stringify(Notes);
    localStorage.setItem("my-notes", noteStr);
    console.log("Saved changes to local storage..");
  }, [Notes]);

  // const getNotes = async() =>{
  //   try{
  //     const response = await axios.get('http://localhost:5000/notes')
  //     setNotes(response.data.notes)
  //     console.log(Notes)
  //   } catch(error){
  //     console.log(error)
  //   }
  // }

  const onNoteUpdate = (updatedNote) => {
    const newNoteArray = Notes.map((note) => {
      if (note._id === updatedNote._id) return updatedNote;
      return note;
    });
    setNotes(newNoteArray);
  };

  return (
    <div className="App">
      <div className="notes-list">
        {Notes.map((item, index) => {
          return (
            <Note note={item} onNoteUpdate={onNoteUpdate} key={item._id} />
          );
        })}
      </div>
    </div>
  );
}

export default App;
