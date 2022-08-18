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
                        navigate('/');
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

        // console.log(email, password);
        // if(e.target.elements.email.value === 'user1@email.com' && e.target.password.value === '12345'){
        //     navigate('/');
        //     const user = {
        //         email: 'user1@email.com',
        //         name: 'User 1',
        //         role: 'user',
        //         id: 1002
        //     }
        //     setAuth(user);
        //     localStorage.setItem('user', JSON.stringify(user));
        //     console.log("localstorage.getItem", localStorage.getItem('user'));
        // } else if(email === 'userAdmin1@email.com' && password === '12345'){
        //     navigate('/');
        //     const user = {
        //         email: 'userAdmin1@email.com',
        //         name: 'User Admin 1',
        //         role: 'admin',
        //         id: 1001
        //     }
        //     setAuth(user);
        //     localStorage.setItem('user', JSON.stringify(user));
        // } else if (email === 'userTecnico1@email.com' && password === '12345'){ 
        //     navigate('/');
        //     const user = {
        //         email: 'userTecnico1@email.com',
        //         name: 'User Tecnico 1',
        //         role: 'tecnico',
        //         id: 1
        //     }
        //     setAuth(user);
        //     localStorage.setItem('user', JSON.stringify(user));
        // } else if (email === 'userMensajero1@email.com' && password === '12345'){
        //     navigate('/');
        //     const user = {
        //         email: 'userMensajero1@email.com',
        //         name: 'User Mensajero 1',
        //         role: 'mensajero',
        //         id: 3
        //     }
        //     setAuth(user);
        //     localStorage.setItem('user', JSON.stringify(user));
        // } else {
        //     alert('Usuario o contraseña incorrectos');
        // }
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

