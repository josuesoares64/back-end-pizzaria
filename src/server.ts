import app from "./app";
import db from "./database/models";

const PORT = process.env.PORT || 8080;

async function main() {
    try {
        await db.sequelize.authenticate();
        console.log('Banco conectado');

        await db.sequelize.sync({ alter: true });
        console.log('Modelos sincronizados');

        app.listen(PORT, () => {
            console.log(`Servidor rodando na porta ${PORT}`);
        });
    } catch (err) {
        console.error('Erro ao conectar', err);
        process.exit(1);
    }
}

main();