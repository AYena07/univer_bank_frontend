import {BrowserRouter, Switch, Route, Redirect, useRouteMatch} from 'react-router-dom';
import HeaderComponent from "./header-component/header-component";
import UserService from '../../services/user-service'
import LeftColumnComponent from "./left-column-component/left-column-component";
import React from 'react';
import TransactionListComponent from './transaction-list-component/transaction-list-component';

class TransactionComponent extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            authenticated: false,
            user: null
        }
        UserService.me().then((response) => {
            if (response.status !== 200) {
                this.props.history.push('/login');
            } else {
                response.json().then((body) => {
                    this.setState({authenticated: true, user: body})
                })
            }
        });
    }

    render() {
        return (<div>
        { this.state.authenticated && (<div>
                <LeftColumnComponent location={this.props.location}/>
                <HeaderComponent history={this.props.history} user={this.state.user}/>
                <BrowserRouter>
                    <Switch>
                        <Route exact path='/trans' component={TransactionListComponent}/>
                    </Switch>
                </BrowserRouter>
            </div>)}
        </div>)
    }

}

export default TransactionComponent;