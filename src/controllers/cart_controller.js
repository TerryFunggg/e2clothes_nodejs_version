import { Controller } from 'stimulus'
import loader from '../loader';

export default class extends Controller {
  static targets = ["area"]
  static values = { buyNum: Number }

  initialize() {
    this.totalPrice = document.getElementById('price')
  }

  connect() {
    console.debug("Cart controller connected");
  }

  async deleteItem(e) {
    console.log("yoyoyoy");
    if (confirm("Are you sure?")) {
      //remove item from cart
      const product = e.target.dataset.item;
      const result = await this._fetch(this._query(product));
      if (result.data.removeFromCart.message === "ok") {
        location.reload();
      }
    }
  }


  /*
   * A query stirng send to graphql server
   */
  _query(q) {
    return `
    mutation {
        removeFromCart(input:{
            productId: ${q}
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
