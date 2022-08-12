import React, { useCallback, useEffect, useState, useContext } from 'react'
import { Card, CardBody, CardTitle, Table } from "reactstrap";
import getSingleRequest from '../../services/getSingleRequest';
import getSingleUser from '../../services/getSingleUser';
import putRequest from '../../services/putRequest';
import AuthContext from '../../context/AuthProvider';

export default function UserRequests() {
    const [userInfo, setUserInfo] = useState([]);
    const [showButtons, setShowButtons] = useState(true);
    const [loading, setLoading] = useState(false);

    const { auth } = useContext(AuthContext);

    useEffect(function () {
        setLoading(true);
        getSingleUser({ id: 1002 })
            .then(response => {
                console.log(response);
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
    }

    return (
        loading ? <div>Loading...</div> : (
            <div>
                <Card>
                    <CardBody>
                        <CardTitle tag="h5">Esta es la lista de tus solicitudes { auth.name } </CardTitle>
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
                                ))}
                            </tbody>
                        </Table>
                    </CardBody>
                </Card>
            </div>
        )
    )
}
