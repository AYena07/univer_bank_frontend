import React from 'react';
import './left-column-component.css';
import { Link } from 'react-router-dom';

class LeftColumnComponent extends React.Component {

    constructor(props) {
        super(props);
    }

    closeNav() {
        document.getElementById("side-box").style.display = "none";
        document.getElementById("side-nav").style.width = "0";
    }

    openNav() {
        document.getElementById("side-box").style.display = "block";
        document.getElementById("side-nav").style.width = "250px";
    }

    render() {
        const path = this.props.location.pathname;
        return (
            <div>
                <div className={"burger-button"} onClick={this.openNav}>
                    <span className={"burger-text"} >&#9776;</span>
                </div>
                <div id="side-box" className="sidebox" onClick={this.closeNav}>
                </div>
                <div id="side-nav" className="sidenav">
                    <span className="closebtn x" onClick={this.closeNav}>&times;</span>
                    <Link className={(path === "/accounts" ? " selected" : " ") + " side-link"} to="/" onClick={this.closeNav}>My Bills</Link>
                    <Link className={(path === "/transactions" ? " selected" : " ") + " side-link"} to="/transactions" onClick={this.closeNav}>My Transactions</Link>
                    <Link className={(path === "/profile" ? " selected" : " ") + " side-link"} to="/" onClick={this.closeNav}>Profile</Link>
                </div>
            </div>
        )
    }
}

export default LeftColumnComponent;
