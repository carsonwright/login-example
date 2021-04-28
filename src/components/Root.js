import React from "react";
import { AuthButton } from "../App"

import { Header } from "./Header";

export class Root extends React.Component {
    render() {
        console.log(this)
        return(
            <div className="container">
                <div className="row">
                    <div className="col-xs-10 col-xs-offset-1">
                        <Header></Header>
                        <AuthButton></AuthButton>
                    </div>
                </div>
                <div className="row">
                    <div className="col-xs-10 col-xs-offset-1">
                        {this.props.children}
                    </div>
                </div>
            </div>
        )
    }
}