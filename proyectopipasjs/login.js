'use strict';
const correoElectronico = document.getElementById("txt-Usuario");
const contrasena = document.getElementById("pass-Contrasena");
const btnIniciarSesion = document.getElementById("btn-Login");
const btnRegistrase = document.getElementById("btn-Registrarse");
const btnPassReset = document.getElementById("btn-PassReset");
const btnFormRegistro = document.getElementById("btn-FormRegistro");
const popupregistro = document.querySelector("#sct-popupRegistro");
const btnVolver = document.getElementById("btn-Cancelar");
const popupPassReset = document.querySelector("#sct-popupPassReset");
const btnVolverPassReset = document.getElementById("btn-Volver");
const btnPassResetEnviar = document.getElementById("btn-PassResetEnviar");
const correoPassReset = document.getElementById("txt-correoPassReset");
const cookie = document.cookie;

const obtenerDatos = () => {
    // este paso es para consultar la base de datos y traer correo y pass
    let email = correoElectronico.value;
    let pass = contrasena.value;
    mostrar_activar(email, pass);
};


// leer cookies
function readCookie(pCookie) {
    const nameString = pCookie + "="

    const value = document.cookie.split(";").filter(item => {
        return item.includes(nameString)
    })

    if (value.length) {
        return value[0].substring(nameString.length, value[0].length)
    } else {
        return ""
    }
}
const mostrar_activar = async(filtro, pass) => {
    let lista_proveedor = await listar_proveedor();
    let lista_usuario = await obtener_login_usuario();
    let lista_admin = await obtener_login();
    // let lista_activos;
    let valido = false;
    // for (let i = 0; i < lista_proveedor.length; i++) {
    //     lista_activos += lista_proveedor[i];
    // }
    // for (let i = 0; i < lista_usuario.length; i++) {
    //     lista_activos += lista_usuario[i];
    // }
    // console.log(lista_activos);

    lista_proveedor.forEach((proveedor) => {
        if (proveedor.correo == filtro) {
            if ((proveedor.activo == "Activo") && (proveedor.estado == "Aceptada")) {
                valido = true;
                validar_perfil(filtro, pass);
            } else if (proveedor.correo === filtro) {
                if ((proveedor.activo !== "Activo") || (proveedor.estado !== "Aceptada")) {
                    Swal.fire({
                        'icon': 'warning',
                        'title': 'Su perfil no se encuentra activo o aprobado en este momento.',
                        'text': 'Por favor comuníquese con el administrador.'
                    });
                }
            }
        }
    });

    lista_usuario.forEach((usuario) => {
        if (usuario.correo == filtro) {
            if (usuario.activo == "Activo") {
                valido = true;
                validar_perfil(filtro, pass);
            }
        }
    });

    lista_admin.forEach((admin) => {
        if (admin.correo == filtro) {
            validar_perfil(filtro, pass);
        }
    });
};

const validar_perfil = async(pEmail, pPass) => {

    let datos_login_admin = await obtener_login();
    let datos_login_usuario = await obtener_login_usuario();
    let datos_login_proveedor = await obtener_login_proveedor();
    let correoValido = false;
    let perfilValido = false;
    let contrasenaValida = false;

    if (datos_login_admin.find(correo => correo.correo === pEmail)) {
        correoValido = true;
        document.cookie = "tipoPerfil=" + "A";
    } else if (datos_login_usuario.find(correo => correo.correo === pEmail)) {
        correoValido = true;
        document.cookie = "tipoPerfil=" + "U";
    } else if (datos_login_proveedor.find(correo => correo.correo === pEmail)) {
        correoValido = true;
        document.cookie = "tipoPerfil=" + "P";
    }

    if (datos_login_admin.find(correo => correo.contrasena === pPass)) {
        contrasenaValida = true;
    } else if (datos_login_usuario.find(correo => correo.contrasena === pPass)) {
        contrasenaValida = true;
    } else if (datos_login_proveedor.find(correo => correo.contrasena === pPass)) {
        contrasenaValida = true;
    }

    if (correoValido == true && contrasenaValida == true) {
        document.cookie = "correo=" + pEmail;
        document.cookie = "contrasena=" + pPass;
        perfilValido = true;
    }

    if (perfilValido === true) {
        tipo_Perfil();
    } else {
        Swal.fire({
            'icon': 'warning',
            'title': 'No se ha encontrado su perfil.',
            'text': 'Los datos ingresados no coinciden con un perfil registrado.'
        });
    }
};

const tipo_Perfil = async() => {

    let tipoPerfil = readCookie('tipoPerfil');
    tipoPerfil = tipoPerfil.replace("=", "");

    if (tipoPerfil === "P" || tipoPerfil === "U") {

        Swal.fire({
            'icon': 'success',
            'title': '¡Bienvienido!',
            'text': 'PetLover a su servicio.'
        }).then(() => {
            location.href = "../proyectopipashtml/perfil.html"
        });
    } else if (tipoPerfil === "A") {

        Swal.fire({
            'icon': 'success',
            'title': '¡Bienvienido!',
            'text': 'PetLover a su servicio.'
        }).then(() => {
            location.href = "../proyectopipashtml/configuracion.html";
        });
    } else {
        Swal.fire({
            'icon': 'warning',
            'title': 'No se ha encontrado su perfil.',
            'text': 'Los datos ingresados no coinciden con un perfil registrado.'
        });
    };
};


const limpiar = () => {
    //.value permite tanto obtener el valor como asignarlo
    correoElectronico.value = "";
    contrasena.value = "";
}

const validar = () => {
    let error = false;
    let campos_requeridos = document.querySelectorAll(':required');
    campos_requeridos.forEach(campo => {
        if (campo.value == '') {
            error = true;
            campo.classList.add('error-input');
        } else {
            campo.classList.remove('error-input');
        }
    });
    let regExp_formatoEmail = /(?:[a-z0-9!#$%&'*+\=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+\=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;
    if (!regExp_formatoEmail.test(correoElectronico.value)) {
        error = true;
        correoElectronico.classList.add('error-input');
    } else {
        correoElectronico.classList.remove('error-input');
    }

    let regExp_formatoContra = /^(?:(?=.*[a-z])(?:(?=.*[A-Z])(?=.*[\d\W])|(?=.*\W)(?=.*\d))|(?=.*\W)(?=.*[A-Z])(?=.*\d)).{12,}$/;
    if (!regExp_formatoContra.test(contrasena.value)) {
        error = true;
        contrasena.classList.add('error-input');
    } else {
        contrasena.classList.remove('error-input');
    }

    if (error == false) {
        obtenerDatos();
    } else {
        Swal.fire({
            'icon': 'warning',
            'title': 'Datos inválidos.',
            'text': 'Por favor revise los campos resaltados.'
        });
    }
};

function sendEmail() {
    Swal.fire({
        'icon': 'success',
        'title': 'Correo enviado.',
        'text': 'Revise por favor su correo y siga los pasos para recuperar su contraseña.'
    });
};


btnIniciarSesion.addEventListener('click', validar);
btnRegistrase.addEventListener('click', () => {
    popupregistro.style.display = "block";
});

btnVolver.addEventListener('click', () => {
    popupregistro.style.display = "none";
});

btnFormRegistro.addEventListener('click', () => {

    if (document.getElementById("rbtn-Proveedor").checked) {
        location.href = "registroProveedores.html";
    }
    if (document.getElementById("rbtn-Usuario").checked) {
        location.href = "registroUsuario.html";
    } else {
        Swal.fire({
            'icon': 'warning',
            'title': 'No se pudo enviar su mensaje.',
            'text': 'Por favor seleccione una opción.'
        });
    }
});

const validar_existe_correo = () => {
    console.log(`El nombre es ${correoElectronicoUsuario.value}`);
}

btnPassReset.addEventListener('click', () => {
    popupPassReset.style.display = "block";
});

btnPassResetEnviar.addEventListener('click', () => {
    var correoElectronico = correoPassReset;
    sendEmail();
});
//Consultar el correo, linea 250 


btnVolverPassReset.addEventListener('click', () => {
    popupPassReset.style.display = "none";
});