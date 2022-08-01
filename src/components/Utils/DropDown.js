import React from "react";
import ModalButton from "./ModalButton";

export default function DropDown(props) {
    const [visible, setVisible] = React.useState(false)
    const [text, setText] = React.useState("-----")

    return (
        <select
            value={props.value}
            onChange={(e) => props.onChange && props.onChange(e.target.value)}
        >
            {props.items.map(item => (
                <option>
                    {item}
                </option>
            ))}
        </select>
    )

    return (
    <ModalButton
        button={text}
        visible={visible}
        setVisible={setVisible}
    >
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            backgroundColor: "hsla(0, 0%, 90%, 1)",
            borderRadius: '12px',
        }}>
            {props.items.map(i => (
                <button
                    onClick={() => {
                        setVisible(false)
                        setText(i)
                        props.onClick(i)
                    }}
                >{i}</button>
            ))}
        </div>
    </ModalButton>
    // <ModalButton 
    //     button="Font Size" 
    //     className="font-size-picker"
    //     visible={visible}
    //     setVisible={setVisible}
    //     >
    //     <div className="font-list" style={{
    //         display: 'flex',
    //         flexDirection: 'column',
    //         backgroundColor: "hsla(0, 0%, 90%, 1)",
    //         borderRadius: '12px'
    //     }}>
    //         {[8, 10, 12, 14, 16, 18, 20, 24, 28, 32, 36, 40].map(n => (
    //             <button 
    //                 className="font-option"
    //                 onClick={() => {
    //                     props.onChange(n)
    //                     setVisible(false)
    //                 }}
    //             >{n} px</button>
    //         ))}
    //     </div>
    // </ModalButton>
    )
}