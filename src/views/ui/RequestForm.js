import React, { useState } from 'react'
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
import postRequest from '../../services/postRequest';
import postEquipment from '../../services/postEquipment';

export default function RequestForm() {
    const [startDate, setStartDate] = useState(new Date());

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Fecha: ", startDate);
        postRequest({
            idUser: 1002,
            requestType: e.target.elements.tipoSolicitud.value,
            pickUpAddress: e.target.elements.PickUpAddress.value,
            deliveryAddress: e.target.elements.DeliveryAddress.value,
            pickUpTime: startDate,
            paymentMethod: e.target.elements.PaymentMethod.value,
            status: "Iniciada",
            quote: 0,
            statusQuote: "Pendiente"
        }).then(data => {
            console.log(data.idRequest);
            postEquipment({
                idRequest: data.idRequest,
                typeOfEquipment: e.target.elements.typeOfEquipment.value,
                equipmentBrand: e.target.elements.equipmentBrand.value,
                modelOrReference: e.target.elements.modelOrReference.value,
                imei: e.target.elements.imei.value,
                equipmentInvoice: e.target.elements.equipmentInvoice.value,
            }).then(data => {
                console.log(data);
            }
            )
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
                                    <CardSubtitle tag="h6" className="border-bottom p-1 mb-2">
                                        <i className="bi bi-box-seam"> </i>
                                        <strong>Datos de la solicitud</strong>
                                    </CardSubtitle>
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
                                    {/* ------------ Datos equipo ------------- */}
                                    <CardSubtitle tag="h6" className="border-bottom p-1 mb-2">
                                        <i className="bi bi-box-seam"> </i>
                                        <strong>Datos del equipo</strong>
                                    </CardSubtitle>
                                    <FormGroup>
                                        <Label for="typeOfEquipment">Tipo de dispositivo</Label>
                                        <Input id="typeOfEquipment" name="select" type="select">
                                            <option value="Computador portatil">Computador portátil</option>
                                            <option value="Telefono celular">Teléfono celular</option>
                                        </Input>
                                    </FormGroup>
                                    <FormGroup>
                                        <Label for="equipmentBrand">Marca del dispositivo</Label>
                                        <Input
                                            id="equipmentBrand"
                                            name="equipmentBrand"
                                            placeholder="Ingrese la marca del dispositivo"
                                            type="text"
                                            required
                                        />
                                    </FormGroup>
                                    <FormGroup>
                                        <Label for="modelOrReference">Modelo o referencia dispositivo</Label>
                                        <Input
                                            id="modelOrReference"
                                            name="modelOrReference"
                                            placeholder="Ingrese el modelo o referencia del dispositivo"
                                            type="text"
                                            required
                                        />
                                    </FormGroup>
                                    <FormGroup>
                                        <Label for="imei">Imei del dispositivo</Label>
                                        <Input
                                            id="imei"
                                            name="imei"
                                            placeholder="Ingrese el imei dispositivo"
                                            type="text"
                                            required
                                        />
                                    </FormGroup>
                                    <FormGroup>
                                        <Label for="equipmentInvoice">Factura del dispositivo</Label>
                                        <Input
                                            id="equipmentInvoice"
                                            name="equipmentInvoice"
                                            placeholder="Ingrese la factura dispositivo"
                                            type="text"
                                            required
                                        />
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
