import React from 'react'
import { Card, CardBody, CardTitle, CardSubtitle, Table } from "reactstrap";

const tableData = [
    {
        id: 1,
        idNumber: "54548",
        name: "User Test 1",
        email: "user1@gmail.com",
        phone: "457515",
        AlternativePhone: "51848",
        AccountStatus: "Habilitada",
    },
    {
        id: 2,
        idNumber: "821548",
        name: "User Test 2",
        email: "user2@email.com",
        phone: "848915",
        AlternativePhone: "",
        AccountStatus: "Habilitada",
    },
    {
        id: 3,
        idNumber: "8481548",
        name: "User Test 3",
        email: "user3@email.com",
        phone: "848915",
        AlternativePhone: "",
        AccountStatus: "Inhabilitada",
    },
    {
        id: 4,
        idNumber: "84848948",
        name: "User Test 4",
        email: "user4@email.com",
        phone: "845123",
        AlternativePhone: "484541",
        AccountStatus: "Cerrada",
    },
];

export default function UsersTable() {
    return (
        <div>
            <Card>
                <CardBody>
                    <CardTitle tag="h5">Lista de usuarios registrados en el sistema</CardTitle>
                    {/* <CardSubtitle className="mb-2 text-muted" tag="h6">
                        Overview of the projects
                    </CardSubtitle> */}

                    <Table className="no-wrap mt-3 align-middle" responsive borderless>
                        <thead>
                            <tr>
                                <th>Id</th>
                                <th>Numero identificacion</th>
                                <th>Nombre</th>
                                <th>Email</th>
                                <th>Telefono</th>
                                <th>Telefono Alternativo</th>
                                <th>Estado de la cuenta</th>
                            </tr>
                        </thead>
                        <tbody>
                            {tableData.map((tdata, index) => (
                                <tr key={index} className="border-top">
                                    <td>
                                        <div className="d-flex align-items-center p-1">
                                            <div className="ms-0">
                                                <span className="text-muted">{tdata.id}</span>
                                            </div>
                                        </div>
                                    </td>
                                    <td>{tdata.idNumber}</td>
                                    <td>{tdata.name}</td>
                                    <td>{tdata.email}</td>
                                    <td>{tdata.phone}</td>
                                    <td>{tdata.AlternativePhone}</td>
                                    <td>
                                        {tdata.AccountStatus === "Cerrada" ? (
                                            <span className="p-2 bg-danger rounded-circle d-inline-block ms-3"></span>
                                        ) : tdata.AccountStatus === "Inhabilitada" ? (
                                            <span className="p-2 bg-warning rounded-circle d-inline-block ms-3"></span>
                                        ) : (
                                            <span className="p-2 bg-success rounded-circle d-inline-block ms-3"></span>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </CardBody>
            </Card>
        </div>
    )
}
