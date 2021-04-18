import {BrowserRouter, Switch, Route, Redirect, useRouteMatch} from 'react-router-dom';
import AccountListComponent from './account-list-component/account-list-component';
import HeaderComponent from "./header-component/header-component";
import UserService from '../../services/user-service'
import React from 'react';

class AccountRouterComponent extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            authenticated: false
        }
        UserService.me().then((response) => {
            if (response.status !== 200) {
                this.props.history.push('/login');
            } else {
                this.setState({authenticated: true})
            }
        });
    }

    render() {
        return (<div>
        { this.state.authenticated && (<div>
                <HeaderComponent history={this.props.history}/>
                <BrowserRouter>
                    <Switch>
                        <Route exact path='/accounts' component={AccountListComponent}/>
                    </Switch>
                </BrowserRouter>
            </div>)}
        </div>)
    }

}

export default AccountRouterComponent;
