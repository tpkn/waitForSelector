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
      interval = 50,
      timeout = 0,
      race = false,
   } = options;

   // Filter clones from the list
   if(isMultiple){
      selectors = selectors.filter((item, i, array) => array.indexOf(item) == i);
   }


   let i, el, len, selector, found = [];

   // Waiting timeout
   let tid;
   if(timeout){
      tid = setTimeout(callback, timeout);
   }

   // Checking
   let aid = setInterval(() => {
      // Multiple
      if(isMultiple){

         for(i = 0, len = selectors.length; i < len; i++){
            selector = selectors[i];
            
            el = document.querySelector(selector);
            if(el && found.indexOf(selector) == -1){

               // Race complete
               if(race){
                  callback(el);
                  break;
               }

               found.push(selector);
            }

            if(found.length == selectors.length){
               callback(selectors);
               break;
            }
         }

      // Single
      }else{
         el = document.querySelector(selectors);
         if(el){
            callback(el);
         }
      }
   }, interval);


   // Private callback wrapper
   function callback(e){
      stop();
      cb(e);
   }

   function stop(){
      clearTimeout(tid);
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
