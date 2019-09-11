import React, { Component } from 'react';

import { Header } from '../components/Typography';

class MapActivity extends Component {
  render() {

    return (
      <React.Fragment>
        <Header>{this.props.activity.title}</Header>
        {/* TODO: fill this out with a map and questions */}
      </React.Fragment>
    );
  }
}

export default MapActivity;
