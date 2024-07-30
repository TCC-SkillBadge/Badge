import { Router } from 'express';
import { cadastrarBadge, consultarBadge, atualizarBadge, excluirBadge } from '../controllers/BadgeController';

const router = Router();

router.post('/cadastrar', cadastrarBadge);
router.get('/consultar', consultarBadge);
router.post('/atualizar', atualizarBadge);
router.post('/excluir', excluirBadge);

export default router;
