import React from 'react';
import './input-box-component.css'

class InputBoxComponent extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            title: props['title'],
            type: props['type'],
            id: props['inputId'],
            errorMessage: props['errorMessage']
        }
        this.text = React.createRef();
    }

    updateError(message) {
        this.setState(
            {
                errorMessage: message
            }
        )
    }

    getValue() {
        return this.text.current.value;
    }

    render() {
        return (
            <div className='input-box-wrapper'>
                <label>{this.state.title}</label>
                {
                    this.state.errorMessage &&
                    <div className='errorMessage'>
                        { this.state.errorMessage }
                    </div>
                }
                <input type={this.state.type}
                       id={this.state.inputId}
                       ref={this.text}
                />
            </div>
        )
    }
}

export default InputBoxComponent;
