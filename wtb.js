/** @preserve npm.im/wtb */
!function() {
  var free
  var api = wtb
  var dimension = /[\deE.]+/g
  var match = "".match
  var slice = [].slice
  var area = "area"
  var aspect = "aspect"
  var height = "height"
  var width = "width"
  var own = {}.hasOwnProperty

  function get(safe, o, k) {
    var v = safe || own.call(o, k) ? o[k] : free
    return typeof v == "function" ? v.call(o) : v
  }

  function wtb(given) {
    var gob = given instanceof Object
    var sob = typeof given == "object" != gob
    var num = sob && given ? NaN : +given
    var met = num === num || !given
    ? [num]
    : given.match === match
    ? given.match(dimension)
    : given instanceof Array
    ? slice.call(given)
    : [
        get(!gob, given, width),
        get(!gob, given, height)
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
