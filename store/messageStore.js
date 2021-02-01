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