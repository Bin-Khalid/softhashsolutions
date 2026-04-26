/* ============================================================
   SERVICES SLIDER  —  services.js
   <script src="./services.js"></script> before </body>
   ============================================================ */
(function(){
  var track   = document.getElementById('sTrack');
  var prev    = document.getElementById('sPrev');
  var next    = document.getElementById('sNext');
  var dotsEl  = document.getElementById('sDots');
  if(!track) return;

  var cards = Array.from(track.children);
  var total = cards.length;
  var idx   = 0;

  function visible(){
    if(window.innerWidth <= 540) return 1;
    if(window.innerWidth <= 900) return 2;
    return 4;
  }

  function step(){ return cards[0].offsetWidth + 20; }

  function buildDots(){
    dotsEl.innerHTML = '';
    var n = Math.max(1, total - visible() + 1);
    for(var i=0;i<n;i++){
      (function(i){
        var d = document.createElement('button');
        d.className = 'srv-dot';
        d.addEventListener('click', function(){ go(i); });
        dotsEl.appendChild(d);
      })(i);
    }
    markDot();
  }

  function markDot(){
    dotsEl.querySelectorAll('.srv-dot').forEach(function(d,i){ d.classList.toggle('on', i===idx); });
  }

  function go(n){
    var max = Math.max(0, total - visible());
    idx = Math.max(0, Math.min(n, max));
    track.style.transform = 'translateX(-'+(idx*step())+'px)';
    prev.disabled = idx===0;
    next.disabled = idx>=max;
    markDot();
  }

  prev.addEventListener('click', function(){ go(idx-1); });
  next.addEventListener('click', function(){ go(idx+1); });

  var tx=0;
  track.addEventListener('touchstart',function(e){tx=e.changedTouches[0].screenX;},{passive:true});
  track.addEventListener('touchend',function(e){
    var d=tx-e.changedTouches[0].screenX;
    if(Math.abs(d)>40) go(d>0?idx+1:idx-1);
  },{passive:true});

  var rt;
  window.addEventListener('resize',function(){
    clearTimeout(rt);
    rt=setTimeout(function(){ buildDots(); go(Math.min(idx,Math.max(0,total-visible()))); },150);
  });

  buildDots(); go(0);
})();
