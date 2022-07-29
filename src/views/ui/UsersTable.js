import React from 'react'
import { Card, CardBody, CardTitle, CardSubtitle, Table } from "reactstrap";

const tableData = [
    {
        id: 1,
        idNumber: "4515",
        name: "Hanna Gover",
        email: "hgover@gmail.com",
        phone: "4515",
        AlternativePhone: "4515",
        AccountStatus: "Habilitada",
    },
];

export default function UsersTable() {
    return (
        <div>
            <Card>
                <CardBody>
                    <CardTitle tag="h5">Project Listing</CardTitle>
                    <CardSubtitle className="mb-2 text-muted" tag="h6">
                        Overview of the projects
                    </CardSubtitle>

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
                                            <div className="ms-2">
                                                <h6 className="mb-0">{tdata.name}</h6>
                                                <span className="text-muted">{tdata.email}</span>
                                            </div>
                                        </div>
                                    </td>
                                    <td>{tdata.project}</td>
                                    <td>
                                        {tdata.status === "pending" ? (
                                            <span className="p-2 bg-danger rounded-circle d-inline-block ms-3"></span>
                                        ) : tdata.status === "holt" ? (
                                            <span className="p-2 bg-warning rounded-circle d-inline-block ms-3"></span>
                                        ) : (
                                            <span className="p-2 bg-success rounded-circle d-inline-block ms-3"></span>
                                        )}
                                    </td>
                                    <td>{tdata.weeks}</td>
                                    <td>{tdata.budget}</td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </CardBody>
            </Card>
        </div>
    )
}
