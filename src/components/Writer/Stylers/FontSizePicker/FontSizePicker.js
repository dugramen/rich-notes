import React from "react";
import ModalButton from "./../../../Utils/ModalButton";
import "./FontSizePicker.scss";

export default function FontSizePicker(props) {
    const [value, setValue] = React.useState(12)
    const [visible, setVisible] = React.useState(false)
    
    return (
    <ModalButton 
        button="Font Size" 
        className="font-size-picker"
        visible={visible}
        setVisible={setVisible}
        >
        <div className="font-list" style={{
            display: 'flex',
            flexDirection: 'column',
            backgroundColor: "hsla(0, 0%, 90%, 1)",
            borderRadius: '12px'
        }}>
            {[8, 10, 12, 14, 16, 18, 20, 24, 28, 32, 36, 40].map(n => (
                <button 
                    className="font-option"
                    onClick={() => {
                        props.onChange(n)
                        setVisible(false)
                    }}
                >{n} px</button>
            ))}
        </div>
    </ModalButton>
    )
}