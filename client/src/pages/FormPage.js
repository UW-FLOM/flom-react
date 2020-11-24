import React, { Component } from 'react';
import styled from 'styled-components';
import { Button, Typography } from 'antd';

import FormRenderer from '../components/FormRenderer';

const { Title, Paragraph } = Typography;

class FormPage extends Component {

  render() {
    return (
      <div>
        <Title>{this.props.activity.title}</Title>
        <Paragraph>
          {this.props.activity.helpText}
        </Paragraph>
        <FormRenderer
          questions={this.props.activity.questions}
          onValueChange={this.props.onUpdate}
          values={this.props.values}
          onFinish={this.props.onFinish}
        />
      </div>
    );
  }
}

export default FormPage;
