import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectDB } from './db';
import routes from './routes';
import swaggerUi from 'swagger-ui-express';
import { swaggerSpec } from './swagget';

dotenv.config();

const app = express();

// ✅ Middleware
app.use(cors());
app.use(express.json());

// ✅ API routes
app.use('/api', routes);

// ✅ Swagger docs
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Start server ONLY after DB is connected
const startServer = async () => {
  await connectDB();

  app.listen(process.env.PORT || 3000, () => {
    console.log('Server running');
  });
};

startServer();
