import { Controller } from 'stimulus'

export default class extends Controller {

  initialize() {
    console.log("modify product");
    document.getElementById('image').onchange = e => {
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
    const form  = document.getElementById('form-modifyproduct');
    const formData = new FormData(form)
    const result = await this._fetch(formData)
    if(result.message === 'ok'){
      alert('Create Porduct successfully')
      location.reload()
    }
  }

  async _fetch(formData) {
    try {
      const data = await fetch("http://localhost:3000/modifyproduct", {
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
