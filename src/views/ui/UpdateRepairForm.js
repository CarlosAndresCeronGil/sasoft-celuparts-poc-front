import React, { useEffect, useState } from 'react'
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
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useParams } from 'react-router-dom';
import getSingleRepair from '../../services/getSingleRepair';

export default function UpdateRepairForm() {
    const [startDate, setStartDate] = useState(new Date());

    const params = useParams()

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Fecha: ", startDate);
    }

    useEffect(function() {
        getSingleRepair({id : params.id})
            .then(data => {
                console.log(data)
            })
            .catch(error => {
                console.log(error);
            }
            );
    },[params.id])

    return (
        <div>
            <div>
                <Row>
                    <Col>
                        <Card className='container'>
                            <CardTitle tag="h2" className="border-bottom p-3 mb-0 row justify-content-center">
                                Estado de reparación
                            </CardTitle>
                            <CardBody>
                                <Form onSubmit={handleSubmit}>
                                    <CardSubtitle tag="h6" className="border-bottom p-1 mb-2">
                                        <i className="bi bi-eyeglasses"> </i>
                                        <strong>Datos de la revisión</strong>
                                    </CardSubtitle>
                                    <FormGroup>
                                        <Label for="DeliveryAddress">Dirección de entrega</Label>
                                        <Input
                                            id="DeliveryAddress"
                                            name="DeliveryAddress"
                                            placeholder="Ingrese la dirección donde se devolvera el producto"
                                            type="text"
                                            required
                                        />
                                    </FormGroup>
                                    <FormGroup>
                                        <Label for="PickUpTime">Fecha de recogida</Label>
                                        <DatePicker
                                            id='PickUpTime'
                                            dateFormat="yyyy-MM-dd h:mm aa"
                                            showTimeSelect
                                            selected={startDate}
                                            onChange={(date) => setStartDate(date)}
                                            timeFormat="HH:mm"
                                        />
                                    </FormGroup>
                                    <FormGroup>
                                        <Label for="PaymentMethod">Metodo de pago</Label>
                                        <Input id="PaymentMethod" name="select" type="select">
                                            <option>Contraentrega</option>
                                            <option>Tarjeta de credito</option>
                                            <option>Tarjeta de debito</option>
                                            <option>Nequi</option>
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
