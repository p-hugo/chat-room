import React, {Component} from 'react'
import InputPresenter from "./Input.presenter";
import PropTypes from 'prop-types';

export default class InputContainer extends Component {
    static propTypes = {
        // Function that triggers once user submits an input
        onEnter: PropTypes.func.isRequired
    };

    state = { value: '' };

    handleChange = ({ target }) => {
        this.setState({ value: target.value });
        if(this.props.typing){
            this.props.typing();
        }
    };

    handleKeyPress = ({ key }) => {
        if (key === `Enter`){
            this.props.onEnter(this.state.value);
            this.setState({ value: "" });
        }
    };

    render() {
        return <InputPresenter
                value={this.state.value}
                handleChange={this.handleChange}
                handleKeyPress={this.handleKeyPress}
                placeholder={this.props.placeholder}
        />
    }
}
