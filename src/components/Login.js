import React from "react";
import {Link} from "react-router-dom";

export class Login extends React.Component {
    constructor() {
        super();
        this.state = {
            firstName: "",
            lastName: "",
            email: "",
            password: "",
            responseFromServer: ""
        }

    }

    onHandleChangeEmail(event) {
        this.setState({
            email: event.target.value
        })
    }

    onHandleChangePassword(event) {
        this.setState({
            password: event.target.value
        })
    }

    async onClickButtonSubmit(event) {

        await fetch(`http://127.0.0.1:9000/api/users/${this.state.email}/${this.state.password}`)
            .then(response => response.json()
                .then(result => {
                    this.state.responseFromServer = result
                }))

        console.log(this.state.responseFromServer);

        if (this.state.responseFromServer.error) {
            alert("User not found")
            console.log("User not found");
        } else {
            this.props.loginFunction();
            this.props.useProvideAuth();

            window.location = '/home';
        }
    }

    render() {
        return (
            <div>
                <h3>Login</h3>
                <form>
                    <label>Email:</label>
                    <input required value={this.state.email} onChange={(event) => this.onHandleChangeEmail(event)}
                           type="email"/>
                    <br/>
                    <label>Password:</label>
                    <input required value={this.state.password} onChange={(event) => this.onHandleChangePassword(event)}
                           type="password"/>
                    <br/>
                    <input type="button" onClick={(event) => this.onClickButtonSubmit(event)} value="Submit"/>
                </form>
                <Link to={"/registration"}>Register</Link>
            </div>
        );
    }
}

