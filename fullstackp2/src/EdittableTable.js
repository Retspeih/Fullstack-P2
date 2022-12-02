import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenSquare, faXmarkCircle, faBan } from '@fortawesome/free-solid-svg-icons';
import './EdittableTable.css';

const EdittableTable = ({ show, datas, handleEdit, handleDelete, handleButtonShow }) => {
    return (
        <>
            {datas.map((data) =>
                <tr key={data.title} className="centered-text">
                    <td className="centered-rows">{data.title}</td>
                    <td className="centered-rows">{data.description}</td>
                    <td className="centered-rows">{data.deadline}</td>
                    <td className="centered-rows">{data.priority}</td>
                    <td className="centered-rows">

                        <div className="centered-rows">
                            <input className="centered-rows" type="checkbox" value="" id="flexCheckChecked" onClick={(input) => handleButtonShow(input)} />
                            <label className="form-check-label centered-rows" for="flexCheckChecked">
                            </label>
                        </div>
                    </td>
                    <td className="action-parent centered-rows">
                        <div className="action-buttons">
                            {show && (
                                <button type="button" className="me-3 btn btn-primary ml-auto d-block mb-2 update-button action-button" onClick={(e) => handleEdit(e, data)}>
                                    <FontAwesomeIcon icon={faPenSquare} /> UPDATE
                                </button>
                            )}
                            <button type="button" className="me-3 btn btn-primary ml-auto d-block mb-2 delete-button action-button" onClick={(e) => handleDelete(e, data)}>
                                <FontAwesomeIcon icon={faXmarkCircle} /> DELETE
                            </button>
                        </div>
                    </td>
                </tr>
            )}
        </>
    )
};

export default EdittableTable;