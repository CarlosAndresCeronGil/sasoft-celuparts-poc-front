import React, { useEffect, useState } from 'react'
import { Card, CardBody, CardTitle, Table } from "reactstrap";
import getSingleUser from '../../services/getSingleUser';

export default function UserRequests() {
    const [userInfo, setUserInfo] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(function () {
        setLoading(true);
        getSingleUser({ id: 1002 })
            .then(response => {
                setUserInfo(response);
                setLoading(false)
                console.log(response);
            })
            .catch(error => {
                console.log(error);
                setLoading(false)
            })
    }, []);

    return (
        loading ? <div>Loading...</div> : (
            <div>
                <Card>
                    <CardBody>
                        <CardTitle tag="h5">Lista de Mis Solicitudes</CardTitle>
                        <Table className="no-wrap mt-3 align-middle" responsive>
                            <thead>
                                <tr>
                                    <th>Marca referencia</th>
                                    <th>Tipo de solicitud</th>
                                    <th>Valor de la cuota</th>
                                    <th>Estado de la solicitud</th>
                                    <th>Cotización</th>
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
                                        <td>{tdata.repairs[0].repairQuote}</td>
                                        <td>{tdata.requestStatus[0].status}</td>
                                        <td>{tdata.repairs[0].repairQuote}</td>
                                        {/* <td>
                                            {
                                                tdata.statusQuote === 'Pendiente' ? (
                                                    <button className="btn btn-primary">Aceptar</button>
                                                ) : tdata.statusQuote === 'Pendiente' ? (
                                                    <button className="btn btn-danger">Aceptada</button>
                                                ) ? tdata.statusQuote === 'Aceptada' (
                                                    <i>Aceptada</i>
                                                ) : (
                                                    <i>Rechazada</i>
                                                )
                                            }
                                        </td> */}
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
