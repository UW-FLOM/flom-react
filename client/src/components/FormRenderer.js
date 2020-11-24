import React from 'react';
import { Form, Input, Rate, Select, Button } from 'antd';

const { Option } = Select;

// Renders a set of form input and calls a callback when one changes
// Inputs:
//    questions -> a list of question objects like:
//      [{question: "This is question text?", type: "select", options: Array(2)}, ...]
//    onValueChange -> a callback for when the value of an input changes, signature:
//      onValueChange(questionId, questionData)
//    values -> a map of values for the controlled form inputs like:
//      { <questionId>: {response: <some value>, ... }, ...}
const FormRenderer = (props) => {
  const { questions, onValueChange, values, onFinish } = props;



  return (
    <Form
      layout="vertical"
      onFinish={onFinish}
    >
      {questions.map((question, idx) => {
        if (question.type === 'text') {
          return (
            <Form.Item
              key={idx}
              name={question.id}
              label={question.title}
              rules={[{ required: true }]}
            >
              <Input
                value={values[question.id] || ""}
                onChange={event => {
                  onValueChange(question.id, event.target.value);
                }}
              />
            </Form.Item>
          );
        } else if (question.type === 'select') {
          return (
            <Form.Item
              key={idx}
              name={question.id}
              label={question.title}
              rules={[{ required: true }]}
            >
              <Select
                value={values[question.id] || ""}
                onChange={value => {
                  onValueChange(question.id, value);
                }}
              >
                {question.options.map((option) => {
                  return (
                    <Option
                      key={option.id}
                      value={option.id}
                    >
                      {option.text}
                    </Option>
                  );
                })}
              </Select>
            </Form.Item>
          );
        } else if (question.type === 'rate') {
          return (
            <Form.Item
              key={idx}
              name={question.id}
              label={question.title}
              rules={[{ required: true }]}
            >
              <Rate
                value={values[question.id] || 0}
                tooltips={question.desc}
                onChange={value => {
                  onValueChange(question.id, value);
                }}
              />
              {values[question.id] ? <span className="ant-rate-text">{question.desc[values[question.id] - 1]}</span> : ''}
            </Form.Item>
          )
        }
      })}
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};


export default FormRenderer;
