import React, { useEffect, useState } from 'react'
import { Card, CardBody, CardTitle, Table } from "reactstrap";
import getSiigoProducts from '../../services/getSiigoProducts';
import { Link } from "react-router-dom";

export default function SiigoProductsTable() {
    const [loading, setLoading] = useState(false);
    const [siigoProducts, setSiigoProductsTable] = useState([])

    useEffect(function () {
        setLoading(true)
        getSiigoProducts()
            .then(response => {
                console.log(response)
                setSiigoProductsTable(response.results)
                setLoading(false)
            })
            .catch(error => {
                console.log(error)
                setLoading(false)
            })
    }, [setLoading])

    return (
        loading ? <div> Cargando... </div> : (
            <div>
                <Link to={`/siigo-product-form`} className="mb-1">
                    <button className='btn btn-primary' type='button'>
                        Nuevo producto
                    </button>
                </Link>
                <Card>
                    <CardBody>
                        <CardTitle tag="h5">Lista de productos registrados en el sistema SIIGO</CardTitle>
                        <Table className="no-wrap mt-3 align-middle" responsive borderless>
                            <thead>
                                <tr>
                                    <th>Id</th>
                                    <th>Codigo</th>
                                    <th>Nombre</th>
                                </tr>
                            </thead>
                            <tbody>
                                {siigoProducts.map((tdata, index) => (
                                    <tr key={index} className="border-top">
                                        <td>
                                            <span className="text-muted">{tdata.id}</span>
                                        </td>
                                        <td>{tdata.code}</td>
                                        <td>{tdata.name}</td>
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
