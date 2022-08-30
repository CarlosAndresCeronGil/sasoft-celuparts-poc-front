import React from 'react'
import { Link } from 'react-router-dom'

export default function Footer() {
    return (
        // <div className='footer-container'>
        //     <div className='footer-column'>
        //         <img src="/celuparts-login-logo.png" alt="celuparts-logo" className="small-image"></img>
        //         <div>
        //             Aute quis id tempor nisi esse consectetur velit sint sit enim anim.
        //         </div>
        //     </div>
        //     <div className='footer-column'>
        //         <div className='footer-column title'>
        //             Contactanos
        //         </div>
        //         <div>
        //             soporte@celuparts.com
        //         </div>
        //     </div>
        //     <div className='footer-column'>
        //         <div className='footer-column title'>
        //             Síguenos
        //         </div>
        //         <div>
        //             Twitter
        //             Instagram
        //             Facebook
        //         </div>
        //     </div>
        // </div>
        <div className='footer-container'>
            <div className='footer'>
                <div className='footer-heading footer-1'>
                    <h2>Acerca de nosotros</h2>
                    <Link to="#">Blog</Link>
                    <Link to="#">Demo</Link>
                    <Link to="#">Clientes</Link>
                    <Link to="#">Productos</Link>
                    <Link to="#">Terminos y condiciones</Link>
                </div>
                <div className='footer-heading footer-2'>
                    <h2>Contactanos</h2>
                    <Link to="#">Trabajos</Link>
                    <Link to="#">Ayuda</Link>
                    <Link to="#">Contacto</Link>
                    <Link to="#">Patrocinadores</Link>
                </div>
                <div className='footer-heading footer-3'>
                    <h2>Redes sociales</h2>
                    <Link to="#">Instagram</Link>
                    <Link to="#">Facebook</Link>
                    <Link to="#">Twitter</Link>
                </div>
            </div>
        </div>
    )
}
