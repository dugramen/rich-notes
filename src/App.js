import ReactDOM from 'react-dom';
import './App.css';
import NoteList from './components/NoteList/NoteList';
import Writer from './components/Writer/Writer';
import Header from './components/Header/Header';
import ResizablePanel from './components/ResizablePanel/ResizablePanel.js';
import SplitPane from 'react-split-pane';

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

// ReactDOM.render(<App/>, document.getElementById("root"))
export default App;
