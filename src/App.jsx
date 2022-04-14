import { useState, useEffect } from "react";
import axios from "axios";
import dummyNotes from "./notes/DummyNotes";
import Note from "./components/Note/Note.jsx";
import "./App.css";

function App() {
  const [Notes, setNotes] = useState([]);

  useEffect(() => {
    setNotes(dummyNotes);
  }, []);

  // const getNotes = async() =>{
  //   try{
  //     const response = await axios.get('http://localhost:5000/notes')
  //     setNotes(response.data.notes)
  //     console.log(Notes)
  //   } catch(error){
  //     console.log(error)
  //   }
  // }

  return (
    <div className="App">
      <div className="notes-list">
        {Notes.map((item, index) => {
          return <Note note={item} key={index} />;
        })}
      </div>
    </div>
  );
}

export default App;
