import React from "react";

export default function NoteItem(props) {
    const {selectNote, title, isSelected} = props

    const [deleted, setDeleted] = React.useState(false)
    const noteItem = React.useRef()

    function deleteNote(event) {
        event.stopPropagation()
        setDeleted(true)
        // props.deleteNote()
    }

    function handleTransition(e) {
        if (e.propertyName === "max-height" && deleted) {
            props.deleteNote()
            setDeleted(false)
        }
    }

    return (
    <div 
        className={`note-item ${isSelected && "selected"} ${deleted && "deleted"}`} 
        onClick={() => selectNote()}
        onTransitionEnd={(e) => handleTransition(e)}
        ref={noteItem}
    >
        <div className="note-bg"/>
        <div className="note-highlight"/>
        <h4 className="note-title">{title}</h4>
        <button className="not-item--button" onClick={deleteNote}>Delete</button>
    </div>
    )
}