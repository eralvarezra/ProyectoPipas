'use strict';

const nodemailer = require('nodemailer');
require('dotenv').config();

this.enviar_mail = (correoProveedor, correoUsuario) => {
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.MAILUSER,
            pass: process.env.MAILPSSWD
        }
    });

    let mail_options = {
        from: 'pet22.lover22@gmail.com',
        to: correoProveedor,
        subject: `Un usuario ha solicitado un servicio!`,
        html: `
        <table border="0" cellpadding="0" cellspacing="0" width="600px" background-color="#2d3436" bgcolor="#2d3436">
            <tr height="200px">
                <td bgcolor="" width="600px">
                    <h1 style="color: #fff; text-align:center">Nuevo servicio</h1>
                    <p style="color:  #fff; text-align:center">
                    <span style="color: #e84393">Porfavor comuniquese con el usuario: ${correoUsuario} para coordinar el servicio</span>
                    </p>
                </td>
            </tr>
        </table>`
    };
    transporter.sendMail(mail_options, (error, info) => {
        if (error) {
            console.log(error);
        } else {
            console.log('El correo se envio correctamente' + info.response);
        }
    });
};

module.exports = this;