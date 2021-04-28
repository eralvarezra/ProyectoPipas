'use strict';
const nodemailer = require('nodemailer');
require('dotenv').config();
//no poner nombre, y esos datos en el formulario / ya se loggeo el usuario
//cookie se llamda controlador, y pasarla por parametro
this.enviar_email = (nombreUsuario, correoUsuario, comentarioUsuario) => {
    //transporter es el encargado de configurar el servicio y establecer la comunicación con el servidor de correos usando el protocolo SMTP
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            //obtenemos las variables de configuracion de ambiente ocn los credenciales
            user: process.env.MAILUSER,
            pass: process.env.MAILPSSWD
        }
    });

    let email_options = {
        from: 'pet22.lover22@gmail.com', // otro correo de la app
        to: 'pet22.lover22@gmail.com', // admin
        subject: `Has recibido un mensaje de ${nombreUsuario}`, //quien lo esta enviando
        html: `
        <table cellpadding="0" cellspacing="0" width="600px" background-color="rgb(255,255,255)" ; bgcolor="#cc494f" ;>
            <tr height=" 70px ">
                <td width="600px ">
                    <h1 style="color:#fff; text-align:center ">Tiene un nuevo mensaje.</h1>
                    <p style="color: #fff; text-align:center ">
                    <span style="color:#fff;font-weight: bold; ">${correoUsuario}</span> Porfavor responder al usuario.
                </p>
                <p style="color: #fff; text-align:center ">
                    <span style="color:#fff;font-weight: bold; ">${comentarioUsuario}</span> Este es el mensaje del usuario.
                </p>
            </td>
        </tr>
        <tr>
        
    </table>`
    };
    transporter.sendMail(email_options, (error, info) => {
        if (error) {
            console.log(error);
        } else {
            console.log('El correo se envío correctamente.' + info.response);
        }
    });
}

module.exports = this;