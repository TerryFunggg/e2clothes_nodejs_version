import { Controller } from 'stimulus'

export default class extends Controller {
  static targets = ["searchForm", "productList"]

  initialize() {
    this.timer = null
  }

  connect() {
    console.debug("Market controller connected")
  }

  // TODO: fetch animation
  async search(event) {
    const keyWords = event.target.value
    if (this.timer) clearTimeout(this.timer)
    if (!!!keyWords) return;

    // set timer to prevent search over
    this.timer = setTimeout( async () => {

      const products = await this._fetchPorducts(this._query(keyWords));
      let html = '';
      products.data.product.map(p => {
        html += this._productCartd(p)
      })
      this.productListTarget.innerHTML = html

    }, 1500)
  }

  _query(q) {
    return `
    {
        product(search: "${q}"){
            id
            name
            price
        }
    }`
  }

  async _fetchPorducts(query) {
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

  _productCartd(product) {
    return `
    <div class="ring-1 ring-gray-200 shadow-lg rounded p-4">
        <div class="relative">
            <img class="w-full block rounded" src="https://upload.wikimedia.org/wikipedia/en/f/f1/Tycho_-_Epoch.jpg"/>
            <div class="p-5">
                <h3 class="text-lg">${product.name}</h3>
                <p class="text-gray-400 mt-2 text-right">${product.price}</p>
            </div>
        </div>
    </div>`;
  }
}
