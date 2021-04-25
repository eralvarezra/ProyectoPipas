'use strict';
const nodemailer = require('nodemailer');
require('dotenv').config();

this.enviar_email = (pnombre_completo, pcorreo) => {
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
        from: 'pet22.lover22@gmail.com',
        to: pcorreo,
        subject: `Bienvenido a PetLover ${pnombre_completo}`,
        html: `
        <table cellpadding="0" cellspacing="0" width="600px" background-color="rgb(255,255,255)" ; bgcolor="#cc494f" ;>
            <tr height=" 70px ">
                <td width="600px ">
                    <h1 style="color:#fff; text-align:center ">Gracias por su mensaje.</h1>
                    <p style="color: #fff; text-align:center ">
                    <span style="color:#fff;font-weight: bold; ">${pnombre_completo}</span> Pronto nos estaremos comunicando con usted.
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
            console.log('El correo se envío correctamente. ' + info.response);
        }
    });
}

module.exports = this;