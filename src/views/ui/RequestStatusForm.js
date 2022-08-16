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
import putRequestStatus from '../../services/putRequestStatus';
import Swal from 'sweetalert2'

export default function RequestStatusForm() {
    const [dataRequestStatus, setDataRequestStatus] = useState({});
    const [status, setStatus] = useState({ status: "" });
    const [paymentStatus, setPaymentStatus] = useState({ paymentStatus: "" });
    const [productReturned, setProductReturned] = useState({ productReturned: false });
    const [loading, setLoading] = useState(false);
    const [loadingPut, setLoadingPut] = useState(false);

    const params = useParams()

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoadingPut(true);
        putRequestStatus({
            idRequestStatus: dataRequestStatus.idRequestStatus,
            idRequest: dataRequestStatus.idRequest,
            status: status.status,
            paymentStatus: paymentStatus.paymentStatus,
            // productReturned: productReturned.productReturned === 'true' ? 'htr' : '¿asgferg',
            productReturned: productReturned.productReturned === 'true' ? true : false,
        })
            .then(data => {
                console.log("DATA", data);
                setLoadingPut(false);
            })
            .catch(error => {
                console.log(error);
                setLoadingPut(false);
            }
            );

    }

    const handleStatusChange = (e) => {
        setStatus((prev) => ({
            ...prev,
            [e.target.name]: e.target.value
        }));
    }

    const handlePaymentStatusChange = (e) => {
        setPaymentStatus((prev) => ({
            ...prev,
            [e.target.name]: e.target.value
        }));
    }

    const handleProductReturnedChange = (e) => {
        setProductReturned((prev) => ({
            ...prev,
            [e.target.name]: e.target.value
        }));
    }

    useEffect(function () {
        setLoading(true);
        getSingleRequestStatus({ id: params.id })
            .then((response) => {
                console.log(response);
                setDataRequestStatus(response)
                setStatus({ status: response.status })
                setPaymentStatus({ paymentStatus: response.paymentStatus })
                setProductReturned({ productReturned: response.productReturned })
                setLoading(false);
            })
            .catch(error => {
                console.log(error);
                setLoading(false);
            })
    }, [params.id])

    return (
        loading ? <div>Cargando...</div> : (
            <div>
                <div>
                    <Row>
                        <Col>
                            <Card className='container'>
                                <CardTitle tag="h2" className="border-bottom p-3 mb-0 row justify-content-center">
                                    Actualizar estado de solicitud
                                </CardTitle>
                                <CardBody>
                                    <Form onSubmit={handleSubmit}>
                                        <CardSubtitle tag="h6" className="border-bottom p-1 mb-2">
                                            <i className="bi bi-card-list"> </i>
                                            <strong>Datos del estado</strong>
                                        </CardSubtitle>
                                        <FormGroup>
                                            <Label for="status">Estado solicitud</Label>
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
                                                <option>Revisado</option>
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
                                            <Input
                                                type="select"
                                                name="paymentStatus"
                                                id="paymentStatus"
                                                defaultValue={paymentStatus.paymentStatus}
                                                onChange={handlePaymentStatusChange}
                                            >
                                                <option>Pago</option>
                                                <option>No pago</option>
                                            </Input>
                                        </FormGroup>
                                        <FormGroup>
                                            <Label for="productReturned">Producto devuelto</Label>
                                            <Input
                                                id="productReturned"
                                                name="productReturned"
                                                type="select"
                                                defaultValue={productReturned.productReturned}
                                                onChange={handleProductReturnedChange}
                                            >
                                                <option value={true}>Devuelto</option>
                                                <option value={false}>No devuelto</option>
                                            </Input>
                                        </FormGroup>
                                        {
                                            loadingPut ? (
                                                <button className="btn btn-primary" type="button" disabled>
                                                    <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                                                    <span className="sr-only">Cargando...</span>
                                                </button>
                                            )
                                                : (
                                                    <Button className="btn" color="primary">Guardar</Button>
                                                )
                                        }
                                    </Form>
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>
                </div>
            </div>
        )
    )
}
