export async function getAllSubjects(nPage){
    let url = "http://localhost:8000/api/sujets?page="+nPage;
    const res = await fetch(url, {
        method: 'GET',
        headers: {}
    })
    const data = await res.json();
    console.log(data)
    return data['hydra:member']
}

export async function getSubject(id){
    let url = "http://localhost:8000/api/sujets/"+id;
    const res = await fetch(url, {
        method: 'GET',
        headers: {}
    })
}

export async function addSubject(nom, categorie, auteur, token){
    let url = "http://localhost:8000/api/sujets";
    const res = await fetch(url, {
        method: 'POST',
        mode : "no-cors",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer "+token,
            "accept": "application/ld+json"
        },
        body: JSON.stringify({
            nom, auteur, categorie
          })
    })
    .catch(err => {
        console.log("Erreur", err)
    })
    console.log(res)
}
