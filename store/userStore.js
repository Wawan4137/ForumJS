//Requête de connexion => JWT Token
export async function login(username, password){
    let url = "https://localhost:8000/api/login_check";
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
    let url = "https://localhost:8000/api/auteurs";
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