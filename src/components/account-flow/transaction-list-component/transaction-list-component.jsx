import UserService from '../../../services/user-service';
import React from 'react';
import './transaction-list-component.css';
import './filter-select.css';
import AccountService from '../../../services/account-service';
import TransactionService from '../../../services/transaction-service';
import 'react-dropdown/style.css';
import {
    useParams
} from "react-router-dom";

class TransactionListComponent extends React.Component {

    constructor(props) {
        super(props);
        let userId = this.props.location.userId;
        this.state = {
            transactions: null,
            is_binary: true,
            currencies: null,
            accounts: null,
            user: null,
            value: userId ? userId.toString() : "any",
            v_recipient: "any",
            v_date: "topToBottom"
        }
        this.allSenders = this.allSenders.bind(this);
        this.allRecipient = this.allRecipient.bind(this);
    }


    componentDidMount() {
        TransactionService.transactions().then((response) => {
            response.json().then((body) => {
                this.setState({transactions: body});
            });
        })


        AccountService.accounts().then((response) => {
            response.json().then((body) => {
                this.setState({accounts: body});
            });
        })
        TransactionService.currencies().then((response) => {
            response.json().then((body) => {
                this.setState({currencies: body});
            });
        })
        UserService.me().then((response) => {
            response.json().then((body) => {
                this.setState({user: body});
            });
        })
    }

    renderTransactions() {
        console.log(this.state);
        const currencies = this.state.currencies;
        const user = this.state.user;
        const accounts = this.state.accounts;
        const value = this.state.value;
        const v_recipient = this.state.v_recipient;
        const v_date = this.state.v_date;
        let trans = Array.from(this.state.transactions)
        if (v_date === "BottomToTop") {
            trans.reverse();
        }


        return trans.filter((item) => (value === "any" ? true : value === item.sender.toString())
            && (v_recipient === "any" ? true : v_recipient === item.recipient.toString()))
            .map(function (item, index) {
                return <div className={"transaction-item"}>
                    <div className={"left-col-transactions"}>
                        <div className={"number-block-transactions"}>
                            From: # {accounts.find(x => x.id === item.sender).number}
                        </div>
                        <div className={"money-block-transactions"}>

                            <div className={"cash-block-transactions"}>
                                To: # {accounts.find(x => x.id === item.recipient).number}
                            </div>
                        </div>
                    </div>
                    <div className={"center-col-transactions"}>

                    </div>
                    <div className={"reight-col-transactions"}>
                        Value: {item.cash} {currencies.find(x => x.id === accounts.find(x => x.id === item.recipient).currency).title}
                        <br/>
                        <br/>
                        Date: {item.date}
                    </div>
                </div>
            })
    }

    allSenders() {
        var idSet = new Set();
        const accounts = this.state.accounts;
        Array.from(this.state.transactions).forEach(function (item, index) {
            idSet.add(item.sender)
            console.log(item.sender)
        });


        return Array.from(idSet).map((item, index) => {
            let acc = accounts.find((elem, ind) => {
                return elem.id === item
            });
            return <option value={item}>{acc ? acc.number : "Some Account"}</option>
        });
    }

    allRecipient() {
        var idSet = new Set();
        const accounts = this.state.accounts;
        Array.from(this.state.transactions).forEach(function (item, index) {
            idSet.add(item.recipient)
        });


        return Array.from(idSet).map((item, index) => {
            let acc = accounts.find((elem, ind) => {
                return elem.id === item
            });
            return <option value={item}>{acc ? acc.number : "Some Account"}</option>
        });
    }


    change = (event) => {
        this.setState({value: event.target.value});
    };

    changeRecipient = (event) => {
        this.setState({v_recipient: event.target.value});
    };

    changeDate = (event) => {
        this.setState({v_date: event.target.value});
    };

    render() {
        return (
            <div> {this.state.transactions && this.state.currencies && this.state.user && (
                <div className="transactions-container">
                    <h1 className="transacions-title">My Transactions</h1>
                    <div className={"transaction-top-row transaction-title transaction-space-between-row"}>
                        From:<select className={"transaction-users-select"} onChange={this.change} value={this.state.value}>
                        <option value={"any"}>Any Account</option>
                        {this.state.accounts ? this.allSenders() : undefined}
                    </select>
                        To:<select className={"transaction-users-select"} onChange={this.changeRecipient}
                                   value={this.state.v_recipient}>
                        <option value={"any"}>Any Account</option>
                        {this.state.accounts ? this.allRecipient() : undefined}
                    </select>
                        Date:<select className={"transaction-users-select"} onChange={this.changeDate} value={this.state.v_date}>
                        <option value={"topToBottom"}>Newest to Oldest</option>
                        <option value={"BottomToTop"}>Oldest to Newest</option>
                    </select>
                    </div>
                    <button className="new-transaction">Make Transaction</button>

                    <div className="transactions">
                        {this.state.accounts ? this.renderTransactions() : undefined}
                    </div>
                </div>)}
            </div>
        );
    }
}

export default TransactionListComponent;