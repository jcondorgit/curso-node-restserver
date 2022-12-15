const { response } = require("express")


const esAdminRole = (req, res = response, next)=>{

    if(!req.usuario){

        return res.status(500).json({
            msg:'No se puede verificar el rol sin validar el token primero'
        })

    }

    const {rol, nombre} = req.usuario;


    if (rol !== 'ADMIN_ROLE') {
        
        return res.status(401).json({
            msg:`${nombre} NO tiene permisos para eliminar un usuario del sistema - sólo administrador`
        })

    }

    next();
}

const tieneRol = (...roles)=>{

    return (req, res = response, next)=>{

        if(!req.usuario){

            return res.status(500).json({
                msg:'No se puede verificar el rol sin validar el token primero'
            })
    
        }
        console.log(req.usuario.rol);
        if (!roles.includes(req.usuario.rol)) {
            
            return res.status(500).json({
                msg:`Acceso denegado: verificar que el rol sea de tipo:  ${roles}` 
            })
    
        }

        return next();

    }

}

module.exports = {
    esAdminRole,
    tieneRol
}