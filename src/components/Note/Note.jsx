import "./Note.css";

const Note = (props) => {
  return (
    <div className="note">
      <div className="note_text">{props.note.text}</div>

      <div className="note_link">
        <a href={props.note.link}>{props.note.link}</a>
      </div>
    </div>
  );
};

export default Note;
