import { Controller } from 'stimulus'
import loader from '../loader';

export default class extends Controller {
  static targets = ["searchForm", "productList"]

  initialize() {
    this.timer = null
    this.keyWords = null
    this.currentPage = 1
    this.limit = 6
    this.totalPage = 0;
  }

  connect() {
    console.debug("Market controller connected")
  }

  // TODO: fetch animation
  async search(event) {
    const keyWords = event.target.value
    if (this.timer) clearTimeout(this.timer)
    if (!!!keyWords) return;
    this.keyWords = keyWords
    this.searchItems(keyWords);
  }

  async searchItems(keyWords) {
    try {
      // set timer to prevent search over
      this.timer = setTimeout(async () => {
      loader.open();
        const data = await this._fetchPorducts(this._query(keyWords, this.currentPage, this.limit));
        let html = '';
        data.data.search.products.map(p => {
          html += this._productCartd(p)
        })
        this.productListTarget.innerHTML = html
        // TODO: refector this code
        if (data?.data?.search?.total) {
          this.totalPage = data.data.search.total;
          //const result = Math.floor(this.totalPage / this.limit) + 1
        }
        loader.close();
      }, 1500)
    } catch (e) {
      loader.close();
      console.log(e);
    }
  }

  prev(e) {
    if (this.timer) clearTimeout(this.timer)
    this.currentPage--;
    this.searchItems(this.keyWords);
  }

  next(e) {
    if (this.timer) clearTimeout(this.timer)
    this.currentPage++;
    this.searchItems(this.keyWords);
  }

  _query(q, page, limit) {
    return `
    {
        search(search: "${q}"${page ? ",page: " + page : ''}${limit ? ",limit: " + limit : ''}){
          products{
            id
            name
            price
            image
          }
        page,
        per,
        total
        },
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
    // TODO: change the link to dynim
    return `
    <a href="/product/${product.id}">
    <div class="ring-1 ring-gray-200 shadow-lg rounded p-4">
        <div class="relative">
            <img class="w-full block rounded" src="${product.image}"/>
            <div class="p-5">
                <h3 class="text-lg">${product.name}</h3>
                <p class="text-gray-400 mt-2 text-right">\$${product.price}</p>
            </div>
        </div>
    </div></a>`;
  }
}
