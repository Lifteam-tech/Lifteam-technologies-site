const menu=document.querySelector('.menu');
menu?.addEventListener('click',()=>{
  const open=document.body.classList.toggle('open');
  menu.setAttribute('aria-expanded',open?'true':'false');
});
document.querySelectorAll('.navlinks a').forEach(a=>a.addEventListener('click',()=>document.body.classList.remove('open')));

const cards=[...document.querySelectorAll('.course-card')];
const search=document.getElementById('courseSearch');
const chips=[...document.querySelectorAll('.chip')];
const noResults=document.getElementById('noResults');
let activeCat='all';

function filterCourses(){
  const q=(search.value||'').toLowerCase().trim();
  let shown=0;
  cards.forEach(card=>{
    const cat=card.dataset.cat;
    const title=card.dataset.title.toLowerCase();
    const okCat=activeCat==='all'||cat===activeCat;
    const okText=!q||title.includes(q);
    card.style.display=okCat&&okText?'block':'none';
    if(okCat&&okText) shown++;
  });
  noResults.hidden=shown!==0;
}
chips.forEach(chip=>chip.addEventListener('click',()=>{
  chips.forEach(c=>c.classList.remove('active'));
  chip.classList.add('active');
  activeCat=chip.dataset.cat;
  filterCourses();
}));
search?.addEventListener('input',filterCourses);
filterCourses();
