const multer = require('multer');
const path = require('path');

// Configuração de armazenamento
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const categoria = req.body.categoria;

        let folder = 'pizzas';
        if (categoria === 'bebidas') folder = 'bebidas';
        if (categoria === 'esfihas') folder = 'esfihas';
        if (categoria === 'sobremesas') folder = 'sobremesas';

        cb(null, path.join(__dirname, '..', 'uploads', folder)); 
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
    }
});

// Inicializa o middleware de upload
const upload = multer({ storage: storage });

module.exports = upload;
