const{Schema, model} = require('mongoose');


const CategoriaSchema = new Schema({

    nombre: {
        type: String,
        required:[true, 'El nombre es obligatorio'],
        unique:true
    },
    estado:{
        type: Boolean,
        default: true,
        required: true
    },
    usuario:{
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true
    }
    

});

CategoriaSchema.methods.toJSON = function(){

    const {__v, estado, _id, ...categoria} = this.toObject();
    //console.log(categoria._id);
    categoria.cid = _id;
    return categoria;

}

module.exports = model('Categoria', CategoriaSchema)