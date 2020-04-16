!function() {
  var api = wtb
  var dimension = /[\deE.]+/g
  var slice = [].slice
  var area = "area"
  var aspect = "aspect"
  var height = "height"
  var width = "width"

  function got(o, k) {
    var v = o[k]
    v = typeof v == "function" ? v.call(o) : v
    v = +v
    return v || v == 0 ? v : void v
  }

  function wtb(given) {
    var m
    m = typeof given == "number"
      ? [given]
      : typeof given == "string"
      ? given.match(dimension)
      : typeof given == "boolean"
      ? [given]
      : given instanceof Array
      ? slice.call(given)
      : given
      ? [got(given, width), got(given, height)]
      : m

    var h = m && m.pop()
    var w = m && m.pop()
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
