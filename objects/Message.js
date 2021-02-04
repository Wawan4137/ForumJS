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

    createMessage(contenu, auteurId, sujetId, token){
        let auteurURI = "/api/auteurs/"+auteurId
        let sujetURI = "/api/sujets/"+ sujetId
        console.log(contenu)
        console.log(auteurURI)
        console.log(sujetURI)
        messageStore.addMessage(sujetURI, auteurURI, contenu, token);
        return this;
    }

    delete(id, token){
        messageStore.deleteMessage(id, token);
        return this;
    }

    edit(contenu, auteurId, sujetId, token){
        let auteurURI = "/api/auteurs/"+auteurId
        let sujetURI = "/api/sujets/"+ sujetId

        messageStore.editMessage(sujetURI, auteurURI, contenu, token);
        return this;
    }

}
