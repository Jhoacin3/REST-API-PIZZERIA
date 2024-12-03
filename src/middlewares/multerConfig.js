const multer = require('multer');

// Ojo: Configurando Multer para almacenar las imágenes en memoria
const storageStrategy = multer.memoryStorage(); 

// Configurar restricciones y validaciones
const upload = multer({
    storage: storageStrategy,
    limits: {
        fileSize: 5 * 1024 * 1024 // Tamaño máximo permitido (5 MB)
    },
    fileFilter: (req, file, cb) => {
        // Validar el tipo de archivo
        if (
            file.mimetype === 'image/jpeg' ||
            file.mimetype === 'image/png' ||
            file.mimetype === 'image/jpg'
        ) {
            cb(null, true); // aceptando archivo
        } else {
           // cb(new Error('Formato de archivo no permitido. Usa PNG o JPG'), false);
           cb(new Error('Formato de archivo no permitido. Usa PNG o JPG'));
        }
    }
});

module.exports = upload;
