import React, { Component } from 'react';
import {
  Button, Layout, Switch, Divider,
} from 'antd';
import FormRender from './FormRender';
import ParagraphRender from './ParagraphRender';

const { Footer } = Layout;

class SwitchRender extends Component {
  constructor(prop) {
    super(prop);

    this.state = {
      displayForm: false,
    };
    this.displayFurther = this.displayFurther.bind(this);
    this.props.onChange(this.props.id, false);
  }

  displayFurther(status) {
    const { onChange, id } = this.props;
    onChange(id, status);
    this.setState({
      displayForm: status,
    });
  }

  render() {
    const {
      questions, id, title, onChange, onFinish, intro,
    } = this.props;
    const { displayForm } = this.state;
    return (
      <>
        { intro && <ParagraphRender intro={intro} style={{ marginBottom: '12px' }} />}
        <Switch
          key={id}
          onChange={this.displayFurther}
          style={{
            marginRight: '12px',
          }}
        />
        {title}
        {(displayForm && questions)
          ? (
            <>
              <Divider />
              <FormRender
                questions={questions}
                onChange={onChange}
                onFinish={onFinish}
              />
            </>
          )
          : (
            <Footer style={{
              left: '0',
              right: '0',
              bottom: '0',
              background: 'white',
              textAlign: 'center',
            }}
            >
              <Button type="primary" onClick={onFinish}>
                Next
              </Button>
            </Footer>
          )}
      </>
    );
  }
}

export default SwitchRender;
