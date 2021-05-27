import './account-transaction-maker-component.css'
import AccountService from '../../../services/account-service';
import UserService from '../../../services/user-service';
import React, {createRef} from 'react';

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
        this.myRef = React.createRef();
        this.getItemsSet = this.getItemsSet.bind(this);
        this.selectSender = this.selectSender.bind(this);
        this.change = this.change.bind(this);
        this.changeReceiver = this.changeReceiver.bind(this);
        this.selectReceiver = this.selectReceiver.bind(this);
        this.getSenderNumber = this.getSenderNumber.bind(this);
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

    change(event) {
        this.setState({ sender_item : event.target.value, sender_number: null});
        event.target.value = "";
        console.log(event.target)
    };

    changeReceiver(event) {
        this.setState({ receiver_item : event.target.value, receiver_number: null});
        event.target.value = "";
        console.log(event.target)
    };

    selectSender(event) {
        this.setState({sender_number: event.target.value})
    }

    selectReceiver(event) {
        this.setState({receiver_number: event.target.value})
    }

    getSenderNumber() {
        const elem_num = this.state.sender_number;
        if (!elem_num) return;
        if (this.state.sender_item === "Card")
            return this.state.cards.find(function (elem, _) {return elem.id.toString() === elem_num;}).number
        else
            return this.state.accounts.find(function (elem, _) {return elem.id.toString() === elem_num;}).number
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
                            <h1 className={"card-left"}>{this.state.sender_item}<div>{this.getSenderNumber()}</div></h1>
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
                                <select onChange={this.selectSender}>
                                    <option value={""}>Select card</option>
                                    {this.getItemsSet()}
                                </select>
                            </div>
                        </div>
                    </div>
                    <div className={"receiver-form"}>
                        <div className={"card"}>
                            <h1 className={"card-left"}>{this.state.receiver_item}<div/>{this.state.receiver_number} </h1>
                            <h1 className={"card-left"}>Owner<div>Artem</div></h1>
                        </div>
                        <div className={"payment-info"}>
                            <p> <b> Choose type of item</b> </p>
                            <div className={"custom-select"}>
                                <select value={this.state.receiver_item} onChange={this.changeReceiver}>
                                    <option value="Card">Card</option>
                                    <option value="Account">Account</option>
                                </select>
                            </div>
                            <div className={"custom-input"}>
                                <p><b> Receiver's card number </b></p>
                                <input type="text" value={this.state.receiver_number}
                                       onChange={this.selectReceiver} className={"transaction-new-input"}/>
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
