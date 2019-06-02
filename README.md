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
waitForSelector('.progress-bar__fill', () => {
   console.log('Yey! Single!');
})

waitForSelector(['.progress-bar__fill', '.modal-menu--small'], () => {
   console.log('Yey! Array!');
})
```

