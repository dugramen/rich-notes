import React from 'react';
import NoteItem from "./NoteItem";
import "./Note.scss";
import sorters from './sorters';
import DropDown from '../Utils/DropDown';

import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';

export default function NoteList(props) {
    const {drafts, addDraft, removeDraft, currentDraft, setCurrentDraft, moveDraft} = props;
    const draftElements = drafts.map((draft, index) => (
    <Draggable
        draggableId={String(draft.id)}
        index={index}
        key={draft.id}
    >
        {(provided) => (
            <div
                {...provided.draggableProps}
                {...provided.dragHandleProps}
                ref={provided.innerRef}
            >
                <NoteItem
                    title = {draft.editor.getCurrentContent().getPlainText('\u0001').split("")[0]}
                    isSelected = {currentDraft === draft.id}
                    selectNote = {() => setCurrentDraft(draft.id)}
                    deleteNote = {() => removeDraft(draft.id)}
                />
            </div>
        )}
    </Draggable>))

    return (
    <DragDropContext
        onDragEnd={result => {
            const {destination, source, draggableId} = result;
            if (destination === null) return;
            if (source.droppableId === destination.droppableId &&
                source.index === destination.index) return;
            
            moveDraft(source.index, destination.index)
        }}
    > 
        <div className='note-panel'>

            <button className='add-note' onClick={() => addDraft()}>Add Note</button>
            <div className='note-list-container'>
                <Droppable droppableId='droppable'>
                    {provided => (
                        <div 
                            className='note-list'
                            ref={provided.innerRef}
                            {...provided.droppableProps}
                        >
                            {draftElements}
                            {provided.placeholder}
                        </div>
                    )}
                </Droppable>     
            </div>      
            <div className='sorting-button'>     
                <DropDown
                    items={Object.keys(sorters)}
                    onChange={(item) => {
                        props.setDrafts(oldDrafts => {
                        return [...oldDrafts].sort(sorters[item])
                        })
                        setCurrentDraft(old => old)
                    }}
                />
            </div>
        </div>
    </DragDropContext>
    )
}