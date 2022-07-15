import React from "react";
import "./SplitPanel.css";


export default function SplitPanel(props) {
    const [width, setWidth] = React.useState(200)
    const isPresed = React.useRef(false)
    const refWidth = React.createRef()

    React.useEffect(() => {
        document.addEventListener('mousemove', onMouseMove)
        document.addEventListener('mouseup', onMouseUp)
        return () => {
            document.removeEventListener('mousemove', onMouseMove)
            document.removeEventListener('mouseup', onMouseUp)
        }
    }, [])
    React.useEffect(() => {
        setWidth(refWidth.current.offsetWidth)
    }, [refWidth.current])

    function onMouseMove(event) {
        if (isPresed.current) {
            event.stopPropagation()
            setWidth(oldWidth => oldWidth + event.movementX)

            if (window.getSelection) {
                if (window.getSelection().empty) {  // Chrome
                  window.getSelection().empty();
                } else if (window.getSelection().removeAllRanges) {  // Firefox
                  window.getSelection().removeAllRanges();
                }
              } else if (document.selection) {  // IE?
                document.selection.empty();
              }
        }    
    }
    function onMouseUp() {
        isPresed.current = false
    }


    return (<div style={{
        display: 'flex',
        flexDirection: 'row',
        height: "100%"
    }}>
        <div
            ref={refWidth}
            style={{
                minWidth: Math.max(width, 100),
                maxWidth: width,
            }}
            >
                {props.children[0]}
        </div>
        <div 
            className="divider"
            onMouseDown={() => isPresed.current=true}
            style={{
                minWidth: "20px",
                cursor: "w-resize",
                minHeight: "100%",
            }}
        >
            <div className="line"></div>
        </div>
        <div style={{
            flex: '1',
            minWidth: "0px"
        }}>
            {props.children[1]}
        </div>
    </div>)
}