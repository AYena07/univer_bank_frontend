import './account-transaction-maker-component.css'
import AccountService from '../../../services/account-service';
import UserService from '../../../services/user-service';
import React from 'react';

class AccountTransactionMakerComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currencies: null,
            accounts: null,
            user: null,
            cards: null,
            sender_item: "Card",
            receiver_item: "Card",
            sender_number: null,
            receiver_number: null,
            money: null
        }
        this.getItemsSet = this.getItemsSet.bind(this);
    }

    componentDidMount() {
        AccountService.accounts().then((response) => {
            response.json().then((body) => {
                this.setState({accounts: body});
            })
        })
        AccountService.getCards().then((response) => {
            response.json().then((body) => {
                this.setState({cards: body});
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

    change = (event) => {
        this.setState({ sender_item : event.target.value});
    };

    selectSender() {
        this.setState({})
    }

    getItemsSet() {
        if (this.state.sender_item === 'Card')
            return this.state.cards.map(function (elem, ind) {
                return <option value={elem.id}>{elem.number}</option>
            })
        return this.state.accounts.map(function (elem, ind) {
            return <option value={elem.id}>{elem.number}</option>
        })
    }

    render() {
        //let acc = this.state.accounts.map()
        return (
            <div> { this.state.accounts && this.state.currencies && this.state.user && this.state.cards && (
                <div className={"new-trans-container"}>
                    <h1 className={"new-trans-title"}>New Transaction</h1>
                    <div className={"new-transaction-forms"}>
                    <div className={"sender-form"}>
                        <div className={"card"}>
                            <h1 className={"card-left"}>{this.state.sender_item}</h1>
                            <h1 className={"card-left"}>Owner<div>Valeria</div></h1>
                        </div>
                        <div className={"payment-info"}>
                            <p> <b> Choose type of item</b> </p>
                            <div className={"custom-select"}>
                                <select value={this.state.sender_item} onChange={this.change}>
                                    <option value="Card">Card</option>
                                    <option value="Account">Account</option>
                                </select>
                            </div>
                            <p> <b> Choose the card </b> </p>
                            <div className={"custom-select"}>
                                <select value="sender_item">
                                    {this.getItemsSet()}
                                </select>
                            </div>
                        </div>
                    </div>
                    <div className={"receiver-form"}>
                        <div className={"card"}>
                            <h1 className={"card-left"}>Account<div>0000 1111 2222 3333</div></h1>
                            <h1 className={"card-left"}>Owner<div>Artem</div></h1>
                        </div>
                        <div className={"payment-info"}>
                            <p> <b> Choose type of item</b> </p>
                            <div className={"custom-select"}>
                                <select>
                                    <option value="card">Card</option>
                                    <option value="account">Account</option>
                                </select>
                            </div>
                            <div className={"custom-input"}>
                                <p><b> Receiver's card number </b></p>
                                <input type="text" value={this.state.receiver_number}
                                       onChange={this.change} className={"transaction-new-input"}/>
                            </div>
                        </div>
                        </div>
                    </div>
                    <div className={"amount"}>
                        <div className={"custom-input"}>
                            <p><b> Amount </b></p>
                            <input type="number" value={this.state.money} onChange={this.change}/>
                        </div>
                    </div>
                    <button className={"continue-button"}>Continue</button>
                </div>)}
            </div>
        );
    }
}

export default AccountTransactionMakerComponent;
