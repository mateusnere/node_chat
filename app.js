var app = require('./config/server');

var server = app.listen(3000, function(){
    console.log('Servidor online!');
})

//aqui faz com que o socket seja escutado pela mesma porta do protocolo http
var io = require('socket.io').listen(server);
app.set('io', io);

io.on('connection', function(socket){
    console.log('Usuário conectado!');

    socket.on('disconnect', function(){
        console.log('Usuário disconectado!');
    });

    socket.on('msgDoChat', function(data){
        socket.emit('msgParaUsuario', {apelido : data.apelido, mensagem: data.mensagem});
        socket.broadcast.emit('msgParaUsuario', {apelido : data.apelido, mensagem: data.mensagem});
        if(parseInt(data.apelido_att) == 0){
            socket.emit('novoParticipante', { apelido : data.apelido });
            socket.broadcast.emit('novoParticipante', { apelido : data.apelido });
        }
    });
});