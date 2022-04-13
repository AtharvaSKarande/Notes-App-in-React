import {useState} from 'react'
import axios from 'axios'
import './App.css'

function App() {
    const [Notes,setNotes] = useState([]);

  const getNotes = async() =>{
    try{
      const response = await axios.get('http://localhost:5000/notes')
      setNotes(response.data.notes)
      console.log(Notes)
    } catch(error){
      console.log(error)
    }
  }

  return (
    <div className="App">
      <h2>Notes Application</h2>
      <div>
        <button onClick={getNotes}>Click</button>
      </div>
      {Notes.length>0 && 
      <div>
        <h4>{Notes[0].text}</h4>
        <h4>{Notes[0].link}</h4>
      </div>
      }
    </div>
  )
}

export default App
