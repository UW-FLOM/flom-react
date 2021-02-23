import React from 'react';
import { Layout } from 'antd';
import PropTypes from 'prop-types';
import TitleRender from './TitleRender';

const { Content } = Layout;

export default function PageRender({
  length, children, current, intro, title,
}) {
  PageRender.propTypes = {
    title: PropTypes.string.isRequired,
    children: PropTypes.element.isRequired,
    intro: PropTypes.string,
    current: PropTypes.number,
    length: PropTypes.number,
  };

  PageRender.defaultProps = {
    intro: undefined,
    current: undefined,
    length: undefined,
  };

  return (
    <Layout className="pageContainer">
      <Content
        style={{
          padding: '0 50px',
        }}
      >
        <TitleRender
          title={title}
          intro={intro}
          current={current}
          length={length}
        />
        {children}
      </Content>
    </Layout>
  );
}
