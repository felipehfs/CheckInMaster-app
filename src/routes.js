import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import LoginPage from './pages/Login'
import SignupPage from './pages/Signup'
import HomePage from './pages/Home'

const PrivateRoute = ({ component: Component, ...rest}) => (
    <Route {...rest} render={
        props => localStorage.getItem("authToken") ? (
            <Component {...props} />
        ): (
            <Redirect to={{
                pathname: '/',
                state: { from: props.location} 
            }}/>
        )} />
)

export default props => (
    <Switch>
        <Route exact path="/" component={LoginPage} />
        <Route path="/register" component={SignupPage} />
        <PrivateRoute path="/home" component={HomePage} />
        <Redirect from="*" to="/" />
    </Switch>
)