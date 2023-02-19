import { useRef, useState } from 'react';
import { Alert, Button, Form, Card, Col } from 'react-bootstrap';


import { surveyAddPageUpload, surveyModify } from '../../services/api';
import { dateRead, dateWrite } from '../../components/Time';
import { FileUpload } from '../../components/FileUpload';
import { Menu } from '../../components/Menu';
// import auth from '../../services/auth';

function SurveyAddPage() {
    const childRef = useRef(null);
    const [newSurvey, setNewSurvey] = useState({
        visible: true,
        start_time: Date.now() - (86400000)
    });

    //const [upload, setUpload] = useState(false);
    const [loading, setLoading] = useState(false);

    const onChange = (event) => {
        var data;
        switch (event.target.type) {
            case 'checkbox':
                data = event.target.checked;
                //console.log(data)
                break;
            case 'date':
                data = dateWrite(event.target.value);
                break;
            default:
                data = event.target.value;
        }
        setNewSurvey({
            ...newSurvey,
            [event.target.id]: data,
        });
        //console.log(`data: ${JSON.stringify(newSurvey)}`)
    }

    const create = (event) => {
        //setLoading(true);
        event.preventDefault();
        var mode = "add";
        surveyModify(newSurvey, mode);
        if (newSurvey.upload === true) {childRef.current.onUpload(newSurvey.id);}
    };
    
    return (
        <>
        <Menu />          
        <div className="form-NewSurvey" onSubmit={create}>
            <Form className="text-center">
                <h1 className="h3 font-weight-normal">New Survey</h1>
                <Form.Group className="mb-3">
                    <Form.Control
                        className="form-control"
                        id="id"
                        label="id"
                        placeholder="Unique Identifier"
                        required
                        onChange={onChange}
                    />
                    <Form.Control
                        className="form-control"
                        id="name"
                        placeholder="Survey Name"
                        required
                        onChange={onChange}
                    />
                    <Form.Control
                        className="form-control"
                        id="details"
                        as="textarea"
                        placeholder='{"Json" : "Details"}'
                        required
                        onChange={onChange}
                    />
                    <Form.Control
                        className="form-control"
                        id="start_time"
                        type="date"
                        value={dateRead(newSurvey.start_time)}
                        required
                        onChange={onChange}
                    />
                    <Form.Control
                        className="form-control"
                        id="stop_time"
                        type="date"
                        value={dateRead(newSurvey.stop_time)}
                        required
                        onChange={onChange}
                    />
                    <Form.Check
                        //className="form-control"
                        inline
                        id="visible"
                        type="checkbox"
                        label="Make Visible"
                        checked={newSurvey.visible}
                        onChange={onChange}
                    />
                    <Form.Check
                        //className="form-control"
                        inline
                        id="upload"
                        type="checkbox"
                        label="Upload Files"
                        checked={newSurvey.upload === true}
                        onChange={onChange}
                    />
                </Form.Group>
                {newSurvey.upload === true && (
                    <Card className="mb-4" md={25}>
                        <Card.Body>
                            <h1>Path: "public/audio/{newSurvey.id}" </h1>
                            <FileUpload ref={childRef}/>
                        </Card.Body>
                    </Card>

                )}
                <Button variant="primary" type="submit" disabled={loading}>
                    Submit
                </Button>

            </Form>
            
            </div>
        </>
    );
}

export default SurveyAddPage;