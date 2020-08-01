import React, { Component, Suspense } from 'react';
import {Route} from 'react-router-dom'
import CheckoutSummary from './../../components/Order/CheckoutSummary/CheckoutSummary';
import {connect} from 'react-redux';
const ContactData = React.lazy(() => import('./ContactData/ContactData'));
class Checkout extends Component {

   

    componentDidMount(){
        
    }
    cancelHandler = () => {
        this.props.history.goBack();
    }
    continueHandler = () =>{
        this.props.history.replace('/checkout/contact-data');
    }

    render(){
        return (
            <div>
                {(this.props.burger.ingredients !== null) ? <CheckoutSummary ingredients={this.props.burger.ingredients}
                cancel = {this.cancelHandler}
                continue = {this.continueHandler}
                />: null}
                <Route path={this.props.match.url + '/contact-data'}
                render = {
                    (props) => (
                        <Suspense fallback ={<div>Loading...</div>}>
                            <ContactData {...props}/>
                        </Suspense>
                    )
                }
                />
            </div>
        );
    }
}
const mapStateToProps = state => {
    return {
        burger: state.burgerBuilder
    }
}
export default connect(mapStateToProps)(Checkout);