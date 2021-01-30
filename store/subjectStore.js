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
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer "+token,
            "accept": "application/ld+json"
        },
        body: JSON.stringify({
            "nom":nom,
            "categorie":categorie,
            "auteur":auteur
          })
    })
    .catch(err => {
        console.log("Erreur", err)
    })
}

export async function getLast(nPage){
    let url = "http://localhost:8000/api/sujets?page="+nPage;
    const res = await fetch(url, {
        method: 'GET',
        headers: {}
    })
    const data = await res.json();
    let nb = data["hydra:totalItems"];
    let i = 0;
    data['hydra:member'].forEach(element => {
        i++;
        if(i == nb){
            return element.id
        }
    });
}
