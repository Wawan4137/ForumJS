import * as messageStore from '../store/messageStore.js'

export default class Message{
    constructor(contenu = null, auteur = null, sujet = null, token = null){
        this.contenu = contenu;
        this.auteur = auteur;
        this.sujet = sujet;
        this.token = token;
    }

    create(contenu, auteur, sujet, token){
        messageStore.addMessage(contenu, auteur, sujet, token);
        return this;
    }
}
