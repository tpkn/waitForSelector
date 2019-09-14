# waitForSelector [![npm Package](https://img.shields.io/npm/v/waitforselector.svg)](https://www.npmjs.org/package/waitforselector)
Wait for an element(s) with a specific selector to appear 


## API
```javascript
waitForSelector(selector, cb[, options])
```

### selector
**Type**: _String_ | _Array_   
Css selector or an array of selectors


### cb
**Type**: _Function_   
Callback function


### options.interval
**Type**: _Number_   
**Default**: `50`   
Recheck delay in `msec`


### options.race
**Type**: _Boolean_   
**Default**: `false`   
Wait until one of the given selectros appears in DOM


### options.timeout
**Type**: _Number_   
**Default**: `0`   
Calls `cb` function once fired. `0` turns off timeout


### @return
Returns `stop` method   


## Usage
```javascript
// Single
waitForSelector('.block3', (elem) => {
   // => <div class="block3"></div>
})

// Multiple
waitForSelector(['.block1', '.block2', '.block4', '.block8'], (list) => {
   // => ['.block4', '.block2', '.block8', '.block1']
})

// Race
waitForSelector(['.block7', '.block4', '.block5', '.block4'], (elem) => {
   // => <div class="block5"></div>
}, { race: true })
```



## Changelog 
#### v1.3.0 (2019-09-14):
- `delay` option renamed to `interval`
- added `timeout` option


