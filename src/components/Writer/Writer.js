import React from "react";
import './Writer.css';
import { Editor, EditorState, RichUtils } from "draft-js";

export default function Writer(props) {
    const [editorState, setEditorState] = React.useState(
        () => EditorState.createEmpty(),
    );

    const tools = [
        ['ParagraphStyle', 'Font', 'FontSize'],
        ['Italic', 'Bold', 'Underline', 'Strikethrough'],
        ['TextColor', 'HighlightColor'],
        ['UnorderedList', 'OrderedList'],
        ['TextLeft', 'TextCenter', 'TextRight', 'TextBlock'],
        ['Indent', 'Dedent']
    ]
    const toolButtons = tools.map(section => section.map(tool => <button 
        key = {tool} 
        id = {tool.toLowerCase()}
        onClick={(event) => handleClick(event, tool)}
        >
        {tool}
    </button>))

    function handleClick(event, tool) {
        event.preventDefault()
        console.log(tool)
        const nextState = RichUtils.toggleInlineStyle(editorState, tool.toUpperCase());
        setEditorState(nextState)
    }


    return (<div className="writer">
        <div className="tool-container">
            {toolButtons}
        </div>
        <textarea value={props.text} onChange={e => props.updateNote(e.target.value)}></textarea>
        {/* <Editor 
            className="draftjs"
            editorState={editorState} 
            onChange={setEditorState} 
        /> */}
        {/* <div contentEditable={true}>Hello <b>poo this is the grates</b> goodness</div> */}
    </div>)
}