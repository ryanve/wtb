# wtb

[<b>what the box</b>](https://ryanve.github.io/wtb) JavaScript dimension parser

```
npm install wtb --save
```

```js
const wtb = require("wtb")
```

### `wtb(dimensions=0)  `

* dimensions are accepted in many formats shown in examples
* defaults to square
* negatives become positive
* handles any input without throwing errors
* string delimiter is any non numeric portion
* supports JavaScript number formats including integers, decimals, scientific notation
* plain objects support owned values while null objects support any depth
* returns an object with calculated properties whose values range from `0` to `Infinity`
  * `area` is the calculated `width * height`
  * `aspect` is the calculated aspect ratio `width / height`
  * `height` is the parsed `height`
  * `width` is the parsed `width`

### squares

these examples are equivalent `30x30` squares

```js
wtb(30)
wtb(-30)
wtb(3e2)
wtb(3E2)
wtb(30.0)
wtb("30")
wtb("30x30")
wtb("30X30")
wtb("30,30")
wtb("30_30")
wtb("30 30")
wtb("30  30")
wtb([30])
wtb([30, 30])
wtb({ width: 30 })
wtb({ height: 30 })
wtb({ width: () => 30 })
```

they return a square object

```js
{
  area: 900,
  aspect: 1,
  width: 30,
  height: 30
}
```

### rectangles

these examples are equivalent rectangles

```js

wtb("30x20")
wtb("30 20")
wtb("30x20")
wtb("3e2x2e2")
wtb([30, 20])
wtb([30, 30])
wtb({ width: 30, height: 20 })
wtb({ width: () => 30, height: () => 20 })
```

they return a rectangular object

```js
{
  area: 600,
  aspect: 1.5,
  width: 30,
  height: 20
}
```


### aspect ratio

`aspect` can determine portrait vs landscape orientation

```js
const orientation = wtb().aspect > 1 ? "landscape" : "portrait"
```

### compatiblity

* compatible in Node.js or CommonJS or any web browser
* uses universal module definition pattern
* if online unbundled then `wtb === window.wtb`

[<b>have fun =)</b>](https://ryanve.github.io/wtb)
