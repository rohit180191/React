import React, { Component } from 'react';
import Aux from './Auxillary';
import Modal from './../components/UI/Modal/Modal';

const WithErrorHandler = (WrappedComponent, axios) => {

    return class extends Component{
        state = {
            error: null
        }
        componentDidMount() {
            console.log('WithErrorHandler Mounted');
            this.responseInterceptor = axios.interceptors.response.use(resp => resp, error => {
                this.setState({error: error})
            });

           this.requestInterceptor = axios.interceptors.request.use(req => {
                return req;
            }, error => {
                this.setState({error: error})
            });

        }

        componentWillUnmount() {
            axios.interceptors.request.eject(this.requestInterceptor);
            axios.interceptors.response.eject(this.responseInterceptor);
        }

        errorModalCloseHandler = () => {
            this.setState({error:null});
        }
        render() {
            return (
                <Aux>
                    <Modal show={this.state.error} modalClose={this.errorModalCloseHandler}>
                      {this.state.error? this.state.error.message: null}
                    </Modal>
                     <WrappedComponent {...this.props}/>
                </Aux>
            )
        }
    }
}

export default WithErrorHandler;