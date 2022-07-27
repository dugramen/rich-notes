import React from "react";

export default function ModalButton(props) {
    const {visible, setVisible} = props

    return (
    <div>
        <button onMouseDown={e => e.preventDefault()} onClick={() => setVisible(true)}>{props.button}</button>
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
                    zIndex:-1,
                }}
                onClick={() => setVisible(false)}
            />
            {props.children}
        </div>}
    </div>)
}