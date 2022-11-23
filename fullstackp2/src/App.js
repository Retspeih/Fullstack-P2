import React, { useState } from 'react';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Stack from 'react-bootstrap/Stack';
import data from './table-data.json'
import Form from 'react-bootstrap/Form';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars, faPlusCircle, faPenSquare, faUserXmark } from '@fortawesome/free-solid-svg-icons'
import './App.css'
import $ from 'jquery';
import toastr from 'toastr';

import Modal from 'react-bootstrap/Modal';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

function App() {

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
            setValidated(false);
            event.preventDefault();
            event.stopPropagation();
        }

        setValidated(true);
    };

    const handleAddFormSubmit = (event) => {
        event.preventDefault();
        const form = event.currentTarget;

        if (form.checkValidity() === false) {
            toastr.error('Entry did not add successfully', "Error");
            event.preventDefault();
            event.stopPropagation();
        }
        else {
            console.log(setInfo);

            //if (!setInfo.includes(addFormData.id)) {
                const newEntry = {
                    id: addFormData.id,
                    description: addFormData.description,
                    deadline: addFormData.deadline,
                    priority: addFormData.priority,
                };

                const newEntries = [...info, newEntry];
                setInfo(newEntries);
                setValidated(true);
                toastr.success('Entry added successfully', "Success");
                handle1Close();
            //}

        }
    };

    const handleEditFormSubmit = (index, event) => {
        event.preventDefault();
        const form = event.currentTarget;

        if (form.checkValidity() === false) {
            toastr.error('Entry did not update successfully', "Error");
            event.preventDefault();
            event.stopPropagation();
        }
        else {
            setValidated(true);

            console.log(addFormData);
            console.log(addFormData.description);

            setInfo[index] = {
                id: addFormData.id,
                description: addFormData.description,
                deadline: addFormData.deadline,
                priority: addFormData.priority,
            };
            toastr.success('Entry updated successfully', "Success");
            

            handle2Close();


        }
    };

    const handleDelete = (index, e) => {
        setInfo(info.filter((item, i) => i !== index));
    };

    const handleDisplay = (index, e) => {
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
                <p className="centered-text header-text">
                    <FontAwesomeIcon icon={faBars} /> FRAMEWORKS
                </p>
                <>
                    <Button variant="primary" onClick={handle1Show} style={{ color: "white", margin: "10px 50px 10px 0px", padding: "0px 30px", boxShadow: "5px 5px 3px rgba(46, 46, 46, 0.62)" }} className="centered-text right-aligned-button">
                        <FontAwesomeIcon icon={faPlusCircle} />
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
                                        >
                                            <Form.Check.Label>Low</Form.Check.Label>
                                            <Form.Check.Input type={type} isinValid />
                                            <Form.Control.Feedback type="invalid">
                                                Priority is required!
                                            </Form.Control.Feedback>
                                        </Form.Check>
                                        <Form.Check
                                            inline
                                            label="Med"
                                            value="Med"
                                            name="priority"
                                            type={type}
                                            id={`inline-${type}-2`}
                                            onChange={handleAddFormChange}
                                        >
                                            <Form.Check.Label>Med</Form.Check.Label>
                                            <Form.Check.Input type={type} isinValid />
                                            <Form.Control.Feedback type="invalid">
                                                Priority is required!
                                            </Form.Control.Feedback>
                                        </Form.Check>
                                        <Form.Check
                                            inline
                                            label="High"
                                            value="High"
                                            name="priority"
                                            type={type}
                                            id={`inline-${type}-3`}
                                            onChange={handleAddFormChange}
                                        >
                                            <Form.Check.Label>High</Form.Check.Label>
                                            <Form.Check.Input type={type} isinValid />
                                            <Form.Control.Feedback type="invalid">
                                                Priority is required!
                                            </Form.Control.Feedback>
                                        </Form.Check>
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
                    {info.map((information, index) => (
                        <tr key={index} className="centered-text bottom-border">
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
                                    <Button className="action-buttons" onClick={handle2Show} id=""><FontAwesomeIcon icon={faPenSquare} /> UPDATE</Button>

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
                                                            label="Low"
                                                            value="Low"
                                                            name="priority"
                                                            type={type}
                                                            id={`inline-${type}-1`}
                                                            onChange={handleAddFormChange}
                                                        >
                                                            <Form.Check.Label>Low</Form.Check.Label>
                                                            <Form.Check.Input type={type} isinValid />
                                                            <Form.Control.Feedback type="invalid">
                                                                Priority is required!
                                                            </Form.Control.Feedback>
                                                        </Form.Check>
                                                        <Form.Check
                                                            inline
                                                            label="Med"
                                                            value="Med"
                                                            name="priority"
                                                            type={type}
                                                            id={`inline-${type}-2`}
                                                            onChange={handleAddFormChange}
                                                        >
                                                            <Form.Check.Label>Med</Form.Check.Label>
                                                            <Form.Check.Input type={type} isinValid />
                                                            <Form.Control.Feedback type="invalid">
                                                                Priority is required!
                                                            </Form.Control.Feedback>
                                                        </Form.Check>
                                                        <Form.Check
                                                            inline
                                                            label="High"
                                                            value="High"
                                                            name="priority"
                                                            type={type}
                                                            id={`inline-${type}-3`}
                                                            onChange={handleAddFormChange}
                                                        >
                                                            <Form.Check.Label>High</Form.Check.Label>
                                                            <Form.Check.Input type={type} isinValid />
                                                            <Form.Control.Feedback type="invalid">
                                                                Priority is required!
                                                            </Form.Control.Feedback>
                                                        </Form.Check>
                                                    </div>
                                                ))}
                                                <Button type="submit">EDIT</Button>
                                                <Button variant="danger" onClick={handle2Close}>
                                                    <FontAwesomeIcon icon={faUserXmark}></FontAwesomeIcon>CANCEL
                                                </Button>
                                            </Form>
                                        </Modal.Body>
                                    </Modal>

                                    <Button className="action-buttons" variant="danger" onClick={(e) => handleDelete(index, e)}><FontAwesomeIcon icon={faUserXmark} /> DELETE</Button>
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