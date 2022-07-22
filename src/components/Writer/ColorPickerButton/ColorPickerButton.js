import React from "react";
import { SketchPicker } from "react-color";

export default function ColorPickerButton(props) {
    const [visible, setVisible] = React.useState(false)
    const [color, setColor] = React.useState("#fff")

    return (
    <div>
        <button onClick={() => setVisible(true)}>{props.children}</button>
        {visible && 
        <div
            style={{
                position: "absolute",
                zIndex: 2,
            }}
        >
            <div 
                style={{
                    position: "fixed",
                    top:0,
                    bottom:0,
                    left:0,
                    right:0,
                }}
                onClick={() => setVisible(false)}
            />
            {/* <SketchPicker/> */}
            <SketchPicker
                color={color}
                onChange={col => {
                    setColor(col.hex)
                    if ("onChange" in props) props.onChange(col)
                }}
                onChangeComplete={col => {
                    setColor(col.hex)
                    if ("onChangeComplete" in props) props.onChangeComplete(col)
                }}
            />
        </div>}
    </div>
    )
}