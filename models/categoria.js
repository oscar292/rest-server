const { Schema, model} = require('mongoose');

const CategoriaSchema = Schema({

    nombre: {
        type: String,
        require: [true, 'El nombre es obligatorio'], 
        unique: true
    },

    estado: {
        type: Boolean,
        default: true,
        require: true
    },

    usuario: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        require: true
    }
});


CategoriaSchema.methods.toJSON = function () {
    const { __v, estado,...data } = this.toObject();
    return data
}


module.exports = model('Categoria', CategoriaSchema)