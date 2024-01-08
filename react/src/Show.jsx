import React from "react"
const Show = ({notes, handleDelete, handleToggle}) => {
return (
    <>
    <ul style = {{listStyleType: "none"}}>
    {notes.map((note) => {return(
                                    <React.Fragment key = {note.id}>
                                    <li >{note.id} {note.name} {note.number}</li>
                                    <button onClick = {() => handleDelete(note.id)}>delete</button>
                                    <button onClick = {() => handleToggle(note.id)}>{note.important === true? "Set not importance": "Set important"}</button>
                                    </ React.Fragment>
                                )})}
   </ul>
   </>
)
}

export default Show