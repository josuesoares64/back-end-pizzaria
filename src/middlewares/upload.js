const multer = require('multer');
const path = require('path');

// Configuração de armazenamento
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        // Onde o arquivo será salvo no seu sistema (ex: src/uploads)
        cb(null, path.join(__dirname, '..', 'uploads', 'pizzas')); 
    },
    filename: (req, file, cb) => {
        // Define o nome do arquivo para evitar colisões
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
    }
});

// Inicializa o middleware de upload
const upload = multer({ storage: storage });

module.exports = upload;