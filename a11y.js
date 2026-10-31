/* accessibility widget — preferences are saved only in this browser */
(function(){
  const root=document.documentElement,KEY='mb-a11y';
  let s={size:100,contrast:false,links:false,font:false,still:false};
  try{Object.assign(s,JSON.parse(localStorage.getItem(KEY)||'{}'))}catch(e){}
  const save=()=>{try{localStorage.setItem(KEY,JSON.stringify(s))}catch(e){}};
  function apply(){
    root.style.fontSize=s.size===100?'':s.size+'%';
    ['contrast','links','font','still'].forEach(k=>root.classList.toggle('a11y-'+k,s[k]));
    document.querySelectorAll('[data-a11y]').forEach(b=>b.setAttribute('aria-pressed',!!s[b.dataset.a11y]));
  }
  apply();
  document.addEventListener('DOMContentLoaded',()=>{
    const btn=document.createElement('button');
    btn.className='a11y-btn';btn.setAttribute('aria-label','תפריט נגישות');btn.setAttribute('aria-expanded','false');btn.setAttribute('aria-controls','a11yPanel');
    btn.innerHTML='<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><circle cx="12" cy="4" r="2"/><path d="M4 7.5l8 1.5 8-1.5.4 2-6.4 1.3V14l2.5 7-1.9.7L12 15.5 9.4 21.7l-1.9-.7L10 14v-3.2L3.6 9.5z"/></svg>';
    const p=document.createElement('div');
    p.className='a11y-panel';p.id='a11yPanel';p.setAttribute('role','dialog');p.setAttribute('aria-label','הגדרות נגישות');
    p.innerHTML=`<h2>הגדרות נגישות</h2>
      <div class="row"><button data-act="up">הגדלת טקסט +</button><button data-act="down">הקטנת טקסט −</button></div>
      <div class="row"><button data-a11y="contrast">ניגודיות גבוהה</button><button data-a11y="links">הדגשת קישורים</button></div>
      <div class="row"><button data-a11y="font">גופן קריא</button><button data-a11y="still">עצירת אנימציות</button></div>
      <div class="row"><button data-act="reset">איפוס</button></div>
      <a href="accessibility.html">הצהרת נגישות</a>`;
    document.body.append(btn,p);
    btn.onclick=()=>{const o=p.classList.toggle('open');btn.setAttribute('aria-expanded',o);if(o)p.querySelector('button').focus()};
    document.addEventListener('keydown',e=>{if(e.key==='Escape'&&p.classList.contains('open')){p.classList.remove('open');btn.setAttribute('aria-expanded','false');btn.focus()}});
    p.addEventListener('click',e=>{const b=e.target.closest('button');if(!b)return;
      if(b.dataset.a11y)s[b.dataset.a11y]=!s[b.dataset.a11y];
      if(b.dataset.act==='up')s.size=Math.min(150,s.size+10);
      if(b.dataset.act==='down')s.size=Math.max(80,s.size-10);
      if(b.dataset.act==='reset')s={size:100,contrast:false,links:false,font:false,still:false};
      apply();save();});
    apply();
  });
})();
