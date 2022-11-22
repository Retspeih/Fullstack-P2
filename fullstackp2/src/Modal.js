import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import data from './table-data.json'
import './Modal.css';
import $ from 'jquery';

function Popup() {
    const [show, setShow] = useState(false);
    const [validated, setValidated] = useState(false);
    const [info, setInfo] = useState(data);
    const [addFormData, setAddFormData] = useState({
        id: '',
        description: '',
        deadline: '',
        priority: '',
    })

    const handleAddFormChange = (event) => {
        event.preventDefault();

        const fieldName = event.target.getAttribute('name');
        const fieldValue = event.target.value;

        const newFormData = { ...addFormData};
        newFormData[fieldName] = fieldValue;

        setAddFormData(newFormData);
    };

    const handleAddFormSubmit = (event) => {
        event.preventDefault();
        
        const newEntry = {
            id: addFormData.id,
            description: addFormData.description,
            deadline: addFormData.deadline,
            priority: addFormData.priority,
        };

        const newEntries = [...info, newEntry];
        setInfo(newEntries);

        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        }
        else {
            setValidated(true);
            handleClose();
        }
    };

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <>
            <Button variant="primary" onClick={handleShow}>
                Launch demo modal
            </Button>

            <Modal show={show} onHide={handleClose} id="popup">
                <Modal.Header closeButton>
                    <Modal.Title>Edit Task</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form noValidate validated={validated} onSubmit={handleAddFormSubmit}>
                        <Row className="mb-3">
                            <Form.Group as={Col} md="6" controlId="validationCustom03">
                                <Form.Control type="text" name="id" placeholder="Title" required onChange={handleAddFormChange} />
                                <Form.Control.Feedback type="invalid">
                                    Title is required!
                                </Form.Control.Feedback>
                            </Form.Group>
                        </Row>
                        <Row className="mb-3">
                            <Form.Group as={Col} md="6" controlId="validationCustom03">
                                <Form.Control type="text" name="description" placeholder="Description" id="editDescription" required onChange={handleAddFormChange} />
                                <Form.Control.Feedback type="invalid">
                                    Description is required!
                                </Form.Control.Feedback>
                            </Form.Group>
                        </Row>
                        <Row className="mb-3">
                            <Form.Group as={Col} md="6" controlId="validationCustom03">
                                <fieldset>
                                    <legend>Deadline</legend>
                                    <Form.Control type="date" name="deadline" id="editDeadline" required onChange={handleAddFormChange} />
                                    <Form.Control.Feedback type="invalid">
                                        Description is required!
                                    </Form.Control.Feedback>
                                </fieldset>
                            </Form.Group>
                        </Row>
                        {['radio'].map((type) => (
                            <div key={`inline-${type}`} className="mb-3">
                                <Form.Check
                                    inline
                                    label="1"
                                    value="1"
                                    name="priority"
                                    type={type}
                                    id={`inline-${type}-1`}
                                    onChange={handleAddFormChange}
                                />
                                <Form.Check
                                    inline
                                    label="2"
                                    value="2"
                                    name="priority"
                                    type={type}
                                    id={`inline-${type}-2`}
                                    onChange={handleAddFormChange}
                                />
                                <Form.Check
                                    inline
                                    label="3"
                                    value="3"
                                    name="priority"
                                    type={type}
                                    id={`inline-${type}-3`}
                                    onChange={handleAddFormChange}
                                />
                            </div>
                        ))}
                        <Button type="submit">ADD</Button>
                        <Button variant="danger" onClick={handleClose}>CANCEL</Button>
                    </Form>
                </Modal.Body>
            </Modal>
        </>
    );
};

export default Popup;