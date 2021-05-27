import { Controller } from 'stimulus'
import loader from '../loader';

export default class extends Controller {
  static targets = ["area"]
  static values = { buyNum: Number }

  initialize() {
    this.totalPrice = document.getElementById('pice')
  }

  connect() {
    console.debug("Cart controller connected");
  }

  async checkout(){
    // check the cart empty or not
    const countOfCell = document.querySelectorAll("td").length
    if(!countOfCell && countOfCell <= 0) return;

    loader.open();
    //checkout
    const result = await this._fetch(this._query());
    loader.close();
    if(result.data.checkOut.message == 'ok'){
      alert('Order Created')
      location.reload();
    }else if(result.data.checkOut.message == 'address is empty'){
      alert('You need to provide address information')
      location.href = '/user_info';
    }else{
      alert('Something wrong...Please tell admin')
    }
  }


  /*
   * A query stirng send to graphql server
   */
  _query() {
    return `
    mutation {
        checkOut(input:{
        }){
            message
        }
    }`
  }

  async _fetch(query) {
    try {
      const data = await fetch("http://localhost:3000/graphql", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `${this._getCookie('token')}`
        },
        body: JSON.stringify({ query })
      })

      return await data.json();
    } catch (e) {
      console.error(e);
    }
  }

  _getCookie(name) {
    function escape(s) { return s.replace(/([.*+?\^$(){}|\[\]\/\\])/g, '\\$1'); }
    var match = document.cookie.match(RegExp('(?:^|;\\s*)' + escape(name) + '=([^;]*)'));
    return match ? match[1] : null;
  }
}
