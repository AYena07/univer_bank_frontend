import React from 'react';
import '../account-retrieve-component.css';
import AccountService from "../../../../services/account-service";

class CardRetrieveComponent extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            restriction: this.props.card.restriction
        }
        this.formUser = this.formUser.bind(this);
        this.formPaymentMethod = this.formPaymentMethod.bind(this);
        this.formDate = this.formDate.bind(this);
        this.cancel = this.cancel.bind(this);
        this.saveCard = this.saveCard.bind(this);
    }

    formUser() {
        const card = this.props.card;
        const user = this.props.users.find(function (elem, index) {
            return card.owner === elem.id;
        })
        return <div>{user.first_name + ' ' + user.last_name}</div>
    }

    formPaymentMethod() {
        const card = this.props.card;
        const payment_method = this.props.paymentMethods.find(function (elem, index) {
            return elem.id === card.payment_method;
        })
        return <div>{payment_method.title}</div>
    }

    formDate() {
        const dateArr = this.props.card.date_end.split('-')
        const res = dateArr[1] + '/' + dateArr[0][2] + dateArr[0][3];
        return <div>{res}</div>
    }

    cancel() {
        const changeParentState = this.props.changeParentState;
        changeParentState({
            cardRetrieveModal: false
        });
    }

    saveCard() {
        const restriction = this.state.restriction;
        const card = this.props.card;
        const cards = this.props.cards;
        card.restriction = restriction;
        const changeParentState = this.props.changeParentState;
        AccountService.updateCard(card).then(function (response) {
            if (!response.ok) {
                //handleResponseError(response);
            } else {
                response.json().then(function (body) {
                    cards.forEach(function (elem, ind) {
                        if (elem.id === card.id) {
                            elem.restriction = restriction;
                        }
                    })
                    changeParentState({
                        cards: cards,
                        cardRetrieveModal: false
                    })
                })
            }
        })

    }

    render() {
        return <div className={"card-retrieve"}>
            <div className={"top-row title space-between-row"}>
                {this.formUser()}
            </div>
            <div className={"top-row space-between-row"}>Card number:
                <div>{this.props.card.number}</div>
            </div>
            <div className={"top-row space-between-row"}>Expiration date:
                {this.formPaymentMethod()}
            </div>
            <div className={"top-row space-between-row"}>Payment method:
                {this.formDate()}
            </div>
            <div className={"top-row space-between-row"}>Restriction:
                {(this.props.currentUser.id === this.props.account.owner_id) &&
                <input type={"text"} value={this.state.restriction} className={"input-retrieve"} size="10"
                       onChange={(e) => {this.setState({restriction: e.target.value})}}/>}
                {(this.props.currentUser.id !== this.props.account.owner_id) &&
                <div>{this.state.restriction}</div>}
            </div>
            <div className={"buttons-container"}>
                {(this.props.currentUser.id === this.props.account.owner_id) && <button className={"create"} onClick={this.saveCard}>Save</button>}
                <button className={"cancel"} onClick={this.cancel}>Cancel</button>
            </div>
        </div>
    }
}

export default CardRetrieveComponent;
