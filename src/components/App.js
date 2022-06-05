import React from 'react'
import './app.scss'
import { Notes } from './notes/Notes'

export const App = () => {
  const notesTitle = 'Markdown Notes'

  return (
    <div className='app'>
      <Notes title={notesTitle} />
    </div>
  )
}
