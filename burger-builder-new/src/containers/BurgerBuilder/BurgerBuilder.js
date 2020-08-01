import React, { Component } from "react";
import Aux from './../../hoc/Auxillary';
import Burger from './../../components/Burger/Burger';
import BuildControls from './../../components/Burger/BuildControls/BuildControls';
import Modal from './../../components/UI/Modal/Modal';
import OrderSummary from './../../components/Burger/OrderSummary/OrderSummary';
// import axios from './../../axios-orders';
import Spinner from './../../components/UI/Spinner/Spinner';
import {connect} from 'react-redux';
import * as actionCreators from './../../store/actions'

export class BurgerBuilder extends Component{

    componentDidMount(){
        this.props.loadIngredients();
    }
    state ={
        purchasing: false,
        loading: false
    }
  
    purchaseHandler = () => {
        if(this.props.isAuthenticated){
            this.setState({purchasing: true});
        }else {
            this.props.setAuthRedirect('/checkout');
            this.props.history.push('/auth');
        }
        
    }

    purchaseCancelHandler = () => {
        this.setState({purchasing: false})
    }

    purchaseContinueHandler = () => {
    this.props.history.push({
        pathname: '/checkout'
    });
    }
    render(){
        
        const disabledInfo = {
            ...this.props.burgerBuilderState.ingredients
        };

        for(let key in disabledInfo){
            disabledInfo[key] = disabledInfo[key] <= 0;
        }

        let burger = <Spinner/>;

        let orderSummary =  null;

        if(this.state.loading){
            orderSummary = <Spinner/>;
        }
        if  (this.props.burgerBuilderState.ingredients){
            burger = (<Aux>
                <Burger ingredients = {this.props.burgerBuilderState.ingredients}/>,
                <BuildControls  more = {this.props.onAddIngredients} less= {this.props.onRemoveIngredients} disabledInfo = {disabledInfo} isAuth={this.props.isAuthenticated} orderNow={this.purchaseHandler}> <h3>Current Price: {this.props.burgerBuilderState.totalPrice.toFixed(2)}</h3>
                </BuildControls>
            </Aux>);

            orderSummary =  <OrderSummary ingredients = {this.props.burgerBuilderState.ingredients} cancel = {this.purchaseCancelHandler} price={this.props.burgerBuilderState.totalPrice.toFixed(2)} continue = {this.purchaseContinueHandler}/>;
        }  
        return(
            <Aux>
                <Modal show={this.state.purchasing} modalClose={this.purchaseCancelHandler}>
                   {orderSummary}
                </Modal>
                {burger}
            </Aux>
        );
    }
}

const mapStateToProps = state => {
    return {
        burgerBuilderState: state.burgerBuilder,
        isAuthenticated: state.auth.token !== null
    };
}

const mapDispatchToProps = dispatch => {
    return  {
        onAddIngredients: (ingredientType) => dispatch(actionCreators.addIngredient(ingredientType)),
        onRemoveIngredients: (ingredientType) => dispatch(actionCreators.removeIngredient(ingredientType)),
        loadIngredients: () => dispatch(actionCreators.loadIngredients()),
        setAuthRedirect: (path) => dispatch(actionCreators.setAuthRedirectPath(path))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(BurgerBuilder); 