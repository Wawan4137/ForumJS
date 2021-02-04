import User from './objects/User.js'
import Subject from './objects/Subject.js'
import Message from './objects/Message.js'
import { addMessage } from './store/messageStore.js';
import { getUsers } from './store/userStore.js';
import { getCategory } from './store/categoryStore.js';

let user = new User()
let subject = new Subject();
let message = new Message();

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

async function deleteSubject(id){
    await message.delete(id, user.token);
}

async function editSubject(id, nom, auteur){
    await message.edit(id,nom, auteur.username);
}

async function ajouterMessage (){
    let contenu = $('textarea[name="ajouterMessage"]').val()
    let auteur = user;
    let sujet = subject;
    console.log(contenu);
    console.log(auteur);
    console.log(sujet);
    console.log(user.token);
    await message.createMessage(contenu, auteur, sujet, user.token);
    
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
            $('#'+ element.id + ' div[name="editInputGroup"]').hide();
            $('#'+ element.id + ' button[name="btnDelete"]').hide();
            $('#'+ element.id + ' button[name="btnEdit"]').hide();
            $('#'+ element.id + ' span[name="btnEditValidLoading"]').hide();
            $('#'+ element.id + ' span[name="btnDeleteLoading"]').hide();
            console.log('non');
            if(user.roles == "ROLE_ADMIN"){
                console.log("oui");
                $('#' + element.id + ' button[name="btnDelete"]').show();
                $('#' + element.id + ' button[name="btnEdit"]').show();
                $('#' + element.id + ' button[name="btnDelete"]').click(() => {
                    $('#' + element.id + ' button[name="btnDelete"]').prop( "disabled", true );
                    $('#' + element.id + ' i[name="btnDeleteIcon"]').hide();
                    $('#'+ element.id + ' span[name="btnDeleteLoading"]').show();
                    deleteSubject(element.id)
                }
                )
                $('#' + element.id + ' button[name="btnEdit"]').click(() => {
                    if($('#'+ element.id)[0].childNodes[0].nodeValue == ""){
                        $('#'+ element.id + ' div[name="editInputGroup"]').hide();
                        $('#'+ element.id)[0].childNodes[0].nodeValue = element.titre + ' - par ' + element.auteur.username;
                    }else{
                        $('#'+ element.id)[0].childNodes[0].nodeValue = "";
                        $('#'+ element.id + ' div[name="editInputGroup"]').show();
                        $('#'+ element.id + ' span[name="editAuteurInfo"]').text("par " + element.auteur.username);
                        $('#'+ element.id + ' input[name="editInput"]').val(element.titre);
                    }
                })
                $('#' + element.id + ' button[name="editButtonValid"]').click(() => {
                    editSubject(element.id, $('#'+ element.id + ' input[name="editInput"]').val(), element.auteur.id);
                    $('#' + element.id + ' button[name="editButtonValid"]').prop( "disabled", true );
                    $('#'+ element.id + ' i[name="btnEditValidIcon"]').hide();
                    $('#'+ element.id + ' span[name="btnEditValidLoading"]').show();
                })
            }      
            //$('#'+ element.id + ' a[name="btnLink"]').attr('href', './subject.html?id='+element.id)    ;  
            //$('#'+ element.id + ' span[name="msgNumber"]').text(element.messages.length);
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
    $('button[name="ajouterMessage"]').click(() => {
        ajouterMessage()
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