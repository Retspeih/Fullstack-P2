import React, { useState } from 'react';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Stack from 'react-bootstrap/Stack';
import data from './table-data.json'
import Form from 'react-bootstrap/Form';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars } from '@fortawesome/free-solid-svg-icons'
import './App.css'
import Popup from './Modal';
import $ from 'jquery';

import Modal from 'react-bootstrap/Modal';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

function App() {

    {/*const [info, setInfo] = useState(data);*/ }
    const [show1, setShow1] = useState(false);
    const [show2, setShow2] = useState(false);
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

        const newFormData = { ...addFormData };
        newFormData[fieldName] = fieldValue;

        setAddFormData(newFormData);
    };

    const handleSubmit = (event) => {
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        }

        setValidated(true);
    };

    const handleAddFormSubmit = (event) => {
        event.preventDefault();
        const form = event.currentTarget;

        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        }
        else {
            setValidated(true);

            const newEntry = {
                id: addFormData.id,
                description: addFormData.description,
                deadline: addFormData.deadline,
                priority: addFormData.priority,
            };

            const newEntries = [...info, newEntry];
            setInfo(newEntries);
            handle1Close();

        }
    };

    const handle1Close = () => setShow1(false);
    const handle1Show = () => setShow1(true);

    const handle2Close = () => setShow2(false);
    const handle2Show = () => setShow2(true);

    $(function () {
        $('table').on('click', 'button.editingTRbutton', function (ele) {
            var tr = ele.target.parentNode.parentNode;

            var id = tr.cells[0].textContent;
            var description = tr.cells[1].textContent;
            var deadline = tr.cells[2].textContent;
            var priority = tr.cells[3].textContent;

            $('#editDescription').val(description);
            $('#editDeadline').val(deadline);
            $("#editPriority").val(priority).attr('selected', 'selected');

        });
    });

    return (
        <div>
            <div className="header">
                <p className="centered-text">
                    <FontAwesomeIcon icon={faBars} /> FRAMEWORKS
                </p>
                <>
                    <Button variant="primary" onClick={handle1Show}>
                        ADD
                    </Button>

                    <Modal show={show1} onHide={handle1Close} id="popup">
                        <Modal.Header>
                            <Modal.Title>Add Task</Modal.Title>
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
                                        <Form.Control type="text" name="description" placeholder="Description" required onChange={handleAddFormChange} />
                                        <Form.Control.Feedback type="invalid">
                                            Description is required!
                                        </Form.Control.Feedback>
                                    </Form.Group>
                                </Row>
                                <Row className="mb-3">
                                    <Form.Group as={Col} md="6" controlId="validationCustom03">
                                        <fieldset>
                                            <legend>Deadline</legend>
                                            <Form.Control type="date" name="deadline" placeholder="Deadline" required onChange={handleAddFormChange} />
                                            <Form.Control.Feedback type="invalid">
                                                Deadline is required!
                                            </Form.Control.Feedback>
                                        </fieldset>
                                    </Form.Group>
                                </Row>
                                {['radio'].map((type) => (
                                    <div key={`inline-${type}`} className="mb-3">
                                        <Form.Check
                                            inline
                                            label="Low"
                                            value="Low"
                                            name="priority"
                                            type={type}
                                            id={`inline-${type}-1`}
                                            onChange={handleAddFormChange}
                                        />
                                        <Form.Check
                                            inline
                                            label="Med"
                                            value="Med"
                                            name="priority"
                                            type={type}
                                            id={`inline-${type}-2`}
                                            onChange={handleAddFormChange}
                                        />
                                        <Form.Check
                                            inline
                                            label="High"
                                            value="High"
                                            name="priority"
                                            type={type}
                                            id={`inline-${type}-3`}
                                            onChange={handleAddFormChange}
                                        />
                                    </div>
                                ))}
                                <Button type="submit">ADD</Button>
                                <Button variant="danger" onClick={handle1Close}>CANCEL</Button>
                            </Form>
                        </Modal.Body>
                    </Modal>
                </>
            </div>
            <Table borderless hover>
                <thead>
                    <tr className="centered-text bottom-border table">
                        <th>Title</th>
                        <th>Description</th>
                        <th>Deadline</th>
                        <th>Priority</th>
                        <th>Is Complete</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {info.map((information) => (
                        <tr className="centered-text bottom-border">
                            <td>{information.id}</td>
                            <td>{information.description}</td>
                            <td>{information.deadline}</td>
                            <td>{information.priority}</td>
                            <td>
                                <Form>
                                    {['checkbox'].map((type) => (
                                        <div key={`default-${type}`} className="mb-3">
                                            <Form.Check
                                                type={type}
                                                id={`default-${type}`}
                                            />
                                        </div>
                                    ))}
                                </Form>
                            </td>
                            <td>
                                <Stack>
                                    <Button className="action-buttons" onClick={handle2Show} id="">UPDATE</Button>

                                    <Modal show={show2} onHide={handle2Close} id="popup">
                                        <Modal.Header>
                                            <Modal.Title>Edit Task</Modal.Title>
                                        </Modal.Header>
                                        <Modal.Body>
                                            <Form noValidate validated={validated} onSubmit={handleAddFormSubmit}>
                                                <Row className="mb-3">
                                                    <Form.Group as={Col} md="6" controlId="validationCustom03">
                                                        <Form.Control type="text" name="description" placeholder="Description" required onChange={handleAddFormChange} />
                                                        <Form.Control.Feedback type="invalid">
                                                            Description is required!
                                                        </Form.Control.Feedback>
                                                    </Form.Group>
                                                </Row>
                                                <Row className="mb-3">
                                                    <Form.Group as={Col} md="6" controlId="validationCustom03">
                                                        <fieldset>
                                                            <legend>Deadline</legend>
                                                            <Form.Control type="date" name="deadline" placeholder="Description" required onChange={handleAddFormChange} />
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
                                                <Button type="submit">EDIT</Button>
                                                <Button variant="danger" onClick={handle2Close}>CANCEL</Button>
                                            </Form>
                                        </Modal.Body>
                                    </Modal>

                                    <Button className="action-buttons" variant="danger">DELETE</Button>
                                </Stack>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    );
};

export default App;