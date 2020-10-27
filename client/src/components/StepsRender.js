import React, { PureComponent } from 'react';
import { Steps } from 'antd';

class StepsRender extends PureComponent {
  render() {
    const { Step } = Steps;
    return (
        <Steps current={this.props.current}>
        {this.props.steps.map(item => (
          <Step title={item.title} />
        ))}
      </Steps>
    );
  }
}

export default StepsRender;
