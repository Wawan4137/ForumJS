import User from './objects/User.js'
import Subject from './objects/Subject.js'
import Message from './objects/Message.js'

let user = new User()
let subject = new Subject();

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
    user = user.logout()
    $('button[name="logout"]').hide()
    $('#welcomeMessage').html('')
    $('#welcomeMessage').hide()
    $('button[name="seconnecter"]').show()
    $('button[name="addSubject"]').hide();
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
        $('button[name="addSubject"]').show();
    }
}

function dateToLocalDate(date){
    let res = date.toLocaleString('fr-FR', {
        weekday: 'short',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric'
    })
    return res;
}
async function getSubjectWithId(id){
    subject = await subject.init(id)
    console.log(subject)
    $('.container .row .h1').text(subject.titre)
    subject.messages.sort((a,b) => { return (new Date(a.date_creation)+ new Date(b.date_creation)) })
    subject.messages.forEach(async (element) => {
        element = await element.updateRealAuteur(user.token);
        $.get("html_ressources/message_item.html", function(data){
            let item = $(data).attr('id', element.id)
            $('#messages').append(item)
            $('#'+element.id+' .card-body .card-title').text("Par " + element.auteur.username + ' le ' + dateToLocalDate(new Date(element.date_creation)))  
            $('#'+element.id+' .card-body .card-text').text(element.contenu)  
        })
    })
}

$(document).ready(function(){
    let params = new URLSearchParams(location.search)
    let id_subject = params.get('id')

    getSubjectWithId(id_subject)

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