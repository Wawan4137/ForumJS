import * as subjectStore from '../store/subjectStore.js'

export default class Subject{
    constructor(nom = null, dateCreation = null, categorie = null, auteur = null, messages = null){
        this.nom = nom;
        this.categorie = categorie;
        this.auteur = auteur;
        this.messages = messages;

        

        this.dateCreation = dateCreation;
    }

    create(nom, categorie, auteur, messages){
        subjectStore.addSubject(nom, this.generateDate(), categorie, auteur, messages);
        return this;
    }

    generateDate(){
        let today = new Date();
        let dd = String(today.getDate()).padStart(2, '0');
        let mm = String(today.getMonth()+1).padStart(2, '0');
        let yyyy = today.getFullYear();

        today = yyyy + '-' + mm + '-' + dd;
        return today;
    }
}
