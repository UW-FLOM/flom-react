function ParagraphRender({ intro, id }) {
  return (
    <>
      { intro.split('/n').map((item, idx) => (
        <p key={id + idx}>
          { item }
        </p>
      )) }
    </>
  );
}

export default ParagraphRender;
