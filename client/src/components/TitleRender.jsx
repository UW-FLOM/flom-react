import React from 'react';
import { ProgressBar } from 'react-bootstrap';
import PropTypes from 'prop-types';
import ParagraphRender from './ParagraphRender';

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
    <>
      {(current && length)
        ? (
          <div
            className="ant-page-header-heading-left"
            style={{
              paddingTop: '10px',
              paddingBottom: '10px',
            }}
          >
            <ProgressBar
              now={(current / length) * 100}
            />
            <div
              className="ant-page-header-heading-title"
              style={{
                fontSize: '38px',
                lineHeight: 'initial',
                whiteSpace: 'initial',
              }}
            >
              <h2>{title}</h2>
            </div>
          </div>
        )
        : <h2>{title}</h2>}
      { intro && <ParagraphRender id={id} intro={intro} />}
    </>
  );
}

export default TitleRender;
