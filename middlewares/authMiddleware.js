//serve pra autenticar se apessoa esta logada antes de acessar uma rota privada
export default (req,res,next)=>{
    //verifica se o obj existe na sessão
    if(!req.session.user){
        return res.status(401).json({erro: 'vove precisa estar logado pra acessar essa rota!'});
    }
    //caso exista executa o next
    next();
};
//Antes de deixar alguém ver o perfil ou deletar algo, esse arquivo checa se a sessão existe.
//Se não estiver logado, ele barra o acesso antes mesmo de chegar no Controller.