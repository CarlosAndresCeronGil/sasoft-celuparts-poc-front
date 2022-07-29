import React from 'react'
import { Link, useNavigate } from 'react-router-dom';
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

export default function SignIn() {

    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(e.target.elements.email.value);
        console.log(e.target.elements.password.value);
        if(e.target.elements.email.value === 'user1@email.com' && e.target.password.value === '12345'){
            navigate('/starter');
        }else {
            alert('Usuario o contraseña incorrectos');
        }
    }

    return (
        <div>
            <div>
                <Row>
                    <Col>
                        <Card className='container'>
                            <CardTitle tag="h2" className="border-bottom p-3 mb-0 row justify-content-center">
                                Login
                            </CardTitle>
                            <CardBody>
                                <Form onSubmit={handleSubmit}>
                                    <FormGroup>
                                        <Label for="Email">Email</Label>
                                        <Input
                                            id="exampleEmail"
                                            name="email"
                                            placeholder="Ingrese su email"
                                            type="email"
                                        />
                                    </FormGroup>
                                    <FormGroup>
                                        <Label for="Password">Contraseña</Label>
                                        <Input
                                            id="examplePassword"
                                            name="password"
                                            placeholder="Ingrese su contraseña"
                                            type="password"
                                        />
                                    </FormGroup>
                                    <Button className="btn" color="primary">
                                        Login
                                    </Button>
                                </Form>
                                ¿No tienes cuenta? <Link to='/Signup'>registrate! </Link> 
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </div>
        </div>
    )
}

