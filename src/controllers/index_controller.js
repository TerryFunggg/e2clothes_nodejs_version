import Reactless from '../Reactless'
import {Controller} from 'stimulus'

export default class extends Controller {
  static targets = ["area"]

  initialize(){
    const html = <h1>1</h1>
    const doom = Reactless.render(html)
    this.element.appendChild(doom)
  }

  connect(){
    console.log(this.element);
  }
}
