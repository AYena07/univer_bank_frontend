import {BrowserRouter, Switch, Route, Redirect} from 'react-router-dom';
import AccountRouterComponent from './account-flow/account-router-component';
import React from 'react';

class RouterComponent extends React.Component {

    render() {
        return (
            <BrowserRouter>
                <Switch>
                    <Route path='/accounts' component={AccountRouterComponent}/>
                    <Redirect exact from='/' to='/accounts'/>
                </Switch>
            </BrowserRouter>
        )
    }

}

export default RouterComponent;
