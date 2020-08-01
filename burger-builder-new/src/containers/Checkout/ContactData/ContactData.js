import React, { Component } from 'react';
import Button from './../../../components/UI/Button/Button';
import classes from './ContactData.module.css';
import axios from './../../../axios-orders';
import Spinner from './../../../components/UI/Spinner/Spinner';
import Input from './../../../components/UI/Input/Input'
import {connect} from 'react-redux';
class ContactData extends Component{

    state ={
        orderForm :{
            name:{
                elementType:'input',
                elementConfig:{
                    type:'text',
                    placeholder:'Your Name'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            street:{
                elementType:'input',
                elementConfig:{
                    type:'text',
                    placeholder:'Street'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            country:{
                elementType:'input',
                elementConfig:{
                    type:'text',
                    placeholder:'Country'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            zipCode:{
                elementType:'input',
                elementConfig:{
                    type:'text',
                    placeholder:'Zip Code'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            email:{
                elementType:'input',
                elementConfig:{
                    type:'email',
                    placeholder:'Mail'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            deliveryMethod:{
                elementType:'select',
                elementConfig:{
                    options:[
                        {value: 'fastest', displayValue: 'Fastest'},
                        {value: 'cheapest', displayValue: 'Cheapest'}
                    ]
                },
                validation: {},
                value: 'fastest',
                valid: true
            }
        },
        loading: false,
        formIsValid: false
    }
    orderHandler = (event) => {
        event.preventDefault();
       this.setState({loading: true});
       const formData = {};
       for(let formIdentifier in this.state.orderForm){
           formData[formIdentifier] = this.state.orderForm[formIdentifier].value;
       }
       const order = {
           ingredients : this.props.burger.ingredients,
           price: this.props.burger.totalPrice,
           orderData: formData
       }

       axios.post(`/orders.json?auth=${this.props.token}`, order)
       .then(response => { this.setState({loading: false}); this.props.history.replace('/', null) })
       .catch(error => {this.setState({loading: false}) });
    }

    inputElementChangeHandler = (event, elementId) => {
        const value = event.target.value;
        const updatedForm = {...this.state.orderForm};
        const updatedFormElement = {...updatedForm[elementId]};
        updatedFormElement.value = value;
        updatedFormElement.valid = this.checkValidity(updatedFormElement.value, updatedFormElement.validation);
        updatedFormElement.touched = true;
        updatedForm[elementId] = updatedFormElement;
        let formIsValid = true;
        for(let elementIdentifier in updatedForm){
            formIsValid = updatedForm[elementIdentifier].valid && formIsValid;
        }
       
        this.setState({orderForm: updatedForm, formIsValid: formIsValid});
    }

    checkValidity(value, rule) {
        let isValid = true;
        if(!rule) {
            return true;
        }
            if(rule.required) {
                isValid = value.trim() !=='' && isValid;
            } 

        return isValid;

    }
    render() {
        const formElementsArray = [];
        for(let key in this.state.orderForm){
            formElementsArray.push({
                id: key,
                config: this.state.orderForm[key]
            });
        }
        let form = (
       
            <form onSubmit ={this.orderHandler}>
               {formElementsArray.map(formElement => 
                <Input key={formElement.id} elementType={formElement.config.elementType} elementConfig={formElement.config.elementConfig} value={formElement.config.value} changed={(event) => this.inputElementChangeHandler(event, formElement.id)} invalid={!formElement.config.valid} shouldValidate={formElement.config.validation} touched={formElement.config.touched}/>
                )}
                <Button btnType='Success' disabled={!this.state.formIsValid}>ORDER</Button>
            </form>
       
        );
        if(this.state.loading) {
            form = <Spinner/>;
        }
        return (
            <div className={classes.ContactData}>
                <h4>Enter Your Contact Details</h4>
                {form}
            </div>
        )
    }
}
const mapStateToProps = state => {
    return  {
        burger:  state.burgerBuilder,
        token: state.auth.token
    }
}
export default connect(mapStateToProps)(ContactData);