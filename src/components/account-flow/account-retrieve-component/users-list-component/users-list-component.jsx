import React from 'react';
import UserService from "../../../../services/user-service";
import AccountService from "../../../../services/account-service";
import '../account-retrieve-component.css';

class UsersListComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            users: null,
            showUsers: [],
            pickUsers: this.props.account.users.map((id) => {return id.toString()})
        }
        this.userPattern = React.createRef();
        this.inputChange = this.inputChange.bind(this);
        this.pickedUsers = this.pickedUsers.bind(this);
        this.divClick = this.divClick.bind(this);
        this.delUser = this.delUser.bind(this);
        this.postAccount = this.postAccount.bind(this);
        this.cancel = this.cancel.bind(this);
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
        const currentUser = this.props.currentUser;
        this.setState({
            showUsers: this.state.users.filter(function (item, index) {
                return item.email.includes(pattern) &&
                    (item.id !== currentUser.id) &&
                    (!state.pickUsers.includes(item.id.toString()));
            })
        })
    }

    usersList() {
        const handler = this.divClick;
        return this.state.showUsers.map(function (item, index) {
            if (index < 3) {
                return <div className={"list-option list-option-retrieve"} id={"users-" + item.id}
                            onClick={handler}>{item.email}</div>
            }
        })
    }

    divClick(event) {
        const id = event.target.id.split('-')[1];
        this.userPattern.current.value = '';
        this.setState({
            pickUsers: this.state.pickUsers.concat([id])
        })
    }

    componentDidMount() {
        UserService.usersList().then((response) => {
            response.json().then((body) =>{
                this.setState({users: body});
            });
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

    postAccount() {
        this.props.account.users = this.state.pickUsers;
        const changeParentState = this.props.changeParentState;
        const account = this.props.account;
        AccountService.changeAccount(this.props.account).then(function () {
            changeParentState({
                usersModal: false,
                account: account
            })
        });
    }

    cancel() {
        const changeParentState = this.props.changeParentState;
        changeParentState({
            usersModal: false
        });
    }

    pickedUsers() {
        const users = this.state.users;
        const pickUsers = this.state.pickUsers;
        const delUsers = this.delUser;
        return pickUsers.map(function (elemPick, index) {
            return <div className={"picked-user"}>{users.find( function (elem, index) {
                return elem.id.toString() === elemPick.toString();
            }).email}<button className={"del-button"}
                             id={"picked-user-btn-" + elemPick}
                             onClick={delUsers}>X</button></div>
        })
    }

    render() {
        return <div className={"modal-content"}>{
            this.state.users && (<div>
                <div className={"bottom-row title"} >Users:</div>
                <div className={"bottom-row pick-user-row"}>
                    Add new user
                    <input className={"account-create-input"} ref={this.userPattern}
                           placeholder="User..." onChange={this.inputChange}/>
                    {this.userPattern.current && this.userPattern.current.value && this.usersList()}
                </div>
                <div className={"users"}>
                    {this.pickedUsers()}
                </div>
                <div className={"buttons-container"}>
                    <button className={"create"} onClick={this.postAccount}>Save</button>
                    <button className={"cancel"} onClick={this.cancel}>Cancel</button>
                </div>
            </div>)}
        </div>
    }

}

export default UsersListComponent;
