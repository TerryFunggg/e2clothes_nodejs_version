import {Controller} from 'stimulus'
import loader from '../loader';

export default class extends Controller {
  static targets = ["area"]
  static values = {buyNum: Number}

  initialize(){
    this.buyBtn = document.getElementById('buy')
    this.buyNum = document.getElementById('buyNum').value
    this.productQuality = document.getElementById('product-quality').innerText
  }

  connect(){
    console.debug("product controller connected");
  }

  async addToCart(){
    loader.open();

    const productId = document.getElementById('product').dataset.item
    const num = document.getElementById('buyNum').value
    const order = {productId, num}
    const result = await this._fetch(this._query(order));
    // add loading anim
    if(result.data.addToCart.message === "ok"){
      alert("add to cart")
      location.reload();
    }

    loader.close();
  }

  changeQuality(e){
    const cl = e.target.classList
    const value = e.target.value
    if(value <= 0 || value > Number(this.productQuality) || isNaN(value)) {
      cl.add("border-red-400")
      this.buyBtn.disabled = true
    }else{
      cl.remove("border-red-400")
      this.buyBtn.disabled = false
    }
  }

  /*
   * A query stirng send to graphql server
   */
  _query(q) {
    return `
    mutation {
        addToCart(input:{
            productId: ${q.productId},
            buyNum: ${q.num}
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
