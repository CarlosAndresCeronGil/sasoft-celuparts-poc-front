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
import postRequest from '../../services/postRequest';

export default function RequestForm() {
    const [startDate, setStartDate] = useState(new Date());

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(e.target.elements.tipoSolicitud.value);
        console.log(e.target.elements.PickUpAddress.value);
        console.log(e.target.elements.DeliveryAddress.value);
        console.log(e.target.elements.PickUpTime.value);
        console.log(e.target.elements.PaymentMethod.value);
        console.log("Fecha: ", startDate.getFullYear() + "-" + (startDate.getMonth() + 1) + "-" + startDate.getDate() + " " + startDate.getHours() + ":" + startDate.getMinutes() + ":" + startDate.getSeconds());
        // console.log("fecha formateada", formatDate(startDate));
        postRequest({
            idUser: 1002,
            requestType: e.target.elements.tipoSolicitud.value,
            pickUpAddress: e.target.elements.PickUpAddress.value,
            deliveryAddress: e.target.elements.DeliveryAddress.value,
            // pickUpTime: startDate.getFullYear() + "-" + (startDate.getMonth() + 1) + "-" + startDate.getDate() + "T" + startDate.getHours() + ":" + startDate.getMinutes() + ":" + startDate.getSeconds(),
            pickUpTime: startDate.toLocaleString('es-CO', { timeZone: "America/Bogota" }),
            paymentMethod: e.target.elements.PaymentMethod.value,
            status: "Iniciada",
            quote: 0,
            statusQuote: "Pendiente"
        }).then(data => {
            console.log(data);
        }
        ).catch(error => {
            console.log(error);
        }
        );

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
                                            <option value="Reparacion">Reparación</option>
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
