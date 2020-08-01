import React, { Component } from 'react';
import Aux from '../../hoc/Auxillary';
import classes from './Layout.module.css'
import Toolbar from './../Navigation/Toolbar/Toolbar';
import SideDrawer from './../Navigation/SideDrawer/SideDrawer';
import {connect} from 'react-redux';

class Layout extends Component{

    state = {
        showSideDrawer: false
    };
    sideDrawerCloseHandler = () =>{
        this.setState({showSideDrawer: false})
    }

    toggleSideDrawerHandler = () => {
        this.setState((prevState)=>{
            return {showSideDrawer: !prevState.showSideDrawer}
        });
    }
   
    render() {
        return  (
            <Aux>
                <Toolbar
                isAuth={this.props.isAuthenticated} 
                sideDrawerToggleHandler={this.toggleSideDrawerHandler}/>
                <SideDrawer
                isAuth={this.props.isAuthenticated}
                showBackDrop = {this.state.showSideDrawer} close={this.sideDrawerCloseHandler}/>
                <main className={classes.content}>
                    {this.props.children}
                </main>
            </Aux>
        );
    }
} 
const mapStateToProps = state => {
    return {
        isAuthenticated: (state.auth.token !== null) ? true : false 
    };
}
export default connect(mapStateToProps, null)(Layout);

