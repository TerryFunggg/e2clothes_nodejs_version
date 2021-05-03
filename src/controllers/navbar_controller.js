import {Controller} from 'stimulus'

export default class extends Controller {
  static targets = ["submenu", "usermenu"]

  initialize(){
  }

  connect(){
    console.debug("NavBar connected");
  }

  toggle(){
    const state = this.submenuTarget.classList.contains("hidden")
    state ? this.submenuTarget.classList.remove('hidden')
      : this.submenuTarget.classList.add('hidden')
  }

  toggleUserMenu(e){
    const state = this.usermenuTarget.classList.contains("hidden")
    state ? this.usermenuTarget.classList.remove('hidden')
      : this.usermenuTarget.classList.add('hidden')
  }

  signout(){
    if(confirm("Are you sure?")){
      document.cookie = "token= ; expires = Thu, 01 Jan 1970 00:00:00 GMT"
      location.reload()
    }
  }
}
