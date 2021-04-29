/**
 * @author Terry Fung (terryyessfung@gmail.com)
 * @since  2021-04-28
 */

class Reactless {
  static createElement(tag, attributes, ...children) {
    let childrenNodes = children.length ? [...children] : null;
    return { tag, attributes, childrenNodes };
  }

  /*
   *  Reactless not using virtual dom
   *  It use what the doom
   */
  static render(wtd) {
    const isString = (node) => typeof node === 'string'
    const isNumber = (node) => typeof node === 'number'
    const roles = [isString,isNumber]
    const isMatch = (fn) => fn(wtd)

    // recursive kick like the kick in movie - Inception :)
    if (roles.some(isMatch)) return document.createTextNode(wtd);

    const htmlNode = document.createElement(wtd.tag);
    const attributes = wtd.attributes || {};
    // set the attributes to current htmlNode
    Object.keys(attributes).forEach((key) =>
      htmlNode.setAttribute(key, attributes[key])
    );

    // if current htmlNode have children
    // keep render until match the kick
    (wtd.childrenNodes || []).forEach((child) =>
      htmlNode.appendChild(this.render(child))
    );

    return htmlNode;
  }
}

export default Reactless;
