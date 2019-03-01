const mongoose =  require('mongoose');
const Schema = mongoose.Schema;

const paintingSchema = new Schema({
    name:String,
    url:String,
    technique:[String]
});
module.exports=mongoose.model('Painting',paintingSchema);