import { Controller } from 'stimulus'

export default class extends Controller {

  initialize() {
    console.log("applyshop");
    document.getElementById('product-list').hidden = true
    document.getElementById('logo').onchange = e => {
      console.log(e);
      preview = document.getElementById('preview')
      preview.src = URL.createObjectURL(e.target.files[0])
      // free memory
      preview.onload = function() {
        URL.revokeObjectURL(preview.src)
      }
    }
  }

  async updateshop(e){
    e.preventDefault()
    const form  = document.getElementById('form-updateshop');
    const formData = new FormData(form)
    const result = await this._fetchForm(formData)
    if(result.message === 'ok'){
      alert('Update Shop successfully')
      location.href = "/manage_shop"
    }
  }

  showShop(e){
    document.getElementById('form-updateshop').hidden = false
    document.getElementById('product-list').hidden = true
  }

  showProducts(e){
    document.getElementById('form-updateshop').hidden = true
    document.getElementById('product-list').hidden = false
  }

  async deleteProduct(e){
    if (confirm("Are you sure?")) {
      //remove item from cart
      const product = e.target.dataset.item;
      const result = await this._fetch(this._deleteItemQuery(product));
      if (result.data.deleteProduct.message === "ok") {
        location.reload();
      }
    }
  }

  async _fetchForm(formData) {
    try {
      const data = await fetch("http://localhost:3000/updateshop", {
        method: "POST",
        headers: {
          'Authorization': `${this._getCookie('token')}`
        },
        body: formData
      })

      return await data.json();
    } catch (e) {
      console.error(e);
    }
  }


  /*
   * A query stirng send to graphql server
   */
  _deleteItemQuery(q) {
    return `
    mutation {
        deleteProduct(input:{
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
