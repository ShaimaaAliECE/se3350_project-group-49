class auth{
    constructor(){
      this.authenticated = false
    }
    Login(cb){
      this.authenticated = true
      cb()
    }
    logout(cb){
      this.authenticated = false
      cb()
    }
    isAuthenticated(){
      return this.authenticated
    }
  }
  export default new auth
  