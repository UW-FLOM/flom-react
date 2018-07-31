import React, { Component } from 'react';
import { Header, PlainText } from '../components/Typography';

class ApiTestPage extends Component {
  state = {
    response: ''
  };

  componentDidMount() {
    console.log('things');
    
    this.callApi()
      .then(res => this.setState({ response: res.express }))
      .catch(err => console.log(err));
  }

  callApi = async () => {
    const response = await fetch('/api/hello');
    const body = await response.json();

    if (response.status !== 200) throw Error(body.message);

    return body;
  };

  render() {
    return (
      <div>
        <Header>Api tests</Header>
        <PlainText>
          {this.state.response}
        </PlainText>
      </div>
    );
  }
}

export default ApiTestPage;
