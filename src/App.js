import logo from './logo.svg';
import './App.css';
import NoteList from './components/NoteList/NoteList';
import Writer from './components/Writer/Writer';
import Header from './components/Header/Header';
import ResizablePanel from './components/ResizablePanel/ResizablePanel.js';

function App() {
  console.log(<div>
    Title <em>Emphasised</em> end
  </div>);

  return (
    <div className="App">
      <Header/>
      <ResizablePanel className='App-body'>
        <NoteList/>
        <Writer/>
      </ResizablePanel>
    </div>
  );
}

export default App;
