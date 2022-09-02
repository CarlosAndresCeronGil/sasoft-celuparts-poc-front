import React, { useState, useContext } from 'react'
import jwtDecode from 'jwt-decode'
import { Link, useNavigate } from 'react-router-dom';
import AuthContext from '../../context/AuthProvider';
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
import authLogin from '../../services/authLogin';
import Swal from 'sweetalert2'

export default function SignIn() {
    const { setAuth } = useContext(AuthContext);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        try {
            authLogin({
                email,
                password
            })
                .then(response => {
                    console.log("Response", response);
                    if (response !== undefined) {
                        const user = jwtDecode(response)
                        console.log("user", user);
                        localStorage.setItem('user', JSON.stringify(user));
                        setAuth(true);
                        navigate('/home');
                    }
                })
                .catch(error => {
                    console.log(error);
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: 'Usuario o contraseña incorrecto!'
                    })
                });

        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className='sing-in-container'>
            <div className='image'>
                <img src="/celuparts-login-logo.png" alt="celuparts-logo" className="medium-image"></img>
            </div>
            <div>
                <Row>
                    <Col>
                        <Card>
                            <CardTitle tag="h2" className="border-bottom p-3 mb-0 align-self-center justify-content-center">
                                Bienvenido
                            </CardTitle>
                            <CardBody>
                                <Form onSubmit={handleSubmit}>
                                    <FormGroup>
                                        <Label for="Email">Email</Label>
                                        <Input
                                            id="exampleEmail"
                                            name="email"
                                            value={email}
                                            placeholder="Ingrese su email"
                                            type="email"
                                            onChange={(e) => setEmail(e.target.value)}
                                        />
                                    </FormGroup>
                                    <FormGroup>
                                        <Label for="Password">Contraseña</Label>
                                        <Input
                                            id="examplePassword"
                                            name="password"
                                            value={password}
                                            placeholder="Ingrese su contraseña"
                                            type="password"
                                            onChange={(e) => setPassword(e.target.value)}
                                        />
                                    </FormGroup>
                                    <Button className="btn all-space" color="celuparts-dark-blue">
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

