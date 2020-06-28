import React, { useEffect, useRef } from 'react';
const Cockpit = (props) => {
    const toggleBtnRef = useRef(null);
    useEffect(() => {
        console.log('[Cockpit.js] useEffect');
        toggleBtnRef.current.click();
        const timer = setTimeout(() => {
            alert('data saved to cloud');
        }, 1000);
        return () => {
            clearTimeout(timer);
        }
    }, []);

    useEffect(() => {
        console.log('[Cockpit.js] useEffect 2');
        return () => {
            console.log('[Cockpit.js] useEffect 2 clean up called');
        }
    });
    const style = {
        backgroundColor: 'white',
        border: '1px solid black',
        boxShadow: '0px 2px 3px #ccc',
        padding: '1rem',
        cursor: 'pointer'
      };
  
    return (
        <div>
            <div className='App-header'>
            <h1>Does this work now?</h1>
            </div>
            <button ref={toggleBtnRef} style={style} onClick={props.clicked.bind(props)}>Toggle Person Container</button>
        </div>
        
    );
}

export default React.memo(Cockpit);