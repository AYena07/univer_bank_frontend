import './account-list-component.css'
import AccountService from '../../../services/account-service';
import UserService from '../../../services/user-service';
import React from 'react';

class AccountListComponent extends React.Component {

    constructor() {
        super();
        this.state = {
            accounts: null,
            currencies: null,
            user: null
        }
    }

    componentDidMount() {
        AccountService.accounts().then((response) => {
            response.json().then((body) => {
                this.setState({accounts: body});
            })
        })
        AccountService.currencies().then((response) => {
            response.json().then((body) =>{
                this.setState({currencies: body});
            });
        })
        UserService.me().then((response) => {
            response.json().then((body) =>{
                this.setState({user: body});
            });
        })
    }

    renderAccounts() {
        console.log(this.state);
        const currencies = this.state.currencies;
        const user = this.state.user;
        return this.state.accounts.map(function (item, index) {
            return <div className={"account-item"}>
                <div className={"left-col"}>
                    <div className={"number-block"}>
                        # {item.number}
                    </div>
                    <div className={"money-block"}>
                        <div className={"currency-block"}>
                            {currencies.find(x => x.id === item.currency).title}
                        </div>
                        <div className={"cash-block"}>
                            {item.cash}
                        </div>
                    </div>
                </div>
                <div className={"center-col"}>
                    {item.title}
                </div>
                <div className={"right-col"}>
                    {(item.owner === user.email) &&
                    <span>You owner</span>}
                </div>
            </div>
        })
    }

    render() {
        return (
            <div> { this.state.accounts && this.state.currencies && this.state.user && (
                <div className={"accounts-container"}>
                <h1 className={"accounts-title"}>My Bills</h1>
                <button className={"new-account"}>Create another account</button>
                <div className={"accounts"}>
                    {this.renderAccounts()}
                </div>
                </div>)}
            </div>
        );
    }
}

export default AccountListComponent;
