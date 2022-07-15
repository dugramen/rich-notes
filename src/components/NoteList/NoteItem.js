import React from "react";

export default function NoteItem(props) {
    const {selectNote, title, isSelected} = props

    function deleteNote(event) {
        event.stopPropagation()
        props.deleteNote()
    }

    return (<div className={`note-item ${isSelected? "selected": ""}`} onClick={() => selectNote()}>
        <h4>{title}</h4>
        <button className="not-item--button" onClick={deleteNote}>Delete</button>
    </div>)
}