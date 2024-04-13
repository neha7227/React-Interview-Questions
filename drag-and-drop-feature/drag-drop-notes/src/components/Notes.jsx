import React, { useRef, createRef, useState } from "react";
import { useEffect } from "react";

// import Note from "./components/Note.jsx";
import Note from "./Note";

function Notes({ notes = [], setNotes = () => {} }) {
  const noteRefs = useRef([]);
  console.log(notes);

  // const [savedNotes, setSavedNotes] = useState([]);
  // console.log(noteRefs);
  /*
  useEffect(() => {
    //localstorage logic

    // const savedNotes = [];
    // console.log(notes, "notes");
    // savedNotes -  modified notes by adding position.
    const savedNotes = JSON.parse(localStorage.getItem("notes")) || [];

    console.log(savedNotes, "savedNotes");
    // updatedNotes - modified notes by adding position. Finally updating notes with position and saving in setNotes(state mgmt)
    const updatedNotes = notes.map((note) => {
      const savedNote = savedNotes.find((n) => n.id === note.id);
      console.log(savedNote, "savedNote");

      if (savedNote) {
        // return {}
        return { ...note, position: savedNote.position };
      } else {
        const position = determineNewPosition();
        // Save the new note to local storage
        localStorage.setItem(
          "notes",
          JSON.stringify([...savedNotes, { ...note, position }])
        );
        return { ...note, position };
      }
    });
    setNotes(updatedNotes);
    console.log(updatedNotes, "updatedNotes");
    // localStorage.setItem("notes", JSON.stringify(updatedNotes));
    // console.log(
    //   JSON.parse(localStorage.getItem("notes")),
    //   "localstorage updated?"
    // );
    console.log(notes.length, "notes.length");
    console.log(savedNotes, "savedNotes again checking");
  }, [notes.length]);
  */

  // useEffect(() => {
  //   localStorage.setItem("notes", JSON.stringify(notes));
  // }, [notes]);

  useEffect(() => {
    // localstorage logic
    const savedNotes = JSON.parse(localStorage.getItem("notes")) || [];

    const updatedNotes = notes.map((note) => {
      const savedNote = savedNotes.find((n) => n.id === note.id);
      if (savedNote) {
        console.log(savedNote, "if");
        return { ...note, position: savedNote.position };
      } else {
        console.log(savedNote, "else");
        const position = determineNewPosition();
        console.log({ ...note, position });
        return { ...note, position };
      }
    });

    setNotes(updatedNotes);
    console.log(updatedNotes, "updatedNotes");
    localStorage.setItem("notes", JSON.stringify(updatedNotes));
    console.log(notes.length);
  }, [notes.length]);

  const determineNewPosition = () => {
    const maxX = window.innerWidth - 250;
    const maxY = window.innerHeight - 250;
    return {
      x: Math.floor(Math.random() * maxX),
      y: Math.floor(Math.random() * maxY),
    };
  };

  const handleDragStart = (note, e) => {
    console.log(note, "note");
    const { id } = note;
    const noteRef = noteRefs.current[id].current;
    console.log(noteRef, "noteRef");
    const rect = noteRef.getBoundingClientRect();

    const offsetX = e.clientX - rect.left; // distance from starting of screen on x axis
    const offsetY = e.clientY - rect.top; // distance from starting of screen on y axis
    const startPos = note;

    const handleMouseMove = (e) => {
      const newX = e.clientX - offsetX;
      const newY = e.clientY - offsetY;

      noteRef.style.left = `${newX}px`;
      noteRef.style.top = `${newY}px`;
    };

    const handleMouseUp = (e) => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
      const finalRect = noteRef.getBoundingClientRect();
      const newPosition = { x: finalRect.left, y: finalRect.top };
      updateNotePosition(id, newPosition);

      // TODO:check for overlap
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  };

  const updateNotePosition = (id, newPosition) => {
    const updatedNotes = notes.map((note) =>
      note.id === id ? { ...note, position: newPosition } : note
    );
    setNotes(updatedNotes);
    localStorage.setItem("notes", JSON.stringify(updatedNotes));
  };

  return (
    <div>
      {/* <Notes /> */}
      {notes.map((note) => {
        return (
          <Note
            ref={
              noteRefs.current[note.id]
                ? noteRefs.current[note.id]
                : (noteRefs.current[note.id] = createRef())
            }
            key={note.id}
            content={note.text}
            initialPos={note.position}
            onMouseDown={(e) => handleDragStart(note, e)}
          />
        );
        // return notes[0].text;
      })}
    </div>
  );
}

export default Notes;
