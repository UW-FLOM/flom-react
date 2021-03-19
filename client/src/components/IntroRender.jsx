import React from 'react';
import { Button, Typography, Layout } from 'antd';
import ParagraphRender from './ParagraphRender';

const { Title } = Typography;
const { Header, Content, Footer } = Layout;

function IntroRender({ title, intro, onFinish }) {
  return (
    <Layout className="pageContainer" style={{ overflow: 'hidden' }}>
      <Header style={{
        textAlign: 'center',
        background: 'none',
        height: 'fit-content',
        padding: '20px',
      }}
      >
        <Title>{title}</Title>
      </Header>
      <Content style={{
        background: 'none',
        overflow: 'auto',
        padding: '0px 50px',
      }}
      >
        <ParagraphRender intro={intro} />
      </Content>
      <Footer style={{
        left: '0',
        right: '0',
        bottom: '0',
        background: 'white',
        textAlign: 'center',
      }}
      >
        <Button onClick={onFinish} type="primary">
          Begin
        </Button>
      </Footer>
    </Layout>
  );
}

export default IntroRender;
