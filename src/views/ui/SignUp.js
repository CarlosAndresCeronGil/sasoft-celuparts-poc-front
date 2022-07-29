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
    FormText,
} from "reactstrap";

export default function SignUp() {
    return (
        <div>
            <Row>
                <Col>
                    <Card className='container'>
                        <CardTitle tag="h2" className="border-bottom p-3 mb-0 row justify-content-center">
                            Registrate
                        </CardTitle>
                        <CardBody>
                            <Form>
                                <FormGroup>
                                    <Label for="exampleSelect">Select</Label>
                                    <Input id="exampleSelect" name="select" type="select">
                                        <option>CC</option>
                                        <option>TI</option>
                                    </Input>
                                </FormGroup>
                                <FormGroup>
                                    <Label for="IdNumer">Numero de cedula</Label>
                                    <Input
                                        id="IdNumber"
                                        name="IdNumber"
                                        placeholder="Ingrese su número de cedula"
                                        type="number"
                                        required
                                    />
                                </FormGroup>
                                <FormGroup>
                                    <Label for="Names">Nombres</Label>
                                    <Input
                                        id="Names"
                                        name="names"
                                        placeholder="Ingrese sus nombres"
                                        type='text'
                                        required
                                    />
                                </FormGroup>
                                <FormGroup>
                                    <Label for="Surnames">Apellidos</Label>
                                    <Input
                                        id="Surnames"
                                        name="surnames"
                                        placeholder="Ingrese sus apellidos"
                                        type='text'
                                        required
                                    />
                                </FormGroup>
                                <FormGroup>
                                    <Label for="PhoneNumber">Número de telefono</Label>
                                    <Input
                                        id="PhoneNumber"
                                        name="phonenumber"
                                        placeholder="Ingrese su número de telefono"
                                        type='number'
                                        required
                                    />
                                </FormGroup>
                                <FormGroup>
                                    <Label for="AlternativePhoneNumber">Número de telefono alternativo (opcional)</Label>
                                    <Input
                                        id="AlternativePhoneNumber"
                                        name="alternativephonenumber"
                                        placeholder="Ingrese su número de telefono alternativo"
                                        type='number'
                                    />
                                </FormGroup>
                                <FormGroup>
                                    <Label for="Email">Email</Label>
                                    <Input
                                        id="exampleEmail"
                                        name="email"
                                        placeholder="Ingrese su email"
                                        type="email"
                                        required
                                    />
                                </FormGroup>
                                <FormGroup>
                                    <Label for="Password">Contraseña</Label>
                                    <Input
                                        id="examplePassword"
                                        name="password"
                                        placeholder="Ingrese su contraseña"
                                        type="password"
                                        required
                                    />
                                </FormGroup>
                                <Button className="btn" color="primary">
                                    Login
                                </Button>
                            </Form>
                        </CardBody>
                    </Card>
                </Col>
            </Row>
        </div>
    )
}
