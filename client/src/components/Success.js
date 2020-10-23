import React, { PureComponent } from "react";
import { Result, Button } from "antd";

class Success extends PureComponent {
  render(props) {
    return (
      <Result
        status="success"
        title="Survey Complete"
        subTitle="Thank you for participating!"
      />
    );
  }
}

export default Success;
