import React, { PureComponent } from 'react';
import styled from 'styled-components';

import { PlainText } from '../components/Typography';

const QuestionBox = styled.div`
  display: grid;
  align-items: center;
  border-radius: 4px;
  border: 1px solid #76bff4;
  background-color: #d4ebfc;
  padding: 15px 25px;
`;

const QuestionText = styled(PlainText)`
  margin: auto;
`;

class MapQuestion extends PureComponent {
  render(props) {
    return (
      <QuestionBox className={this.props.className}>
        <QuestionText>
          {this.props.text}
        </QuestionText>
      </QuestionBox>
    );
  }
}

export default MapQuestion;
