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
