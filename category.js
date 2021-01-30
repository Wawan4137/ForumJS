import User from './objects/User.js'
import Category from './objects/Categories.js'
import Subject from './objects/Subject.js'
import Message from './objects/Message.js'

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

async function getCategoryWithId(id){
    category = await category.init(id)
}

async function createSubject(){
    let titre = $('input[name="subjectTitle"]')[0].value
    let contenu = $('textarea[name="subjectContent"]').val();
    //subject = await subject.create(titre, "/api/categories/"+$_GET('id'), "/api/auteurs/"+user.id, user.token);

    console.log(await subject.getLast(1));
    //message = await message.create(contenu, "/api/auteurs/"+user.id, lastSubject, user.token)    
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
    $('button[name="addSubject"]').hide();

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