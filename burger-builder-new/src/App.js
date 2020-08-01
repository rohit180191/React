import React, { Component, Suspense } from 'react';
import {Route, Redirect, Switch} from 'react-router-dom';
import Layout from './components/Layout/Layout';
import WithErrorHandler from './hoc/WithErrorHandler';
import axios from './axios-orders';
import {connect} from 'react-redux';
import * as actionCreators from './store/actions';
const BurgerBuilder = React.lazy(() => import('./containers/BurgerBuilder/BurgerBuilder'));
const Checkout = React.lazy(() => import('./containers/Checkout/Checkout'));
const Orders = React.lazy(() => import('./containers/Orders/Orders'));
const Auth = React.lazy(() => import('./containers/Auth/Auth'));
const Logout = React.lazy(() => import('./containers/Auth/Logout/Logout'));
class App extends Component {
  componentDidMount() {
    console.log('App Mounted');
    this.props.tryAutoSignIn();
  }
 render() {
   let routes = (
     <Switch>
       <Route path='/burger-builder' render={
              (props) => (
                <Suspense fallback={<div>Loading...</div>}>
                  <BurgerBuilder {...props}/>
                </Suspense>
              )
            }/>
      <Route path = '/auth' render = {
              (props) => (
                <Suspense fallback={<div>Loading...</div>}>
                  <Auth {...props}/>
                </Suspense>
              )
            }/>  
      <Redirect exact from='/' to='/burger-builder'/>  
      <Redirect to='/'/>                 
     </Switch>
   );
   if(this.props.isAuthenticated) {
    routes = (
      <Switch>
        <Route path='/burger-builder' render={
               (props) => (
                 <Suspense fallback={<div>Loading...</div>}>
                   <BurgerBuilder {...props}/>
                 </Suspense>
               )
             }/>
          <Route path= '/checkout' render={
              (props) => (
                <Suspense fallback={<div>Loading...</div>}>
                  <Checkout {...props}/>
                </Suspense>
              )
            }/>
            <Route path= '/orders' render={
              (props) => (
                <Suspense fallback={<div>Loading...</div>}>
                  <Orders {...props}/>
                </Suspense>
              )
            }/>
            
            <Route path='/logout' render={
              (props) => (
                <Suspense fallback={<div>Loading...</div>}>
                  <Logout {...props}/>
                </Suspense>
              )
            }/>    
             <Route path = '/auth' render = {
              (props) => (
                <Suspense fallback={<div>Loading...</div>}>
                  <Auth {...props}/>
                </Suspense>
              )
            }/>   
       <Redirect exact from='/' to='/burger-builder'/>
       <Redirect to='/'/>                 
      </Switch>
    )
   }
  return (
    <div>
      <Layout>
        {routes}
      </Layout>
    </div>
  );
 } 
}
const mapDispatchToProps = dispatch =>{
  return {
    tryAutoSignIn: () => dispatch(actionCreators.authCheckState())
  }
}
const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.token !== null
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(WithErrorHandler(App, axios));
