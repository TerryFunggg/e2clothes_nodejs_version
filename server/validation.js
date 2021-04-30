class Validation {
  constructor(){
    this.errors = []
  }

  login(user){
    this._checkEmail(user.email)
    this._checkPassword(user.password)
  }

  _checkEmail(email){
    const validate = !!email && /\S+@\S+/.test(email);
    if (!validate) this.errors.push("Email is not valid");
  }

  _checkPassword(pwd){
  const validate = !!pwd && pwd.length >= 6
    if (!validate) this.errors.push("Password is not valid");
  }

  errors() {
    return this.errors;
  }

  errorsLength(){
    return this.errors.length || 0
  }

  cleanErrors(){
    this.errors = [];
  }
}


module.exports = Validation;
