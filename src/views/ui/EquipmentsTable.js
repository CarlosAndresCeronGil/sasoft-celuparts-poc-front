import React from 'react'
import { Card, CardBody, CardTitle, Table } from "reactstrap";

const tableData = [
    {
        idEquipment: 1,
        typeOfEquipment: "Telefono celular",
        equipmentBrand: "Samsung",
        equipmentModel: "S10",
        imei: "123456789",
        equipmentInvoice: "Comprado X fecha",
    },
    {
        idEquipment: 2,
        typeOfEquipment: "Telefono celular",
        equipmentBrand: "Xiaomi",
        equipmentModel: "Pro 5",
        imei: "123456789",
        equipmentInvoice: "Comprado X fecha",
    },
    {
        idEquipment: 3,
        typeOfEquipment: "Computador portatil",
        equipmentBrand: "Dell",
        equipmentModel: "Inspiron",
        imei: "123456789",
        equipmentInvoice: "Comprado X fecha",
    },
];

export default function EquipmentsTable() {
    return (
        <div>
            <Card>
                <CardBody>
                    <CardTitle tag="h5">Lista de equipos registrados en el sistema</CardTitle>

                    <Table className="no-wrap mt-3 align-middle" responsive borderless>
                        <thead>
                            <tr>
                                <th>Id</th>
                                <th>Tipo de equipo</th>
                                <th>Marca</th>
                                <th>Modelo</th>
                                <th>Imei</th>
                                <th>Factura</th>
                            </tr>
                        </thead>
                        <tbody>
                            {tableData.map((tdata, index) => (
                                <tr key={index} className="border-top">
                                    <td>
                                        <span className="text-muted">{tdata.idEquipment}</span>
                                    </td>
                                    <td>{tdata.typeOfEquipment}</td>
                                    <td>{tdata.equipmentBrand}</td>
                                    <td>{tdata.equipmentModel}</td>
                                    <td>{tdata.imei}</td>
                                    <td>{tdata.equipmentInvoice}</td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </CardBody>
            </Card>
        </div>
    )
}
