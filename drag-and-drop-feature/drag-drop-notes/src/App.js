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
    },
    {
      id:3,
      text: "note 3"
    }

  ]);
  const [note, setNote] = useState("");

  const addNote = () => {
    const newNote = {
      id: notes.length + 1,
      text: note,
    };

    const updatedNotes = [...notes, newNote];
    setNotes(updatedNotes);
    localStorage.setItem("notes", JSON.stringify(updatedNotes));
    setNote("");
  };



  return (
    <>
    <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "5px",
          marginTop: "30px",
        }}
      >
        <input
          type="text"
          value={note}
          onChange={(e) => setNote(e.target.value)}
        />
        {/* <button
          onClick={() => {
            setNotes([...notes, {id: note.length + 1, text: note}]);
            setNote("");
          }}
        > */}
        <button onClick={addNote}>
          Add Note
        </button>
      </div>

    <div >
<Notes notes={notes} setNotes={setNotes}/>
    </div>
    </>
  );

}


export default App;
