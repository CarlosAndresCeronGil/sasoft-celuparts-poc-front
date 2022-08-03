import React, { useEffect, useState } from 'react'
import { Card, CardBody, CardTitle, Table } from "reactstrap";
import getRequests from '../../services/getRequests';

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
                                <th>Fecha recogida</th>
                                <th>Metodo de pago</th>
                                <th>Estado solicitud</th>
                                <th>Cotización</th>
                                <th>Estado cotización</th>
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
                                    <td>{tdata.pickUpTime}</td>
                                    <td>{tdata.paymentMethod}</td>
                                    <td>{tdata.requestStatus[0].status}</td>
                                    <td>{tdata.quote}</td>
                                    <td>{tdata.statusQuote}</td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </CardBody>
            </Card>
        </div>
    )
}
