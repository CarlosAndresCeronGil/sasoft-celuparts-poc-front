import React, { useEffect, useState } from 'react'
import { Card, CardBody, CardTitle, Table } from "reactstrap";
import getRequests from '../../services/getRequests';
import { Link } from "react-router-dom";

export default function RepairRequestsTable() {
    const [requests, setRequests] = useState([])
    const [loading, setLoading] = useState(false)

    useEffect(function () {
        setLoading(true)
        getRequests()
            .then((response) => {
                setRequests(response)
                setLoading(false)
            })
            .catch((error) => {
                console.log(error)
                setLoading(false)
            })
    }, [setRequests])

    return (
        loading ? <div>Cargando...</div> :
        <div>
            <Card>
                <CardBody>
                    <CardTitle tag="h5">Lista de reparaciones registradas en el sistema</CardTitle>

                    <Table className="no-wrap mt-3 align-middle" responsive borderless>
                        <thead>
                            <tr>
                                <th>Fecha solicitud</th>
                                <th>Dispositivo</th>
                                <th>Dirección recogida</th>
                                <th>Dirección entrega</th>
                                <th>Estado de cotización</th>
                                <th>Estado de solicitud</th>
                                <th>Actualizar estado Solicitud</th>
                                {
                                    JSON.parse(localStorage.getItem('user')).role === "mensajero" ? (
                                        null
                                    ) : (
                                        <th>Actualizar estado Reparación</th>
                                    )
                                }
                                {
                                    JSON.parse(localStorage.getItem('user')).role === "admin" ? (
                                        <th>Actualizar pago reparación</th>
                                    ) : (
                                        null
                                    )
                                }
                            </tr>
                        </thead>
                        <tbody>
                            {requests.map((tdata, index) => (
                                tdata.requestType === "Reparacion" ? (
                                    <tr key={index} className="border-top">
                                        <td>{tdata.requestDate}</td>
                                        <td>{tdata.equipment.equipmentBrand} {tdata.equipment.modelOrReference}</td>
                                        <td>{tdata.pickUpAddress}</td>
                                        <td>{tdata.deliveryAddress}</td>
                                        <td>{tdata.statusQuote}</td>
                                        <td>{tdata.requestStatus[0].status}</td>
                                        <td>
                                            <Link to={`/home/request-status-form/${tdata.requestStatus[0].idRequestStatus}`}>
                                                <button className="btn btn-celuparts-dark-blue">Actualizar</button>
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
                                                            <Link to={`/home/update-repair-form/${tdata.repairs[0].idRepair}`}>
                                                                <button className="btn btn-celuparts-black">Actualizar</button>
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
                                                            <Link to={`/home/repair-payment-form/${tdata.repairs[0].repairPayments[0].idRepairPayment}`}>
                                                                <button className='btn btn-celuparts-black' type='button'>
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
