import mongoose from 'mongoose';
import restaurante from './restaurante';

const cardapioSchema = new mongoose.Schema({
    nome: String,
    QRCode: String,
    restaurante: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Restaurante"
    }
});

export default mongoose.model("Cardapio", cardapioSchema);

/*
Documento Resultante

{
{
  "_id": "67501341a87cfe0c717a3b11",
  "nome": "Cardápio Principal",
  "QRCode": "https://meusite.com/qrcodes/cardapio123.png",
  "restaurante": "675012ab83fd2c44a93d92f1",
  "__v": 0 //registra quantas vezes o documento foi modificado.
}

*/