import React, {Component} from 'react';
import classes from './Person.module.css';
import {PropTypes} from 'prop-types';

class Person extends Component{
    constructor(props){
        super(props);
        this.inputElementRef = React.createRef();
    }
    componentDidMount() {
        this.inputElementRef.current.focus();
    }
    render() {
        console.log('Person rendering...');
        return (
        <div className={classes.Person}>
            <p onClick= {this.props.click}>I am {this.props.name} and My age is {this.props.age}</p>
            {this.props.children}
            <input type = 'text' onChange={this.props.changed} 
            ref={this.inputElementRef}
            value={this.props.name}/>
        </div>
        );
    }
   
}

Person.propTypes = {
    name: PropTypes.string,
    click: PropTypes.func,
    age: PropTypes.number,
    changed: PropTypes.func
};

export default Person;