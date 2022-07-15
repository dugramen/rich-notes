import React from 'react';
import NoteItem from "./NoteItem";
import "./Note.css";

export default function NoteList(props) {
    const {notes, setNotes, currentNote, setCurrentNote} = props
    const noteDivs = notes.map((note, index) => <NoteItem 
        key = {index}
        title = {note.split("\n")[0]}
        isSelected = {currentNote === index}
        selectNote = {() => selectNote(index)}
        deleteNote = {() => deleteNote(index)}
    />)

    function addNote() {
        setNotes(oldNotes => ["New Note " + oldNotes.length, ...oldNotes])
    }
    function deleteNote(index) {
        setNotes(oldNotes => oldNotes.filter((n, _index) => _index !== index))
    }
    function selectNote(index) {
        setCurrentNote(index)
    }

    return (<div className='note-panel'>
        <button onClick={addNote}>Add Note</button>
        <div className='note-list'>{noteDivs}</div>
    </div>)
}