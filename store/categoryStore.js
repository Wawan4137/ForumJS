export async function getCategories(nPage){
    let url = "http://localhost:8000/api/categories?page="+nPage;
    const res = await fetch(url, {
        method: 'GET',
        headers: {
        },
        cache: 'default'
    })
    const data = await res.json();
    //console.log(data['hydra:member'])
    return data['hydra:member']
}

export async function getCategory(id){
    let url = "http://localhost:8000/api/categories/"+id;
    const res = await fetch(url, {
        method: 'GET',
        headers: {}
    })
    const data = await res.json();
    return data
}
