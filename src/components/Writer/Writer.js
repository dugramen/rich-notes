import React from "react";
import './Writer.css';
import { Editor, EditorState, RichUtils } from "draft-js";

export default function Writer(props) {
    const [editorState, setEditorState] = React.useState(
        () => EditorState.createEmpty(),
    );

    const tools = [
        ['ParagraphStyle', 'Font', 'FontSize'],
        ['Itallic', 'BOLD', 'Underline', 'Strikethrough'],
        ['TextColor', 'HighlightColor'],
        ['UnorderedList', 'OrderedList'],
        ['TextLeft', 'TextCenter', 'TextRight', 'TextBlock'],
        ['Indent', 'Dedent']
    ]
    const toolButtons = tools.map(section => section.map(tool => <button 
        key = {tool} 
        onClick={(event) => handleClick(event, tool)}
        // onClick={() => document.execCommand(tool)}
        >
        {tool}
    </button>))

    function handleClick(event, tool) {
        console.log(tool)
        event.preventDefault()
        const nextState = RichUtils.toggleInlineStyle(editorState, tool.toUpperCase());
        setEditorState(nextState)
    }


    return (<div>
        <div className="tool-container">
            {toolButtons}
        </div>
        {/* <textarea>Hello there ending words</textarea> */}
        <Editor 
            className="draftjs"
            editorState={editorState} 
            onChange={setEditorState} 
        />
        {/* <div contentEditable={true}>Hello <b>poo this is the grates</b> goodness</div> */}
    </div>)
}