import {BrowserRouter, Switch, Route} from 'react-router-dom';
import AccountListComponent from './account-list-component/account-list-component';
import HeaderComponent from "./header-component/header-component";
import UserService from '../../services/user-service'
import AccountRetrieveComponent from "./account-retrieve-component/account-retrieve-component";
import './account-style.css'
import LeftColumnComponent from "./left-column-component/left-column-component";
import AccountCreateComponent from "./account-create-component/account-create-component";
import React from 'react';
import TransactionListComponent from "./transaction-list-component/transaction-list-component";
import AccountTransactionMakerComponent
    from "./account-transaction-maker-component/account-transaction-maker-component";

class AccountRouterComponent extends React.Component {

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
        return (<div className={"wrappers"}>
        { this.state.authenticated && (<div className={"wrappers"}>
                <HeaderComponent history={this.props.history} user={this.state.user}/>
                <BrowserRouter basename={'/accounts'}>
                    <LeftColumnComponent location={this.props.location} history={this.props.history}/>
                    <Switch>
                        <Route exact path='/' component={AccountListComponent}/>
                        <Route exact path='/create' component={AccountCreateComponent}/>
                        <Route exact path='/transactions' component={TransactionListComponent}/>
                        <Route exact path='/transactions/new' component={AccountTransactionMakerComponent}/>
                        <Route exact path='/:id' component={AccountRetrieveComponent}/>
                    </Switch>
                </BrowserRouter>
            </div>)}
        </div>)
    }

}

export default AccountRouterComponent;
