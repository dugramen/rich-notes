// import ReactDOM from 'react-dom';
import React from 'react';
import './App.css';
import NoteList from './components/NoteList/NoteList';
import Writer from './components/Writer/Writer';
import Header from './components/Header/Header';
// import ResizablePanel from './components/ResizablePanel/ResizablePanel.js';
import SplitPanel from './components/SplitPanel/SplitPanel';
import { Editor, EditorState, RichUtils } from "draft-js";


function App() {
  const [notes, setNotes] = React.useState(["hello"])
  const [currentNote, setCurrentNote] = React.useState(0)
  
  function updateNote(id, newNote) {
    setNotes(oldNotes => [
      newNote,
      ...oldNotes.filter((note, _id) => id !== _id)
    ])
    setCurrentNote(0)
  }

  return (
    // <TextContext.Provider value={TextContext}>
      <div className="App">
        <Header/>
        <SplitPanel className='App-body'>
          <NoteList 
            notes={notes} 
            currentNote={currentNote}
            setNotes={setNotes}
            setCurrentNote={setCurrentNote}
          />
          <Writer text={notes[currentNote]} updateNote={updateNote.bind(this, currentNote)}/>
        </SplitPanel>
      </div>
    // </TextContext.Provider>
  );
}

export default App;
