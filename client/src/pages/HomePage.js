import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Layout } from '../components/Layout';

import { Header, PlainText } from '../components/Typography';

class HomePage extends Component {
  render() {
    return (
      <Layout>
        <Header>Folk Linguistics Online Mapping</Header>
        <PlainText>
          Demo application for Folk Linguistics Online Mapping.
          There is a sample survey and a list of other available surveys.
        </PlainText>
        <ul>
          <li>
            <Link to="/survey/six_views_of_new_england">Trial survey</Link>
          </li>
          <li>
            <Link to="/surveys">Other demo surveys</Link>
          </li>
        </ul>
      </Layout>
    );
  }
}

export default HomePage;
