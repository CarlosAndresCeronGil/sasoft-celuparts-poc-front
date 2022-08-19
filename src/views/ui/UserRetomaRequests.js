import React, { useState, useEffect } from 'react'
import getSingleUser from '../../services/getSingleUser';
import { Card, CardBody, CardTitle, Table } from "reactstrap";
import getSingleRequest from '../../services/getSingleRequest';
import putRequest from '../../services/putRequest';
import Swal from 'sweetalert2'

export default function UserRetomaRequests() {
    const [userInfo, setUserInfo] = useState([]);
    // const[statusQuote, ]
    const [showButtons, setShowButtons] = useState(true);
    const [loading, setLoading] = useState(false);

    useEffect(function () {
        setLoading(true);
        getSingleUser({ id: JSON.parse(localStorage.getItem('user')).idUser })
            .then(response => {
                console.log("datos del usuario", response);
                setUserInfo(response);
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
                console.log(response);
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
                        setShowButtons(false);
                    })
                    .catch(error => {
                        console.log(error);
                    })
            })
            .catch(error => {
                console.log(error);
            })
        Swal.fire({
            icon: 'success',
            title: 'Exito!',
            text: 'Cotización rechazada!',
        })
    }

    return (
        loading ? <div>Loading...</div> : (
            <div>
                <Card>
                    <CardBody>
                        <CardTitle tag="h5">Esta es la lista de tus solicitudes de retoma {JSON.parse(localStorage.getItem('user')).name} </CardTitle>
                        <Table className="no-wrap mt-3 align-middle" responsive>
                            <thead>
                                <tr>
                                    <th>Marca referencia</th>
                                    <th>Tipo de solicitud</th>
                                    <th>Estado de la solicitud</th>
                                    <th>Valor de venta</th>
                                    <th>Estado Cotización</th>
                                </tr>
                            </thead>
                            <tbody>
                                {userInfo[0]?.requests.map((tdata, index) => (
                                    tdata.requestType === "Retoma" ? (
                                        <tr key={index} className="border-top">
                                            <td>
                                                {tdata.equipment.equipmentBrand} {tdata.equipment.modelOrReference}
                                            </td>
                                            <td>{tdata.requestType}</td>
                                            <td>{tdata.requestStatus[0].status}</td>
                                            <td>{tdata.retoma[0].retomaQuote}</td>
                                            <td>

                                                {
                                                    tdata.statusQuote === 'Pendiente' && tdata.retoma[0].retomaQuote !== "0" && showButtons ? (
                                                        <div className="text-danger">
                                                            <button onClick={() => handleAcceptClick(tdata.idRequest)} className="btn btn-primary">Aceptar</button>
                                                            <button onClick={() => handleRejectClick(tdata.idRequest)} className="btn btn-danger">Rechazar</button>
                                                        </div>
                                                    ) : (
                                                        <i>{tdata.statusQuote}</i>
                                                    )
                                                }

                                            </td>
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
