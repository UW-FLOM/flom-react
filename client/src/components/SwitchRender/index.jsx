import { values } from 'lodash';
import { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import FormRender from '../FormRender';
import ParagraphRender from '../ParagraphRender';
import PageRender from '../PageRender';

function SwitchRender(props) {
    var [ state, setState ] = useState(false)
    var { questions, id, title, onChange, onFinish, intro, values, current, length, isComplete } = props;
    //console.log(`onFinish: ${onFinish} state: ${state}`)

    const handleDisplayFurther = (event) => {
        const result = event.target.checked;
        onChange(id, result);
        setState(result);

    }

    return (
        <>
            {typeof intro != 'undefined' && (
                <ParagraphRender intro={intro} style={{ marginBottom: '12px' }} />
            )}       
        <Form>
            <Form.Check
                type="switch"
                key={id}
                id={id}
                label={title}
                onChange={handleDisplayFurther}
            />
        </Form>
            {state ? (
                <PageRender
                    id={id}
                    current={current}
                    length={length}
                    title={title}
                    intro={intro}
                    progress
                >
                    <FormRender
                        questions={questions}
                        onChange={onChange}
                        values={values}
                        onFinish={onFinish}
                    />
                </PageRender>
            ) : (NULL


            )}
    </>
    )
};

export default SwitchRender;