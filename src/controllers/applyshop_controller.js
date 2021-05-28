import { Controller } from 'stimulus'

export default class extends Controller {

  initialize() {
    console.log("applyshop");
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

  async submit(e){
    e.preventDefault()
    const form  = document.getElementById('form-applyshop');
    const formData = new FormData(form)
    const result = await this._fetch(formData)
    if(result.message === 'ok'){
      alert('Create Shop successfully')
      location.href = "/manage_shop"
    }
  }

  async _fetch(formData) {
    try {
      const data = await fetch("http://localhost:3000/applyshop", {
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

  _getCookie(name) {
    function escape(s) { return s.replace(/([.*+?\^$(){}|\[\]\/\\])/g, '\\$1'); }
    var match = document.cookie.match(RegExp('(?:^|;\\s*)' + escape(name) + '=([^;]*)'));
    return match ? match[1] : null;
  }

}
