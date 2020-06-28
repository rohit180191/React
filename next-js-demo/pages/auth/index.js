import React from 'react';
import User from './../../components/User/User';

const AuthIndexPage = (props) => (
    <div>
        <h1>The Auth Main Page - {props.appName}</h1>
        <User name="Rohit" age={28}/>
    </div>
);

AuthIndexPage.getInitialProps = (context) => {
    const promise = new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve({appName: "Supper App (Auth)"})
        }, 
        1000);
    });
    return promise;
}

export default AuthIndexPage;