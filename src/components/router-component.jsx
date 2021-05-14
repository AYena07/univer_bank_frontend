import {BrowserRouter, Switch, Route, Redirect} from 'react-router-dom';
import AccountRouterComponent from './account-flow/account-router-component';
import LoginComponent from './login-flow/login-component';
import RegistrationComponent from './registration-flow/registration-component';
import RegistrationCompleteComponent from './registration-flow/regitration-complete-component';
import React from 'react';
import TransactionComponent from "./account-flow/transaction-router-component";

class RouterComponent extends React.Component {

    render() {
        return (
            <BrowserRouter>
                <Switch>
                    <Route path='/accounts' component={AccountRouterComponent}/>
                    <Route exact path='/login' component={LoginComponent}/>
                    <Route exact path='/registration' component={RegistrationComponent}/>
                    <Route exact path='/trans' component={TransactionComponent}/>
                    <Route exact path='/registration/complete' component={RegistrationCompleteComponent}/>
                    <Redirect exact from='/' to='/accounts'/>
                </Switch>
            </BrowserRouter>
        )
    }

}

export default RouterComponent;
