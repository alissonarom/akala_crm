import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import dotenv from 'dotenv';
import connectDB from './config/db';
import routes from './application/routes';

dotenv.config();

    const startServer = async () => {
        try {
            await connectDB();

            const app = express();

            app.use(cors({
                origin: process.env.CORS_ORIGIN,
                credentials: true
            }));
            app.use(helmet());
            app.use(express.json());

            // Routes
            app.get('/', (req, res) => {
                res.send('Akala CRM API is running...');
            });

            app.use('/api', routes);

            const PORT = process.env.PORT || 3000;

            app.listen(PORT, () => {
                console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
            });
        } catch (error) {
        // Se a conexão com o DB falhar, loga o erro e o processo Node.js encerra (correto)
        console.error("ERRO FATAL: Falha ao iniciar o servidor ou conectar ao DB.", error);
        process.exit(1);
        }
    }

// Inicia o servidor
startServer();
