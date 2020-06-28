import React, { Component } from 'react';
import {connect} from 'react-redux';
import CounterControl from '../../components/CounterControl/CounterControl';
import CounterOutput from '../../components/CounterOutput/CounterOutput';
import {increment, decrement, add, substract} from './../../store/actions';

class Counter extends Component {

    render () {
        return (
            <div>
                <CounterOutput value={this.props.ctr} />
                <CounterControl label="Increment" clicked={this.props.onIncrementCounter} />
                <CounterControl label="Decrement" clicked={this.props.onDecrementCounter}  />
                <CounterControl label="Add 5" clicked={this.props.onAddCounter.bind(this, 5)}  />
                <CounterControl label="Subtract 5" clicked={this.props.onSubtractCounter.bind(this, 5)}  />
            </div>
        );
    }
}
const mapStateToProps = state => {
    return {
        ctr: state.counterState.counter
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onIncrementCounter: () => dispatch(increment()),
        onDecrementCounter: () => dispatch(decrement()),
        onAddCounter: (value) => dispatch(add(value)),
        onSubtractCounter: (value) => dispatch(substract(value)),
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Counter);