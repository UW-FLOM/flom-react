import { Component, useState } from 'react';
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

function EndRender(props) {
    var [index, setIndex] = useState(0)
    const { current, length, title, intro, progress, questions, onChange, id } = props;
    const next = () => {
       // const { index } = this.state;
       // const { questions } = props;
        var nextQuestionIndex = index + 1;
        console.log(`next: ${nextQuestionIndex} , question: ${JSON.stringify(questions)}, length: ${questions.length}, props: ${JSON.stringify(props)}`)
        const activityComplete = nextQuestionIndex >= questions.length;
        if (activityComplete) {
            const { onFinish } = props;
            onFinish();
        } else {
            setIndex = nextQuestionIndex;
        }
    }

    //const { current, length, title, intro, progress, questions, onChange, id } = props;
    // const setIndex = nextQuestionIndex;
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
                    onFinish={next}
                />
            ) : (
                <FormRender
                    questions={questions[index]}
                    onChange={onChange}
                    onFinish={next}
                />
            )}
        </PageRender>
    );
}



export default EndRender;
