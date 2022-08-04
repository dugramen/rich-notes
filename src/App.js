// import ReactDOM from 'react-dom';
import React from 'react';
import './App.css';
import NoteList from './components/NoteList/NoteList';
import Writer from './components/Writer/Writer';
import Header from './components/Header/Header';
import SplitPanel from './components/SplitPanel/SplitPanel';
import DropDown from './components/Utils/DropDown';
import { Editor, EditorState, RichUtils, ContentState, convertToRaw, convertFromRaw } from "draft-js";


function App() {
  const d = Date.now()
  const [currentDraft, setCurrentDraft] = React.useState(d)
  const [drafts, setDrafts] = React.useState([createDraft(d)])
  const [width, setWidth] = React.useState(window.innerWidth);
  const [notesVisible, setNotesVisible] = React.useState(true)
  const isMobile = width <= 768;

  function handleWindowResize() {
      setWidth(window.innerWidth);
  }
  React.useEffect(() => {
    const data = localStorage.getItem('drafts')
    if (data) {
      setDrafts(JSON.parse(data).map(draft => ({
        ...draft,
        editor: EditorState.createWithContent(convertFromRaw(draft.editor))
      })))
    }

    setCurrentDraft(drafts[0].id)
    window.addEventListener('resize', (handleWindowResize));
    return () => {
      window.removeEventListener('resize', handleWindowResize);
  }
  }, [])

  // Save to local storage
  React.useEffect(() => { 
    localStorage.setItem("drafts", JSON.stringify(drafts.map(draft => ({
      ...draft,
      editor: convertToRaw(draft.editor.getCurrentContent()),
    }))))
  }, [drafts])

  // Sorting functions
  const getBlockText = (b) => b.editor.getCurrentContent().getFirstBlock().getText()

  function createDraft(time = Date.now()) {
    return {
      editor: createEditor(),
      id: time,
    }
  }
  function createEditor(text = "Note") {
    return EditorState.createWithContent(ContentState.createFromText(text))
  }
  function addDraft() {
    const newDraft = createDraft()
    setDrafts(oldDrafts => [...oldDrafts, newDraft])
  }
  function removeDraft(id) {
    if (id === currentDraft && drafts.length > 1) {
      setCurrentDraft(drafts[(drafts.findIndex(draft => draft.id === id) + 1) % (drafts.length)].id)
    }
    setDrafts(oldDrafts => oldDrafts.filter((draft) => draft.id !== id))
  }
  function updateDraft(id, state) {
    setDrafts(oldDrafts => oldDrafts.map((draft) => draft.id !== id ? draft: {...draft, editor: state}))
  }
  function getCurrentDraft() {
    return drafts.filter(draft => draft.id === currentDraft)[0] || drafts[0] || {editor: undefined}
  }
  function moveDraft(sid, did) {
    setDrafts(oldDrafts => {
      let newDrafts = [...oldDrafts]
      newDrafts.splice(sid, 1)
      newDrafts.splice(did, 0, oldDrafts[sid])
      return newDrafts
    })
  }

  const noteList = <NoteList 
    drafts={drafts}
    currentDraft={currentDraft}
    setCurrentDraft={setCurrentDraft}
    addDraft={addDraft}
    removeDraft={removeDraft}
    moveDraft={moveDraft}
    setDrafts={setDrafts}
  />
  const writer = <Writer 
    addDraft={addDraft}
    editorState={getCurrentDraft().editor}
    updateDraft={(newState) => updateDraft(currentDraft, newState)}
  />

  return (
    <div className="App">
      <Header/>
      {isMobile ? 
        <div className='mobile-app'>
          <div className='header'>
            <button
              className='open-notes-list'
              onClick={() => setNotesVisible(old => !old)}
            >Notes List</button>
            <h2>Rich Notes</h2>
          </div>

          <div
            className={`bg ${notesVisible && "visible"}`}
            onClick={() => setNotesVisible(false)}
          />
          <div
            className={`notes-panel${isMobile && "-mobile"} ${notesVisible && "visible"}`}
          >
            {noteList}
          </div>

          {writer}  
        </div>
      :
      <SplitPanel className='App-body'>
        {noteList}
        {writer}
      </SplitPanel>
      }
    </div>
  );
}

export default App;
