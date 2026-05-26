import db from '../config/db.js';
import bcrypt from 'bcryptjs';

//permiti quem exportar esse aquivo usar a função cadastrar.
const cadastrar = async (req, res)=>{
    const {nome,email,senha} = req.body;//extrai as informações digitas pelo usuario
      if (!nome?.trim() || !email?.trim() || !senha?.trim()) {
        return res.status(400).json({ erro: 'Todos os campos são obrigatórios e não podem ficar em branco.' });
    }
    try{
        //verifica se o email ja existe pra não ter repitido
        const[existe] = await db.promise().query('SELECT id FROM cadastro WHERE email = ?',[email]);
        if(existe.length > 0) return res.status(400).json({erro: 'email já cadastrado'});
        const hash = await bcrypt.hash(senha,10);

        await db.promise().query(
            'INSERT INTO  cadastro (nome, email, senha) values(?,?,?)',[nome,email,hash]
        );
        return res.status(201).json({mensagem:'Cadastro feito com sucesso'});
    }catch(err){
        res.status(500).json({erro:'erro no sistema'});
    }
}

const login = async (req, res)=>{
    const {email,senha} = req.body;

    try{
        const [cadastro] = await db.promise().query('SELECT * FROM cadastro WHERE email = ?',[email]);

        if(cadastro.length === 0) return res.status(401).json({erro:'email ou senha incorreta'});
        const user = cadastro[0];
        const senhaCorreta = await bcrypt.compare(senha,user.senha);

        if(!senhaCorreta) return res.status(401).json({err: 'senha incorreta'});
        
        //criar sessão
        req.session.user = {
            id: user.id,
            nome: user.nome,
            email: user.email
        };

        res.json({menssagem:'login realizado', user: req.session.user})

    }catch(err){
        res.status(500).json({erro:'erro interno'});
    }
};
const logout = (req,res)=>{
    req.session.destroy();
    res.json({mensagem:' logout realizado'});
}
const perfil = (req,res)=>{
    if(!req.session.user){
        return res.status(401).json({erro: 'Não autenticado'});
    }
    res.json({user: req.session.user});
};

export default {cadastrar, login, logout, perfil}