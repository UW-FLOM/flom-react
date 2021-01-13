import React, { Component, PureComponent } from 'react';
import { Typography, Layout, Steps } from 'antd';

const { Title, Paragraph } = Typography;
const { Header, Content } = Layout;

const defaultStyle = {
  margin: 'auto',
  maxWidth: '900px',
  minWidth: '320px',
  background: 'none',
};

const mapStyle = {
  background: 'none',
  height: '100%',
  width: '100%',
};

class TitleRender extends PureComponent {
  render() {
    return (
      <>
        <Title>{this.props.title}</Title>
        <Paragraph>
          {this.props.intro}
        </Paragraph>
      </>
    );
  }
}

class StepsRender extends PureComponent {
  render() {
    const { Step } = Steps;
    return (
      <Steps current={this.props.current}>
        {this.props.steps.map((item, idx) => (
          <Step key={idx} title={item.title} />
        ))}
      </Steps>
    );
  }
}

class PageRender extends Component {
  render() {
    return (
      <Layout
        style={
          this.props.type === 'map'
            ? mapStyle
            : defaultStyle
        }
      >
        {this.props.steps
          && (
          <Header
            style={{
              background: 'none',
              height: 'auto',
              padding: '10px 50px',
            }}
          >
            <StepsRender
              current={this.props.currentPage}
              steps={this.props.activities}
            />
          </Header>
          )}
        {this.props.type === 'map'
          ? this.props.children
          : (
            <Content
              style={{
                padding: '0 50px',
              }}
            >
              <TitleRender
                title={this.props.title || this.props.activities[this.props.currentPage].title}
                intro={this.props.intro || this.props.activities[this.props.currentPage].intro}
              />
              {this.props.children}
            </Content>
          )}
      </Layout>
    );
  }
}

export default PageRender;
