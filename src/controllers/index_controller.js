import {Controller} from 'stimulus'

export default class extends Controller {
  static targets = ["area"]

  initialize(){
  }

  connect(){
    console.log(this.element);
  }
}
