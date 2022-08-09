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
import postRequestStatus from '../../services/postRequestStatus';
import postRepair from '../../services/postRepair';
import postRepairPayment from '../../services/postRepairPayment';
import postHomeService from '../../services/postHomeService';

export default function RequestForm() {
    const [startDate, setStartDate] = useState(new Date());

    const handleSubmit = (e) => {
        e.preventDefault();
        // postRequest({
        //     idUser: 1002,
        //     requestType: e.target.elements.tipoSolicitud.value,
        //     pickUpAddress: e.target.elements.PickUpAddress.value,
        //     deliveryAddress: e.target.elements.DeliveryAddress.value,
        //     // pickUpTime: startDate,
        //     paymentMethod: e.target.elements.PaymentMethod.value,
        //     quote: 0,
        //     statusQuote: "Pendiente"
        // }).then(data => {
        //     postEquipment({
        //         idRequest: data.idRequest,
        //         typeOfEquipment: e.target.elements.typeOfEquipment.value,
        //         equipmentBrand: e.target.elements.equipmentBrand.value,
        //         modelOrReference: e.target.elements.modelOrReference.value,
        //         imei: e.target.elements.imei.value,
        //         equipmentInvoice: e.target.elements.equipmentInvoice.value,
        //     })
        //         .catch(error => {
        //             console.log(error);
        //         }
        //         );
        //     postRequestStatus({
        //         idRequest: data.idRequest,
        //         status: "Iniciada",
        //         paymentStatus: "Iniciada",
        //         productReturned: false
        //     })
        //         .catch(error => {
        //             console.log(error);
        //         }
        //         );
        // })
        //     .catch(error => {
        //         console.log(error);
        //     }
        //     );
        postEquipment({
            typeOfEquipment: e.target.elements.typeOfEquipment.value,
            equipmentBrand: e.target.elements.equipmentBrand.value,
            modelOrReference: e.target.elements.modelOrReference.value,
            imei: e.target.elements.imei.value,
            equipmentInvoice: e.target.elements.equipmentInvoice.value,
        })
            .then(data => {
                postRequest({
                    idUser: 3009,
                    idEquipment: data.idEquipment,
                    requestType: e.target.elements.requestType.value,
                    pickUpAddress: e.target.elements.pickUpAddress.value,
                    deliveryAddress: e.target.elements.deliveryAddress.value,
                    statusQuote: "Pendiente",
                })
                    .then(data => {
                        postRepair({
                            idRequest: data.idRequest,
                            repairQuote: "0"
                        })
                            .then(data2 => {
                                console.log("Entro al then de repair", data2);
                                postRepairPayment({
                                    idRepair: data2.idRepair,
                                    paymentMethod: e.target.elements.paymentMethod.value,
                                })
                                    .catch(error => {
                                        console.log(error);
                                    });
                            })
                        postRequestStatus({
                            idRequest: data.idRequest,
                            status: "Iniciada",
                            paymentStatus: "No pago",
                            productReturned: false
                        })
                            .catch(error => {
                                console.log(error);
                            });
                        postHomeService({
                            idRequest: data.idRequest,
                            pickUpDate: startDate,
                        })
                    }).catch(error => {
                        console.log(error);
                    })
            })
            .catch(error => {
                console.log(error);
            });
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
                                        <Label for="requestType">Tipo de solicitud</Label>
                                        <Input id="requestType" name="requestType" type="select">
                                            <option value="Reparacion">Reparación</option>
                                            <option>Retoma</option>
                                        </Input>
                                    </FormGroup>
                                    <FormGroup>
                                        <Label for="pickUpAddress">Dirección de recogida</Label>
                                        <Input
                                            id="pickUpAddress"
                                            name="pickUpAddress"
                                            placeholder="Ingrese la dirección donde se recogera el producto"
                                            type="text"
                                            required
                                        />
                                    </FormGroup>
                                    <FormGroup>
                                        <Label for="deliveryAddress">Dirección de entrega</Label>
                                        <Input
                                            id="deliveryAddress"
                                            name="deliveryAddress"
                                            placeholder="Ingrese la dirección donde se devolvera el producto"
                                            type="text"
                                            required
                                        />
                                    </FormGroup>
                                    <FormGroup>
                                        <Label for="PickUpTime">Fecha y hora de recogida</Label>
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
                                        <Label for="paymentMethod">Metodo de pago</Label>
                                        <Input id="paymentMethod" name="paymentMethod" type="select">
                                            <option>Contraentrega</option>
                                            <option>Tarjeta de credito</option>
                                            <option>Tarjeta de debito</option>
                                            <option>Nequi</option>
                                        </Input>
                                    </FormGroup>
                                    {/* --------------- Datos equipo ---------------- */}
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
