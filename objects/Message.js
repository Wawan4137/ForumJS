import * as messageStore from '../store/messageStore.js'

export default class Message{
    constructor(contenu, auteur, sujet, token){
        this.contenu = contenu;
        this.auteur = auteur;
        this.sujet = sujet;
        this.token = token;
    }

    create(contenu, auteur, sujet, token){
        messageStore.addMessage(nom, categorie, auteur, token);
        return this;
    }
}