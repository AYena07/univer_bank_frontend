import {BrowserRouter, Switch, Route, Redirect, useRouteMatch} from 'react-router-dom';
import AccountListComponent from './account-list-component/account-list-component';
import React from 'react';

class AccountRouterComponent extends React.Component {

    render() {
        return (
            <BrowserRouter>
                <Switch>
                    <Route exact path='/accounts' component={AccountListComponent}/>
                </Switch>
            </BrowserRouter>
        )
    }

}

export default AccountRouterComponent;
