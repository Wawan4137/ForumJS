import * as categoryStore from '../store/categoryStore.js'

export default class Category{
    constructor(nom = null, apiSubjects = [], id = null, subjects = []){
        this.id = id
        this.nom = nom
        this.apiSubjects = apiSubjects
        this.subjects = subjects
    }

    async init(id){
        let apiCategory = await categoryStore.getCategory(id)
        console.log(apiCategory)
    }
}