// import ReactDOM from 'react-dom';
import React from 'react';
import './App.css';
import NoteList from './components/NoteList/NoteList';
import Writer from './components/Writer/Writer';
import Header from './components/Header/Header';
import SplitPanel from './components/SplitPanel/SplitPanel';
import { Editor, EditorState, RichUtils, ContentState } from "draft-js";


function App() {
  const d = Date.now()
  const [currentDraft, setCurrentDraft] = React.useState(d)
  const [drafts, setDrafts] = React.useState([createDraft(d)])

  React.useEffect(() => {
    setCurrentDraft(drafts[0].id)
  }, [])

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
    // setCurrentDraft(newDraft.id)
  }
  function removeDraft(id) {
    if (id === currentDraft && drafts.length > 1) {
      console.log((drafts.findIndex(draft => draft.id === id) + drafts.length - 1) % (drafts.length))
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

  return (
    // <TextContext.Provider value={TextContext}>
      <div className="App">
        <Header/>
        <SplitPanel className='App-body'>
          <NoteList 
            // notes={drafts.map(draft => draft.editor.getCurrentContent().getPlainText('\u0001'))}
            drafts={drafts}
            currentDraft={currentDraft}
            setCurrentDraft={setCurrentDraft}
            addDraft={addDraft}
            removeDraft={removeDraft}
            moveDraft={moveDraft}
          />
          <Writer 
            addDraft={addDraft}
            editorState={getCurrentDraft().editor}
            updateDraft={(newState) => updateDraft(currentDraft, newState)}
          />
        </SplitPanel>
      </div>
    // </TextContext.Provider>
  );
}

export default App;
