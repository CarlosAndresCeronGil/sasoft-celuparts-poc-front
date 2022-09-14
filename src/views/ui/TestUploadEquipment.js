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
import Swal from 'sweetalert2'
import postEquipment from '../../services/postEquipment';

export default function TestUploadEquipment() {
    const [loading, setLoading] = useState(false)

    // EJEMPLO PARA TESTEAR EN EL SWAGGER
    // {
    //     "typeOfEquipment": "Computador portatil",
    //     "equipmentBrand": "Apple borrar",
    //     "modelOrReference": "MAC 100 borrar",
    //     "imeiOrSerial": "418599458498",
    //     "equipmentInvoice": "qwdqwdasda"
    // }

    const handleSubmit = (e) => {
        e.preventDefault()
        setLoading(true)
        const formData = new FormData()
        formData.append("typeOfEquipment", "Computador portatil")
        formData.append("equipmentBrand", "Apple borrar")
        formData.append("modelOrReference", "MAC 10 borrar")
        formData.append("imeiOrSerial", "1894154894849")
        formData.append("equipmentInvoice", e.target.elements.equipmentInvoice.files[0])
        
        // console.log("e.target[0].files[0]: ", e.target[0].files[0])
        console.log("e.target.elements.equipmentInvoice.files[0]: ", e.target.elements.equipmentInvoice.files[0])

        postEquipment(formData)
        .then(response => {
            console.log(response)
            Swal.fire({
                icon: 'success',
                title: 'Exito!',
                text: 'Equipo registrado!',
            })
            setLoading(false)
        })
        .catch(error => {
            console.log(error)
            Swal.fire({
                icon: 'error',
                title: 'Error!',
                text: 'No funciono',
            })
            setLoading(false)
        })
    }

    return (
        <div>
            <Row>
                <Col>
                    <Card className='container'>
                        <CardTitle tag="h2" className="border-bottom p-3 mb-0 row justify-content-center">
                            Test de nuevo equipo
                        </CardTitle>
                        <CardBody>
                            <Form onSubmit={handleSubmit}>
                                <CardSubtitle tag="h6" className="border-bottom p-1 mb-2">
                                    <i className="bi bi-box-seam"> </i>
                                    <strong>Datos de equipo (el resto de datos fueron puestos automaticamente)</strong>
                                </CardSubtitle>
                                <FormGroup>
                                    <Label for="equipmentInvoice">Factura del dispositivo*</Label>
                                    <Input
                                        id="equipmentInvoice"
                                        name="equipmentInvoice"
                                        placeholder="Ingrese la factura dispositivo"
                                        type="file"
                                        accept='.pdf'
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
                                            <Button color="celuparts-dark-blue">
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
    )
}
