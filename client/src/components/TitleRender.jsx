import React from 'react';
import { Progress, Typography } from 'antd';
import PropTypes from 'prop-types';
import ParagraphRender from './ParagraphRender';

const { Title } = Typography;

function TitleRender({
  title, intro, current, length, id
}) {
  TitleRender.propTypes = {
    title: PropTypes.string.isRequired,
    intro: PropTypes.string,
    current: PropTypes.number,
    length: PropTypes.number,
  };

  TitleRender.defaultProps = {
    intro: undefined,
    current: undefined,
    length: undefined,
  };

  return (
    <Typography>
      {(current && length)
        ? (
          <div
            className="ant-page-header-heading-left"
            style={{
              paddingTop: '10px',
            }}
          >
            <Progress
              type="circle"
              percent={(current / length) * 100}
              width={50}
              format={() => `${current}/${length}`}
              style={{ marginRight: '12px' }}
            />
            <div
              className="ant-page-header-heading-title"
              style={{
                fontSize: '38px',
                lineHeight: 'initial',
                whiteSpace: 'initial',
              }}
            >
              {title}
            </div>
          </div>
        )
        : <Title>{title}</Title>}
      { intro && <ParagraphRender id={id} intro={intro} />}
    </Typography>
  );
}

export default TitleRender;
