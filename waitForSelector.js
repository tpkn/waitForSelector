/*! waitForSelector, http://tpkn.me */
function waitForSelector(selectors, cb, options){
   var isMultiple = Array.isArray(selectors);

   if(!isMultiple && typeof selectors !== 'string'){
      throw new TypeError('First argument must be a string or an Array!');
   }

   if(typeof cb !== 'function'){
      throw new Error('Callback function no set!');
   }

   var i, el, len, selector, found = [];

   var opt   = typeof options   !== 'object'    ? {}       : options;
   var delay = typeof opt.delay !== 'number'    ? 50       : opt.delay;
   var race  = typeof opt.race  !== 'undefined' ? opt.race : false;

   // Filter clones from the list
   if(isMultiple){
      selectors = selectors.filter(function (item, i, array){
         return array.indexOf(item) == i;
      });
   }

   var aid = setInterval(function(){
      // Multiple
      if(isMultiple){

         for(i = 0, len = selectors.length; i < len; i++){
            selector = selectors[i];
            
            el = document.querySelector(selector);
            if(el && found.indexOf(selector) == -1){

               // Race complete
               if(race){
                  clearInterval(aid);
                  cb(selector);
                  break;
               }

               found.push(selector);
            }

            if(found.length == selectors.length){
               clearInterval(aid);
               cb(selectors);
               break;
            }
         }

      // Single
      }else{
         el = document.querySelector(selectors);
         if(el){
            clearInterval(aid);
            cb(el);
         }
      }
   }, delay);

   return aid;
}

if(typeof module !== 'undefined' && typeof module.exports !== 'undefined'){
   module.exports = waitForSelector;
}else{
   if(typeof define === 'function' && define.amd){
      define([], function(){
         return waitForSelector;
      });
   }else{
      window.waitForSelector = waitForSelector;
   }
}
