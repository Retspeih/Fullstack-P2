import React, { useState } from 'react';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Stack from 'react-bootstrap/Stack';
import data from './table-data.json'
import Form from 'react-bootstrap/Form';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars } from '@fortawesome/free-solid-svg-icons'
import './App.css'

function App() {

    const [info, setInfo] = useState(data);

    return (
        <div>
            <div className="header">
                <p className="centered-text">
                <FontAwesomeIcon icon={faBars} /> FRAMEWORKS
                </p>
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
                            <td>{information.firstName}</td>
                            <td>{information.lastName}</td>
                            <td>{information.username}</td>
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
                                    <Button className="action-buttons">action</Button>
                                    <Button className="action-buttons" variant="danger">action</Button>
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