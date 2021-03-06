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


### options.target
**Type**: _Element_   
**Default**: `document.body`   


### options.endless
**Type**: _Boolean_   
**Default**: `false`   
Sometimes elements can be appended, removed and appended again. This option allows you to track each append of an element into the DOM structure.


### options.race
**Type**: _Boolean_   
**Default**: `false`   
Wait until one of the given selectros appears in DOM


### options.timeout
**Type**: _Number_   
**Default**: `0`   
Stop waiting after this amount of milliseconds.   
Calls `cb` function with no arguments. Turned off by default.


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

#### v1.3.0 (2020-02-29):
- moved from `setInterval` to `MutationObserver`

#### v1.2.2 (2019-09-14):
- `delay` option renamed to `interval`
- added `timeout` option


