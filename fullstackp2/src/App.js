import React, { useState } from 'react';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import data from './table-data.json'
import './App.css'

function App() {

    const [info, setInfo] = useState(data);

    return (
        <div>
            <div class="header">
                <p class="centered-text">
                    FRAMEWORKS
                </p>
            </div>
            <Table striped bordered hover>
                <tbody>
                    {info.map((information) => (
                        <tr>
                            <td>{information.id}</td>
                            <td>{information.firstName}</td>
                            <td>{information.lastName}</td>
                            <td>{information.username}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    );
};

export default App;