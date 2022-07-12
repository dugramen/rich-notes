import React from "react";
import "./ResizablePanel.css";

export default function ResizablePanel({children}) {
    const [widths, setWidths] = React.useState(children.map(c => 100))
    const isPressed = React.useRef(false)
    const separatorIndex = React.useRef(0)
    const refWidths = React.useRef(children.map(c => React.createRef()))

    React.useEffect(() => {
        document.addEventListener('mousemove', onMouseMove)
        document.addEventListener('mouseup', onMouseUp)
        return () => {
            document.removeEventListener('mousemove', onMouseMove)
            document.removeEventListener('mouseup', onMouseUp)
        }
    }, [])

    function onMouseMove(event) {
        resize(event, separatorIndex.current)
    }
    function onMouseUp(event) {
        isPressed.current=false
    }


    React.useEffect(() => {
        setWidths(refWidths.current.map(r => r.current.offsetWidth))
    }, [refWidths.current])

    let childrenWithBreaks = []
    for (let i = 0; i < children.length ; i++) {
        childrenWithBreaks.push(<div
            ref={refWidths.current[i]}
            style={{minWidth: `${widths[i]}px`}}
            >
                {children[i]}
        </div>)
        if (true || i < children.length - 1) {
            childrenWithBreaks.push(<div
                className="divider" 
                onMouseDown={(event) => {
                    event.stopPropagation()
                    console.log('pressed')
                    separatorIndex.current = i
                    isPressed.current = true
                }}
            ></div>)
        }
    }
    
    function resize(event, i) {
        if (isPressed.current) {
            event.stopPropagation()
            setWidths(oldWidths => oldWidths.map((w, _i) => _i === i? w + event.movementX: w))
        }
    }

    return (<div className="resizable-panel">{childrenWithBreaks}</div>)
}