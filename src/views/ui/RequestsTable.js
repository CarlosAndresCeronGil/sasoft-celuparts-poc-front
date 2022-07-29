import React from 'react'
import { Card, CardBody, CardTitle, CardSubtitle, Table } from "reactstrap";

const tableData = [
    {
        idRequest: 101,
        requestType: "Reparación",
        pickUpAddrress: "Calle 123",
        deliveryAddress: "Calle 123",
        pickUpDate: "2022-07-26T10:30:00",
        paymentMethod: "Contra entrega",
        status: "Reparado pendiente de pago",
        quote: "$100",
        statusQuote: "Aceptada",
    },
    {
        idRequest: 102,
        requestType: "Reparación",
        pickUpAddrress: "Calle 321",
        deliveryAddress: "Calle 321",
        pickUpDate: "2022-07-26T10:30:00",
        paymentMethod: "Nequi",
        status: "Reparado pendiente de pago",
        quote: "$200",
        statusQuote: "Aceptada",
    },
    {
        idRequest: 103,
        requestType: "Remonta",
        pickUpAddrress: "Calle 455",
        deliveryAddress: "Calle 455",
        pickUpDate: "2022-07-26T10:30:00",
        paymentMethod: "Contra entrega",
        status: "Devuelto sin reparación",
        quote: "$300",
        statusQuote: "Rechazada",
    },
    {
        idRequest: 104,
        requestType: "Remonta",
        pickUpAddrress: "Calle 567",
        deliveryAddress: "Calle 567",
        pickUpDate: "2022-07-26T10:30:00",
        paymentMethod: "Contra entrega",
        status: "Recibida tecnico",
        quote: "$0",
        statusQuote: "Pendiente",
    },
];

export default function RequestsTable() {
    return (
        <div>
            <Card>
                <CardBody>
                    <CardTitle tag="h5">Lista de solicitudes registradas en el sistema</CardTitle>

                    <Table className="no-wrap mt-3 align-middle" responsive borderless>
                        <thead>
                            <tr>
                                <th>Id solicitud</th>
                                <th>Tipo solicitud</th>
                                <th>Dirección recogida</th>
                                <th>Dirección entrega</th>
                                <th>Fecha recogida</th>
                                <th>Metodo de pago</th>
                                <th>Estado solicitud</th>
                                <th>Cotización</th>
                                <th>Estado cotización</th>
                            </tr>
                        </thead>
                        <tbody>
                            {tableData.map((tdata, index) => (
                                <tr key={index} className="border-top">
                                    <td>
                                        <span className="text-muted">{tdata.idRequest}</span>
                                    </td>
                                    <td>{tdata.requestType}</td>
                                    <td>{tdata.pickUpAddrress}</td>
                                    <td>{tdata.deliveryAddress}</td>
                                    <td>{tdata.pickUpDate}</td>
                                    <td>{tdata.paymentMethod}</td>
                                    <td>{tdata.status}</td>
                                    <td>{tdata.quote}</td>
                                    <td>{tdata.statusQuote}</td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </CardBody>
            </Card>
        </div>
    )
}
