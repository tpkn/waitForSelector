/*! waitForSelector, http://tpkn.me */
function waitForSelector(selectors, cb, options = {}){
   let isMultiple = Array.isArray(selectors);

   if(!isMultiple && typeof selectors !== 'string'){
      throw new TypeError('First argument must be a String or an Array!');
   }
   if(typeof cb !== 'function'){
      throw new Error('Missing callback function!');
   }

   let {
      delay = 50,
      race = false,
   } = options;

   // Filter clones from the list
   if(isMultiple){
      selectors = selectors.filter((item, i, array) => array.indexOf(item) == i);
   }


   let i, el, len, selector, found = [];
   let aid = setInterval(() => {
      // Multiple
      if(isMultiple){

         for(i = 0, len = selectors.length; i < len; i++){
            selector = selectors[i];
            
            el = document.querySelector(selector);
            if(el && found.indexOf(selector) == -1){

               // Race complete
               if(race){
                  clearInterval(aid);
                  cb(el);
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


   function stop(){
      clearInterval(aid);
   }

   return { stop }
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
