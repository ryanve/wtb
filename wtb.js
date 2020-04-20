/** @preserve npm.im/wtb */
!function() {
  var api = wtb
  var dimension = /[\deE.]+/g
  var match = "".match
  var slice = [].slice
  var area = "area"
  var aspect = "aspect"
  var height = "height"
  var width = "width"
  var probe = Object.getPrototypeOf
  var prone = Object.prototype
  var own = prone.hasOwnProperty

  function get(o, k) {
    var ban = probe && prone === probe(o) && !own.call(o, k)
    if (ban) return
    var v = o[k]
    return typeof v == "function" ? v.call(o) : v
  }

  function wtb(given) {
    var num = +given
    var met = num === num || !given
    ? [num]
    : given.match === match
    ? given.match(dimension)
    : given instanceof Array
    ? slice.call(given)
    : [
        get(given, width),
        get(given, height)
      ]

    var h = met && met.pop()
    var w = met && met.pop()
    h = h || h != 0 && w
    w = w || w != 0 && h
    h = +h || 0
    w = +w || 0
    h = h < 0 ? -h : h
    w = w < 0 ? -w : w

    var b = this instanceof wtb ? this : new wtb
    b[area] = w * h
    b[aspect] = w == h ? 1 : w / h
    b[height] = h
    b[width] = w
    return b
  }

  typeof module != "undefined" && module.exports
    ? module.exports = api
    : this[api.name] = api
}();
