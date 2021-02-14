import React, { Component } from 'react';
import {
  Form, Input, Select, Button, Rate, InputNumber, Radio, Checkbox, Typography, Row, Col,
} from 'antd';

import AudioButton from './AudioButton';

const { Option } = Select;
const { TextArea } = Input;
const { Text } = Typography;

import { map } from 'lodash';

function Label(props) {
  return (
    <>
      <Text>{props.label}</Text>
      {props.audio && <AudioButton src={props.audio}/>}
    </>
  );
}

function RateRender(props) {
  return (
    <>
      <span className="ant-rate-text">{props.least}</span>
      <Rate
        onChange={props.onChange}
      />
      <span className="ant-rate-text">{props.best}</span>
    </>
  );
}

class FormRender extends Component {
  render() {
    const {
      questions,
      onChange,
      onFinish,
    } = this.props;

    const updateResponse = (values: any) => {
      console.log('Success:', values);
      map(values, (value, key) => {
        if (value !== undefined) {
          onChange(key, value);
        }
      });
      onFinish();
    };

    return (
      <Form
        layout="vertical"
        onFinish={updateResponse}
      >
        {questions.map((question, idx) => {
          const rules = { required: true };
          if (question.required) {
            rules.required = (question.required === 'true');
          }
          if (question.min) {
            rules.type = 'number';
            rules.min = parseInt(question.min);
          }
          if (question.type === 'text') {
            return (
              <Form.Item
                key={idx}
                name={question.id}
                label={<Label label={question.title} audio={question.audio}/>}
                rules={[rules]}
              >
                <Input/>
              </Form.Item>
            );
          }
          if (question.type === 'select') {
            return (
              <Form.Item
                key={idx}
                name={question.id}
                label={<Label label={question.title} audio={question.audio}/>}
                rules={[rules]}
              >
                <Select
                  showSearch={question.searchable || false}
                >
                  {question.options.map((option) => (
                    <Option
                      key={option.id}
                      value={option.id}
                    >
                      {option.text}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            );
          }
          if (question.type === 'rate') {
            return (
              <Form.Item
                key={idx}
                label={<Label label={question.title} audio={question.audio}/>}
              >
                <span className="ant-rate-text">{question.least}</span>
                <Form.Item
                  name={question.id}
                  rules={[rules]}
                  noStyle>
                  <Rate/>
                </Form.Item>
                <span className="ant-rate-text">{question.best}</span>
              </Form.Item>
            );
          }
          if (question.type === 'num') {
            return (
              <Form.Item
                key={idx}
                name={question.id}
                label={<Label label={question.title} audio={question.audio}/>}
                rules={[rules]}
              >
                <InputNumber/>
              </Form.Item>
            );
          }
          if (question.type === 'textarea') {
            return (
              <Form.Item
                key={idx}
                name={question.id}
                label={<Label label={question.title} audio={question.audio}/>}
                rules={[rules]}
              >
                <TextArea
                  rows={4}
                />
              </Form.Item>
            );
          }
          if (question.type === 'radio') {
            return (
              <Form.Item
                key={idx}
                name={question.id}
                label={<Label label={question.title} audio={question.audio}/>}
                rules={[rules]}
              >
                <Radio.Group>
                  {question.options.map((option) => (
                    <Radio
                      key={option.id}
                      value={option.id}
                    >
                      {option.text}
                    </Radio>
                  ))}
                </Radio.Group>
              </Form.Item>
            );
          }
          if (question.type === 'boolean') {
            return (
              <Form.Item
                key={idx}
                name={question.id}
                label={<Label label={question.title} audio={question.audio}/>}
                rules={[rules]}
              >
                <Radio.Group>
                  <Radio
                    key="true"
                    value="true"
                  >
                    Yes
                  </Radio>
                  <Radio
                    key="false"
                    value="false"
                  >
                    No
                  </Radio>
                </Radio.Group>
              </Form.Item>
            );
          }
          if (question.type === 'checkbox') {
            return (
              <Form.Item
                key={idx}
                name={question.id}
                label={<Label label={question.title} audio={question.audio}/>}
                rules={[rules]}
              >
                <Checkbox.Group
                  options={question.options}
                />
              </Form.Item>
            );
          }
        })}
        <Form.Item>
          <Row justify="center">
            <Button type="primary" htmlType="submit">
              Next
            </Button>
          </Row>
        </Form.Item>
      </Form>
    );
  }
}

export default FormRender;
