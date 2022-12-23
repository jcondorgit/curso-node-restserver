const { v4:uuidv4 } =require('uuid');
const path = require('path');

const subirArchivo = (files, extensionesValidas = ['png', 'jpg', 'jpeg', 'gif'], carpeta = '') => {

    return new Promise ( (resolve, reject)=>{

        const{ archivo } = files;//*

        const nombreCortado = archivo.name.split('.');
        const extension = nombreCortado[ nombreCortado.length-1 ];

        if ( !extensionesValidas.includes(extension) ) {
            
            reject(`la extensión ${extension} no es una extensión válida, intente con : ${extensionesValidas}`);

        }
        
        const nomTemp = uuidv4() + "." + extension;
        
        const uploadPath = path.join( __dirname , '../uploads/', carpeta , nomTemp );
    
        archivo.mv(uploadPath, (err) => {
        
            if (err) {
                reject(err);
            }
            
            /* resolve(`El archivo se subió: ${nomTemp}`); */
            resolve(`${nomTemp}`);

        });
    
    })

}

module.exports = {
    subirArchivo
}