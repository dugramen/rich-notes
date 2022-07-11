import React from 'react';
import NoteItem from "./NoteItem";
import "./Note.css";

export default function NoteList(props) {
    const [notes, setNotes] = React.useState(["First Note"])
    const [selectedNote, setSelectedNode] = React.useState(0)

    const noteDivs = notes.map((note, index) => <NoteItem 
        key = {index}
        title = {note}
        isSelected = {selectedNote === index}
        selectNote = {() => selectNote(index)}
        deleteNote = {() => deleteNote(index)}
    />)

    function addNote() {
        setNotes(oldNotes => [...oldNotes, "New Note " + oldNotes.length])
    }
    function deleteNote(index) {
        setNotes(oldNotes => oldNotes.filter((n, _index) => _index !== index))
    }
    function selectNote(index) {
        setSelectedNode(index)
    }

    return (<div className='note-panel'>
        <button onClick={addNote}>Add Note</button>
        <div className='note-list'>{noteDivs}</div>
    </div>)
}