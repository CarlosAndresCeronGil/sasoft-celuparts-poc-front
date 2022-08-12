import React, { useEffect, useState } from 'react'
import { Card, CardBody, CardTitle, Table } from "reactstrap";
import getRequests from '../../services/getRequests';
import { Link } from "react-router-dom";

export default function RequestsTable() {
    const [requests, setRequests] = useState([])

    useEffect(function () {
        getRequests()
            .then((response) => {
                setRequests(response)
            }
            )
    }, [setRequests])

    return (
        <div>
            <Card>
                <CardBody>
                    <CardTitle tag="h5">Lista de solicitudes registradas en el sistema</CardTitle>

                    <Table className="no-wrap mt-3 align-middle" responsive borderless>
                        <thead>
                            <tr>
                                <th>Tipo solicitud</th>
                                <th>Dirección recogida</th>
                                <th>Dirección entrega</th>
                                <th>Estado de cotización</th>
                                <th>Estado de solicitud</th>
                                <th>Actualizar estado Solicitud</th>
                                {
                                    JSON.parse(localStorage.getItem('user')).role === "mensajero" ? (
                                        null
                                    ) : (
                                        <th>Actualizar estado Cotización</th>
                                    )
                                }
                            </tr>
                        </thead>
                        <tbody>
                            {requests.map((tdata, index) => (
                                <tr key={index} className="border-top">
                                    <td>{tdata.requestType}</td>
                                    <td>{tdata.pickUpAddress}</td>
                                    <td>{tdata.deliveryAddress}</td>
                                    <td>{tdata.statusQuote}</td>
                                    <td>{tdata.requestStatus[0].status}</td>
                                    <td>
                                        <Link to={`/request-status-form/${tdata.requestStatus[0].idRequestStatus}`}>
                                            <button className="btn btn-primary">Actualizar</button>
                                        </Link>
                                    </td>
                                    {
                                        JSON.parse(localStorage.getItem('user')).role === "mensajero" ? (
                                            null
                                        ) : (
                                            <td>
                                                <Link to={`/update-repair-form/${tdata.repairs[0].idRepair}`}>
                                                    <button className="btn btn-secondary">Actualizar</button>
                                                </Link>
                                            </td>
                                        )
                                    }
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </CardBody>
            </Card>
        </div>
    )
}
