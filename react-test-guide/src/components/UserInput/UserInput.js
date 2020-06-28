import React from 'react';
import './UserInput.css'
const userInput = (props) => {
    const style = {
        backgroundColor: 'white',
        border: '1px solid black',
        boxShadow: '0px 2px 3px #ccc',
      };
    return (
        <div className='UserInput'>
            <input style={style} type='text' value={props.username} onChange={props.change}/>
        </div>
    )
}

export default userInput;