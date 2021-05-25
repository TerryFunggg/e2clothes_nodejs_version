export default class {
  static open(){
    document.getElementById('loader').classList.remove("hidden")
  }

  static close(){
    document.getElementById('loader').classList.add("hidden")
  }
}
