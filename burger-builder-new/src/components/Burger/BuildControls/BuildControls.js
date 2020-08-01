import React from 'react';
import classes from './BuildControls.module.css'
import BuildControl from './BuildControl/BuildControl'
const BuildControls = (props) => {
    const controlsKeyLabel = [
        {type: 'salad', label:'Salad'},
        {type: 'meat', label:'Meat'},
        {type: 'cheese', label:'Cheese'},
        {type: 'bacon', label:'Bacon'},
    ];
    const controls = controlsKeyLabel.map((item) => {
        return <BuildControl
         key={item.type} 
         label = {item.label}
         add = {() => props.more(item.type)}
         remove = {() => props.less(item.type)}
         disabled = {props.disabledInfo[item.type]}
         />
    })

    let orderNowDisabled = true;
    for(let key in props.disabledInfo){
        if(!props.disabledInfo[key]) {
            orderNowDisabled = false;
            break;
        }
    }
    return (
        <div className={classes.BuildControls}>
            {props.children}
            {controls}
            <button onClick={() => props.orderNow()} className={classes.OrderButton} disabled={orderNowDisabled}>{(props.isAuth) ? 'ORDER NOW' : 'SIGN UP TO ORDER NOW'}</button>
        </div>
    )
}

export default BuildControls;