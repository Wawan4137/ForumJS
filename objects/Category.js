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
        this.id = apiCategory.id;
        this.nom = apiCategory.nom;
        this.apiSubjects = apiCategory.sujets;
        for (const apiSubj of this.apiSubjects){
            let val = await subjectStore.getSubjectWithURI(apiSubj);
            let Sub = new Subject(val.nom, val.auteur, val.dateCreation, val.categorie, val.id, val.messages);
            this.subjects.push(Sub)
        }
        
        //console.log(this.subjects);
        return this
    }
}