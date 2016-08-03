// Example model

var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var CompetitorDataSchema = new Schema({
    nombre : {
	type: String,
	required: true,
	min : 5,
	max : 30
    },
    apellido_paterno: {
	type: String,
	required: true,
	min : 5,
	max : 30

    },
    apellido_materno : {
	type: String,
	required: true,
	min : 5,
	max : 30
    },
    dia: {
	type: String,
	required: true
    },
    mes: {
	type: String,
	required: true
    },
    ano: {
	type: String,
	required: true
    },
    CURP : {
	type: String
    },
    email: {
	type: String,
	required: true
    },
    genero: {
	type: String,
	required: true
    },
    rfc: {
	type: String,
	required: true
    },
    calle: {
	type: String,
	required: true
    },
    colonia: {
	type: String,
	required: true
    },
    codigo_postal: {
	type: String,
	required: true
    },
    municipio_delegacion: {
	type: String,
	required: true
    },
    ciudad_estado: {
	type: String,
	required: true
    },
    categoria: {
	type: String,
	required: true
    },
    nombre_institucion: {
	type: String
    },
    nivel_academico: {
	type: String
    },
    unidad_academica: {
	type: String
    },
    otro: {
	type: String,
	required: false
},
projid: {
  type: String,
  required: true
}
});

mongoose.model('Competitor', CompetitorDataSchema);
