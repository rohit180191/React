import React from 'react';

const validation = (props) => {
    let text = '';
    if(props.textLength <= 5) {
        text = 'Text too Short';
    } else if (props.textLength >= 10) {
        text = 'Text long enough';
    } else {
        text = 'Text normal length';
    }
return (
    <p>{text}</p>
)
}

export default validation;