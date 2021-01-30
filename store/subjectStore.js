export async function getAllSubjects(nPage){
    let url = "http://localhost:8000/api/sujets?page="+nPage;
    const res = await fetch(url, {
        method: 'GET',
        headers: {}
    })
    const data = await res.json();
    //console.log(data)
    return data['hydra:member']
}

export async function getSubject(id){
    let url = "http://localhost:8000/api/sujets/"+id;
    const res = await fetch(url, {
        method: 'GET',
        headers: {}
    })
    const data = await res.json();
    return data;
}

export async function getSubjectWithURI(URI){
    let url = "http://localhost:8000"+URI;
    const res = await fetch(url, {
        method: 'GET',
        headers: {}
    })
    const data = await res.json();
    return data;
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
            nom, categorie, auteur
          })
    })
    .catch(err => {
        console.log("Erreur", err)
    })
}

export async function deleteSubject(id, token){
    let url = "http://localhost:8000/api/sujets/"+id;
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
}