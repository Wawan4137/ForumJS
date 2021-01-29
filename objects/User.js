import * as userStore from '../store/userStore.js'

export default class User{
    constructor(){
        this.id = null
        this.username = null
        this.token = null
        this.roles = null
    }

    async connect(username,password){
        let token = await userStore.login(username, password);
        if(token.token){
            localStorage.setItem('username', username)
            localStorage.setItem('token', token.token)
            this.resetUserObject()
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
        this.id = null
        this.username = null
        this.token = null
        this.roles = null
        localStorage.removeItem('username');
        localStorage.removeItem('token');
    }

    async resetUserObject(){
        let username = localStorage.getItem('username')
        let token = localStorage.getItem('token')
        if(username != null && token != null){
            let users = await userStore.getUsers(token);
            let found = false
            users.forEach(user => {
                if(user.username == username){
                    this.id = user.id
                    this.username = user.username
                    this.roles = user.roles[1]
                    this.token = token
                    found = true;
                }
            });
            if(!found){
                this.id = null
                this.username = null
                this.token = null
                this.roles = null
            }
        }
        return this;
    }

    isValid(){
        if(this.id != null && this.token != null && this.roles != null && this.id != null){
            return true
        }
        return false
    }
}