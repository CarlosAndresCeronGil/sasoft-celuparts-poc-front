import React, { useEffect, useState } from 'react'
import { Card, CardBody, CardTitle, Table } from "reactstrap";
import getSingleRequest from '../../services/getSingleRequest';
import getSingleUser from '../../services/getSingleUser';
import putRequest from '../../services/putRequest';
import postRetoma from '../../services/postRetoma';
import postRetomaPayment from '../../services/postRetomaPayment';
import Swal from 'sweetalert2'
import putRequestNotification from '../../services/putRequestNotification';
import getSingleEquipment from '../../services/getSingleEquipment'

export default function UserRepairRequests() {
    const [userInfo, setUserInfo] = useState([]);
    const [notifications, setNotifications] = useState([])

    const [showButtons, setShowButtons] = useState(true);
    const [loading, setLoading] = useState(false);

    useEffect(function () {
        setLoading(true);
        getSingleUser({ id: JSON.parse(localStorage.getItem('user')).idUser })
            .then(response => {
                console.log(response);
                setUserInfo(response);
                //Saca las notificaciones que tiene ese usuario y las almacena en un arreglo
                response[0].requests.map(tdata => (
                    tdata.requestNotifications.length !== 0 ?
                        setNotifications(prev => [...prev, tdata.requestNotifications[0]])
                        : console.log("nothing")
                ))

                setLoading(false)
                console.log(response);
            })
            .catch(error => {
                console.log(error);
                setLoading(false)
            })
    }, [showButtons]);

    const handleAcceptClick = (id) => {
        getSingleRequest({ id })
            .then(response => {
                putRequest({
                    idRequest: id,
                    idUser: response.idUser,
                    idEquipment: response.idEquipment,
                    requestType: response.requestType,
                    pickUpAddress: response.pickUpAddress,
                    deliveryAddress: response.deliveryAddress,
                    statusQuote: "Aceptada"
                })
                    .then(response => {
                        setShowButtons(false);
                    })
                    .catch(error => {
                        console.log(error);
                    })
                getSingleEquipment({id: response.idEquipment})
                    .then(response => {
                        notifications?.map(tdata => (
                            tdata.idRequest === id ? (
                                putRequestNotification({
                                    idRequestNotification: tdata.idRequestNotification,
                                    idRequest: id,
                                    message: "El cliente del producto " + response.equipmentBrand + " " + response.modelOrReference + " aceptó la cuota de reparación.",
                                    hideNotification: false,
                                    notificationType: "to_technician"
                                })
                                .then(response2 => {
                                    console.log("exito put request notification", response2)
                                })
                                .catch(error => {
                                    console.log(error)
                                })
                            ) : null
                        ))
                    })
            })
            .catch(error => {
                console.log(error);
            })
        Swal.fire({
            icon: 'success',
            title: 'Exito!',
            text: 'Cotización aceptada!',
        })
    }

    const handleRejectClick = (id) => {
        Swal.fire({
            title: '¿Desea iniciar una retoma para este producto?',
            showDenyButton: true,
            showCancelButton: true,
            confirmButtonText: 'Sí, iniciar retoma',
            denyButtonText: `No, y rechazar cotización`,
            cancelButtonText: 'Cancelar',
        }).then((result) => {
            if (result.isConfirmed) {
                getSingleRequest({ id })
                    .then(response => {
                        putRequest({
                            idRequest: id,
                            idUser: response.idUser,
                            idEquipment: response.idEquipment,
                            requestType: "Retoma",
                            pickUpAddress: response.pickUpAddress,
                            deliveryAddress: response.deliveryAddress,
                            statusQuote: "Pendiente"
                        })
                            .then(data => {
                                /* --- EMPIEZA NUEVA RETOMA --- */
                                postRetoma({
                                    idRequest: id,
                                    idEquipment: response.idEquipment,
                                    retomaQuote: "0",
                                    deviceDiagnostic: "",
                                })
                                    .then(data => {
                                        postRetomaPayment({
                                            idRetoma: data.idRetoma
                                        })
                                            .then(data => {
                                                setShowButtons(false);
                                            }).catch(error => {
                                                console.log(error);
                                            }
                                            )
                                    }).catch(error => {
                                        console.log(error);
                                    }
                                    )
                            })
                            .catch(error => {
                                console.log(error);
                            })
                    })
                    .catch(error => {
                        console.log(error);
                    })
                Swal.fire('Saved!', '', 'success')
            } else if (result.isDenied) {
                getSingleRequest({ id })
                    .then(response => {
                        putRequest({
                            idRequest: id,
                            idUser: response.idUser,
                            idEquipment: response.idEquipment,
                            requestType: response.requestType,
                            pickUpAddress: response.pickUpAddress,
                            deliveryAddress: response.deliveryAddress,
                            statusQuote: "Rechazada"
                        })
                            .then(response => {
                                console.log(response);
                                setShowButtons(false);
                            })
                            .catch(error => {
                                console.log(error);
                            })
                    })
                    .catch(error => {
                        console.log(error);
                    })
                Swal.fire('Cotización rechazada', '', 'info')
            }
        })
    }

    return (
        loading ? <div>Loading...</div> : (
            <div>
                <Card>
                    <CardBody>
                        <CardTitle tag="h5">Esta es la lista de tus solicitudes de reparación {JSON.parse(localStorage.getItem('user')).name} </CardTitle>
                        <Table className="no-wrap mt-3 align-middle" responsive>
                            <thead>
                                <tr>
                                    <th>Marca referencia</th>
                                    <th>Tipo de solicitud</th>
                                    <th>Estado de la solicitud</th>
                                    <th>Valor de la Reparación</th>
                                    <th>Estado Cotización</th>
                                    <th>Fecha de entrega</th>
                                </tr>
                            </thead>
                            <tbody>
                                {userInfo[0]?.requests.map((tdata, index) => (
                                    tdata.requestType === "Reparacion" ? (
                                        <tr key={index} className="border-top">
                                            <td>
                                                {tdata.equipment.equipmentBrand} {tdata.equipment.modelOrReference}
                                            </td>
                                            <td>{tdata.requestType}</td>
                                            <td>{tdata.requestStatus[0].status}</td>
                                            <td>{tdata.repairs[0].repairQuote}</td>
                                            <td>

                                                {
                                                    tdata.statusQuote === 'Pendiente' && tdata.repairs[0].repairQuote !== "0" && showButtons ? (
                                                        <div className="text-danger">
                                                            <button onClick={() => handleAcceptClick(tdata.idRequest)} className="btn btn-primary">Aceptar</button>
                                                            <button onClick={() => handleRejectClick(tdata.idRequest)} className="btn btn-danger">Rechazar</button>
                                                        </div>
                                                    ) : (
                                                        <i>{tdata.statusQuote}</i>
                                                    )
                                                }

                                            </td>
                                            {
                                                tdata.homeServices[0].deliveryDate ? (
                                                    <td>{tdata.homeServices[0].deliveryDate}</td>
                                                ) : (
                                                    <td>Fecha sin definir</td>
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
    )
}
