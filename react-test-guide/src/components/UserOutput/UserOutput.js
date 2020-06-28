import React from 'react';
import './UserOutput.css'

const userInput = (props) => {
 return (
    <div className='UserOutput'>
        {props.username}
    </div>
 );
}

export default userInput;