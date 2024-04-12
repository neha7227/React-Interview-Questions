import {useState} from "react";
// import Notes from "./components/Notes.jsx"
import Notes from "./components/Notes";
import './App.css';

function App() {
  const [notes, setNotes ] = useState([
    {
      id:1,
      text: "note 1"
    },
    {
      id:2,
      text: "note 2"
    }
  ]);
  return (
    <div >
<Notes notes={notes} setNotes={setNotes}/>
    </div>
  );
}

export default App;
