import { Router } from 'express';
import { cadastrarBadge, consultarBadge, atualizarBadge, excluirBadge } from '../controllers/BadgeController';
import multer from 'multer';

const router = Router();
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.post('/cadastrar', upload.single('image_badge'), cadastrarBadge);
router.get('/consultar', consultarBadge);
router.post('/atualizar', atualizarBadge);
router.post('/excluir', excluirBadge);

export default router;
