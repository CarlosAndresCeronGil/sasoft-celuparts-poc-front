import React, { useEffect, useState } from 'react'
import { Card, CardBody, CardTitle, Table } from "reactstrap";
import getSingleUser from '../../services/getSingleUser';
import getSingleEquipment from '../../services/getSingleEquipment';

export default function UserRequests() {
    const [userInfo, setUserInfo] = useState([]);
    const [equipments, setEquipments] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(function () {
        let unmounted = false;
        console.log("useEffect 1");
        setLoading(true);
        getSingleUser({ id: 3010 })
            .then(response => {
                setUserInfo(response);
                if (!unmounted) {
                    response[0].requests.forEach(request => {
                        getSingleEquipment({ id: request.idEquipment })
                            .then(response => {
                                if (!unmounted) {
                                    setEquipments(prev => [...prev, response]);
                                }
                            })
                            .catch(error => {
                                console.log(error);
                            })
                    })
                    setLoading(false)

                    console.log(response);
                }
            })
            .catch(error => {
                console.log(error);
                setLoading(false)
            })
        return () => {
            unmounted = true;
        };
    }, [])

    return (
        loading ? <div>Loading...</div> : (
            <div>
                <Card>
                    <CardBody>
                        <CardTitle tag="h5">Lista de Solicitudes</CardTitle>
                        <Table className="no-wrap mt-3 align-middle" responsive>
                            <thead>
                                <tr>
                                    <th>Id</th>
                                    <th>Marca referencia</th>
                                    <th>Tipo de solicitud</th>
                                    <th>Valor de la cuota</th>
                                    <th>Estado de la solicitud</th>
                                    <th>Fecha de entrega</th>
                                </tr>
                            </thead>
                            <tbody>
                                {userInfo[0]?.requests.map((tdata, index) => (
                                    <tr key={index} className="border-top">
                                        <td>
                                            <span className="text-muted">{tdata.idRequest}</span>
                                        </td>
                                        <td>
                                            {
                                                equipments.map((tdata2, index) => (
                                                    <div key={index}>
                                                        {tdata2.idEquipment === tdata.idEquipment ? (
                                                            tdata2.equipmentBrand + " " + tdata2.modelOrReference
                                                        ) : null}
                                                    </div>
                                                ))
                                            }
                                        </td>
                                        <td>{tdata.phone}</td>
                                        <td>{tdata.email}</td>
                                        <td>{tdata.accountStatus}</td>
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
