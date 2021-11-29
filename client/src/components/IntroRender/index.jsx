import { Button } from 'react-bootstrap';
import ParagraphRender from '../ParagraphRender';

const IntroRender = function IntroRender({ title, intro, onFinish }) {
  return (
    <div className="pageContainer" style={{ overflow: 'hidden' }}>
      <div style={{
        textAlign: 'center',
        background: 'none',
        height: 'fit-content',
        padding: '20px',
      }}
      >
        <h3>{title}</h3>
      </div>
      <div style={{
        background: 'none',
        overflow: 'auto',
        padding: '0px 50px',
      }}
      >
        <ParagraphRender intro={intro} />
      </div>
      <div style={{
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
      </div>
    </div>
  );
};

export default IntroRender;
