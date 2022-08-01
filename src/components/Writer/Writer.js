import React, { Component } from "react";
import './Writer.css';
import { Editor, EditorState, RichUtils, getDefaultKeyBinding, convertFromHTML, Draft, DefaultDraftBlockRenderMap } from "draft-js";
import { SketchPicker } from "react-color";
import ColorPickerButton from "./Stylers/ColorPickerButton";
import FontSizePicker from "./Stylers/FontSizePicker/FontSizePicker";
import CheckBox from "./Stylers/CheckBox/CheckBox";
import Immutable from 'immutable';

export default function Writer(props) {
    const blockRenderMap = Immutable.Map({
        'unchecked': {
            element: 'li',
            // wrapper: <CheckBox checked={false}/>,
        },
        'checked': {
            element: 'ul',
            // wrapper: <CheckBox checked={true}/>,
        },
    })  


    function addColorStyle(property, col) {
        const rgba = `rgba(${col.r}, ${col.g}, ${col.b}, ${col.a})`
        toggleInline(property + ":" + rgba)
    }
    const tools = [
        ['-checked', '-unchecked'],
        [
            <FontSizePicker onChange={(val) => toggleInline(`fontSize:${val}px`)}/>,
            // '-ParagraphStyle', 
            'Font', 
        ],
        ['ITALIC', 'BOLD', 'UNDERLINE', 'STRIKETHROUGH'],
        [
            <ColorPickerButton 
                onChangeComplete={color => addColorStyle('color', color.rgb)}
            >
                TextColor
            </ColorPickerButton>,
            <ColorPickerButton 
                onChangeComplete={color => addColorStyle('backgroundColor', color.rgb)}
            >
                HighlightColor
            </ColorPickerButton>
        ],
        [
            <button onClick={() => toggleBlock('unordered-list-item')}>List</button>, 
            '-ordered-list-item',
            '-check-box',
        ],
        ['-TextLeft', '-TextCenter', '-TextRight', '-TextBlock'],
        ['-Indent', '-Dedent']
    ];

    const toolButtons = tools.map(section => section.map(Tool => {
        if (typeof Tool === "string") {
            return <button 
                key = {Tool} 
                id = {Tool.toLowerCase()}
                onMouseDown={e => e.preventDefault()}
                onClick={(event) => handleClick(event, Tool)}
                >
                {Tool}
            </button>
        } else {
            return <div 
                // onMouseDown={e => e.preventDefault()}
                >
                {Tool}
            </div>
        }
    }))

    const toggleBlock = (tool) => {props.updateDraft(RichUtils.toggleBlockType(props.editorState, tool))}
    const toggleInline = (tool) => {props.updateDraft(RichUtils.toggleInlineStyle(props.editorState, tool))}
    function handleClick(event, tool) {
        if (tool.startsWith('-')) {
            tool = tool.slice(1)
            toggleBlock(tool)
        } else {
            toggleInline(tool)
        }
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
                textAlignment={'left'}
                // blockRenderMap={blockRenderMap}
                blockRendererFn={c => {
                    if (c.getType() === "checked") {
                        return {
                            component: CheckBox,
                            props: {
                                children: c,
                                editorState: props.editorState,
                                onClick: () => {},
                            },
                          };
                    }
                    // return c.getType()
                }}
                blockStyleFn={block => block.getType()}
                customStyleFn={style => {
                    const styleNames = style.toJS()
                    return styleNames.reduce((styles, styleName) => {
                        if (styleName.includes(':')) {
                            const splits = styleName.split(':')
                            return {...styles,
                                [splits[0]]: splits[1]
                            }
                        } else {
                            return styles
                        }
                    }, {})
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