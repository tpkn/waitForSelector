/*! waitForSelector, http://tpkn.me */
function waitForSelector(selectors, cb, options = {}){
   let isMultiple = Array.isArray(selectors);

   if(typeof window.MutationObserver !== 'function'){
      throw new Error('Your browser does not support MutationObserver');
   }

   if(!isMultiple && typeof selectors !== 'string'){
      throw new TypeError('First argument must be a String or an Array!');
   }

   if(typeof cb !== 'function'){
      throw new Error('Missing callback function!');
   }


   // Filtering clones from the selectors list
   if(isMultiple){
      selectors = selectors.filter((item, i, array) => array.indexOf(item) == i);
   }

   let tid, selector, found = [];
   let { target = document.body, timeout = 0, race = false } = options;

   let observer = new MutationObserver(e => {
      for(let mutation of e){
         if(mutation.addedNodes.length){
            CheckDOM();
         }
      }
   });

   observer.observe(target, { childList: true, subtree: true });

   // Initial check
   CheckDOM();


   // Waiting timeout
   if(timeout){
      tid = setTimeout(callback, timeout);
   }

  
   function CheckDOM(){
      if(isMultiple){

         for(let i = 0, len = selectors.length; i < len; i++){
            selector = selectors[i];
            
            let el = document.querySelector(selector);
            if(el && found.indexOf(selector) == -1){

               // Race completed
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
      }else{
         el = document.querySelector(selectors);
         if(el){
            callback(el);
         }
      }
   }

   function callback(e){
      stop();
      cb(e);
   }

   function stop(){
      clearTimeout(tid);
      observer.disconnect();
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
