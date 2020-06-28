import React, { Component } from 'react';
import './App.css';
import Persons from '../components/Persons/Persons'
import UserOutput from '../components/UserOutput/UserOutput';
import UserInput from '../components/UserInput/UserInput';
import Validation from '../components/Validation-Component/Validation';
import CharComponent from '../components/Char-Component/CharComponent';
import CockPit from '../components/cockpit/cockpit'

class App extends Component {
  constructor(props){
    super(props);
    console.log('[App.js constructor called!]');
  }
  state = {
    persons:[
      {id: '1213', name: 'Rohit', age: 29},
      {id: '1313', name: 'Ankit', age: 22},
    ],
    username: 'Rohit Yadav',
    showPerson: false,
    showCockpit: true
  }

  static getDerivedStateFromProps(props, state){
    console.log('[App.js getDerivedStateFromProps]', props)
    return state;
  }

  componentDidMount(){
    console.log('[App.js componentDidMount called!]');
  }

  componentWillUnmount() {
    
  }

  deletePersonHandler = (personIndex) => {
    const personState = [...this.state.persons];
    personState.splice(personIndex, 1);
    this.setState({persons: personState});
  }

  userInputChangeHandler = (event) => {
    this.setState({
    username: event.target.value
  });
  }

  nameChangeHandler = (id, event) => {
    const personState = this.state.persons.map(person => {
      const obj = {...person};
      obj.name = (obj.id === id) ? event.target.value : obj.name;
      return obj;
    });

    this.setState({persons: personState});
  }

  togglePersonHandler = () => {
    const showPerson = this.state.showPerson;
    this.setState({showPerson: !showPerson})
  }

  charComponentClickHandler = (index) => {
    const userName = this.state.username.split('');
    userName.splice(index,1);
    this.setState({username: userName.join('')});

  }

  render() {
    console.log('[App.js render called]');
    let persons = null;

    if(this.state.showPerson) {
      persons = (
        <div>
          <div className='person-container'>
           <Persons persons={this.state.persons} 
           clicked={this.deletePersonHandler}
           changed = {this.nameChangeHandler}
           />
          </div>
        </div>
      );
    }
    return (
      <div className="App">
        <button onClick={() => { this.setState({showCockpit: false})}}>Show Cockpit</button>
        {this.state.showCockpit ? <CockPit clicked={this.togglePersonHandler}/>: null}
        { persons }
        
        <UserInput  username={this.state.username} change={this.userInputChangeHandler.bind(this)}></UserInput>
        <UserOutput username={this.state.username.length}></UserOutput>
        <Validation textLength ={this.state.username.length}/>
        {
          this.state.username.split('').map((char, index) => {
            return <CharComponent key={index} click={this.charComponentClickHandler.bind(this,index)} char={char}/>
          })
        }
        
      </div>
    );
  }
 
  // return React.createElement('div', {className: 'App'}, React.createElement('h1', null, 'Does this work now?'));
}

export default App;
