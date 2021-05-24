import {BrowserRouter, Switch, Route, Redirect} from 'react-router-dom';
import AccountRouterComponent from './account-flow/account-router-component';
import LoginComponent from './login-flow/login-component';
import RegistrationComponent from './registration-flow/registration-component';
import RegistrationCompleteComponent from './registration-flow/regitration-complete-component';
import TransactionMakerComponent from "./transaction-maker/transaction-maker-component/transaction-maker-component";
import React from 'react';
import TransactionMakerRouterComponent from "./transaction-maker/transaction-maker-router-component";

class RouterComponent extends React.Component {

    render() {
        return (
            <BrowserRouter>
                <Switch>
                    <Route path='/accounts' component={AccountRouterComponent}/>
                    <Route exact path='/login' component={LoginComponent}/>
                    <Route exact path='/registration' component={RegistrationComponent}/>
                    <Route exact path='/registration/complete' component={RegistrationCompleteComponent}/>
                    <Route exact path='/registration/complete' component={RegistrationCompleteComponent}/>
                    <Route exact path='/new_transaction' component={TransactionMakerRouterComponent}/>
                    <Redirect exact from='/' to='/accounts'/>
                </Switch>
            </BrowserRouter>
        )
    }
}

export default RouterComponent;
