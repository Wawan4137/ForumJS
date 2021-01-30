import Message from './objects/Message.js'
import User from './objects/User.js'
import Category from './objects/Categories.js'
import Subject from './objects/Subject.js'

let Message = new Message()
let user = new User()
let category = new Category()
let subject = new Subject();

async function getMessage(id){
    Message = await Message.init(id)
}

async function createMessage(){
    
    let contenu = $('textarea[name="subjectContent"]').val();
    message = await message.create(contenu, "/api/auteurs/"+user.id, "", user.token)    
}