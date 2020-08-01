import React from 'react';
import Aux from './../../../hoc/Auxillary'
import Button from './../../UI/Button/Button';

const OrderSummary = (props) => {
   
    const ingredientsSummary = Object.keys(props.ingredients).map(
        (igkey,i)=>{
        return <li key={igkey + i}><span style={{textTransform: 'capitalize'}}>{igkey}:</span> {props.ingredients[igkey]}</li>
        }
    );
    return (
        <Aux>
            <h3>Your Order</h3>
            <p>A delicious burger with following ingredients:</p>
            <ul>
            {ingredientsSummary}
            </ul>
            <h4>Total Price: {props.price}</h4>
            <p>Continue to Checkout?</p>
            <Button btnType={'Danger'} clicked= {() => props.cancel()}>CANCEL</Button>
            <Button btnType={'Success'} clicked= {() => props.continue()}>CONTINUE</Button>
        </Aux>
    );
};

export default OrderSummary;