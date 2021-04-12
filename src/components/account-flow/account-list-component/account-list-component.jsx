import './account-list-component.css'
import React from 'react';

class AccountListComponent extends React.Component {

    constructor() {
        super();
        this.accounts = [{
            title: "Yena's Family Bill",
            currency: "BTC",
            cash: 1337.322,
            number: 123123123228,
            owner: true
        },{
            title: "Savenko's Family Bill",
            currency: "UAH",
            cash: 123456.67,
            number: 123123123777,
            owner: false
        },{
            title: "Svatko's Family Bill",
            currency: "USD",
            cash: 0.00,
            number: 123123123321,
            owner: false
        },];
    }

    renderAccounts() {
        return this.accounts.map(function (item, index) {
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
