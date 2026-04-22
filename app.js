import 'dotenv/config'; //importa e já executa o dotenv
import express from 'express';
import session from 'express-session';
import authRoutes from './routes/authRoutes.js';
import path from 'path';
import { fileURLToPath } from 'url';


const app = express();
app.use(express.json());
app.use(express.urlencoded({extended:false}));

//essas 2 linhas aviza ao computador que o projeto esta no seu computador
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// configurando a pasta public pro import entender
app.use(express.static(path.join(__dirname, 'public')));

// Configuração da Sessão
app.use(session({
    secret:process.env.SESSION_SECRET,
    resave: false,// diz pro sevidor não salvar nada caso nada tenha sido modificado
    saveUninitialized: false,//evita criar sessão pra anonimos
    cookie: {
        maxAge: 1000*60*60*24,//DEFINE O TEMPO DE SESSÃO
        httpOnly:true,
        secure:false
    }
}));

app.use('/api', authRoutes);//definindo prefixo para todas as rotas de autenticação.

app.listen(process.env.PORT, ()=>{
    console.log(`sevidor rodando na porta ${process.env.PORT}`);
});

//É o ponto de entrada da aplicação.Ele liga o Express, configura as sessões e diz em qual porta o servidor vai rodar.
//Ele "junta" todas as peças que você criou nas outras pastas.