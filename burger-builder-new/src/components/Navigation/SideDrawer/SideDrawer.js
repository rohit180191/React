import React from 'react';
import Logo from './../../Logo/Logo';
import NavigationItems from './../NavigationItems/NavigationItems'
import classes from './SideDrawer.module.css';
import Backdrop from './../../UI/Backdrop/Backdrop'
import Aux from './../../../hoc/Auxillary'

const SideDrawer = (props) => {
    const customClass = (props.showBackDrop) ? classes.Open : classes.Close;
    return (
        <Aux>
            <Backdrop show={props.showBackDrop} clicked={props.close} />
            <div className={[classes.SideDrawer, customClass].join(' ')} onClick={props.close}>
                <div className={classes.Logo}><Logo/></div>
                <nav>
                    <NavigationItems isAuth={props.isAuth}/>
                </nav>
            </div>
        </Aux>
        
    );
}

export default SideDrawer;