import React from "react";
import { SketchPicker } from "react-color";
import ModalButton from "../../Utils/ModalButton";

export default function ColorPickerButton(props) {
    const [visible, setVisible] = React.useState(false)
    const [color, setColor] = React.useState("#fff")

    return (<ModalButton 
        visible={visible}
        setVisible={setVisible}
        button={props.children}
        >
        <SketchPicker
            onMouseDown={e => e.preventDefault()}
            color={color}
            onChange={col => {
                setColor(col.rgb)
                if ("onChange" in props) props.onChange(col)
            }}
            onChangeComplete={col => {
                setColor(col.rgb)
                if ("onChangeComplete" in props) props.onChangeComplete(col)
            }}
        />
        <li>hel</li>
    </ModalButton>)
}