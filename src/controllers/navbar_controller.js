import {Controller} from 'stimulus'

export default class extends Controller {
  static targets = ["submenu"]

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
}
