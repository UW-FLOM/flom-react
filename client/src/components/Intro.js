import React, { PureComponent } from 'react';
import styled from 'styled-components';
import { Button, Typography } from 'antd';
import '../App.css';

const { Title, Paragraph } = Typography;

const ConsentButton = styled(Button)`
  margin: auto;
`;

class Intro extends PureComponent {
  render() {
    return (
      <Typography>
        <Title>{this.props.title}</Title>
        <Paragraph>
          {this.props.intro}
        </Paragraph>
        <ConsentButton onClick={this.props.onBeginClick} type="primary">
          {this.props.startButtonText || "Begin"}
        </ConsentButton>
      </Typography>
    );
  }
}

export default Intro;
