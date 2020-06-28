import React, { Component } from 'react';
import {Route, NavLink, Switch, Redirect} from 'react-router-dom'
import './Blog.css';
import Posts from './../Posts/Posts'
import AsyncComponent from './../../hoc/AsyncComponent';
// import NewPost from './../NewPost/NewPost';
const AsyncComp = AsyncComponent(() => {
    return import('./../NewPost/NewPost')
})

class Blog extends Component {
    state={
        auth: true
    }
    render () {

        return (
            <div className="Blog">
                <header>
                    <nav>
                        <ul>
                            <li><NavLink
                             to='/posts'
                             exact
                             activeClassName='my-active'
                             activeStyle={{color: '#fa923f'}}>Posts</NavLink></li>
                            <li><NavLink to={{
                                pathname:'/new-post',
                                hash:'#id',
                                search:'?query-param=value'
                            }}>New Post</NavLink></li>
                        </ul>
                    </nav>
                </header>   
                    {/* <Route path="/" exact render={() => <Posts/>}/>  */}
                    <Switch>
                        {this.state.auth ? <Route path="/new-post" exact component={AsyncComp}/> : null}
                        <Route path="/posts"  component={Posts}/>
                        <Redirect from='/' to='/posts'/>
                    </Switch>
            </div>
        );
    }
}

export default Blog;