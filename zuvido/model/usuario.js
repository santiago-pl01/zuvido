import mongoose from 'mongoose';

const usuarioSchema = new mongoose.Schema({
    nome: String,
    email: String,
    senha: String,    
}); 

export default mongoose.model("Usuario", usuarioSchema);

/*
Documento Resultante

{
  "_id": "6750003b29dc54c457a9f2c1", // padrão ObjectId do MongoDB
  "nome": "Isadora Sousa",
  "email": "isadora@example.com",
  "senha": "hashOuSenhaAqui",
  "__v": 0 //registra quantas vezes o documento foi modificado.
}

*/