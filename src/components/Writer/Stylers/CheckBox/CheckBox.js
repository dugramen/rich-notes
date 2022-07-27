import React from 'react';
import "./CheckBox.scss";
import { EditorBlock } from 'draft-js';

export default function CheckBox(props) {
    // console.log(props.blockProps)
    return (<div className='checkbox'>
        <input type="checkbox" checked={props.checked}></input>
        <EditorBlock {...props}/>
    </div>)
}
