import { useState, useEffect } from 'react';
import { Container, ListGroup, Nav, Navbar, Button, Modal } from 'react-bootstrap';

import { map } from 'lodash';
import user from '../../services/user';
import { Menu } from '../../components/Menu';
import { surveyModify } from '../../services/api';
import { dateRead } from '../../components/Time';

function SurveyListPage() {
    const [content, setContent] = useState([]);
    const [refresh, setRefresh] = useState(0);
    const [deleteConfirm, setDeleteConfirm] = useState({ "modal": false, "data": {} })
   // const [modalShow, setModalShow] = useState(false)

    const deleteHandeler = (data) => {
        setDeleteConfirm({ "modal": true, "data": data })
    }

    const clearModal = () => {
        setDeleteConfirm({ ...deleteConfirm, "modal": false })
    }

    const update = (data, mode) => {
        surveyModify(data, mode)
        setRefresh(refresh + 1);
        //console.log(data, mode,refresh)
    }


    useEffect(() => {
        //console.log(user.surveyList())
        user.surveyList().then(
            (response) => {
                //console.log(response)
                setContent(response.data);
            },
            (error) => {
                //const _content =
                    
                console.log('SurveyListPage > Content Error : ', error)
                    
                //setContent(_content);
            }
        );
    }, [refresh]);
    //console.log('Content: ',content)
    if (!content) { return null; }
    return (
        <>
            <Menu />

            <Modal
                show={deleteConfirm.modal}
                onHide={clearModal}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header>
                    <Modal.Title>Warning</Modal.Title>
                </Modal.Header>
                <Modal.Body>This action will remove all response data from {deleteConfirm.data.id}!</Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={clearModal}>
                        Cancel
                    </Button>
                    <Button variant="danger" onClick={() => update(deleteConfirm.data, "delete")}>
                        Confirm
                    </Button>
                </Modal.Footer>
            </Modal>

            <ListGroup>
                {
                    // Render a list of links
                    map(content, (surveyItem) => (
                        <ListGroup.Item key={surveyItem.id}>
                            {surveyItem.id}: {surveyItem.name}<br/>
                            Start: {dateRead(parseInt(surveyItem.start_time))}<br/>
                            End: {dateRead(parseInt(surveyItem.end_time))}<br/>
                            <Button
                                href={`/dashboard/survey/${surveyItem.id}`}
                                variant="info"
                                size="sm"
                            >View</Button>{' '}

                            {surveyItem.visibility_id === 0 ? (
                                <Button
                                    onClick={() => update({ "id": surveyItem.id, "visible": true }, "modify")}
                                    variant="success"
                                    size="sm"
                                >Show</Button>
                            ) : (
                                <Button
                                    onClick={() => update({ "id": surveyItem.id, "visible": false }, "modify")}
                                    variant="warning"
                                    size="sm"
                                >Hide</Button>
                            )}{' '}

                            <Button
                                onClick={() => deleteHandeler({ "id": surveyItem.id}, "delete")}
                                variant="danger"
                                size="sm"
                            >Delete</Button>

                        </ListGroup.Item>

                    ))
                }
            </ListGroup>
        </>
    );
}

export default SurveyListPage;
