import React, { Component } from 'react';
import { getServerTest, logPostBody } from '../services/api'
import { Header, PlainText } from '../components/Typography';

import { FormControl } from 'react-bootstrap';


class ApiTestPage extends Component {
  state = {
    response: ''
  };

  componentDidMount() {
    getServerTest()
      .then(res => this.setState({ response: res.express }))
      .catch(err => console.log(err));
    logPostBody({thing: 'monkey'})
      .then()
  }

  render() {
    return (
      <div>
        <Header>Api tests</Header>
        <PlainText>
          {this.state.response}
        </PlainText>
        <FormControl type="text" placeholder="Send text to server" />
      </div>
    );
  }
}

export default ApiTestPage;
