import * as messageStore from '../store/messageStore.js'
import * as userStore from '../store/userStore.js'
import User from './User.js'

export default class Message{

    constructor(id = null, contenu = null, date_creation = null, sujetURI = null, auteurURI = null, sujet = null, auteur = null){
        this.id = id;
        this.contenu = contenu;
        this.date_creation = date_creation;
        this.sujetURI = sujetURI;
        this.auteurURI = auteurURI
        this.sujet = sujet;
        this.auteur = auteur;
    }   

    async updateRealAuteur(token){
        let auteur = await userStore.getUserURI(token, this.auteurURI);
        //console.log(auteur);
        this.auteur = new User(auteur.id, auteur.username);
        return this;
    }

    createMessage(contenu, auteur, sujet, token){
        messageStore.addMessage(contenu, auteur, sujet, token);
        return this;
    }

    delete(id, token){
        messageStore.deleteMessage(id, token);
        return this;
    }

    edit(id, contenu, auteur, token){
        messageStore.editMessage(id, contenu, auteur, token);
        return this;
    }

}
