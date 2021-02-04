export async function addMessage(sujet, auteur,message, token){
    let url = "http://localhost:8000/api/messages";
    const res = await fetch(url, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer "+token,
            "accept": "application/ld+json"
        },
        body: JSON.stringify({
            sujet, auteur, message
          })
    })
    .catch(err => {
        console.log("Erreur", err)
    })
    .then(
        setTimeout(function UpdateScreen() {
            document.location.reload()
        }, 2000)
    )
}

export async function deleteMessage(idMessage, token){
    let url = "http://localhost:8000/api/messages/"+idMessage;
    const res = await fetch(url, {
        method: 'DELETE',
        headers: {
            "accept": "*/*",
            "Authorization":"Bearer "+token
        }
    })
    .catch(err => {
        console.log("Erreur lors de la suppression d'un sujet :", err)
    })
    .then(
        setTimeout(function UpdateScreen() {
            document.location.reload()
        }, 500)
    )
}

export async function editMessage(idMessage, sujet, token){
    let url = "http://localhost:8000/api/messages/"+idMessage;
    const res = await fetch(url, {
        method: 'PATCH',
        headers: {
            "Content-Type": "application/merge-patch+json",
            "Authorization": "Bearer "+token,
            "accept": "application/ld+json"
        },
        body: JSON.stringify({
            sujet
          })
    })
    .catch(err => {
        console.log("Erreur", err)
    })
    .then(
        setTimeout(function UpdateScreen() {
            document.location.reload()
        }, 500)
    )
}

/*
export async function addMessage(contenu, auteur, sujet, token){
    let url = "http://localhost:8000/api/sujets";
    const res = await fetch(url, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer "+token,
            "accept": "application/ld+json"
        },
        body: JSON.stringify({
            "contenu":contenu,
            "sujet":sujet,
            "auteur":auteur
          })
    })
    .catch(err => {
        console.log("Erreur", err)
    })
}
*/
export async function getAllMessages(nPage){
    let url = "http://localhost:8000/api/messages?page="+nPage;
    const res = await fetch(url, {
        method: 'GET',
        headers: {}
    })
    const data = await res.json();
    //console.log(data)
    return data['hydra:member']
}

export async function getMessage(id){
    let url = "http://localhost:8000/api/messages/"+id;
    const res = await fetch(url, {
        method: 'GET',
        headers: {}
    })
}

export async function getMessageWithURI(URI){
    let url = "http://localhost:8000"+URI;
    const res = await fetch(url, {
        method: 'GET',
        headers: {}
    })
    const data = await res.json();
    return data;
}