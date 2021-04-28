import React from "react";
import {Link} from "react-router-dom";

export class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            posts: [],
            responseFromServer: ""
        }
        this.getPosts();
    }

    async getPosts() {

        await fetch(`http://127.0.0.1:9000/api/posts/`)
            .then(response => response.json()
                .then(result => {
                    this.state.responseFromServer = result
                }))

        console.log(this.state.responseFromServer);

        if (this.state.responseFromServer.error) {
            alert("Posts not found")
            console.log("posts not found");
        }else {
            this.setState({posts: this.state.responseFromServer})
            this.state.posts = this.state.responseFromServer;

            console.log(this.state.posts)
        }
    }

    render() {
        return(
            <div>
               <h3>Home</h3>
                <ul>
                    {this.state.posts.map((post) => <li key={post["_id"]}><Link to={`/post/${post["_id"]}`}>{post.title} : {post.description} : {post.whoPosts}</Link></li>)}
                </ul>
            </div>
        )
    }
}