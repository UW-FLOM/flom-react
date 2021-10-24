import React from 'react';
import { Container } from 'react-bootstrap';
import PropTypes from 'prop-types';
import TitleRender from './TitleRender';

function PageRender({
  length, children, current, intro, title, id,
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
    <Container className="pageContainer">
      <TitleRender
        id={id}
        title={title}
        intro={intro}
        current={current}
        length={length}
      />
      {children}
    </Container>
  );
}

export default PageRender;
