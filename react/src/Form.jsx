import { useState } from "react"

const Form = (props) => {
    const [newName, setNewName] = useState('')

    const [newNumber, setNewNumber] = useState('')

    const handleChangeName = (event) => {
        setNewName(event.target.value)
      }
    
    const handleChangeNumber = (event) => {
        setNewNumber(event.target.value)
    }
return(
<fieldset>
    {/* // prevent direct call during rendering and catch the value only when event is trigger. */}
        <form onSubmit = {(event) => {props.addNote(event,newName,newNumber,setNewName,setNewNumber); }}>
            <div>
              <label htmlFor='name'>Name:</label>
              <input id = "name" name = "name"type = "text" value = {newName} onChange={handleChangeName}/>
              <br/>
              <label htmlFor="number">Number:</label>
              <input id = "number" name = "number" type = "text" value = {newNumber} onChange={handleChangeNumber}/>
            </div>
            <br/>
            <div>
              <button disabled = {!newName || !newNumber} type="submit">Add</button>
            </div>
        </form>
</fieldset>
)}

export default Form