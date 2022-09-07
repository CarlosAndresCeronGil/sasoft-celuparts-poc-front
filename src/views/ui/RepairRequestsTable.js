import React, { useEffect, useState } from 'react'
import { Card, CardBody, CardTitle, Table } from "reactstrap";
// import getRequests from '../../services/getRequests';
import { Link } from "react-router-dom";
import getRequestRepairs from '../../services/getRequestRepairs';

export default function RepairRequestsTable() {
    const [requests, setRequests] = useState({})
    const [loading, setLoading] = useState(true)
    const [page, setPage] = useState(1)

    // useEffect(function () {
    //     setLoading(true)
    //     getRequests()
    //         .then((response) => {
    //             setRequests(response)
    //             setLoading(false)
    //         })
    //         .catch((error) => {
    //             console.log(error)
    //             setLoading(false)
    //         })
    // }, [setRequests])

    useEffect(function () {
        setLoading(true)
        getRequestRepairs({ page })
            .then((response) => {
                setRequests(response)
                setLoading(false)
            })
            .catch(error => {
                console.log(error)
                setLoading(false)
            })
    }, [page, setRequests])

    const handleNext = () => {
        setPage(currentPage => currentPage + 1);
    }

    const handlePrevious = () => {
        setPage(currentPage => currentPage - 1);
    }

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
                                {requests?.requests.map((tdata, index) => (
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
                        {
                            <div>
                                Página número: {requests.currentPage} de {requests.pages}
                            </div>
                        }
                        <div className='buttons-previous-next'>
                            {
                                requests?.currentPage === 1 ?
                                    <button className="btn btn-celuparts-dark-blue" disabled>Anterior</button>
                                    : <button className="btn btn-celuparts-dark-blue" onClick={handlePrevious}>Anterior</button>
                            }
                            {
                                requests?.currentPage === requests.pages ?
                                    <button className="btn btn-celuparts-dark-blue" disabled>Siguiente</button>
                                    : <button className="btn btn-celuparts-dark-blue" onClick={handleNext}>Siguiente</button>
                            }
                        </div>
                    </CardBody>
                </Card>
            </div>
    )
}
