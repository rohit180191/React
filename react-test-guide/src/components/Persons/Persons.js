import React, { Component } from 'react';
import Person from './Person/Person';

class Persons extends Component {
  shouldComponentUpdate(nextProps, nextState){
    return (nextProps.persons !== this.props.persons);
  }
  render() {
  console.log('Perosns rendering..');
  return this.props.persons.map(
              (item, index) =>  <Person click = {this.props.clicked.bind(this.props, index)} name={item.name} age={item.age} key={item.id} changed= {this.props.changed.bind(this.props, item.id)}></Person>
            )
    }
  }
  

export default Persons;