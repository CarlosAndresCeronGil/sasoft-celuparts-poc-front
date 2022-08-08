import React, { useState, useEffect } from 'react'
import { Card, CardBody, CardTitle, Table } from "reactstrap";
import getRepairs from '../../services/getRepairs';

export default function RepairTable() {
    const [repairs, setRepairs] = useState([]);

    useEffect(function() {
        getRepairs()
            .then((response) => {
                setRepairs(response)
            }
        )
    },[setRepairs])

    return (
        <div>
            <Card>
                <CardBody>
                    <CardTitle tag="h5">Lista de reparaciones</CardTitle>

                    <Table className="no-wrap mt-3 align-middle" responsive borderless>
                        <thead>
                            <tr>
                                <th>Id</th>
                                <th>Fecha de reparación</th>
                                <th>Diagnositco del dispositivo</th>
                                <th>Cuota de reparación</th>
                            </tr>
                        </thead>
                        <tbody>
                            {repairs.map((tdata, index) => (
                                <tr key={index} className="border-top">
                                    <td>
                                        <span className="text-muted">{tdata.idRepair}</span>
                                    </td>
                                    <td>{tdata.repairDate}</td>
                                    <td>{tdata.deviceDiagnostic}</td>
                                    <td>{tdata.repairQuote}</td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </CardBody>
            </Card>
        </div>
    )
}
