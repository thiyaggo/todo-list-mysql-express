import db from '../config/db.js';
import bcrypt from 'bcryptjs';

const tarefas = (req,res)=>{
    if (!req.session.user.id) {
        return res.status(401).json({ error: 'Não autorizado' });
    }
    const userId = req.session.user.id;
    const query = 'SELECT * FROM tarefas WHERE user_id = ?';

     db.query(query, [userId], (err, results) => {
        if (err) return res.status(500).send(err);
        res.json(results); // Envia os dados como JSON
    });
}

//valida se foi digitado algo pra salvar no baco usuario na tabela tarefas 
const criarTarefa = (req,res)=>{
    const {descricao} = req.body; //traz os dados do javascipt e armazana na const
    const userId = req.session.user.id;

    if(!descricao){
        return res.status(400).json({menssagem: 'digite algun valor'});
    }

    const query = 'INSERT INTO tarefas (user_id, descricao_tarefa) VALUES (?, ?)';

    db.query(query, [userId, descricao], (err,results)=>{
        if(err) {
             console.log(err); 
            return res.status(500).json({menssagem: 'erro ao salvar tarefa'});
        }
        res.status(200).json({menssagem: 'tarefa salva com sucesso'})
    });

}

const deletarTarefa = (req,res)=>{
    const {id} = req.params

    if(!id){
        return res.status(400).json({menssagem:'nao foi possivel encontrar o id'})
    }

    const query = 'DELETE FROM tarefas WHERE ID = ?';
    db.query(query, [id], (err, results)=>{
        if(err){
            console.log(err);
            return res.status(500).json({menssagem :'erro ao deletar'});
        }
    })
    return res.status(200).json({ mensagem: 'deletado com sucesso' });
}

const alterarTarefa = (req,res)=>{
    const {id} = req.params;
    const {descricao} = req.body;

    if(!id || !descricao){
        return res.status(400).json({menssagem: 'não foi possivel alterar'})
    };

    const query = 'UPDATE tarefas SET descricao_tarefa = ? WHERE id = ?';

    db.query(query, [descricao, id], (err,results)=>{
        if(err){
            console.log(err);
            return res.status(500).json({menssagem: 'não foi possivel alterar'})
        }
        return res.status(200).json({menssagem: 'alterado com sucesso'})
    });

}
export default {tarefas, criarTarefa, deletarTarefa, alterarTarefa};// transformo em obj pra usar no padrao

//Aqui você decide o que fazer: "Vou criptografar a senha", "Vou checar se o e-mail existe", 
// "Vou salvar no banco". Ele recebe os dados e decide se o usuário pode entrar ou não.