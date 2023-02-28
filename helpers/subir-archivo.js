const {v4: uuidv4} = require("uuid");
const path = require("path");

const subirArchivo = ( files, extensionesValidas = ['png', 'jpg', 'jpeg', 'gif', 'PNG'], carpeta = '' ) => {

    return new Promise( (resolve, reject ) => {
        const {archivo} = files;
        const nombreCortado = archivo.name.split('.');
        const extension = nombreCortado[nombreCortado.length - 1];

        if (!extensionesValidas.includes(extension)) {
            return reject(`Laextension ${extension} no es perimitida`);
        }

        const tempName = uuidv4() + '.' + extension;

        const uploadPath = path.join(__dirname, '../uploads/', carpeta, tempName);

        archivo.mv(uploadPath, function (err) {
            if (err) {
                reject(err);
            }
            resolve(tempName);
        });
    })


}


module.exports = {
    subirArchivo
}