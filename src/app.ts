import dotenv from 'dotenv';
import cors from 'cors';
import express from 'express';
import badgeRoutes from './routes/BadgeRoutes';

dotenv.config();
const PORT = process.env.PORT || 3000;

const app = express();
app.use(express.json());
app.use(cors());

app.use('/badge', badgeRoutes);

app.listen(PORT, () => console.log(`Badge Service running on port ${PORT}`));
