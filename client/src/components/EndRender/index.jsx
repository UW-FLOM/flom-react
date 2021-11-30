import { Component } from 'react';
import PageRender from '../PageRender';
import SwitchRender from '../SwitchRender';
import FormRender from '../FormRender';
import ParagraphRender from '../ParagraphRender';

const comment = [
  {
    title: 'Draw New Area',
    id: 'comment',
    questions: [
      {
        title: 'Do you have any comments or feedback about this online survey?',
        type: 'textarea',
        id: 'comment',
      },
    ],
  },
];
class EndRender extends Component {
  constructor(prop) {
    super(prop);

    this.state = {
      index: 0,
    };
    this.next = this.next.bind(this);
  }

  next() {
    const { index } = this.state;
    const { questions } = this.props;
    const nextQuestionIndex = index + 1;
    const activityComplete = nextQuestionIndex >= questions.length;
    if (activityComplete) {
      const { onFinish } = this.props;
      onFinish();
    } else {
      this.setState({
        index: nextQuestionIndex,
      });
    }
  }

  render() {
    const { current, length, title, intro, progress, questions, onChange, id } =
      this.props;
    const { index } = this.state;
    return (
      <PageRender
        id={id}
        current={current}
        length={length}
        title={title}
        intro={intro}
        progress={progress}
      >
        {questions[index].intro && (
          <ParagraphRender
            id={questions[index].id}
            intro={questions[index].intro}
          />
        )}
        {questions[index].type === 'switch' ? (
          <SwitchRender
            key={questions[index].id}
            id={questions[index].id}
            onChange={onChange}
            title={questions[index].title}
            questions={questions[index].questions}
            onFinish={this.next}
          />
        ) : (
          <FormRender
            questions={questions[index]}
            onChange={onChange}
            onFinish={this.next}
          />
        )}
      </PageRender>
    );
  }
}

export default EndRender;
