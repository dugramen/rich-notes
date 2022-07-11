import React from "react";
import './Writer.css';

export default function Writer(props) {
    const tools = [
        ['ParagraphStyle', 'Font', 'FontSize'],
        ['Itallic', 'Bold', 'Underline', 'Strikethrough'],
        ['TextColor', 'HighlightColor'],
        ['UnorderedList', 'OrderedList'],
        ['TextLeft', 'TextCenter', 'TextRight', 'TextBlock'],
        ['Indent', 'Dedent']
    ]
    const toolButtons = tools.map(section => section.map(tool => <button key = {tool}>
        {tool}
    </button>))

    return (<div>
        <div className="tool-container">
            {toolButtons}
        </div>
        <textarea>Hello there ending words</textarea>
    </div>)
}