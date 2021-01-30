import User from './objects/User.js'
import Category from './objects/Category.js'

let user = new User()
let category = new Category()

async function connection(){
    let username = $('input[name="pseudoConnection"]')[0].value
    let password = $('input[name="mdpConnection"]')[0].value
    user = await user.connect(username, password)
    if(user.isValid()){
        $('#modalConnexion').modal('hide')
        $('button[name="logout"]').show()
        $('#welcomeMessage').html('Bienvenue, '+user.username)
        $('#welcomeMessage').show()
        $('button[name="seconnecter"]').hide()
        

    }
}

//Fonction d'inscription (Header)
function subscribe(){
    let username = $('input[name="pseudoSubscribe"]')[0].value
    let password = $('input[name="mdpSubscribe"]')[0].value
    user = user.create(username, password)
}

//Fonction de déconnexion (Header)
function logout(){
    user = user.logout()
    $('button[name="logout"]').hide()
    $('#welcomeMessage').html('')
    $('#welcomeMessage').hide()
    $('button[name="seconnecter"]').show()
}

//Récupétation et Affichage des info d'une personne déjà connecté (Header)
async function reset(){
    user = await user.resetUserObject();
    if(user.isValid()){
        $('#modalConnexion').modal('hide')
        $('button[name="logout"]').show()
        $('#welcomeMessage').html('Bienvenue, '+user.username)
        $('#welcomeMessage').show()
        $('button[name="seconnecter"]').hide()
    }
}

async function getCategoryWithId(id){
    category = await category.init(id)
    console.log(category);
    console.log(category.apiSubjects)
    category.subjects.forEach(async (element) => {
        //console.log(element)
        element = await element.updateRealAuteur(user.token);
        $.get("html_ressources/subject_item.html", function(data){
            let item = $(data).attr('id', element.titre).attr('href', './category.html?id='+element.id)
            //item = $(data).attr('href', './category.html?id='+element.id)
            $("#categories").append(item)
            $('#'+ element.titre)[0].childNodes[0].nodeValue = element.titre + ' - par ' + element.auteur.username;
            //$('#'+ element.auteur)[0].childNodes[0].nodeValue = element.auteur
            $('#'+ element.titre + ' span').text(element.messages.length)
        })
    })

}

$(document).ready(function(){
    let params = new URLSearchParams(location.search)
    let id_categorie = params.get('id')
    //console.log(id_categorie)
    getCategoryWithId(id_categorie)

    $('#signInForm').hide();
    $('button[name="logout"]').hide()

    //On actualise l'utilisateur
    reset()
    //On affiche les catégories
    //getCategories()

    //Button
    $('button[name="connection"]').click(() => {
        connection()
    })
    $('button[name="subscribe"]').click(() => {
        subscribe()
    })
    $('button[name="logout"]').click(() => {
        logout()
    })

    //Changement log form
    $('a[name="toSubscribeForm"]').click(() => {
        $('#connectForm').hide();
        $('#signInForm').show();
    })
    $('a[name="toConnectionForm"]').click(() => {
        $('#connectForm').show();
        $('#signInForm').hide();
    })
})