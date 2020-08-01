import React from 'react';
import classes from './Input.module.css';
const Input = (props) => {
    let inputElement = null;
    let validationError = null;
    const inputElementClass = [classes.InputElement];
    if(props.invalid && props.shouldValidate && props.touched){
        inputElementClass.push(classes.Invalid);
        validationError = <p style={{margin: '0', color: 'red', textAlign: 'left'}}>Please enter valid value!</p>;
    }
    switch(props.elementType){
        case ('input'):
            inputElement = <input {...props.elementConfig} className={inputElementClass.join(' ')} value={props.value} onChange={props.changed}/>;
            break;
        case ('textarea'):
            inputElement = <textarea {...props.elementConfig}  className={inputElementClass.join(' ')}value={props.value}  onChange={props.changed}/>;
            break;
        case ('select'):
            inputElement = (<select className={inputElementClass.join(' ')} value={props.value} onChange={props.changed}>
                {props.elementConfig.options.map(option =>
                (<option key={option.value} value={option.value}>{option.displayValue}</option>))}
            </select>);
            break;
        default:
    }
return (
    <div className={classes.Input}>
        <label className ={classes.Label}>{props.label}</label>
        {inputElement}
        {validationError}
    </div>
);
}

export default Input;