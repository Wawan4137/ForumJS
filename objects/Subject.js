import * as subjectStore from '../store/subjectStore.js'

export default class Subject{
    constructor(nom = null, dateCreation = null, categorie = null, auteur = null, messages = null){
        this.nom = nom;
        this.categorie = categorie;
        this.auteur = auteur;
        this.messages = messages;     

        this.dateCreation = dateCreation;
    }

    create(nom, categorie, auteur, token){
        subjectStore.addSubject(nom, categorie, auteur, token);
        return this;
    }

    getLast(nPage){
        let last = subjectStore.getLast(nPage);
        console.log(last)
        return last;
    }

}
