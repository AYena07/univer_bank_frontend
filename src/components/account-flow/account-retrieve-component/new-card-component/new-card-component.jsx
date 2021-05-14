import React from 'react';
import '../account-retrieve-component.css';
import AccountService from "../../../../services/account-service";

class NewCardComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            errors: {
                pin_code: null,
                cvv: null
            }
        }
        this.user = React.createRef();
        this.pin = React.createRef();
        this.cvv = React.createRef();
        this.payment_method = React.createRef();
        this.restriction = React.createRef();
        this.usersMap = this.usersMap.bind(this);
        this.paymentMethodsMap = this.paymentMethodsMap.bind(this);
        this.createCard = this.createCard.bind(this);
        this.handleResponseError = this.handleResponseError.bind(this);
        this.cancel = this.cancel.bind(this);
    }

    usersMap() {
        const allUsers = this.props.allUsers;
        return this.props.account.users.map(function (elem, index) {
            const user = allUsers.find(function (item, ind) {return item.id === elem;});
            return <option value={user.id}>{user.email}</option>;
        })
    }

    paymentMethodsMap() {
        return this.props.paymentMethods.map(function (elem, index) {
            return <option value={elem.id}>{elem.title}</option>
        });
    }

    createCard() {
        const card = {
            owner: this.user.current.value,
            account: this.props.account.id.toString(),
            cvv: this.cvv.current.value,
            pin_code: this.pin.current.value,
            payment_method: this.payment_method.current.value
        }
        if (this.restriction.current.value !== '') {
            card.restriction = this.restriction.current.value;
        }
        const handleResponseError = this.handleResponseError;
        const changeParentState = this.props.changeParentState;
        const cards = this.props.cards;
        AccountService.postCard(card).then(function (response) {
            if (!response.ok) {
                handleResponseError(response);
            } else {
                response.json().then(function (body) {
                    cards.push(body);
                    changeParentState({
                        cards: cards,
                        cardCreateModal: false
                    })
                })
            }
        });
    }

    cancel() {
        const changeParentState = this.props.changeParentState;
        changeParentState({
            cardCreateModal: false
        });
    }

    handleResponseError(response) {
        response.json().then(errorsData => {
            this.setState({
                errors: {
                    pin_code: errorsData['pin_code'] ? errorsData['pin_code'] : '',
                    cvv: errorsData['cvv'] ? errorsData['cvv'] : ''
                }
            })
        })
    }

    render() {
        return <div className={"card-retrieve"}>
            <div className={"top-row title space-between-row"}>User:
                <select className={"users-select"} ref={this.user}>
                    {this.usersMap()}
                </select>
            </div>
            {
                this.state.errors.pin_code &&
                <div className='errorMessage stretched'>
                    { this.state.errors.pin_code }
                </div>
            }
            <div className={"top-row title space-between-row"}>Pin code:
                <input type={"password"} className={"card-create-input pin-input"}
                       maxLength="4" size="4" ref={this.pin}/>
            </div>
            {
                this.state.errors.cvv &&
                <div className='stretched errorMessage'>
                    { this.state.errors.cvv }
                </div>
            }
            <div className={"top-row title space-between-row"}>CVV:
                <input type={"password"} className={"card-create-input pin-input"}
                       maxLength="3" size="3" ref={this.cvv}/>
            </div>
            <div className={"top-row title space-between-row"}>Restriction:
                <input type={"text"} className={"card-create-input pin-input"}
                       ref={this.restriction} maxLength="10" size="10"/>
            </div>
            <div className={"top-row title space-between-row"}>Payment method:
                <select className={"users-select"} ref={this.payment_method}>
                    {this.paymentMethodsMap()}
                </select>
            </div>
            <div className={"buttons-container"}>
                <button className={"create"} onClick={this.createCard}>Create</button>
                <button className={"cancel"} onClick={this.cancel}>Cancel</button>
            </div>
        </div>
    }
}

export default NewCardComponent;
