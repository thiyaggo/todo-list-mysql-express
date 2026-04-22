import mysql from 'mysql2';
import 'dotenv/config';


//CRIANDO CONEXAO COM OS DADOS PROTEGIDOS
const conexao = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    database:process.env.DB_DATABASE,
    password:process.env.DB_PASSWORD
});
conexao.connect((erro)=>{
    if (erro) {
        console.error("Erro ao conectar:", erro.message);
        return;
    }
    console.log("Conectado ao MySQL com sucesso!");
});
export default conexao;//EXPORTANDO CONEXAO


//Aqui é feita a conexão com o banco de dados. Ele lê o .env e exporta a conexão pronta 
// para ser usada. Se o banco mudar (de MySQL para PostgreSQL, por exemplo), você só mexe aqui.