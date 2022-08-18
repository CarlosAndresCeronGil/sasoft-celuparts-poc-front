import React, { useEffect, useState } from 'react'
import { Card, CardBody, CardTitle, Table } from "reactstrap";
import getRequests from '../../services/getRequests';
import { Link } from "react-router-dom";

export default function RetomaRequestsTable() {
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
                    <CardTitle tag="h5">Lista de retomas registradas en el sistema</CardTitle>

                    <Table className="no-wrap mt-3 align-middle" responsive borderless>
                        <thead>
                            <tr>
                                <th>Tipo solicitud</th>
                                <th>Dirección recogida</th>
                                <th>Estado de cotización</th>
                                <th>Estado de solicitud</th>
                                <th>Actualizar estado Solicitud</th>
                                {
                                    JSON.parse(localStorage.getItem('user')).role === "mensajero" ? (
                                        null
                                    ) : (
                                        <th>Actualizar diagnostico para retoma</th>
                                    )
                                }
                                {
                                    JSON.parse(localStorage.getItem('user')).role === "admin" ? (
                                        <th>Actualizar pago retoma</th>
                                    ) : (
                                        null
                                    )
                                }
                            </tr>
                        </thead>
                        <tbody>
                            {requests.map((tdata, index) => (
                                tdata.requestType === "Retoma" ? (
                                    <tr key={index} className="border-top">
                                        <td>{tdata.requestType}</td>
                                        <td>{tdata.pickUpAddress}</td>
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
                                                    {
                                                        tdata.requestStatus[0].status === 'Iniciada' ||
                                                            tdata.requestStatus[0].status === 'En proceso de recogida' ||
                                                            tdata.requestStatus[0].status === 'Recibida tecnico' ||
                                                            tdata.requestStatus[0].status === 'En devolucion' ||
                                                            tdata.requestStatus[0].status === 'Devuelto sin reparacion' ||
                                                            tdata.requestStatus[0].status === 'Abandonada' ||
                                                            tdata.requestStatus[0].status === 'Terminada' ||
                                                            tdata.requestStatus[0].status === 'En camino' ? (
                                                            <button className="btn btn-secondary" disabled>Actualizar</button>
                                                        ) : (
                                                            <Link to={`/update-retoma-form/${tdata.retoma[0].idRetoma}`}>
                                                                <button className="btn btn-secondary">Actualizar</button>
                                                            </Link>
                                                        )
                                                    }
                                                </td>
                                            )
                                        }
                                        {
                                            JSON.parse(localStorage.getItem('user')).role === "admin" ? (
                                                <td>
                                                    {
                                                        tdata.requestStatus[0].status === 'Iniciada' ||
                                                            tdata.requestStatus[0].status === 'En proceso de recogida' ||
                                                            tdata.requestStatus[0].status === 'Recibida tecnico' ||
                                                            tdata.requestStatus[0].status === 'En devolucion' ||
                                                            tdata.requestStatus[0].status === 'Devuelto sin reparacion' ||
                                                            tdata.requestStatus[0].status === 'Abandonada' ||
                                                            tdata.requestStatus[0].status === 'Terminada' ||
                                                            tdata.requestStatus[0].status === 'En camino' ? (
                                                            <button className='btn btn-secondary' type='button' disabled>
                                                                Actualizar
                                                            </button>
                                                        ) : (
                                                            <Link to={`/retoma-payment-form/${tdata.retoma[0].retomaPayments[0].idRetomaPayment}`}>
                                                                <button className='btn btn-secondary' type='button'>
                                                                    Actualizar
                                                                </button>
                                                            </Link>
                                                        )
                                                    }
                                                </td>
                                            ) : (
                                                null
                                            )
                                        }
                                    </tr>
                                ) : (
                                    null
                                )
                            ))}
                        </tbody>
                    </Table>
                </CardBody>
            </Card>
        </div>
    )
}
