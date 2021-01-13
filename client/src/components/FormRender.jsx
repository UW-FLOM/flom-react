import React, { Component } from 'react';
import {
  Form, Input, Select, Button, Rate, InputNumber, Radio, Checkbox, Typography,
} from 'antd';

import AudioButton from './AudioButton';

const { Option } = Select;
const { TextArea } = Input;
const { Text } = Typography;

function Label(props) {
  return (
    <>
      <Text>{props.label}</Text>
      {props.audio && <AudioButton src={props.audio} />}
    </>
  );
}

function RateRender(props) {
  return (
    <>
      <span className="ant-rate-text">{props.least}</span>
      <Rate
        value={props.value || null}
        onChange={props.onChange}
      />
      <span className="ant-rate-text">{props.best}</span>
    </>
  );
}

function ItemRenderer(props) {
  const { question, values } = props;

  if (question.type === 'text') {
    return (
      <Input
        value={values[question.id] || ''}
        onChange={(event) => {
          this.props.onChange(question.id, event.target.value);
        }}
      />
    );
  }
  if (question.type === 'select') {
    return (
      <Select
        showSearch={question.searchable || false}
        value={values[question.id] || ''}
        onChange={(value) => {
          props.onChange(question.id, value);
        }}
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

    );
  }
  if (question.type === 'rate') {
    return (
      <RateRender
        value={values[question.id] || null}
        onChange={(value) => {
          props.onChange(question.id, value);
        }}
        least={question.least}
        best={question.best}
      />
    );
  }
  if (question.type === 'num') {
    return (
      <InputNumber
        value={values[question.id]}
        onChange={(value) => {
          props.onChange(question.id, value);
        }}
      />
    );
  }
  if (question.type === 'textarea') {
    return (
      <TextArea
        rows={4}
        value={values[question.id]}
        onChange={(event) => {
          props.onChange(question.id, event.target.value);
        }}
      />
    );
  }
  if (question.type === 'radio') {
    return (
      <Radio.Group
        value={values[question.id] || ''}
        onChange={(event) => {
          props.onChange(question.id, event.target.value);
        }}
      >
        {question.options.map((option) => (
          <Radio
            key={option.id}
            value={option.id}
          >
            {option.text}
          </Radio>
        ))}
      </Radio.Group>
    );
  }
  if (question.type === 'checkbox') {
    return (
      <Checkbox.Group
        options={question.options}
        value={values[question.id] || ''}
        onChange={(value) => {
          props.onChange(question.id, value);
        }}
      />
    );
  }
}

class FormRender extends Component {
  render() {
    const {
      questions, onChange, values, onFinish,
    } = this.props;

    return (
      <Form
        layout="vertical"
        onFinish={onFinish}
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
          return (
            <Form.Item
              key={idx}
              name={question.id}
              label={<Label label={question.title} audio={question.audio} />}
              rules={[rules]}
            >
              <ItemRenderer
                question={question}
                values={values}
                onChange={onChange}
              />
            </Form.Item>
          );
        })}
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    );
  }
}

export default FormRender;
