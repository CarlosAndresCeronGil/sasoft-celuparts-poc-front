import React, { useState } from 'react'
import {
    Card,
    Row,
    Col,
    CardTitle,
    CardBody,
    Button,
    Form,
    FormGroup,
    Label,
    Input,
} from "reactstrap";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

export default function RequestForm() {
    const [startDate, setStartDate] = useState(new Date());

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(e.target.elements.email.value);
        console.log(e.target.elements.password.value);
    }

    return (
        <div>
            <div>
                <Row>
                    <Col>
                        <Card className='container'>
                            <CardTitle tag="h2" className="border-bottom p-3 mb-0 row justify-content-center">
                                Nueva solicitud
                            </CardTitle>
                            <CardBody>
                                <Form onSubmit={handleSubmit}>
                                    <FormGroup>
                                        <Label for="tipoSolicitud">Tipo de solicitud</Label>
                                        <Input id="tipoSolicitud" name="select" type="select">
                                            <option>Reparación</option>
                                            <option>Remonta</option>
                                        </Input>
                                    </FormGroup>
                                    <FormGroup>
                                        <Label for="PickUpAddress">Dirección de recogida</Label>
                                        <Input
                                            id="PickUpAddress"
                                            name="PickUpAddress"
                                            placeholder="Ingrese la dirección donde se recogera el producto"
                                            type="text"
                                            required
                                        />
                                    </FormGroup>
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
                                            showTimeSelect
                                            selected={startDate}
                                            onChange={(date) => setStartDate(date)}
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
                                        Enviar
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
