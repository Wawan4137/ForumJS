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