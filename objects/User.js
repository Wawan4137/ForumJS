import * as userStore from '../store/userStore.js'

export default class User{
    constructor(){
        this.username = null
        this.token = null
    }

    async connect(username,password){
        let token = await userStore.login(username, password);
        if(token.token){
            this.username = username
            this.token = token.token
            localStorage.setItem('username', this.username)
            localStorage.setItem('token', this.token)
        }else{
            console.error(token)
        }
        //Remplir les données
        
        return this
    }

    create(username, password){
        //state = false
        userStore.createUser(username,password)
        return this
        }

    logout(){
        this.username = null
        this.token = null
        localStorage.removeItem('username');
        localStorage.removeItem('token');
    }

    resetUserObject(){
        let username = localStorage.getItem('username')
        let token = localStorage.getItem('token')
        if(username != null && token != null){
            this.username= username
            this.token = token
        }
        return this;
    }

    isValid(){
        if(this.username != null && this.token != null){
            return true
        }
        return false
    }
}