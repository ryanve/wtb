const wtb = require("./")
const { ok } = require("assert").strict
const { log } = console
const deeper = a => a.map(v => [v])
const defaulted = v => {
  const { area, aspect, height, width } = wtb(v)
  return [area, aspect, height, width].join("") === "0100"
}

ok(typeof wtb == "function")
ok(wtb() instanceof wtb)
log("legit constructor")

const defaults = wtb()
ok(defaults.area === 0)
ok(defaults.aspect === 1)
ok(defaults.width === 0)
ok(defaults.height === 0)
log("legit defaults")

ok(defaults.hasOwnProperty("area"))
ok(defaults.hasOwnProperty("aspect"))
ok(defaults.hasOwnProperty("height"))
ok(defaults.hasOwnProperty("width"))
log("owned keys")

const empties = [NaN,0,void 0,null,false,"","0"," ","x",[],{},()=>{}]
ok(empties.every(defaulted))
log("empties work")

const deepies = deeper(empties)
ok(deepies.every(defaulted))
log("deepies work")

ok(wtb(333).area === 333 * 333)
ok(wtb(333).aspect === 1)
ok(wtb(333).width === 333)
ok(wtb(333).height === 333)
log("integers work")

ok(wtb(33e3).area === 33e3 * 33e3)
ok(wtb(33e3).aspect === 1)
ok(wtb(33e3).width === 33e3)
ok(wtb(33e3).height === 33e3)
ok(wtb(3.3e3).width === 3.3e3)
ok(wtb(3.3e3).height === 3.3e3)
log("science works")

ok(wtb("333x22").area === 333 * 22)
ok(wtb("333x22").aspect === 333 / 22)
ok(wtb("333X22").width === 333)
ok(wtb("333X22").height === 22)
log("cross works")

ok(wtb("333 22").area === 333 * 22)
ok(wtb("333 22").aspect === 333/22)
ok(wtb("333 22").width === 333)
ok(wtb("333 22").height === 22)
log("ssv works")

ok(wtb("333,22").area === 333 * 22)
ok(wtb("333,22").aspect === 333 / 22)
ok(wtb("333,22").width === 333)
ok(wtb("333,22").height === 22)
log("csv works")

ok(wtb(new Number(0)).area === 0)
ok(wtb(new Number(0)).aspect === 1)
ok(wtb(new Number(333)).aspect === 1)
ok(wtb(new Number(333)).area === 333 * 333)
ok(wtb(new Number(-333)).area === 333 * 333)
log("new Number ok")

ok(wtb(new String("")).area === 0)
ok(wtb(new String("")).aspect === 1)
ok(wtb(new String("333")).area === 333 * 333)
ok(wtb(new String("333,22")).area === 333 * 22)
ok(wtb(new String("-333")).area === 333 * 333)
log("new String ok")

ok(wtb({width:333}).height === 333)
ok(wtb({width:333}).height === 333)
ok(wtb({height:22}).width === 22)
ok(wtb({height:22}).width === 22)
log("1d objects work")

ok(wtb({width:333, height:22}).area === 333 * 22)
ok(wtb({width:333, height:22}).aspect === 333 / 22)
ok(wtb({width:333, height:22}).width === 333)
ok(wtb({width:333, height:22}).height === 22)
ok(wtb({width:"333", height:"22"}).area === 333 * 22)
ok(wtb({width:"333", height:"22"}).aspect === 333 / 22)
ok(wtb({width:"333", height:"22"}).width === 333)
ok(wtb({width:"333", height:"22"}).height === 22)
log("2d objects work")

function mage() {}
const model = mage.prototype
model.width = function() { return this.w }
model.height = function() { return this.h }
const magic = new mage
magic.w = 3
magic.h = 5
ok(wtb(magic).area === 15)
log("magic works")

ok(wtb(true).area === 1)
ok(wtb(true).aspect === 1)
ok(wtb(true).width === 1)
ok(wtb(true).height === 1)
ok(wtb([true]).area === 1)
ok(wtb([true]).aspect === 1)
ok(wtb([true]).width === 1)
ok(wtb([true]).height === 1)
log("truth works")

ok(wtb([false, true]).area === 0)
ok(wtb([false, true]).aspect === 0 / 1)
ok(wtb([false, true]).width === 0)
ok(wtb([false, true]).height === 1)
ok(wtb([true, false]).area === 0)
ok(wtb([true, false]).aspect === 1 / 0)
ok(wtb([true, false]).width === 1)
ok(wtb([true, false]).height === 0)
log("bools work")

ok(wtb(-333).width === 333)
ok(wtb(-333).height === 333)
ok(wtb("-333 -22").width === 333)
ok(wtb("-333 -22").height === 22)
ok(wtb("-333x-22").width === 333)
ok(wtb("-333x-22").height === 22)
ok(wtb([-333, -22]).width === 333)
ok(wtb([-333, -22]).height === 22)
ok(wtb({width:-333}).width === 333)
ok(wtb({height: -22}).height === 22)
log("absolute")

log("all good =)")
