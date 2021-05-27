import { Controller } from 'stimulus'

export default class extends Controller {
  connect() {
    console.debug("User info controller connected");
    this.showUser()
  }

  showUser(){
    document.getElementById('form-user').hidden = false
    document.getElementById('form-address').hidden = true
  }

  showAddress(){
    document.getElementById('form-user').hidden = true
    document.getElementById('form-address').hidden = false
    // document.getElementById('form-user').style.display = 'hidden'
    // document.getElementById('form-address').style.display = 'block'
  }
}
