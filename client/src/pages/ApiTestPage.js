import React, { Component } from 'react';
import { getServerTest, logPostBody } from '../services/api'
import { Header, PlainText } from '../components/Typography';

import { FormControl } from 'react-bootstrap';


class ApiTestPage extends Component {
  state = {
    response: '',
    inputValue: ''
  };

  componentDidMount() {
    getServerTest()
      .then(res => this.setState({ response: res.express }))
      .catch(err => console.log(err));
  }

  handleChangeTextBoxChange = (e) => {
    this.setState({inputValue: e.target.value})
  }

  handleEnter = () => {
    const textToSend = this.state.inputValue;
    this.setState({inputValue: ''})
    logPostBody({text: textToSend})
      .then(res => console.log(res.express))
  }

  render() {
    return (
      <div>
        <Header>Api tests</Header>
        <PlainText>
          {this.state.response}
        </PlainText>
        <FormControl
          type="text"
          placeholder="Send text to server" 
          value={this.state.inputValue}
          onChange={this.handleChangeTextBoxChange}
          onKeyPress={event => {
            if (event.key === "Enter") {
              this.handleEnter();
            }
          }}
        />
      </div>
    );
  }
}

export default ApiTestPage;
