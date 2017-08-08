module.exports.iniciaChat = function(app, req, res){
    var form = req.body;
    req.assert('apelido','O campo não pode estar vazio!').notEmpty();
    req.assert('apelido','O campo precisa ter entre 3 e 15 caracteres!').len(3,15);

    req.getValidationResult().then(function(result){
        if(!result.isEmpty()){
            console.log(result.array());
            res.render('index',{validacao : result.array()});
            return;
        }else{
            app.get('io').emit('msgParaUsuario', { apelido : form.apelido, mensagem : 'entrou no chat!'});            
            res.render('chat', { apelido : form.apelido });  
        }
    });
    
}