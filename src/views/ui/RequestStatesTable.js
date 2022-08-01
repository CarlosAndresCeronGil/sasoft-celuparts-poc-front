import React from 'react'
import { Card, CardBody, CardTitle, Table } from "reactstrap";

const tableData = [
    {
        idRequest: 1,
        paymentStatus: "Pagado",
        productReturned: "No",
    }
];

export default function RequestStatesTable() {
  return (
    <div>
        <Card>
                <CardBody>
                    <CardTitle tag="h5">Estado de solicitud</CardTitle>

                    <Table className="no-wrap mt-3 align-middle" responsive borderless>
                        <thead>
                            <tr>
                                <th>Id</th>
                                <th>Estado de pago</th>
                                <th>Producto devuelto</th>
                            </tr>
                        </thead>
                        <tbody>
                            {tableData.map((tdata, index) => (
                                <tr key={index} className="border-top">
                                    <td>
                                        <span className="text-muted">{tdata.idRequest}</span>
                                    </td>
                                    <td>{tdata.paymentStatus}</td>
                                    <td>{tdata.productReturned}</td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </CardBody>
            </Card>
    </div>
  )
}
