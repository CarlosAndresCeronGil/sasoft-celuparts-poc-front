import React, { useEffect, useState } from 'react'
import { Button, Card, CardBody, CardTitle, Table, Form } from "reactstrap";
// import getRequests from '../../services/getRequests';
import getRequestRetomas from '../../services/getRequestRetomas';
import { Link } from "react-router-dom";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

export default function RetomaRequestsTable() {
    const [requests, setRequests] = useState()
    const [loading, setLoading] = useState(true)
    const [page, setPage] = useState(1)

    const date = new Date()

    const [initialDate, setInitialDate] = useState({
        initialDate: new Date(
            date.getFullYear(),
            date.getMonth(),
            date.getDate(),
        )
    })
    const [finalDate, setFinalDate] = useState({ finalDate: new Date() })

    useEffect(function () {
        setLoading(true)
        getRequestRetomas({ page })
            .then((response) => {
                setRequests(response)
                setLoading(false)
            })
            .catch(error => {
                console.log(error)
                setLoading(false)
            })
    }, [setRequests, page])

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log(initialDate.initialDate)
    }

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
                        <CardTitle tag="h5">Lista de retomas registradas en el sistema</CardTitle>
                        <Form onSubmit={handleSubmit}>
                            Consultar por fechas.
                            Desde:
                            <DatePicker
                                id='paymentDate'
                                dateFormat="yyyy-MM-dd"
                                placeholderText='Fecha desde'
                                value={initialDate.initialDate}
                                selected={initialDate.initialDate}
                                onChange={(date) => setInitialDate({ initialDate: date })}
                                showDisabledMonthNavigation
                            />
                            <Button>
                                Consultar
                            </Button>
                        </Form>
                        <Table className="no-wrap mt-3 align-middle" responsive borderless>
                            <thead>
                                <tr>
                                    <th>Tipo solicitud</th>
                                    <th>Dispositivo</th>
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
                                {requests?.requests.map((tdata, index) => (
                                    tdata.requestType === "Retoma" ? (
                                        <tr key={index} className="border-top">
                                            <td>{tdata.requestDate}</td>
                                            <td>{tdata.equipment.equipmentBrand} {tdata.equipment.modelOrReference}</td>
                                            <td>{tdata.pickUpAddress}</td>
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
                                                                <Link to={`/home/update-retoma-form/${tdata?.retoma[0].idRetoma}`}>
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
                                                                <Link to={`/home/retoma-payment-form/${tdata.retoma[0].retomaPayments[0].idRetomaPayment}`}>
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
