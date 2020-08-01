import React from 'react';
import BurgerLogo from '../../assets/images/logo.png'
import classes from './Logo.module.css';

const Logo = (props) => (
<div className={classes.Logo}>
    <img src={BurgerLogo} alt='logo'/>
</div>
);

export default Logo;