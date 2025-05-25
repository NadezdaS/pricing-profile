import express from 'express';
import cors from 'cors';
import swaggerUi from 'swagger-ui-express';
import { swaggerSpec } from '../swagger';
import { config } from '../config';
import productsRoute from './routes/productsRoutes'
import profilesRouter from './routes/pricingProfilesRoutes'

const app = express();

app.use(cors());
app.use(express.json());
app.use('/api/products', productsRoute);
app.use('/api/pricing-profiles', profilesRouter);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.listen(config.port, () => {
	console.log(`Server running on http://localhost:${config.port}`);
});

export default app;