import React from 'react';
import './login-component.css';
import { Link } from 'react-router-dom';
import AuthService from '../../services/auth-service';
import InputBoxComponent from "../common/input-box-component/input-box-component";

class LoginComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            errors: {
                email: '',
                password: '',
                non_field_errors: ''
            }
        };
        this.user = null;
        this.emailRef = React.createRef();
        this.passwordRef = React.createRef();
        this.logIn = this.logIn.bind(this);
    }

    handleResponseError(errorsData) {
        this.emailRef.current.updateError(errorsData['email'] ? errorsData['email'] : '');
        this.passwordRef.current.updateError(errorsData['password'] ? errorsData['password'] : '');
        this.setState({
            errors: {
                non_field_errors: errorsData['non_field_errors'] ? errorsData['non_field_errors'] : ''
            }
        })
    }

    logIn() {
        this.user = {
            email: this.emailRef.current.getValue(),
            password: this.passwordRef.current.getValue()
        }
        AuthService.login(this.user).then(body => {
            if (!body.token) {
                this.handleResponseError(body);
            } else {
                this.props.history.push('/');
            }
        }).catch(error => {
            console.log(error)
        });
    }

    render() {
        return(
            <div className='wrapper'>
                <div className='login-container'>
                    {
                        this.state.errors.non_field_errors &&
                        <div className='errorMessage'>
                            { this.state.errors.non_field_errors }
                        </div>
                    }
                    <InputBoxComponent title='Email:' type='text' inputId='email-input'
                                       errorMessage='' ref={this.emailRef}/>
                    <InputBoxComponent title='Password:' type='password' inputId='password-input'
                                       errorMessage='' ref={this.passwordRef}/>
                    <div className='button-area'>
                        <Link className='register-link' to='/registration'>Register now</Link>
                        <button onClick={this.logIn}>Log In</button>
                    </div>
                </div>
            </div>
        )
    }
}

export default LoginComponent;
