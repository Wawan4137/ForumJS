import User from './objects/User.js'
import Subject from './objects/Subject.js'
import Message from './objects/Message.js'
import Category from './objects/Category.js'

let user = new User()
let category = new Category()
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

async function deleteSubject(id){
    await subject.delete(id, user.token);
}

async function editSubject(id, nom, auteur){
    await subject.edit(id, nom, "/api/categories/"+$_GET('id'), "/api/auteurs/"+auteur, user.token);
}

async function getCategoryWithId(id){
    category = await category.init(id)
    
    category.subjects.forEach(async (element) => {
        element = await element.updateRealAuteur(user.token);
        $.get("html_ressources/subject_item.html", function(data){
            let item = $(data).attr('id', element.id)
            //let item = $(data).attr('id', element.id).attr('href', './subject.html?id='+element.id)
            $("#categories").append(item)
            $('#'+ element.id)[0].childNodes[0].nodeValue = element.titre + ' - par ' + element.auteur.username;
            $('#'+ element.id + ' div[name="editInputGroup"]').hide()
            $('#'+ element.id + ' button[name="btnDelete"]').hide()
            $('#'+ element.id + ' button[name="btnEdit"]').hide()
            if(user.roles == "ROLE_ADMIN"){
                $('#' + element.id + ' button[name="btnDelete"]').show()
                $('#' + element.id + ' button[name="btnEdit"]').show()
                $('#' + element.id + ' button[name="btnDelete"]').click(() => {
                    deleteSubject(element.id)
                })
                $('#' + element.id + ' button[name="btnEdit"]').click(() => {
                    if($('#'+ element.id)[0].childNodes[0].nodeValue == ""){
                        $('#'+ element.id + ' div[name="editInputGroup"]').hide()
                        $('#'+ element.id)[0].childNodes[0].nodeValue = element.titre + ' - par ' + element.auteur.username;
                    }else{
                        $('#'+ element.id)[0].childNodes[0].nodeValue = "";
                        $('#'+ element.id + ' div[name="editInputGroup"]').show()
                        $('#'+ element.id + ' span[name="editAuteurInfo"]').text("par " + element.auteur.username)
                        $('#'+ element.id + ' input[name="editInput"]').val( element.titre)
                    }
                })
                $('#' + element.id + ' button[name="editButtonValid"]').click(() => {
                    editSubject(element.id, $('#'+ element.id + ' input[name="editInput"]').val(), element.auteur.id)
                })
            }            
            $('#'+ element.id + ' span').text(element.messages.length)
        })
    })    
    

}

async function createSubject(){
    let titre = $('input[name="subjectTitle"]')[0].value
    subject = await subject.create(titre, "/api/categories/"+$_GET('id'), "/api/auteurs/"+user.id, user.token);
}

function $_GET(param) {
	var vars = {};
	window.location.href.replace( location.hash, '' ).replace( 
		/[?&]+([^=&]+)=?([^&]*)?/gi, // regexp
		function( m, key, value ) { // callback
			vars[key] = value !== undefined ? value : '';
		}
	);

	if ( param ) {
		return vars[param] ? vars[param] : null;	
	}
	return vars;
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
    $('button[name="createSubject"]').click(() =>{
        createSubject();
        window.location.reload();
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