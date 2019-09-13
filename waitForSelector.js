/*! waitForSelector, http://tpkn.me */
function waitForSelector(selectors, cb, options){
   var isMultiple = Array.isArray(selectors);

   if(!isMultiple && typeof selectors !== 'string'){
      throw new TypeError('First argument must be a String or an Array!');
   }

   if(typeof cb !== 'function'){
      throw new Error('Missing callback function!');
   }

   var i, el, len, selector;
   options = options || {};

   var found = [];
   var delay = 50;
   var race = false;

   if(typeof options.delay === 'number'){
   	delay = options.delay;
   }
   if(typeof options.race  === 'undefined' ){
   	delay = options.race;
   }

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

   return { stop: stop }
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
