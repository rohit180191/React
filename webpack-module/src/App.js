import React, {Component, Suspense} from 'react';
import {Link, Route, Switch} from 'react-router-dom';
const Users = React.lazy(() => import('./containers/Users'));
const Pizza = React.lazy(() => import('./containers/Pizza'));
class App extends Component{
    render(){
        return (
            <div>
                <div>
                    <Link to='/'>Users</Link>
                    <Link to='/pizza'>Pizza</Link>
                </div>
                <div>
                    <Switch>
                    <Route path='/' render={
                        (props) => (
                            <Suspense fallback={<div>Loading...</div>}>
                            <Users {...props}/>
                            </Suspense>
                        )
                    }/>
                    <Route path='/' render={
                        (props) => (
                            <Suspense fallback={<div>Loading...</div>}>
                            <Pizza {...props}/>
                            </Suspense>
                        )
                    }/>
                    </Switch>
                </div>
            </div>
        )
    }
}

export default App;