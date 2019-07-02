# waitForSelector
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


### options
**Type**: _Object_   


### options.delay
**Type**: _Number_   
**Default**: `50`   
Recheck delay in `msec`


### options.race
**Type**: _Boolean_   
**Default**: `false`   
Wait until one of the given selectros appears in DOM


### return
Returns `setInterval` id   


## Usage
```javascript
// Single
waitForSelector('.block3', (elem) => {
   // => <Element> <div class="block3"></div>
})

// Multiple
waitForSelector(['.block1', '.block2', '.block4', '.block8'], (list) => {
   // => ['.block4', '.block2', '.block8', '.block1']
})

// Race
waitForSelector(['.block7', '.block4', '.block5', '.block4'], (elem) => {
   // => '.block5'
}, { race: true })
```

