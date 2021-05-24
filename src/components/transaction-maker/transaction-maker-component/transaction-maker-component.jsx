import './transaction-maker-component.css'
import AccountService from '../../../services/account-service';
import UserService from '../../../services/user-service';
import React from 'react';

class TransactionMakerComponent extends React.Component {
    constructor() {
        super();
        this.state = {
            currencies: null,
            accounts: null,
            user: null,
            sender_item: "Account",
            receiver_item: "Card",
            sender_number: null,
            receiver_number: null,
            money: null
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

    change = (event) => {
        this.setState({ value: event.target.value});
    };

    render() {
        let acc = this.state.accounts.map()
        return (
            <div> { this.state.accounts && this.state.currencies && this.state.user && (
                <div className={"new-trans-container"}>
                <h1 className={"new-trans-title"}>New Transaction</h1>
                    <div className={"sender-form"}>
                        <div className={"card"}>
                            <h1 className={"card-left"}><b>{this.state.sender_item}</b></h1>
                            <br/>
                            <br/>
                            <h1 className={"card-left"}><b>Owner</b></h1>
                            {console.log(acc)}
                        </div>
                        <div className={"payment-info"}>
                            <p> <b> Choose type of item</b> </p>
                            <div className={"custom-select"}>
                                <select value={this.state.sender_item} onChange={this.change}>
                                    <option value="card">Card</option>
                                    <option value="account">Account</option>
                                </select>
                            </div>
                            <p> <b> Choose the card </b> </p>
                            <div className={"custom-select"}>
                                <select value="sender_item">
                                    <option value="card1">Card</option>
                                    <option value="card1">Card</option>
                                    <option value="card2">Card</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div className={"receiver-form"}>
                        <div className={"card"}>
                            <h1 className={"card-left"}><b>{this.state.receiver_item}</b></h1>
                            <br/>
                            <br/>
                            <h1 className={"card-left"}><b>Owner</b></h1>
                            <h1 className={"card-right>"}><b>{this.state.receiver_number}</b></h1>
                            <h1 className={"card-right>"}><b></b></h1>
                        </div>
                        <div className={"payment-info"}>
                            <p> <b> Choose type of item</b> </p>
                            <div className={"custom-select"}>
                                <select value={this.state.receiver_item} onChange={this.change}>
                                    <option value="card">Card</option>
                                    <option value="account">Account</option>
                                </select>
                            </div>
                            <div className={"custom-input"}>
                                <p><b> Receiver's card number </b></p>
                                <input type="text" value={this.state.receiver_number} onChange={this.change}/>
                            </div>
                        </div>

                    </div>
                    <div className={"amount"}>
                        <div className={"custom-input"}>
                            <p><b> Amount </b></p>
                            <input type="number" value={this.state.money} onChange={this.change}/>
                        </div>
                    </div>
                    <div className={"continue-button"}>
                       <button>Continue</button>
                    </div>
                </div>)}
            </div>
        );
    }
}

export default TransactionMakerComponent;

