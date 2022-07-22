import React from "react";
import './Writer.css';
import { Editor, EditorState, RichUtils, getDefaultKeyBinding } from "draft-js";
import { SketchPicker } from "react-color";
import ColorPickerButton from "./ColorPickerButton/ColorPickerButton";

export default function Writer(props) {
    const [styleMap, setStyleMap] = React.useState({})
    function addColorStyle(name, property, hex) {
        setStyleMap(old => ({
            ...old,
            [name + hex]: {
                [property]: hex
            },
        }))
        toggleInline(name + hex)
        console.log(name + hex)
    }
    const tools = [
        ['-ParagraphStyle', 'Font', 'FontSize'],
        ['ITALIC', 'BOLD', 'UNDERLINE', 'STRIKETHROUGH'],
        [
            <ColorPickerButton 
                onChangeComplete={color => addColorStyle('TextColor', 'color', color.hex)}
            >
                TextColor
            </ColorPickerButton>,
            <ColorPickerButton 
                onChangeComplete={color => addColorStyle('HighlightColor', 'backgroundColor', color.hex)}
            >
                HighlightColor
            </ColorPickerButton>
        ],
        ['UnorderedList', 'OrderedList'],
        ['-TextLeft', '-TextCenter', '-TextRight', '-TextBlock'],
        ['-Indent', '-Dedent']
    ]
    const toolButtons = tools.map(section => section.map(tool => (typeof tool === "string"?
    <button 
        key = {tool} 
        id = {tool.toLowerCase()}
        onMouseDown={e => e.preventDefault()}
        onClick={(event) => handleClick(event, tool)}
        >
        {tool}
    </button>
    :
    tool)))

    const toggleBlock = (tool) => {props.updateDraft(RichUtils.toggleBlockType(props.editorState, tool))}
    const toggleInline = (tool) => {props.updateDraft(RichUtils.toggleInlineStyle(props.editorState, tool))}
    function handleClick(event, tool) {
        let nextState
        if (tool.startsWith('-')) {
            tool = tool.slice(1)
            toggleBlock(tool)
            // nextState = RichUtils.toggleBlockType(props.editorState, tool)
        } else {
            toggleInline(tool)
            // nextState = RichUtils.toggleInlineStyle(props.editorState, tool.toUpperCase());
        }
        // props.updateDraft(nextState)
    }

    return (<div className="writer">
        <div className="tool-container">
            {toolButtons}
            <button
                onClick={() => {
                    const nextState = RichUtils.toggleBlockType(props.editorState, "TextLeft")
                    props.updateDraft(nextState)
                }}
            >blok</button>
        </div>
        <div className="draftjs">
            {
            props.editorState ? 
            <Editor 
                className="editor"
                editorState={props.editorState}
                onChange={props.updateDraft}
                customStyleMap={styleMap}
                keyBindingFn={getDefaultKeyBinding}
                handleKeyCommand={() => "not-handled"}
                blockStyleFn={c => {
                    return c.getType()
                }}
            />
            :
            <div>
                <h3>Add a Note to start writing</h3>
                <button className="add-note" onClick={props.addDraft}>Add Note</button>
            </div>
            }
        </div>
    </div>)
}