class Subject{

    constructor(titre, auteur, date_creation, categorie, id){
        this.titre = titre;
        this.auteur = auteur;
        this.date_creation = date_creation;
        this.categorie = categorie;
        this.id = id;
    }   

}

function getAllSubjects(nPage){

    let url = "http://localhost:8000/api/sujets?page="+nPage;
    let SubjectList = [];
    let i = 0;
    fetch(url)
        .then(rep => rep.json())
        .then(response => {
            response['hydra:member'].forEach(sujet => {           
                SubjectList.push(new Subject(sujet['nom'], sujet['auteur'], sujet['dateCreation'], sujet['categorie'], sujet['id']));
                i++;
                if(i == 5) break;
            });
        })  

    return SubjectList;

}

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