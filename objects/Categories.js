import * as categoryStore from '../store/categoryStore.js'
import Category from './Category.js'

export default class Categories{
    constructor(){
        this.categories = []
    }

    //Récupère toutes les catégories
    async all(nPage){
        let categories = await categoryStore.getCategories(nPage);
        console.log(categories);
        categories.forEach(element => {
            this.categories.push(new Category(element.nom, element.sujets, element.id))
        });
        return this
    }
}