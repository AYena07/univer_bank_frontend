import './account-list-component.css'
import AccountService from '../../../services/account-service';
import React from 'react';

class AccountListComponent extends React.Component {

    constructor() {
        super();
        this.state = {
            accounts: []
        }
    }

    componentDidMount() {
        AccountService.accounts().then((response) => {
            response.json().then((body) => {
                this.setState({accounts: body})
            })
        })
    }

    renderAccounts() {
        return this.state.accounts.map(function (item, index) {
            return <div className={"account-item"}>
                <div className={"left-col"}>
                    <div className={"number-block"}>
                        # {item.number}
                    </div>
                    <div className={"money-block"}>
                        <div className={"currency-block"}>
                            {item.currency}
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
                    {item.owner &&
                    <span>You owner</span>}
                </div>
            </div>
        })
    }

    render() {
        return (
            <div>
                <h1 className={"accounts-title"}>My Bills</h1>
                <div className={"accounts"}>
                    {this.renderAccounts()}
                </div>
            </div>
        );
    }
}

export default AccountListComponent;
