import React from 'react'
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
import authRegister from '../../services/authRegister';
import Swal from 'sweetalert2'

export default function SignUp() {
    const [loading, setLoading] = React.useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        Swal.fire({
            title: 'Condiciones de servicio.',
            text: 'Las condiciones de uso y servicio de Celuparts incluyen el uso y tratamiento de datos requeridos para ofrecer el servicio.',
            input: 'checkbox',
            inputPlaceholder: 'Acepto las condiciones de servicio y política de privacidad de Celuparts.'
        }).then((result) => {
            if (result.isConfirmed) {
                if (result.value) {
                    authRegister({
                        idType: e.target.elements.idType.value,
                        idNumber: e.target.elements.idNumber.value,
                        names: e.target.elements.names.value,
                        surnames: e.target.elements.surnames.value,
                        phone: e.target.elements.phone.value,
                        alternativePhone: e.target.elements.alternativePhone.value,
                        email: e.target.elements.email.value,
                        password: e.target.elements.password.value,
                        accountStatus: "Habilitada"
                    })
                        .then(data => {
                            setLoading(false);
                            Swal.fire({ icon: 'success', text: 'Registro exitoso!' });
                        }).catch(error => {
                            console.log("ERROR", error);
                            setLoading(false);
                        });
                } else {
                    Swal.fire({ icon: 'error', text: "Debes aceptar los términos y condiciones para registrarte en el sistema." });
                    setLoading(false);
                }
            } else {
                console.log(`modal was dismissed by ${result.dismiss}`)
            }
        })
    }

    return (
        <div className='sing-up-container'>
            <Row className=''>
                <Col>
                    <Card className='container'>
                        <CardTitle tag="h2" className="border-bottom p-3 mb-0 row justify-content-center">
                            Registrate
                        </CardTitle>
                        <CardBody>
                            <Form onSubmit={handleSubmit}>
                                <FormGroup>
                                    <Label for="idType">Tipo de documento*</Label>
                                    <Input id="idType" name="select" type="select">
                                        <option>CC</option>
                                        <option>TI</option>
                                    </Input>
                                </FormGroup>
                                <FormGroup>
                                    <Label for="idNumber">Número de cedula*</Label>
                                    <Input
                                        id="idNumber"
                                        name="idNumber"
                                        placeholder="Ingrese su número de cedula"
                                        type="number"
                                        required
                                    />
                                </FormGroup>
                                <FormGroup>
                                    <Label for="names">Nombres*</Label>
                                    <Input
                                        id="names"
                                        name="names"
                                        placeholder="Ingrese sus nombres"
                                        type='text'
                                        required
                                    />
                                </FormGroup>
                                <FormGroup>
                                    <Label for="surnames">Apellidos*</Label>
                                    <Input
                                        id="surnames"
                                        name="surnames"
                                        placeholder="Ingrese sus apellidos"
                                        type='text'
                                        required
                                    />
                                </FormGroup>
                                <FormGroup>
                                    <Label for="phone">Número de telefono*</Label>
                                    <Input
                                        id="phone"
                                        name="phone"
                                        placeholder="Ingrese su número de telefono"
                                        type='number'
                                        required
                                    />
                                </FormGroup>
                                <FormGroup>
                                    <Label for="alternativePhone">Número de telefono alternativo (opcional)</Label>
                                    <Input
                                        id="alternativePhone"
                                        name="alternativePhone"
                                        placeholder="Ingrese su número de telefono alternativo"
                                        type='number'
                                    />
                                </FormGroup>
                                <FormGroup>
                                    <Label for="email">Email*</Label>
                                    <Input
                                        id="email"
                                        name="email"
                                        placeholder="Ingrese su email"
                                        type="email"
                                        required
                                    />
                                </FormGroup>
                                <FormGroup>
                                    <Label for="password">Contraseña*</Label>
                                    <Input
                                        id="password"
                                        name="password"
                                        placeholder="Ingrese su contraseña"
                                        type="password"
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
                                            Registrate
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
