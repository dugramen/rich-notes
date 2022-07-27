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
        {/* <div
            className="font-size-picker"
            style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: "center",
                justifyContent: 'flex-start',
                gap: "8px",
            }}
        >
            <p>Font Size</p>
            <input
                type={'number'}
                value={value}
                min={0}
                onChange={(event) => {
                    setValue(event.target.value)
                    props.onChange && props.onChange(event.target.value)
                }}
                style={{
                    borderRadius: "8px",
                    borderWidth: "0px",
                    flex: "0",
                    flexGrow: 0,
                    backgroundClip: "hsla(0, 0%, 0%, .95)",
                    maxWidth: "50px"
                }}
            />
        </div> */}
    </ModalButton>
    )
}