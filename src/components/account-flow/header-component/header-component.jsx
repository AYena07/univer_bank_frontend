import './header-component.css'
import React from 'react';
import AuthService from '../../../services/auth-service';

class HeaderComponent extends React.Component {
    constructor(props) {
        super(props);
        this.logout = this.logout.bind(this)
    }

    logout = () => {
        const history = this.props.history;
        AuthService.logout().then(function () {
            history.push('/login');
        })
    }

    render() {
        return (
            <div>
                <div className="bar">
                    <h2>Artem</h2>
                    <div className='link' onClick={this.logout}>logout</div>
                </div>
            </div>
        );
    }
}

export default HeaderComponent;
