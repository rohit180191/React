import React, { Component } from 'react';
import Order from './../../components/Order/Order';
// import axios from './../../axios-orders';
import {connect} from 'react-redux'
import Spinner from './../../components/UI/Spinner/Spinner';
import * as actionCreators from './../../store/actions';


class Orders extends Component{

    componentDidMount() {
       this.props.onLoad(this.props.token);
    }
    render() {
            let order = this.props.orders.orders.map((order)=> (
                <Order key={order.id} ingredients={order.ingredients} price={+order.price}/>
            ));
            if(this.props.orders.loading) {
                order = <Spinner/>;
            }
        return (
            <div>
               {order}
            </div>
            
        );
    }
}

const mapStateToProps = state => {
    return {
        orders: state.orders,
        token: state.auth.token
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onLoad: (token) => dispatch(actionCreators.loadOrders(token))
    }
    
}


export default connect(mapStateToProps, mapDispatchToProps)(Orders);