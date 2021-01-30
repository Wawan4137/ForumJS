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
}
