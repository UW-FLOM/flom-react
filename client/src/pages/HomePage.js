import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Header, PlainText } from '../components/Typography';

class HomePage extends Component {
  render() {
    return (
      <div>
        <Header>Folk Linguistics Online Mapping</Header>
        <PlainText>
          Demo application for Folk Linguistics Online Mapping.
          This app shows the various components and how to use them. 
          There is also a demo.
        </PlainText>
        <ul>
          <li>
            <Link to="/sample_form">Sample Input Form</Link>
          </li>
          <li>
            <Link to="/map_tool">Map Tool Demo</Link>
          </li>
          <li>
            <Link to="/api_test">API Test</Link>
          </li>
        </ul>
      </div>
    );
  }
}

export default HomePage;
