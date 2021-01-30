import * as subjectStore from '../store/subjectStore.js'
import * as userStore from '../store/userStore.js'
import User from './User.js'

export default class Subject{

    constructor(titre = null, auteurURI = null, date_creation = null, categorie = null, id = null, messages = [], auteur = null){
        this.titre = titre;
        this.auteurURI = auteurURI;
        this.date_creation = date_creation;
        this.categorie = categorie;
        this.id = id;
        this.messages = messages;
        this.auteur = auteur;
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

}
