import React from 'react'
import { useState, useEffect } from 'react'
import Form from './Form'
import NoteService from './NoteService'
import Show from './Show'
const Notification = ({message}) => {
  if (message == null){
    return 
  }
  return (
    <div className='error'>
      {message}
    </div>
  )
}

function App() {
  const [notes, setNotes] = useState([])
  const [effect, setEffect] = useState(0)
  const [showAll, setShowAll] = useState(true)
  const [notificationMessage, setNotificationMessage] = useState(null)

  useEffect(() => {
    NoteService
      .getAll()
      .then(response => {
        setNotes(response)
      })
  },[effect])

  useEffect(() => {
    let isCancelled = false
    setTimeout(()=>{
      if (!isCancelled)
      setNotificationMessage(null)
    },3000)

    return(()=>{
      isCancelled = true
    })

  },[notificationMessage])

  const addNote = (event,name,number,callBackSetNewName, callBackSetNewNumber) => {
   event.preventDefault()
   const note = {
    id: notes[notes.length-1].id +1,
    name,
    number,
    important: Math.random() > 0.5
   }
   
   let found = notes.find(note => note.name.toUpperCase() === name.toUpperCase())

   if (found === undefined)
   {
        NoteService
        .create(note)
        .then(response => {
            setNotes(notes.concat(response))
            setNotificationMessage(`New number of name: ${note.name} has been added in Phonebook.`)
            callBackSetNewName('')
            callBackSetNewNumber('')
            })
        .catch(error => {
            setNotificationMessage(error.name)
        })
   }
   else
   {
        const replaceNote = {...found, number}

        NoteService
        .update(found.id, replaceNote)
        .then(response => {
            setNotes(notes.map(note => note.id !== found.id ? note: response))
            setNotificationMessage(`Number of ${replaceNote.name}has been replaced `)
            callBackSetNewName('')
            callBackSetNewNumber('')
        })


   }
  }

  const handleDelete = (id) => {
    const conform = window.confirm("Are you sure! You want to delete all the value of Id:"+ id+ "?")
    if (conform === true)
    {NoteService
       .erase(id)
       .then(response =>
        {
        setNotificationMessage(`Deleted id:${id}`)
        if (effect < 64)
        {setEffect(effect+1)}
        else
        (setEffect(0))
        })
    }
    else
    {
        setNotificationMessage(`Not deleted id:${id}`)
    }
  }

  const handleToggle = (id) => {
    const noteT = notes.find(note => note.id === id)
    const changeNoteT = {...noteT, important: !noteT.important}

    NoteService
        .update(id,changeNoteT)
        .then(response => {
            setNotes(notes.map(note => note.id !== id ? note: response))
            setNotificationMessage(
              `Important key of ${changeNoteT.name} set to ${changeNoteT.important} in server.`
            )
        })
  }

  return (
    <>
    <Notification message = {notificationMessage}/>
    <h3>Add new number</h3>
    <Form addNote = {addNote}/>
    <h3>Phonebook {showAll? "ALL": "IMPORTANT"}</h3>
    <button onClick={() => setShowAll(!showAll)}>{showAll? "Show Important": "Show All"}</button>
    <Show notes= {showAll? notes: notes.filter(note => note.important === true)} handleDelete = {handleDelete} handleToggle = {handleToggle} />
    </>
  )
}

export default App
