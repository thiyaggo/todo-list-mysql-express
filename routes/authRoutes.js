import express from 'express';
import authController from '../controllers/authController.js';
import authMiddleware from '../middlewares/authMiddleware.js';

const router = express.Router();//exporta a funcao Router() e atribuia a constante router

//rotas publicas
router.post('/cadastro', authController.cadastrar);
router.post('/login', authController.login);

//rotas privadas
router.get('/perfil', authMiddleware, authController.perfil);
router.post('/logout', authMiddleware, authController.logout);
router.get('/tarefas', authMiddleware, authController.tarefas);
router.post('/criartarefas', authMiddleware, authController.criarTarefa);
router.delete('/deletarTarefas/:id', authMiddleware, authController.deletarTarefa);
router.put('/alterarTarefas/:id',authMiddleware, authController.alterarTarefa);

export default router;// exportando no final

//Define as URLs (endereços) da sua API.