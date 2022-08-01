import React, { useState, useEffect } from 'react'
import { Card, CardBody, CardTitle, Table } from "reactstrap";
import getRequestStates from '../../services/getRequestStates';

export default function RequestStatesTable() {
    const [requestStates, setRequestStates] = useState([]);

    useEffect(function() {
        getRequestStates()
            .then((response) => {
                console.log(response)
                setRequestStates(response)
            }
        )
    },[setRequestStates])

    return (
        <div>
            <Card>
                <CardBody>
                    <CardTitle tag="h5">Estado de solicitud</CardTitle>

                    <Table className="no-wrap mt-3 align-middle" responsive borderless>
                        <thead>
                            <tr>
                                <th>Id</th>
                                <th>Estado de pago</th>
                                <th>Producto devuelto</th>
                            </tr>
                        </thead>
                        <tbody>
                            {requestStates.map((tdata, index) => (
                                <tr key={index} className="border-top">
                                    <td>
                                        <span className="text-muted">{tdata.idRequestState}</span>
                                    </td>
                                    <td>{tdata.paymentStatus}</td>
                                    <td>{tdata.productReturned === true ? "Sí" : "No"}</td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </CardBody>
            </Card>
        </div>
    )
}
