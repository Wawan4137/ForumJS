import User from './objects/User.js'
import Categories from './objects/Categories.js'

        
let user = new User()
let categories = new Categories()


//Fonction de connexion (Header)
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
        $('button[name="addSubject"]').show();
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
    user.logout()
    $('button[name="logout"]').hide()
    $('#welcomeMessage').html('')
    $('#welcomeMessage').hide()
    $('button[name="seconnecter"]').show()
    $('button[name="addSubject"]').hide();
}

//Récupétation et Affichage des info d'une personne déjà connecté (Header)
function reset(){
    user.resetUserObject();
    if(user.isValid()){
        $('#modalConnexion').modal('hide')
        $('button[name="logout"]').show()
        $('#welcomeMessage').html('Bienvenue, '+user.username)
        $('#welcomeMessage').show()
        $('button[name="seconnecter"]').hide()
        $('button[name="addSubject"]').show();
    }
}

//Récupération et Affichage des catégorie (Body)
async function getCategories(){
    categories = await categories.all(1)
    console.log(categories)
    categories.categories.forEach(element => {
        console.log(element)
        $.get("html_ressources/category_item.html", function(data){
            let item = $(data).attr('id',element.nom).attr('href', './category.html?id='+element.id)
            //item = $(data).attr('href', './category.html?id='+element.id)
            $("#categories").append(item)
            $('#'+ element.nom)[0].childNodes[0].nodeValue = element.nom
            $('#'+ element.nom + ' span').text(element.apiSubjects.length)
        })
    })
}

$(document).ready(function(){

    $('#signInForm').hide();
    $('button[name="logout"]').hide()
    $('button[name="addSubject"]').hide()

    //On actualise l'utilisateur
    reset()
    //On affiche les catégories
    getCategories()

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
