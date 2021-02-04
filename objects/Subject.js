import * as subjectStore from '../store/subjectStore.js'
import * as messageStore from '../store/messageStore.js'
import * as userStore from '../store/userStore.js'
import User from './User.js'
import Message from './Message.js'

export default class Subject{

    constructor(titre = null, auteurURI = null, date_creation = null, categorie = null, id = null, messagesURI = [], messages = [], auteur = null){
        this.titre = titre;
        this.auteurURI = auteurURI;
        this.date_creation = date_creation;
        this.categorie = categorie;
        this.id = id;
        this.messages = messages;
        this.messagesURI = messagesURI;
        this.auteur = auteur;
    }

    async init(id){
        let apiSubject = await subjectStore.getSubject(id);
        //console.log(apiSubject)
        this.id = apiSubject.id;
        this.titre = apiSubject.nom;
        this.auteurURI = apiSubject.auteur;
        this.date_creation = apiSubject.dateCreation
        this.categorie = apiSubject.categorie;
        this.messagesURI = apiSubject.messages
        for (const messageURI of this.messagesURI){
            let val = await messageStore.getMessageWithURI(messageURI);
            console.log(val)
            let message = new Message(val.id, val.contenu, val.dateCreation,val.sujet, val.auteur)
            this.messages.push(message)
        }

        return this;
    }

    async updateRealAuteur(token){
        let auteur = await userStore.getUserURI(token, this.auteurURI);
        //console.log(auteur);
        this.auteur = new User(auteur.id, auteur.username);
        return this;
    }

    create(nom, categorie, auteur, token){
        subjectStore.addSubject(nom, categorie, auteur, token);
        return this;
    }

    delete(id, token){
        subjectStore.deleteSubject(id, token);
        return this;
    }

    edit(id, nom, categorie, auteur, token){
        subjectStore.editSubject(id, nom, categorie, auteur, token);
        return this;
    }
    
    
    

}
