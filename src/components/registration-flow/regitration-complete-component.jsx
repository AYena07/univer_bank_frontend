import React from 'react';
import {Link} from "react-router-dom";
import './registration-complete-component.css';

class RegistrationCompleteComponent extends React.Component {
    render() {
        return <div className='reg-complete-block'>
            <h1>Your registration successfully completed!</h1>
            <Link className='login-link' to='/login'> Log in</Link>
        </div>
    }
}

export default RegistrationCompleteComponent;
