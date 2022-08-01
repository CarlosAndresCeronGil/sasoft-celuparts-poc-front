import React, { useState, useEffect } from 'react'
import { Card, CardBody, CardTitle, Table } from "reactstrap";
import getProductReviews from '../../services/getProductReviews';

const tableData = [
    {
        idProductReview: 1,
        repairDate: "2020-01-01",
        technicalRemarks: "Se tuvo que arreglar la pantalla del celular debido a que no estaba bien, ademas se reemplazo el boton de encendido por uno nuevo",
    },
]

export default function ProductReviewTable() {
    const [productReviews, setProductReviews] = useState([]);

    useEffect(function() {
        getProductReviews()
            .then((response) => {
                console.log(response)
                setProductReviews(response)
            }
        )
    },[setProductReviews])

    return (
        <div>
            <Card>
                <CardBody>
                    <CardTitle tag="h5">Revisión del producto</CardTitle>

                    <Table className="no-wrap mt-3 align-middle" responsive borderless>
                        <thead>
                            <tr>
                                <th>Id</th>
                                <th>Fecha de reparación</th>
                                <th>Observaciones técnicas</th>
                            </tr>
                        </thead>
                        <tbody>
                            {productReviews.map((tdata, index) => (
                                <tr key={index} className="border-top">
                                    <td>
                                        <span className="text-muted">{tdata.idProductReview}</span>
                                    </td>
                                    <td>{tdata.repairDate}</td>
                                    <td>{tdata.technicalRemarks}</td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </CardBody>
            </Card>
        </div>
    )
}
