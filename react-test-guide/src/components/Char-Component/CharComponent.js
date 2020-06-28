import React from 'react';

const charComponent = (props) => {

    const style = {
        display:'inline-block',
        padding: '16px',
        margin: '16px',
        textAlign: 'center',
        border: '1px solid black'
      };
    return (
    <div style={style} onClick={props.click}>{props.char}</div>
    );
}

export default charComponent;