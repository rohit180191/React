import React from 'react';
import classes from './Order.module.css';
const Order = (props) =>{ 
    let Ingredients = [];
    for(let ingredient in props.ingredients){
        Ingredients.push(
            {name: ingredient, amount: props.ingredients[ingredient]}
        );
    }
    const ingredientArray = Ingredients.map(item => `${item.name.toUpperCase()} (${item.amount})`);
    return (
    <div className={classes.Order}>
        <p>Ingredients {ingredientArray.join(' ')}</p>
        <p>Price <strong>USD {props.price.toFixed(2)}</strong></p>
    </div>
)
}
export default Order;