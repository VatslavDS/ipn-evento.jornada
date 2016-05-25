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
    fecha_de_nacimiento: {
	type: Date,
	required: true
    },
    CURP : {
	type: String
    },
    email: {
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
	type: String,
	required: true
    },
    nivel_academico: {
	type: String,
	required: true
    }
});

mongoose.model('Competitor', CompetitorDataSchema);
