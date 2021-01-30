//Requête de connexion => JWT Token
export async function login(username, password){
    let url = "http://localhost:8000/api/login_check";
    const res = await fetch(url, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
          },
        body: JSON.stringify({username, password}),
    })
    const data = await res.json();

    return data
}

//Requête d'inscription User inscrit ou Erreur
export async function createUser(username, password){
    let url = "http://localhost:8000/api/auteurs";
    const res = await fetch(url, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({username, "roles": ["ROLE_USER"], password})
    })
    const data = await res.json();
    return data
}

export async function getUsers(token){
    let url = "http://localhost:8000/api/auteurs";
    const res = await fetch(url, {
        method: 'GET',
        headers: {
            "Authorization": "Bearer "+token
        },
    })
    const data = await res.json();
    return data['hydra:member']
}

export async function getUserURI(token, URI){
    let url = "http://localhost:8000"+URI;
    const res = await fetch(url, {
        method: 'GET',
        headers: {
            "Authorization": "Bearer "+token
        },
    })
    const data = await res.json();
    return data
}
