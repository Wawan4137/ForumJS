export default class Message{

    constructor(id, contenu, date_creation, sujet, auteur){
        this.id = id;
        this.contenu = contenu;
        this.date_creation = date_creation;
        this.sujet = sujet;
        this.auteur = auteur;
    }   
    create(contenu, auteur, sujet, token){
        messageStore.addMessage(nom, categorie, auteur, token);
        return this;
    }
}