import React, {useContext, createContext, useState} from "react";
//import 'bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter as Router, Switch, Route, Redirect, useHistory, useLocation} from "react-router-dom";

import {Root} from "./components/Root";
import {Home} from "./components/Home"
import {Login} from "./components/Login"
import {Registration} from "./components/Registration"
import {CreatePost} from "./components/CreatePost"
import {OnePost} from "./components/OnePost"

const App = (props)=> {
    let history = useHistory();
    let location = useLocation();
    let auth = useAuth();

    let { from } = location.state || { from: { pathname: "/" } };
    let login = () => {
        auth.signin(() => {
            history.replace(from);
        });
    };

    return (
        <Switch>
            <Route exact path="/">
                <Root>
                    <Home/>
                </Root>
            </Route>
            <Route path="/home">
                <Root>
                    <Home/>
                </Root>
            </Route>
            <Route path="/login" >
                <Root>
                
                </Root>
            </Route>
            <Route path="/registration">
                <Root>
                    <Registration/>
                </Root>
            </Route>
            <PrivateRoute path="/createPost">
                <Root>
                    <CreatePost/>
                </Root>
            </PrivateRoute>
            <Route path="/post/:id">
                <Root>
                    <OnePost/>
                </Root>
            </Route>
        </Switch>
    )
}

export const Main = (props) => {
    return (
        <ProvideAuth>
            <Router>
               <App />
            </Router>
        </ProvideAuth>
    );

}


const fakeAuth = {
    isAuthenticated: false,
    signin(cb) {
        fakeAuth.isAuthenticated = true;
        setTimeout(cb, 100); // fake async
    },
    signout(cb) {
        fakeAuth.isAuthenticated = false;
        setTimeout(cb, 100);
    }
};

/** For more details on
 * `authContext`, `ProvideAuth`, `useAuth` and `useProvideAuth`
 * refer to: https://usehooks.com/useAuth/
 */
const authContext = createContext();

function ProvideAuth({ children }) {
    const auth = useProvideAuth();
    return (
        <authContext.Provider value={auth}>
            {children}
        </authContext.Provider>
    );
}

function useAuth() {
    return useContext(authContext);
}

function useProvideAuth() {
    const [user, setUser] = useState(null);

    const signin = cb => {
        return fakeAuth.signin(() => {
            setUser("user");
            cb();
        });
    };

    const signout = cb => {
        return fakeAuth.signout(() => {
            setUser(null);
            cb();
        });
    };

    return {
        user,
        signin,
        signout
    };
}

export function AuthButton() {
    let history = useHistory();
    let auth = useAuth();

    return auth.user ? (
        <p>
            Welcome!{" "}
            <button
                onClick={() => {
                    auth.signout(() => history.push("/"));
                }}
            >
                Sign out
            </button>
        </p>
    ) : (
        <p>You are not logged in.</p>
    );
}

// A wrapper for <Route> that redirects to the login
// screen if you're not yet authenticated.
function PrivateRoute({ children, ...rest }) {
    let auth = useAuth();
    return (
        <Route
            {...rest}
            render={({ location }) =>
                auth.user ? (
                    children
                ) : (
                    <Redirect
                        to={{
                            pathname: "/login",
                            state: { from: location }
                        }}
                    />
                )
            }
        />
    );
}

function PublicPage() {
    return <h3>Public</h3>;
}

function ProtectedPage() {
    return <h3>Protected</h3>;
}




/*
export default class App extends React.Component {
    render() {
        return (
            <Router>
                <Switch>
                    <Route exact path="/">
                        <Root>
                            <Home />
                        </Root>
                    </Route>
                    <Route path="/home">
                        <Root>
                            <Home />
                        </Root>
                    </Route>
                    <Route path="/login">
                        <Root>
                            <Login />
                        </Root>
                    </Route>
                    <Route path="/registration" history={useHistory}>
                        <Root>
                            <Registration />
                        </Root>
                    </Route>
                </Switch>
            </Router>
        );
    }
}
*/
