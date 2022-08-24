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
import Swal from 'sweetalert2'

import postRequest from '../../services/postRequest';
import postEquipment from '../../services/postEquipment';
import postRequestStatus from '../../services/postRequestStatus';
import postRepair from '../../services/postRepair';
import postRepairPayment from '../../services/postRepairPayment';
import postHomeService from '../../services/postHomeService';
import postRetoma from '../../services/postRetoma';
import postRetomaPayment from '../../services/postRetomaPayment';

export default function RequestForm() {
    const [requestType, setRequestType] = useState({ requestType: 'Reparacion' })
    const [startDate, setStartDate] = useState(new Date());
    const [finishDate, setFinishDate] = useState(new Date())
    const [loading, setLoading] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        if (requestType.requestType === "Reparacion") {
            postEquipment({
                typeOfEquipment: e.target.elements.typeOfEquipment.value,
                equipmentBrand: e.target.elements.equipmentBrand.value,
                modelOrReference: e.target.elements.modelOrReference.value,
                imei: e.target.elements.imei.value,
                equipmentInvoice: e.target.elements.equipmentInvoice.value,
            })
                .then(data => {
                    postRequest({
                        idUser: JSON.parse(localStorage.getItem('user')).idUser,
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
                                            setLoading(false);
                                        });
                                })
                                .catch(error => {
                                    console.log(error);
                                    setLoading(false);
                                });
                            postRequestStatus({
                                idRequest: data.idRequest,
                                status: "Iniciada",
                                paymentStatus: "No pago",
                                productReturned: false,
                                productSold: false
                            })
                                .catch(error => {
                                    setLoading(false);
                                    console.log(error);
                                });
                            postHomeService({
                                idRequest: data.idRequest,
                                pickUpDate: startDate,
                                deliveryDate: finishDate
                            })
                                .catch(error => {
                                    setLoading(false);
                                    console.log(error);
                                });
                            setLoading(false);
                        })
                        .catch(error => {
                            setLoading(false);
                            console.log(error);
                        })
                })
                .catch(error => {
                    setLoading(false);
                    console.log(error);
                });
            Swal.fire({
                icon: 'success',
                title: 'Exito!',
                text: 'Solicitud de reparacióm enviada!',
            })
        } else if (requestType.requestType === "Retoma") {
            postEquipment({
                typeOfEquipment: e.target.elements.typeOfEquipment.value,
                equipmentBrand: e.target.elements.equipmentBrand.value,
                modelOrReference: e.target.elements.modelOrReference.value,
                imei: e.target.elements.imei.value,
                equipmentInvoice: e.target.elements.equipmentInvoice.value,
            })
                .then(data => {
                    postRequest({
                        idUser: JSON.parse(localStorage.getItem('user')).idUser,
                        idEquipment: data.idEquipment,
                        requestType: e.target.elements.requestType.value,
                        pickUpAddress: e.target.elements.pickUpAddress.value,
                        deliveryAddress: e.target.elements.deliveryAddress.value,
                        statusQuote: "Pendiente",
                    })
                        .then(data => {
                            postRetoma({
                                idRequest: data.idRequest,
                                retomaQuote: "0",
                                deviceDiagnostic: ""
                            })
                                .then(data2 => {
                                    console.log("Entro al then de retoma", data2);
                                    postRetomaPayment({
                                        idRetoma: data2.idRetoma,
                                        paymentMethod: e.target.elements.paymentMethod.value
                                    })
                                        .catch(error => {
                                            console.log(error);
                                            setLoading(false);
                                        });
                                })
                                .catch(error => {
                                    console.log(error);
                                    setLoading(false);
                                });
                            postRequestStatus({
                                idRequest: data.idRequest,
                                status: "Iniciada",
                                paymentStatus: "No pago",
                                productReturned: false,
                                productSold: false
                            })
                                .catch(error => {
                                    setLoading(false);
                                    console.log(error);
                                });
                            postHomeService({
                                idRequest: data.idRequest,
                                pickUpDate: startDate,
                            })
                                .catch(error => {
                                    setLoading(false);
                                    console.log(error);
                                });
                            setLoading(false);
                        })
                        .catch(error => {
                            setLoading(false);
                            console.log(error);
                        })
                })
                .catch(error => {
                    setLoading(false);
                    console.log(error);
                });
            Swal.fire({
                icon: 'success',
                title: 'Exito!',
                text: 'Solicitud de retoma enviada!',
            })
        }
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
                                        <Label for="requestType">Tipo de solicitud*</Label>
                                        <Input
                                            id="requestType"
                                            name="requestType"
                                            type="select"
                                            value={requestType.requestType}
                                            onChange={(e) => setRequestType({ requestType: e.target.value })}
                                        >
                                            <option value="Reparacion">Reparación</option>
                                            <option>Retoma</option>
                                        </Input>
                                    </FormGroup>
                                    <FormGroup>
                                        <Label for="pickUpAddress">Dirección de recogida*</Label>
                                        <Input
                                            id="pickUpAddress"
                                            name="pickUpAddress"
                                            placeholder="Ingrese la dirección donde se recogera el producto"
                                            type="text"
                                            required
                                        />
                                    </FormGroup>
                                    <FormGroup>
                                        <Label for="deliveryAddress">Dirección de entrega*</Label>
                                        <Input
                                            id="deliveryAddress"
                                            name="deliveryAddress"
                                            placeholder="Ingrese la dirección donde se devolvera el producto"
                                            type="text"
                                            required
                                        />
                                    </FormGroup>
                                    <FormGroup>
                                        <Label for="PickUpTime">Fecha y hora de recogida*</Label>
                                        <DatePicker
                                            id='PickUpTime'
                                            dateFormat="yyyy-MM-dd h:mm aa"
                                            showTimeSelect
                                            selected={startDate}
                                            onChange={(date) => setStartDate(date)}
                                            timeFormat="HH:mm"
                                        />
                                    </FormGroup>
                                    {
                                        requestType.requestType === "Reparacion" ? (
                                            <FormGroup>
                                                <Label for="DeliveryDate">Fecha y hora de recogida*</Label>
                                                <DatePicker
                                                    id='DeliveryDate'
                                                    dateFormat="yyyy-MM-dd h:mm aa"
                                                    showTimeSelect
                                                    selected={finishDate}
                                                    onChange={(date) => setFinishDate(date)}
                                                    timeFormat="HH:mm"
                                                />
                                            </FormGroup>
                                        )
                                            : (<FormGroup>
                                                <Label for="DeliveryDate">Fecha y hora tentativa a entrega en caso de no aceptar valor de venta*</Label>
                                                <DatePicker
                                                    id='DeliveryDate'
                                                    dateFormat="yyyy-MM-dd h:mm aa"
                                                    showTimeSelect
                                                    selected={finishDate}
                                                    onChange={(date) => setFinishDate(date)}
                                                    timeFormat="HH:mm"
                                                />
                                            </FormGroup>
                                            )
                                    }
                                    <FormGroup>
                                        {
                                            requestType.requestType === "Reparacion" ? (
                                                <Label for="paymentMethod">Metodo de pago*</Label>
                                            ) : (
                                                <Label for="paymentMethod">Metodo de pago (de celuparts a ti)*</Label>
                                            )
                                        }

                                        <Input id="paymentMethod" name="paymentMethod" type="select">
                                            <option>Contraentrega</option>
                                            <option>Transferencia bancaria</option>
                                        </Input>
                                    </FormGroup>
                                    {/* --------------- Datos equipo ---------------- */}
                                    <CardSubtitle tag="h6" className="border-bottom p-1 mb-2">
                                        <i className="bi bi-box-seam"> </i>
                                        <strong>Datos del equipo</strong>
                                    </CardSubtitle>
                                    <FormGroup>
                                        <Label for="typeOfEquipment">Tipo de dispositivo*</Label>
                                        <Input id="typeOfEquipment" name="select" type="select">
                                            <option value="Computador portatil">Computador portátil</option>
                                            <option value="Telefono celular">Teléfono celular</option>
                                        </Input>
                                    </FormGroup>
                                    <FormGroup>
                                        <Label for="equipmentBrand">Marca del dispositivo*</Label>
                                        <Input
                                            id="equipmentBrand"
                                            name="equipmentBrand"
                                            placeholder="Ingrese la marca del dispositivo"
                                            type="text"
                                            required
                                        />
                                    </FormGroup>
                                    <FormGroup>
                                        <Label for="modelOrReference">Modelo o referencia dispositivo*</Label>
                                        <Input
                                            id="modelOrReference"
                                            name="modelOrReference"
                                            placeholder="Ingrese el modelo o referencia del dispositivo"
                                            type="text"
                                            required
                                        />
                                    </FormGroup>
                                    <FormGroup>
                                        <Label for="imei">Imei del dispositivo*</Label>
                                        <Input
                                            id="imei"
                                            name="imei"
                                            placeholder="Ingrese el imei dispositivo"
                                            type="text"
                                            required
                                        />
                                    </FormGroup>
                                    <FormGroup>
                                        <Label for="equipmentInvoice">Factura del dispositivo*</Label>
                                        <Input
                                            id="equipmentInvoice"
                                            name="equipmentInvoice"
                                            placeholder="Ingrese la factura dispositivo"
                                            type="text"
                                            required
                                        />
                                    </FormGroup>
                                    {
                                        loading ? (
                                            <button className="btn btn-primary" type="button" disabled>
                                                <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                                                <span className="sr-only">Cargando...</span>
                                            </button>
                                        ) : (
                                            <Button color="primary">
                                                Enviar
                                            </Button>
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
}
