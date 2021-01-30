import * as categoryStore from '../store/categoryStore.js';
import * as subjectStore from '../store/subjectStore.js';
import Subject from './Subject.js'

export default class Category{
    constructor(nom = null, apiSubjects = [], id = null, subjects = []){
        this.id = id
        this.nom = nom
        this.apiSubjects = apiSubjects
        this.subjects = subjects
    }

    async init(id){
        let apiCategory = await categoryStore.getCategory(id);
        console.log(apiCategory);
        this.id = apiCategory.id;
        this.nom = apiCategory.nom;
        this.apiSubjects = await subjectStore.getAllSubjects(apiCategory.id);
        this.apiSubjects.forEach(element => {
            this.subjects.push(new Subject(element.nom, element.auteur, element.dateCreation, element.categorie, element.id, element.messages))
        });
        //console.log(this.subjects);
        return this
    }
}