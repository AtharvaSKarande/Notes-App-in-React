import { useState } from "react";
import "./Note.css";

const Note = (props) => {
  const [isFocused, setIsFocused] = useState(false);

  const noteTextUpdate = (event) => {
    setIsFocused(false);
    const newText = event.currentTarget.textContent;
    if (newText === props.note.text) return;
    const updatedNote = {
      ...props.note,
      text: newText || "",
    };
    props.onNoteUpdate(updatedNote);
  };

  const setFocusTrue = () => {
    setIsFocused(true);
  };

  return (
    <div className={isFocused ? "note note--focused" : "note"}>
      <button
        type="button"
        className="btn-close"
        onClick={() => {
          props.onNoteDelete(props.note);
        }}
        aria-label="Close"
      ></button>
      <div
        className="note_text"
        onBlur={noteTextUpdate}
        onFocus={setFocusTrue}
        contentEditable
        suppressContentEditableWarning
      >
        {props.note.text}
      </div>

      <div className="note_link">
        <a href={props.note.link}>{props.note.link}</a>
      </div>
    </div>
  );
};

export default Note;
