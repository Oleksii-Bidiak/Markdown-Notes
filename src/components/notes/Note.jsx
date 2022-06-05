import React, { useReducer, useState, useEffect } from 'react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

import { FaTrash } from 'react-icons/fa'
import { FaPen } from 'react-icons/fa'
import { FaCheck } from 'react-icons/fa'

export const Note = ({ note, index, onDelete }) => {
   const [edit, toggle] = useReducer(edit => !edit, false);
   const initialState =
      window.localStorage.getItem(`note-${index}`) ||
      '# Marked in React.js\n\nRendered by **react-markdown**.'
   const [value, setValue] = useState(initialState);

   useEffect(() => {
      window.localStorage.setItem(`note-${index}`, value)

      return () => {
         window.localStorage.removeItem(`note-${index}`)
      }
   }, [value, index])


   const createdOn = new Date(note.createdOn)
   let date = createdOn.getDate()
   let month = createdOn.getMonth() + 1
   const year = createdOn.getFullYear()

   let hours = createdOn.getHours()
   const minutes = createdOn.getMinutes()
   let seconds = createdOn.getSeconds()

   if (date < 10) {
      date = `0${date}`
   }
   if (month < 10) {
      month = `0${month}`
   }
   if (seconds < 10) {
      seconds = `0${seconds}`
   }

   hours = hours > 12 ? hours - 12 : hours < 10 ? '0' + hours : hours

   const formattedDate = `${date}-${month}-${year} ${hours}:${minutes}:${seconds} ${createdOn.getHours() > 12 ? 'PM' : 'AM'}`
   
   return (
      <div className="notes__item item-notes">
         <div className="item-notes__body">
            <header className="item-notes__header">
               <div className="item-notes__date-time date-time-note">
                  <span>{formattedDate}</span>
               </div>
               <div className="item-notes__icons icons-button">
                  {
                     edit
                        ? <button className='icons-button__check' onClick={() => toggle()}><FaCheck /></button>
                        : <button className='icons-button__edit' onClick={() => toggle()}><FaPen /></button>
                  }
                  <button className='icons-button__del' onClick={() => onDelete()}><FaTrash /></button>
               </div>
            </header>
            <div className="item-notes__note">
               {
                  edit
                     ? (<textarea
                        defaultValue={value}
                        onChange={e => setValue(e.target.value)}
                     />)
                     : (<div className='note-body'>{<ReactMarkdown children={value} remarkPlugins={[remarkGfm]} />}</div>)
               }
            </div>
         </div>
      </div>
   )
}
