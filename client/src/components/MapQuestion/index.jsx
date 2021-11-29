import { useState, useEffect } from 'react';
import {
  Button, Card, Col, Container, Row,
} from 'react-bootstrap';
import { BsPlus } from 'react-icons/bs';
import { map } from 'lodash';

import QuestionPanel from '../QuestionPanel';

const MapQuestion = function MapQuestion({
  activity, mode, values, fireDraw, onChange, updateQuestionID, changeGIS, onFinish,
}) {
  const [index, setIndex] = useState(0);
  const [complete, setComplete] = useState(false);

  const initQuestions = () => {
    let result = activity.questions;

    if (activity.function === 'freedraw') {
      result = [{
        title: 'Draw New Area',
        id: activity.id + index,
        questions: [
          {
            title: 'Name this area',
            type: 'text',
            id: 'name',
          },
        ],
      }];
    }

    if (activity.function === 'additional') {
      const areas = values[activity.basedOn];
      result = [];
      // eslint-disable-next-line no-return-assign
      map(areas, (area, id) => (
        result = [...result, {
          title: `About ${area.name}`,
          id,
          geometry: area.geometry,
          questions: activity.questions,
        }]
      ));
    }
    return result;
  };

  const [questions, setQuestions] = useState(() => initQuestions());

  useEffect(() => {
    setQuestions(initQuestions());
    setComplete(false);
  }, [activity]);

  const addMapQuestion = () => {
    const newIndex = index + 1;

    setIndex(newIndex);
    setQuestions([...questions, {
      title: 'Draw New Area',
      id: activity.id + newIndex,
      questions: [
        {
          title: 'Name this area',
          type: 'text',
          id: 'name',
        },
      ],
    }]);
    setComplete(false);
  };

  const nextQuestion = () => {
    const nextQuestionIndex = index + 1;
    const activityComplete = nextQuestionIndex >= questions.length;
    document.getElementById('side').scroll({ top: 0 });
    document.getElementById('mapContainer').scroll({ top: 0 });
    if (activityComplete) {
      if (activity.function === 'freedraw') {
        setComplete(true);
      } else {
        onFinish();
      }
    } else {
      setIndex(nextQuestionIndex);
    }
  };

  return (
    <div>
      {complete
        ? (
          <>
            <div className="d-grid gap-2">
              <Button
                variant="outline-primary"
                style={{
                  marginBottom: '20px',
                  height: '139px',
                }}
                onClick={addMapQuestion}
              >
                <BsPlus />
                {' '}
                Add Another Area
              </Button>
            </div>
            <Container>
              <Row>
                <Col align="center">
                  <Button variant="primary" onClick={onFinish}>
                    Next
                  </Button>
                </Col>
              </Row>
            </Container>
          </>
        )
        : (
          <Card
            key={questions[index].id}
          >
            <Card.Header>{questions[index].title}</Card.Header>
            <Card.Body>
              <QuestionPanel
                key={questions[index].id}
                noDraw={(activity.function === 'additional')}
                question={questions[index]}
                values={values[activity.id]}
                fireDraw={fireDraw}
                onChange={onChange}
                updateQuestionID={updateQuestionID}
                changeGIS={changeGIS}
                onFinish={nextQuestion}
                mode={mode}
              />
            </Card.Body>
          </Card>
        )}
    </div>
  );
};

export default MapQuestion;
