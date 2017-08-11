  $(document).ready(function() {
    $('#breset').click(function(){
        $('#fNewUser').data('bootstrapValidator').resetForm();
    });
    $('#fNewUser').bootstrapValidator({
            autoFocus: true,
            framework: 'bootstrap',
        // To use feedback icons, ensure that you use Bootstrap v3.1.0 or later
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
        fields: {
            fname: {
                validators: {
                        stringLength: {
                        min: 3,
                    },
                        notEmpty: {
                        message: 'Ingrese su  nombre'
                    }
                }
            },
             lname: {
                validators: {
                     stringLength: {
                        min: 3,
                    },
                    notEmpty: {
                        message: 'Ingrese su apellido'
                    }
                }
            },
            email: {
                validators: {
                    notEmpty: {
                        message: 'Ingrese una direccion de email'
                    },
                    emailAddress: {
                        message: 'Debe ingresar una direccion de email valida'
                    }
                }
            },
            phone: {
                validators: {
                    notEmpty: {
                        message: 'Ingrese un numero de telefono'
                    },
                    phone: {
                        country: 'AR',
                        message: 'Formato ejemplo: 1145678901'
                    },
                    digits: {
                        message: 'Solo debe ingresar numeros'
                    }
                }
            },
            address: {
                validators: {
                     stringLength: {
                        min: 8,
                    },
                    notEmpty: {
                        message: 'Ingresa una Dirección Valida'
                    }
                }
            },
            passwordUser: {
                validators: {
                     stringLength: {
                        min: 8,
                        max: 12,
                        message: 'La clave debe contener minimo 8 y maximo 12 digitos'
                    },
                    notEmpty: {
                        message: 'Debe asignar una clave de acceso'
                    }
                }
            },
            idProfileKf: {
                validators: {
                    notEmpty: {
                        message: 'Por favor seleccione el perfil'
                    }
                }
            }/*
            zip: {
                validators: {
                    notEmpty: {
                        message: 'Please supply your zip code'
                    },
                    zipCode: {
                        country: 'US',
                        message: 'Please supply a vaild zip code'
                    }
                }
            },
            comment: {
                validators: {
                      stringLength: {
                        min: 10,
                        max: 200,
                        message:'Please enter at least 10 characters and no more than 200'
                    },
                    notEmpty: {
                        message: 'Please supply a description of your project'
                    }
                    }
                }*/
            }
        });
});