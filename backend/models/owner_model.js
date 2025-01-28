import moongoose from  'mongoose'


const ownerSchema=new moongoose.Schema({
    ownername:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    }
})

const model=moongoose.model('owners',ownerSchema);

export default model;