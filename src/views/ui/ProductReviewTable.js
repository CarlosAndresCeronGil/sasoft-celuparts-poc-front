import React, { useState, useEffect } from 'react'
import { Card, CardBody, CardTitle, Table } from "reactstrap";
import getProductReviews from '../../services/getProductReviews';

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
