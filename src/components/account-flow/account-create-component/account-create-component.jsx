import React from 'react';
import { withRouter } from 'react-router';
import './account-create-component.css';
import AccountService from "../../../services/account-service";
import UserService from "../../../services/user-service";
import AuthService from "../../../services/auth-service";

class AccountCreateComponent extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            currencies: null,
            users: null,
            currentUser: null,
            showUsers: [],
            pickUsers: [],
            errors: {
                title: null
            }
        }
        this.userPattern = React.createRef();
        this.currency = React.createRef();
        this.title = React.createRef();
        this.inputChange = this.inputChange.bind(this);
        this.usersList = this.usersList.bind(this);
        this.divClick = this.divClick.bind(this);
        this.pickedUsers = this.pickedUsers.bind(this);
        this.delUser = this.delUser.bind(this);
        this.postAccount = this.postAccount.bind(this);
    }

     componentDidMount() {
         AccountService.currencies().then((response) => {
             response.json().then((body) =>{
                 this.setState({currencies: body});
             });
         })
         UserService.usersList().then((response) => {
             response.json().then((body) =>{
                 this.setState({users: body});
             });
         })
         UserService.me().then((response) => {
             response.json().then((body) =>{
                 this.setState({currentUser: body});
             });
         })
     }

     currenciesList() {
         return this.state.currencies.map(function (item, index) {
             return <option className={"account-create-option"}>{item.title}</option>
         })
     }

     inputChange() {
         if (!this.userPattern.current) return;
         const pattern = this.userPattern.current.value;
         if (pattern === '') {
             this.setState({
                 showUsers: []
             })
             return;
         }
         const state = this.state;
         this.setState({
             showUsers: this.state.users.filter(function (item, index) {
                 return item.email.includes(pattern) &&
                     (item.id !== state.currentUser.id) &&
                     (!state.pickUsers.includes(item.id.toString()));
             })
         })
     }

     divClick(event) {
        const id = event.target.id.split('-')[1];
        this.userPattern.current.value = '';
        this.setState({
            pickUsers: this.state.pickUsers.concat([id])
        })
     }

     usersList() {
        const handler = this.divClick
        return this.state.showUsers.map(function (item, index) {
            if (index < 3) {
                return <div className={"list-option"} id={"users-" + item.id}
                            onClick={handler}>{item.email}</div>
            }
        })
     }

     delUser(event) {
        const id = event.target.id.split('-')[3];
        const index = this.state.pickUsers.indexOf(id);
        let newArr = [...this.state.pickUsers];
        if (index !== -1) {
            newArr.splice(index, 1);
            this.setState({
                pickUsers: newArr
            })
        }
     }

     pickedUsers() {
        const users = this.state.users;
        const pickUsers = this.state.pickUsers;
        const delUsers = this.delUser;
        return pickUsers.map(function (elemPick, index) {
            return <div className={"picked-user"}>{users.find( function (elem, index) {
                return elem.id.toString() === elemPick;
            }).email}<button className={"del-button"}
                             id={"picked-user-btn-" + elemPick}
                             onClick={delUsers}>X</button></div>
        })
     }

    handleResponseError(response) {
        response.json().then(errorsData => {
            this.setState({
                errors: {
                    title: errorsData['title'] ? errorsData['title'] : '',
                }
            })
        })
    }

     postAccount() {
        const currency = this.currency.current.value;
        const currencyId = this.state.currencies.find(function (elem, ind) {
         return elem.title === currency;
        }).id;
        const account = {
            users: this.state.pickUsers,
            title: this.title.current.value,
            currency: currencyId
        }
        console.log(account);
        AccountService.createAccount(account).then(response => {
            if (!response.ok) {
                this.handleResponseError(response);
            } else {
                this.props.history.push('/accounts/');
            }
        }).catch(error => {
            console.log(error)      // this console log should not be removed
        });
     }

    render() {
        const { history } = this.props;
        return (<div className={"account-create-wrapper"}> {
            this.state.currencies && this.state.users && this.state.currentUser &&
        (<div className={"account-create-wrapper"}>
            <h1 className={"account-create-title"}>Account Create</h1>
            <div className={"form"}>
                {
                    this.state.errors.title &&
                    <div className='errorMessage'>
                        { this.state.errors.title }
                    </div>
                }
                <div className={"row"}>
                    <span className={"label"}>Title:</span>
                    <input className={"account-create-input"} placeholder="Title..." ref={this.title}/>
                </div>
                <div className={"row"}>
                    <span className={"label"}>Currency:</span>
                    <select className={"account-create-input"} placeholder="currency" ref={this.currency}>
                        {this.currenciesList()}
                    </select>
                </div>
                <div className={"row"}>
                    <span className={"label"}>Users:</span>
                    <div className={"user-search"}>
                        <input className={"account-create-input"} ref={this.userPattern}
                               placeholder="User..." onChange={this.inputChange}/>
                        {this.userPattern.current && this.userPattern.current.value && this.usersList()}
                    </div>
                </div>
                {this.pickedUsers()}
                <div className={"buttons-container"}>
                    <button className={"create"} onClick={this.postAccount}>Create</button>
                    <button className={"cancel"} onClick={() => history.push('/accounts')}>Cancel</button>
                </div>
            </div>
        </div>)}
        </div>)
    }
}

export default withRouter(AccountCreateComponent);
