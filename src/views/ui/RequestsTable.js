import React, { useEffect, useState } from 'react'
import { Card, CardBody, CardTitle, Table } from "reactstrap";
import getRequests from '../../services/getRequests';
import { Link } from "react-router-dom";

export default function RequestsTable() {
    const [requests, setRequests] = useState([])

    useEffect(function() {
        getRequests()
            .then((response) => {
                //console.log(response)
                setRequests(response)
            }
        )
    },[setRequests])

    return (
        <div>
            <Card>
                <CardBody>
                    <CardTitle tag="h5">Lista de solicitudes registradas en el sistema</CardTitle>

                    <Table className="no-wrap mt-3 align-middle" responsive borderless>
                        <thead>
                            <tr>
                                <th>Id solicitud</th>
                                <th>Tipo solicitud</th>
                                <th>Dirección recogida</th>
                                <th>Dirección entrega</th>
                                <th>Estado de cotización</th>
                                <th>Actualizar estado</th>
                                <th>Actualizar estado reparación</th>
                            </tr>
                        </thead>
                        <tbody>
                            {requests.map((tdata, index) => (
                                <tr key={index} className="border-top">
                                    <td>
                                        <span className="text-muted">{tdata.idRequest}</span>
                                    </td>
                                    <td>{tdata.requestType}</td>
                                    <td>{tdata.pickUpAddress}</td>
                                    <td>{tdata.deliveryAddress}</td>
                                    <td>{tdata.statusQuote}</td>
                                    <td>
                                        <Link to={`/starter/request-status-form/${tdata.requestStatus[0].idRequestStatus}`}>
                                            <button className="btn btn-primary">Actualizar</button>
                                        </Link>
                                    </td>
                                    <td>
                                        <Link to={`/starter/update-repair-form/${tdata.repairs[0].idRepair}`}>
                                            <button className="btn btn-secondary">Actualizar</button>
                                        </Link>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </CardBody>
            </Card>
        </div>
    )
}
