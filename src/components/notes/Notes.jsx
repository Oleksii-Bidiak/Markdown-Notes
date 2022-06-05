import React, { useState, useEffect } from 'react'
import { Note } from './Note';
import { v4 } from 'uuid'

export const Notes = ({ title }) => {

   const initialState = JSON.parse(window.localStorage.getItem('notes')) || [
      {
         id: v4(),
         createdOn: new Date(),
         edit: true
      }
   ]
   const [notes, setNotes] = useState(initialState)

   useEffect(() => {
      window.localStorage.setItem('notes', JSON.stringify(notes))
   }, [notes])

   const addNote = () => {
      const tempNotes = [...notes]
      const result = { id: v4(), createdOn: new Date(), edit: true }
      tempNotes.push(result)
      setNotes(tempNotes)
   }

   const onDelete = index => {
      const tempNotes = [...notes]
      tempNotes.splice(index, 1)
      setNotes(tempNotes)
   }

   return (
      <div className='notes'>
         <div className="notes__container">
            <div className="notes__body">
               <h1 className='notes__title title'>{title}</h1>
               <button onClick={() => addNote()} className="notes__add-btn btn">Add New Note</button>
               <div className="notes__list">
                  {
                     notes.map((note, index) => (
                        <Note
                           key={note.id}
                           note={note}
                           index={index}
                           onDelete={(() => onDelete(index))}
                        />
                     ))
                  }
               </div>
            </div>
         </div>
      </div>
   )
}
