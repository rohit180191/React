import React , {Component} from 'react';
import Input from './../../components/UI/Input/Input';
import Button from './../../components/UI/Button/Button';
import Spinner from './../../components/UI/Spinner/Spinner';
import classes from './Auth.module.css';
import * as actions from './../../store/actions';
import {connect} from 'react-redux';
import { Redirect } from 'react-router-dom';

class Auth extends Component {
    state = {
        controls: {
            email:{
                elementType:'input',
                elementConfig:{
                    type:'email',
                    placeholder:'Mail Address'
                },
                value: '',
                validation: {
                    required: true,
                    isEmail: true
                },
                valid: false,
                touched: false
            },
            password:{
                elementType:'input',
                elementConfig:{
                    type:'password',
                    placeholder:'Password'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 6
                },
                valid: false,
                touched: false
            }
        },
        formIsValid: false,
        isSignUp: true
    }
    inputElementChangeHandler = (event, elementId) => {
        const value = event.target.value;
        const updatedForm = {...this.state.controls};
        const updatedFormElement = {...updatedForm[elementId]};
        updatedFormElement.value = value;
        updatedFormElement.valid = this.checkValidity(updatedFormElement.value, updatedFormElement.validation);
        updatedFormElement.touched = true;
        updatedForm[elementId] = updatedFormElement;
        let formIsValid = true;
        for(let elementIdentifier in updatedForm){
            formIsValid = updatedForm[elementIdentifier].valid && formIsValid;
        }
       
        this.setState({controls: updatedForm, formIsValid: formIsValid});
    }
    checkValidity(value, rule) {
        let isValid = true;
        if(!rule) {
            return true;
        }
            if(rule.required) {
                isValid = value.trim() !=='' && isValid;
            } 
            if(rule.minLength){
                isValid = value.length >= rule.minLength && isValid;
            }
            if(rule.isEmail){
                const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                isValid = pattern.test(value) && isValid;
            }

        return isValid;

    }

    AuthHandler = (event) => {
        event.preventDefault();
        const email = this.state.controls.email.value;
        const password = this.state.controls.password.value;
        const isSignUp = this.state.isSignUp;
        this.props.onAuth(email, password, isSignUp);
       
    }
    switchAuthMode = () => {
        this.setState(prevState => {
            return {isSignUp: !prevState.isSignUp}
        });
    }
    componentDidMount() {
        if(!this.props.isBurgerBuilding){
            this.props.setRedirectPath();
        }
    }
    render() {
        const formElementsArray = [];
        for(let key in this.state.controls){
            formElementsArray.push({
                id: key,
                config: this.state.controls[key]
            });
        }
        let form = formElementsArray.map(formElement => 
            <Input key={formElement.id} elementType={formElement.config.elementType} elementConfig={formElement.config.elementConfig} value={formElement.config.value} changed={(event) => this.inputElementChangeHandler(event, formElement.id)} invalid={!formElement.config.valid} shouldValidate={formElement.config.validation} touched={formElement.config.touched}/>
            );
        if(this.props.loading){
            form = <Spinner/>;
        }    
        let errorMessage = null;
        if(this.props.error) {
            errorMessage = (
            <p>{this.props.error.message}</p>
            )
        }
        let authRedirect= null;
        if(this.props.isAuthenticated) {
            authRedirect = <Redirect to={this.props.authRedirectPath}/>
        }
        return (
            <div className={classes.Auth}>
                  {errorMessage}
                  {authRedirect}
                <form onSubmit ={this.AuthHandler}>
                    {form}
                    <Button btnType='Success'  disabled={!this.state.formIsValid}>Submit</Button>
                </form>
                <Button btnType='Danger' clicked={this.switchAuthMode} >Switch to {this.state.isSignUp ? 'Sign in' : 'Sign Up'}</Button>
            </div>
        );
    }
}
const mapDispatchToProps = dispatch => {
    return {
        onAuth: (email,password, isSignUp) => dispatch(actions.auth(email, password, isSignUp)),
        setRedirectPath: () => dispatch(actions.setAuthRedirectPath('/')) 
    }
};

const mapStateToProps = state => {
    return {
        loading: state.auth.loading,
        error: state.auth.error,
        isAuthenticated: state.auth.token !== null,
        isBurgerBuilding: state.burgerBuilder.isBuilding,
        authRedirectPath: state.auth.authRedirectPath
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Auth);