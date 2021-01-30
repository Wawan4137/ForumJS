<<<<<<< HEAD
export async function addMessage(dateCreation, auteur, contenu, sujet){
    let url = "http://localhost:8000/api/messages";
    const res = await fetch(url, {
        method: 'POST',
        headers: {
            "accept": "application/ld+json",
            "Content-Type": "application/ld+json",
        },
        body: JSON.stringify({
            
            "dateCreation": dateCreation,
            "sujet": sujet,
            "auteur": auteur,
            "messages": [
              contenu
            ]
          })
    })
}
=======
export async function getAllMessages(nPage){
    let url = "https://localhost:8000/api/messages?page="+nPage;
    const res = await fetch(url, {
        method: 'GET',
        headers: {}
    })
    const data = await res.json();
    //console.log(data)
    return data['hydra:member']
}

export async function getMessage(id){
    let url = "https://localhost:8000/api/messages/"+id;
    const res = await fetch(url, {
        method: 'GET',
        headers: {}
    })
}
>>>>>>> main
