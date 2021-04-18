import React from 'react';
import '../login-flow/login-component.css';
import { Link } from 'react-router-dom';
import AuthService from '../../services/auth-service';


class RegistrationComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            errors: {
                email: '',
                password: '',
                first_name: '',
                last_name: '',
                age: ''
            }
        };
        this.user = null;
        this.email = React.createRef();
        this.password = React.createRef();
        this.first_name = React.createRef();
        this.last_name = React.createRef();
        this.age = React.createRef();

        this.register = this.register.bind(this);
    }

    handleResponseError(response) {
        response.json().then(errorsData => {
            this.setState({
                errors: {
                    email: errorsData['email'] ? errorsData['email'] : '',
                    password: errorsData['password'] ? errorsData['password'] : '',
                    first_name: errorsData['first_name'] ? errorsData['first_name'] : '',
                    last_name: errorsData['last_name'] ? errorsData['last_name'] : '',
                    age: errorsData['age'] ? errorsData['age'] : ''
                }
            })
        })
    }



    register() {
        this.user = {
            email: this.email.current.value,
            password: this.password.current.value,
            first_name: this.first_name.current.value,
            last_name: this.last_name.current.value,
            age: this.age.current.value
        }
        AuthService.register(this.user).then(response => {
            if (!response.ok) {
                this.handleResponseError(response);
            } else {
                this.props.history.push('/registration/complete')
            }
        }).catch(error => {
            console.log(error)      // this console log should not be removed
        });
    }

    render() {
        return(
            <div className='wrapper'>
                <div className='login-container'>
                    <label>Email:</label>
                    {
                        this.state.errors.email &&
                        <div className='errorMessage'>
                            { this.state.errors.email }
                        </div>
                    }
                    <input type='text'
                           id='email-input'
                           ref={this.email}
                    />
                    <label>Password:</label>
                    {
                        this.state.errors.password &&
                        <div className='errorMessage'>
                            { this.state.errors.password }
                        </div>
                    }
                    <input type='password'
                           id='password-input'
                           ref={this.password}
                    />
                    <label>First name:</label>
                    {
                        this.state.errors.first_name &&
                        <div className='errorMessage'>
                            { this.state.errors.first_name }
                        </div>
                    }
                    <input type='text'
                           id='first-name-input'
                           ref={this.first_name}
                    />
                    <label>Last name:</label>
                    {
                        this.state.errors.last_name &&
                        <div className='errorMessage'>
                            { this.state.errors.last_name }
                        </div>
                    }
                    <input type='text'
                           id='last-name-input'
                           ref={this.last_name}
                    />
                    <label>Age:</label>
                    {
                        this.state.errors.age &&
                        <div className='errorMessage'>
                            { this.state.errors.age }
                        </div>
                    }
                    <input type='text'
                           id='age-input'
                           ref={this.age}
                    />
                    <div className='button-area'>
                        Already registered?
                        <Link className='login-link' to='/login'> Log in</Link>
                        <button onClick={ this.register }>Register</button>
                    </div>
                </div>
            </div>
        )
    }
}

export default RegistrationComponent;
