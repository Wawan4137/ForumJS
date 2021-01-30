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

}

/*function getAllSubjects(nPage){

    let url = "https://localhost:8000/api/sujets?page="+nPage;
    let SubjectList = [];
    let i = 0;
    fetch(url)
        .then(rep => rep.json())
        .then(response => {
            response['hydra:member'].forEach(sujet => {           
                SubjectList.push(new Subject(sujet['nom'], sujet['auteur'], sujet['dateCreation'], sujet['categorie'], sujet['id']));
                i++;
                if(i == 5) 
                    break;
            });
        })  

    return SubjectList;

}*/

function writeCard(titre, id){
    document.write("<div class=\"row mt-2\">");
    document.write("<div class=\"col-md-2\"></div>");
    document.write("<div class=\"col-md-8\">");
    document.write("<div class=\"card\">");
    document.write("<div class=\"card-header\">");
    document.write("<h4>"+titre+"</h4>");
    document.write("</div>");
    document.write("<div class=\"card-body text-right\">");
    document.write("<a href=\"#\" class=\"btn btn-outline-primary\">En savoir plus...</a>");
    document.write("</div>");
    document.write("</div>");
    document.write("</div>");
    document.write("<div class=\"col-md-2\"></div>");
    document.write("</div>");
    document.write("</div>");
}