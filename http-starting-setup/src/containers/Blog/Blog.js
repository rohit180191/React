import React, { Component } from 'react';
import axios from 'axios';
import Post from '../../components/Post/Post';
import FullPost from '../../components/FullPost/FullPost';
import NewPost from '../../components/NewPost/NewPost';
import './Blog.css';

class Blog extends Component {
    state = {
        posts:[],
        selectedPost: null
    }
    selectPost = (id) => {
        this.setState({selectedPost: id});
    }
    componentDidMount() {
        axios.get('/posts')
        .then((response) => {
            const updatedPost = response.data.map((post) => ({...post, author:'Rohit'}))
           this.setState({posts: updatedPost})
        });
    }
    render () {
        const posts = this.state.posts.map((item) => {
            return  <Post title={item.title} key={item.id} author={item.author} clicked={() => this.selectPost(item.id)}/>
        })
        return (
            <div>
                <section className="Posts">
                    {posts}
                </section>
                <section>
                    <FullPost id = {this.state.selectedPost}/>
                </section>
                <section>
                    <NewPost />
                </section>
            </div>
        );
    }
}

export default Blog;