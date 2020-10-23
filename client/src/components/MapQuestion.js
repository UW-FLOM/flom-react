import React, { PureComponent } from 'react';
import styled from 'styled-components';
import { Typography } from 'antd';

const { Text } = Typography;

const QuestionBox = styled.div`
  display: grid;
  align-items: center;
  border-radius: 4px;
  border: 1px solid #76bff4;
  background-color: #d4ebfc;
  padding: 15px 25px;
`;

class MapQuestion extends PureComponent {
  render(props) {
    return (
      <QuestionBox className={this.props.className}>
        <Typography>
          <Text>
            {this.props.text}
          </Text>
        </Typography>
      </QuestionBox>
    );
  }
}

export default MapQuestion;
