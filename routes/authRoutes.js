import express from 'express';
import taskAuthController from '../controllers/taskAuthController.js';
import loginAuthController from '../controllers/loginAuthController.js';
import authMiddleware from '../middlewares/authMiddleware.js';

const router = express.Router();//exporta a funcao Router() e atribuia a constante router

//rotas publicas
router.post('/cadastro', loginAuthController.cadastrar);
router.post('/login', loginAuthController.login);

//rotas privadas
router.get('/perfil', authMiddleware, loginAuthController.perfil);
router.post('/logout', authMiddleware, loginAuthController.logout);
router.get('/tarefas', authMiddleware, taskAuthController.tarefas);
router.post('/criartarefas', authMiddleware, taskAuthController.criarTarefa);
router.delete('/deletarTarefas/:id', authMiddleware, taskAuthController.deletarTarefa);
router.put('/alterarTarefas/:id', authMiddleware, taskAuthController.alterarTarefa);
router.put('/concluirTarefa/:id', authMiddleware, taskAuthController.tarefaConcluida);

export default router;// exportando no final

//Define as URLs (endereços) da sua API.