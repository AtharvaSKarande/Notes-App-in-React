import "./Note.css";

const Note = (props) => {
  const noteTextUpdate = (event) => {
    const newText = event.currentTarget.textContent;
    if (newText === props.note.text) return;
    const updatedNote = {
      ...props.note,
      text: newText || "",
    };
    props.onNoteUpdate(updatedNote);
  };

  return (
    <div className="note">
      <div
        className="note_text"
        onBlur={noteTextUpdate}
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
