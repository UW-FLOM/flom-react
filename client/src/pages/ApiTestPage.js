import React, { Component } from 'react';
import styled from 'styled-components';

import { getServerTest, logPostBody, sendSql } from '../services/api';
import { Header, PlainText, Title } from '../components/Typography';

import { FormControl } from 'react-bootstrap';

const StaticResponse = styled(PlainText)`
  color: steelblue;
`;
const EchoResponse = styled(PlainText)`
  color: steelblue;
  margin-top: 5px;
`;
class ApiTestPage extends Component {
  state = {
    staticResponse: '',
    echoResponse: '',
    echoInputValue: '',

    sqlResponse: '',
    sqlInputValue: '',
  };

  componentDidMount() {
    getServerTest()
      .then(res => this.setState({ staticResponse: res.express }))
      .catch(err => console.log(err));
  }

  handleEchoTextBoxChange = (e) => {
    this.setState({ echoInputValue: e.target.value });
  }

  handleSqlTextBoxChange = (e) => {
    this.setState({ sqlInputValue: e.target.value });
  }

  handleEchoEnter = () => {
    const textToSend = this.state.echoInputValue;
    this.setState({ echoInputValue: '' });
    logPostBody({ text: textToSend })
      .then(res => this.setState({ echoResponse: res.text }));
  }

  handleSqlEnter = () => {
    const query = this.state.sqlInputValue;
    this.setState({ sqlInputValue: '' });
    console.log(query);

    sendSql({ query: query })
      .then(res => this.setState({ sqlResponse: res }));
  }

  render() {
    return (
      <div>
        <Header>Api tests</Header>
        <Title>Static server response</Title>
        <StaticResponse>
          {this.state.staticResponse}
        </StaticResponse>
        <Title>Echo</Title>
        <PlainText>Echos request text</PlainText>
        <FormControl
          type="text"
          placeholder="Send text to server"
          value={this.state.echoInputValue}
          onChange={this.handleEchoTextBoxChange}
          onKeyPress={event => {
            if (event.key === "Enter") {
              this.handleEchoEnter();
            }
          }}
        />
        {
          this.state.echoResponse &&
          <EchoResponse>Server response: {this.state.echoResponse}</EchoResponse>
        }
        <Title>Dangerous SQL</Title>
        <FormControl
          type="text"
          placeholder="Dangerously send SQL to server"
          value={this.state.sqlInputValue}
          onChange={this.handleSqlTextBoxChange}
          onKeyPress={event => {
            if (event.key === "Enter") {
              this.handleSqlEnter();
            }
          }}
        />
        {
          this.state.sqlResponse &&
          <EchoResponse>
            PSQL response: {JSON.stringify(this.state.sqlResponse)}
          </EchoResponse>
        }
      </div>
    );
  }
}

export default ApiTestPage;
