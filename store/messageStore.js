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