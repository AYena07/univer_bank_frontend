import React from 'react';
import './account-retrieve-component.css';
import UsersListComponent from "./users-list-component/users-list-component";
import AccountService from "../../../services/account-service";
import NewCardComponent from "./new-card-component/new-card-component";
import CardRetrieveComponent from "./card-retrieve-component/card-retrieve-component";
import UserService from "../../../services/user-service";

class AccountRetrieveComponent extends React.Component {

    constructor(props) {
        super(props);
        this.id = window.location.pathname.split('/')[2];
        this.state = {
            currencies: [],
            currentUser: null,
            account: null,
            editMode: false,
            inputVal: '',
            users: null,
            allUsers: null,
            cards: null,
            payment_methods: null,
            usersModal: false,
            cardCreateModal: false,
            cardRetrieveModal: false,
            pickedCard: null
        };
        this.getCurrencyName = this.getCurrencyName.bind(this);
        this.editModeChange = this.editModeChange.bind(this);
        this.changeTitle = this.changeTitle.bind(this);
        this.cardsForm = this.cardsForm.bind(this);
        this.usersModeChange = this.usersModeChange.bind(this);
        this.changeParentState = this.changeParentState.bind(this);
        this.cardNewModeChange = this.cardNewModeChange.bind(this);
        this.cardClick = this.cardClick.bind(this);
        this.cardRetrieveModeChange = this.cardRetrieveModeChange.bind(this);
    }

    componentDidMount() {
        AccountService.currencies().then((response) => {
            response.json().then((body) =>{
                this.setState({currencies: body});
            });
        })
        AccountService.getAccount(this.id).then((response) => {
            response.json().then((body) =>{
                this.setState({account: body, inputVal: body.title});
            });
        })
        UserService.me().then((response) => {
            response.json().then((body) =>{
                this.setState({currentUser: body});
            });
        })
        AccountService.getCards().then((response) => {
            response.json().then((body) =>{
                this.setState({cards: body});
            });
        })
        AccountService.getAccountUsers(this.id).then((response) => {
            response.json().then((body) => {
                this.setState({users: body});
            });
        });
        AccountService.getPaymentMethods().then((response) => {
            response.json().then((body) => {
                this.setState({payment_methods: body});
            });
        });
        UserService.usersList().then((response) => {
            response.json().then((body) =>{
                this.setState({allUsers: body});
            });
        });
        const usersModeChange = this.usersModeChange;
        const cardNewModeChange = this.cardNewModeChange;
        const cardRetrieveModeChange = this.cardRetrieveModeChange;
        window.onclick = function (event) {
            if (event.target.className === "users-modal") {
                usersModeChange();
            } else if (event.target.className === "card-create-modal") {
                cardNewModeChange();
            } else if (event.target.className === "card-retrieve-modal") {
                cardRetrieveModeChange();
            }
        }
    }

    changeParentState(state) {
        this.setState(state);
    }

    getCurrencyName(id) {
        return this.state.currencies.find(function (item, index) {
            return item.id === id;
        }).title
    }

    changeTitle() {
        let account = this.state.account;
        account.title = this.state.inputVal;
        const editModeChange = this.editModeChange;
        AccountService.changeAccount(account).then(function (response) {
            editModeChange();
        })
    }

    editModeChange() {
        this.setState({
            editMode: !this.state.editMode
        });
    }

    usersModeChange(event) {
        this.setState({
            usersModal: !this.state.usersModal
        });
    }

    cardNewModeChange(event) {
        this.setState({
            cardCreateModal: !this.state.cardCreateModal
        });
    }

    cardRetrieveModeChange(event) {
        this.setState({
            cardRetrieveModal: !this.state.cardRetrieveModal
        });
    }

    cardClick(event) {
        const id = event.target.id.split('-')[2];
        const card = this.state.cards.find(function (elem, index) {
            return elem.id.toString() === id;
        })
        this.setState({
            pickedCard: card,
            cardRetrieveModal: !this.state.cardRetrieveModal
        })
    }

    cardsForm() {
        const users = this.state.allUsers;
        const cardClick = this.cardClick;
        return this.state.cards.map(function (elem, index) {
            const owner_email = elem.owner_email;
            let owner = users.find(function (elem1, index) {
                return elem1.email === owner_email;
            })
            if (!owner) {
                owner = {first_name: '', last_name: ''};
            }
            return <div className={"card-layout"} id={"card-layout-" + elem.id} onClick={cardClick}>
                <div className={"card-top-row"}>{owner.first_name} {owner.last_name}</div>
                <div className={"card-bottom-row"}>{elem.number}</div>
            </div>
        })
    }

    render() {
        return <div> {
            this.state.currencies && this.state.currentUser &&
            this.state.account && this.state.cards && this.state.users && this.state.allUsers && (
            <div className={"account-retrieve-block"}>
                <div className={"top-block"}>
                    { !this.state.editMode &&
                    <div className={"top-row space-between-row"}>
                        <div className={"edit-block-retrieve"}>
                            <div className={"title"}>{this.state.account.title}</div>
                            <button className={"retrieve-button"} onClick={this.editModeChange}>Edit</button>
                        </div>
                        <button className={"retrieve-button"} onClick={this.usersModeChange}>Users</button>
                    </div>
                    }
                    { this.state.editMode &&
                    <div className={"top-row space-between-row"}>
                        <div className={"edit-block-retrieve"}>
                            <input value={this.state.inputVal} className={"retrieve-input"} onChange={(e) => {this.setState({inputVal: e.target.value})}}/>
                            <button className={"retrieve-button confirm"} onClick={this.changeTitle}>Confirm</button>
                            <button className={"retrieve-button cancel"} onClick={this.editModeChange}>Cancel</button>
                        </div>
                        <button className={"retrieve-button"} onClick={this.usersModeChange}>Users</button>
                    </div>
                    }
                    <div className={"top-row space-between-row"}>
                        <div># {this.state.account.number}</div>
                        <button className={"retrieve-button"}>View transactions</button>
                    </div>
                    <div className={"top-row space-between-row"}>
                        <div>Owner: {this.state.account.owner === this.state.currentUser.email ? "you" : this.state.account.owner}</div>
                        <button className={"retrieve-button"}>Make new transaction</button>
                    </div>
                    <div className={"top-row currency-block-retrieve"}>
                        <div className={"title"}>{this.getCurrencyName(this.state.account.currency)}</div>
                        <div className={"title"}>{this.state.account.cash}</div>
                    </div>
                </div>
                <div className={"bottom-block"}>
                    <div className={"bottom-row"}>
                        <div className={"title"}>Cards:</div>
                    </div>
                    <div className={"bottom-row cards-container"}>
                        {this.cardsForm()}
                        <div className={"card-layout add-card-btn"} onClick={this.cardNewModeChange}>
                            +
                        </div>
                    </div>
                </div>
                {this.state.usersModal && <div className={"users-modal"}>
                    <UsersListComponent currentUser={this.state.currentUser} account={this.state.account}
                                        changeParentState={this.changeParentState}/>
                </div>}
                {this.state.cardCreateModal && <div className={"card-create-modal"}>
                    <NewCardComponent account={this.state.account} allUsers={this.state.users}
                                      paymentMethods={this.state.payment_methods} changeParentState={this.changeParentState}
                                      cards={this.state.cards}/>
                </div>}
                {this.state.cardRetrieveModal && <div className={"card-retrieve-modal"}>
                    <CardRetrieveComponent changeParentState={this.changeParentState} card={this.state.pickedCard}
                                           users={this.state.allUsers} paymentMethods={this.state.payment_methods} cards={this.state.cards}/>
                </div>}
            </div>)

        }</div>
    }
}

export default AccountRetrieveComponent;
