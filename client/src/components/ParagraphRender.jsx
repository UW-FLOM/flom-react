import { Typography } from 'antd';
import React from 'react';

const { Paragraph } = Typography;

function ParagraphRender({ intro, id }) {
  return (
    <Typography>
      { intro.split('/n').map((item, idx) => (
        <Paragraph key={id + idx}>
          { item }
        </Paragraph>
      )) }
    </Typography>
  );
}

export default ParagraphRender;
