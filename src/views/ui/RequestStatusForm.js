import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import {
    Card,
    Row,
    Col,
    CardTitle,
    CardSubtitle,
    CardBody,
    Button,
    Form,
    FormGroup,
    Label,
    Input,
} from "reactstrap";
import getSingleRequestStatus from '../../services/getSingleRequestStatus';

export default function RequestStatusForm() {
    const [dataRequestStatus, setDataRequestStatus] = useState({});
    const [status, setStatus] = useState({ status: "" });
    const [loading, setLoading] = useState(false);

    const params = useParams()

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(e.target.status.value);
    }

    const handleStatusChange = (e) => {
        setStatus((prev) => ({
            ...prev,
            [e.target.name]: e.target.value
        }));
        console.log(status);
    }

    useEffect(function () {
        setLoading(true);
        getSingleRequestStatus({ id: params.id })
            .then((response) => {
                console.log(response)
                setDataRequestStatus(response)
                setStatus({ status: response.status })
                setLoading(false);
            })
            .catch(error => {
                console.log(error);
                setLoading(false);
            })
    }, [params.id])

    loading && <div>Cargando...</div>

    return (
        <div>
            <div>
                <Row>
                    <Col>
                        <Card className='container'>
                            <CardTitle tag="h2" className="border-bottom p-3 mb-0 row justify-content-center">
                                Editar Estado de Solicitud
                            </CardTitle>
                            <CardBody>
                                <Form onSubmit={handleSubmit}>
                                    <CardSubtitle tag="h6" className="border-bottom p-1 mb-2">
                                        <i className="bi bi-card-list"> </i>
                                        <strong>Datos del estado</strong>
                                    </CardSubtitle>
                                    <FormGroup>
                                        <Label for="status">Metodo de pago</Label>
                                        <Input 
                                            type="select" 
                                            name="status"
                                            id="status"
                                            value={status.status} 
                                            onChange={handleStatusChange}
                                        >
                                            <option>Iniciada</option>
                                            <option>En proceso de recogida</option>
                                            <option value="Recibida tecnico">Recibida técnico</option>
                                            <option value="En reparacion">En reparación</option>
                                            <option value="Reparado pendiente de pago">Reparado, pendiente de pago</option>
                                            <option>En camino</option>
                                            <option>Terminada</option>
                                            <option value="En devolucion">En devolución</option>
                                            <option value="Devuelto sin reparacion">Devuelto sin reparación</option>
                                            <option>Retoma</option>
                                            <option>Abandonada</option>
                                        </Input>
                                    </FormGroup>
                                    <FormGroup>
                                        <Label for="paymentStatus">Estado de pago</Label>
                                        <Input id="paymentStatus" name="select" type="select" defaultValue={dataRequestStatus.paymentStatus}>
                                            <option>Pago</option>
                                            <option>No pago</option>
                                        </Input>
                                    </FormGroup>
                                    <FormGroup>
                                        <Label for="paymentStatus">Producto devuelto</Label>
                                        <Input id="paymentStatus" name="select" type="select" defaultValue={dataRequestStatus.productReturned}>
                                            <option>Devuelto</option>
                                            <option>No devuelto</option>
                                        </Input>
                                    </FormGroup>
                                    <Button className="btn" color="primary">
                                        Envíar
                                    </Button>
                                </Form>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </div>
        </div>
    )
}
