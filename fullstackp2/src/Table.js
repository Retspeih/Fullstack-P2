import React, { useState } from 'react';
import EdittableTable from './EdittableTable';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars, faPlusCircle, faPenSquare, faBan } from '@fortawesome/free-solid-svg-icons'
import toastr from 'toastr';
import "./Table.css";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { $ } from 'jquery';
import Table from 'react-bootstrap/Table';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import moment from 'moment';

const Tables = () => {

    // Toastr settings
    var options = {
        "closeButton": false,
        "debug": false,
        "newestOnTop": false,
        "progressBar": false,
        "positionClass": "toast-bottom-right",
        "preventDuplicates": false,
        "onclick": null,
        "showDuration": "300",
        "hideDuration": "1000",
        "timeOut": "5000",
        "extendedTimeOut": "1000",
        "showEasing": "swing",
        "hideEasing": "linear",
        "showMethod": "fadeIn",
        "hideMethod": "fadeOut"
    }

    // Stores is Complete button binding
    const [show, setShow] = useState(true);

    const handleButtonShow = (input) => {
        setShow(current => !current);
    };

    // Stores the modal show/hidden state
    const [modalOneShow, modalOneShowSetShow] = useState(false);

    // Closes the modal
    const handleModalOneClose = () => modalOneShowSetShow(false);

    // Opens the modal
    const handleModalOneShow = () => modalOneShowSetShow(true);

    // Stores the modal show/hidden state
    const [modalTwoShow, modalTwoShowSetShow] = useState(false);

    // Closes the modal
    const handleModalTwoClose = () => modalTwoShowSetShow(false);

    // Opens the modal
    const handleModalTwoShow = () => modalTwoShowSetShow(true);

    // Stores validation
    const [validated, setValidated] = useState(false);

    // Stores the website data in a state hook
    const [datas, setDatas] = useState([]);

    // Stores what should be added to the website data in a
    // different state hook
    const [addPost, setAddPost] = useState({
        title: '',
        description: '',
        deadline: '',
        priority: '',
    });

    // Get unique title reference
    const [editEntry, setEditEntry] = useState(null);

    // Edit the form data
    const [editFormData, setEditFormData] = useState({
        title: '',
        description: '',
        deadline: '',
        priority: '',
    });

    // Receive values from the add modal as it changes
    const handleChange = (input) => (e) => {
        console.log(addPost);
        setAddPost({ ...addPost, [input]: e.target.value });
    };

    // Add data to the data set when the data is submitted
    const handleAddPost = (e) => {
        e.preventDefault();
        const form = e.currentTarget;
        if (form.checkValidity() === false) {
            e.preventDefault();
            toastr.error('One of the input fields is empty', 'Error!', options);
            e.stopPropagation();
        }
        setValidated(true);
        if (datas.find((data) => data.title === addPost.title)) {
            toastr.error('Title is not distinct', 'Error!', options)
        }
        else {
            if (!datas.find((data) => data.title === addPost.title) && addPost.title !== '' && addPost.description !== '' && addPost.deadline !== '' && addPost.priority !== '') {
                let a = moment(addPost.deadline);

                const newPost = {
                    title: addPost.title,
                    description: addPost.description,
                    deadline: addPost.deadline,
                    priority: addPost.priority
                };

                const newPosts = [...datas, newPost];
                setDatas(newPosts);
                handleModalOneClose();
                toastr.success('Entry added succesfully', 'Success!', options);
                setAddPost(null);
            }
        }
    };


    // Updating Values
    const handleUpdate = (input) => (e) => {
        setEditFormData({ ...editFormData, [input]: e.target.value });
    };

    // Handles putting the original values into the modal
    const handleEdit = (e, data) => {
        e.preventDefault();
        handleModalTwoShow();
        setEditEntry(data.title);
        console.log(data.title);
        //let a = moment.format('YYYY-MM-DD');

        const values = {
            title: data.title,
            description: data.description,
            deadline: data.deadline,
            priority: data.priority
        }

        setEditFormData(values);
    };

    // Saves the new updated values back to the original data set but modified
    const handleSave = (e) => {
        e.preventDefault();

        const saveForm = {
            title: editEntry,
            description: editFormData.description,
            deadline: editFormData.deadline,
            priority: editFormData.priority,
        };

        const newForms = [...datas];

        const index = datas.findIndex((data) => data.title === editEntry);
        newForms[index] = saveForm;

        setDatas(newForms);
        setEditEntry(null);
        handleModalTwoClose();
        toastr.success('Entry updated succesfully', 'Success!', options);
    };


    // Deletes the entry from the table
    const handleDelete = (e, data) => {
        e.preventDefault();

        const newPosts = [...datas];
        const index = datas.findIndex((data) => data.title === editEntry);

        newPosts.splice(index, 1);

        setDatas(newPosts);
    };




    return (
        <div>
            <div className="d-flex flex-row header">
                <p className="centered-text header-text">
                    <FontAwesomeIcon icon={faBars} /> FRAMEWORKS
                </p>
                <Button className="right-aligned-button" variant="primary" onClick={handleModalOneShow}>
                    <FontAwesomeIcon icon={faPlusCircle} /> ADD
                </Button>
            </div>
            <Table hover>
                <thead>
                    <tr className="centered-text">
                        <th scope="col">Title</th>
                        <th scope="col">Description</th>
                        <th scope="col">Deadline</th>
                        <th scope="col">Priority</th>
                        <th scope="col">Is Complete</th>
                        <th scope="col">Action</th>
                    </tr>
                </thead>
                <tbody>
                    <EdittableTable
                        show={show}
                        datas={datas}
                        handleEdit={handleEdit}
                        handleDelete={handleDelete}
                        handleButtonShow={handleButtonShow}
                    />
                </tbody>
            </Table>

            {/* Add Modal Form */}
            <Modal show={modalOneShow} id="addModalForm" onHide={handleModalOneClose} animation={false}>
                <Modal.Header closeButton>
                    <Modal.Title id="exampleModalLabel"><FontAwesomeIcon icon={faPlusCircle} /> Add Task</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleAddPost} name="form" id="form" className="needs-validation" noValidate validated={validated}>
                        <Row className="mb-3 input-group has-validation">
                            <Form.Control
                                type="text"
                                className="form-control"
                                name="title"
                                placeholder="Title"
                                required
                                onChange={handleChange("title")}
                            />
                            <Form.Control.Feedback type="invalid">
                                Title is required!
                            </Form.Control.Feedback>
                        </Row>
                        <Row className="mb-3">
                            <Form.Control
                                type="text"
                                className="form-control"
                                name="description"
                                placeholder="Description"
                                required
                                onChange={handleChange("description")}
                            />
                            <Form.Control.Feedback type="invalid">
                                Description is required!
                            </Form.Control.Feedback>
                        </Row>
                        <Row className="mb-3 field-set-add">
                            <fieldset>
                                <legend className="legend-border-add">Deadline</legend>
                                <Form.Control
                                    type="date"
                                    className="form-control button-field-legend-add"
                                    name="deadline"
                                    required
                                    onChange={handleChange("deadline")}
                                >
                                </Form.Control>
                            </fieldset>
                            <Form.Control.Feedback type="invalid">
                                Deadline is required!
                            </Form.Control.Feedback>
                        </Row>

                        <Row className="mb-3">
                            <div class="form-check form-check-inline">
                                <Form.Check
                                    type="radio"
                                    inline
                                    label="Low"
                                    name="inlineRadioOptions"
                                    id="inlineRadio1"
                                    value="Low"
                                    onChange={handleChange("priority")}
                                    required
                                />
                                <Form.Check
                                    type="radio"
                                    inline
                                    label="Med"
                                    name="inlineRadioOptions"
                                    id="inlineRadio2"
                                    value="Med"
                                    onChange={handleChange("priority")}
                                />
                                <Form.Check
                                    type="radio"
                                    inline
                                    label="High"
                                    name="inlineRadioOptions"
                                    id="inlineRadio3"
                                    value="High"
                                    onChange={handleChange("priority")}
                                />
                            </div>
                        </Row>
                        <Modal.Footer>
                            <Button type="submit" variant="primary"><FontAwesomeIcon icon={faPlusCircle} /> ADD</Button>
                            <Button type="button" onClick={handleModalOneClose} variant="danger" id="cancel-btn"><FontAwesomeIcon icon={faBan} /> CANCEL</Button>
                        </Modal.Footer>
                    </Form>
                </Modal.Body>
            </Modal>


            {/* Edit Modal Form */}
            <Modal show={modalTwoShow} id="addModalForm" onHide={handleModalTwoClose} animation={false}>
                <Modal.Header>
                    <h5 className="modal-title" id="exampleModalLabel"><FontAwesomeIcon icon={faPenSquare} /> Edit Task</h5>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleSave}>
                        <Row className="mb-3">
                        <label className="form-label">Description</label>
                            <Form.Control
                                type="text"
                                className="form-control"
                                name="description"
                                placeholder="Description"
                                required
                                value={editFormData.description}
                                onChange={handleUpdate("description")}
                            />
                        </Row>
                        <Row className="mb-3">
                            <label className="form-label">Deadline</label>
                            <Form.Control
                                type="date"
                                className="form-control"
                                name="deadline"
                                required
                                value={editFormData.deadline}
                                onChange={handleUpdate("deadline")}
                            ></Form.Control>
                        </Row>
                        <Row className="mb-3">
                            <div class="form-check form-check-inline">
                                <Form.Check class="form-check-input"
                                    type="radio"
                                    inline
                                    label="Low"
                                    name="inlineRadioOptions"
                                    id="inlineRadio1"
                                    value="Low"
                                    checked={editFormData.priority === 'Low' ? true : false}
                                    onChange={handleUpdate("priority")}
                                    required
                                />
                                <Form.Check class="form-check-input"
                                    type="radio"
                                    inline
                                    label="Med"
                                    name="inlineRadioOptions"
                                    id="inlineRadio2"
                                    value="Med"
                                    checked={editFormData.priority === 'Med' ? true : false}
                                    onChange={handleUpdate("priority")} />
                                <Form.Check
                                    type="radio"
                                    inline
                                    label="High"
                                    name="inlineRadioOptions"
                                    id="inlineRadio3"
                                    value="High"
                                    checked={editFormData.priority === 'High' ? true : false}
                                    onChange={handleUpdate("priority")} />
                            </div>
                        </Row>
                        <Modal.Footer>
                            <Button type="submit" variant="primary"><FontAwesomeIcon icon={faPenSquare} /> EDIT</Button>
                            <Button type="button" onClick={handleModalTwoClose} variant="danger"><FontAwesomeIcon icon={faBan} /> CANCEL</Button>
                        </Modal.Footer>
                    </Form>
                </Modal.Body>
            </Modal>
        </div>

    )
}

export default Tables;