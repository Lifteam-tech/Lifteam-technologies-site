const courses=[
{cat:"marketing",label:"MARKETING",title:"Marketing Digital : de Débutant à Professionnel",desc:"Construisez une stratégie digitale, développez votre audience et transformez votre présence en opportunités."},
{cat:"marketing",label:"MARKETING",title:"Community Management & Réseaux Sociaux",desc:"Apprenez à gérer, animer et développer une présence professionnelle sur les réseaux sociaux."},
{cat:"marketing",label:"MARKETING",title:"Facebook Ads : de Débutant à Expert",desc:"Découvrez les fondamentaux de la publicité Meta et la logique d'une campagne structurée."},
{cat:"tech",label:"INFORMATIQUE & WEB",title:"Informatique & Bureautique Professionnelle",desc:"Maîtrisez les outils numériques essentiels à la productivité professionnelle."},
{cat:"tech",label:"INFORMATIQUE & WEB",title:"Programmation & Développement Web",desc:"Apprenez les bases du développement avec HTML, CSS, JavaScript, PHP, Python et MySQL."},
{cat:"tech",label:"INFORMATIQUE & WEB",title:"Création de Sites Web avec l'IA",desc:"Utilisez l'IA pour concevoir, personnaliser et publier un site Web moderne."},
{cat:"ia",label:"IA & AUTOMATISATION",title:"Intelligence Artificielle : Fondamentaux & Applications",desc:"Comprenez l'IA générative et exploitez ses usages professionnels."},
{cat:"ia",label:"IA & AUTOMATISATION",title:"Automatisation Professionnelle avec ChatGPT",desc:"Créez des prompts, workflows et systèmes pour gagner du temps."},
{cat:"ia",label:"IA & AUTOMATISATION",title:"Prompt Engineering",desc:"Apprenez à formuler des instructions efficaces pour obtenir de meilleurs résultats avec l'IA."},
{cat:"gestion",label:"GESTION",title:"QuickBooks Online : Comptabilité Numérique",desc:"Développez votre autonomie avec un outil de gestion comptable en ligne."},
{cat:"gestion",label:"GESTION",title:"Gestion des Projets",desc:"Structurez, planifiez et suivez vos projets avec une approche pratique."},
{cat:"gestion",label:"GESTION",title:"Logistique & Gestion des Stocks",desc:"Maîtrisez les principes de suivi, organisation et optimisation des stocks."},
{cat:"business",label:"BUSINESS",title:"Créer et Développer son Business en Ligne",desc:"Transformez une idée ou une compétence en projet entrepreneurial."},
{cat:"business",label:"BUSINESS",title:"E-commerce & Dropshipping",desc:"Comprenez le modèle e-commerce et les étapes de lancement d'une activité en ligne."},
{cat:"business",label:"BUSINESS",title:"Créer et Vendre son Cours en Ligne",desc:"Transformez votre expertise en formation structurée et commercialisable."},
{cat:"finance",label:"FINANCE",title:"Trading pour Débutants",desc:"Comprenez les marchés, les graphiques et la gestion du risque dans une approche éducative."},
{cat:"finance",label:"FINANCE",title:"Cryptomonnaies : Investissement & Trading",desc:"Découvrez les notions essentielles liées aux actifs numériques et aux risques."},
{cat:"finance",label:"FINANCE",title:"Investissement en Bourse",desc:"Développez une culture financière et comprenez les principes de base de l'investissement."},
{cat:"langues",label:"LANGUES",title:"English for Success — EFS",desc:"Développez votre aisance en anglais à travers des exercices et conversations pratiques."},
{cat:"langues",label:"LANGUES",title:"Anglais Professionnel",desc:"Renforcez votre vocabulaire et votre communication dans les situations professionnelles."},
{cat:"btp",label:"BTP",title:"Architecture & Conception",desc:"Développez des bases utiles en conception et outils numériques appliqués."},
{cat:"btp",label:"BTP",title:"Bâtiment & Travaux Publics",desc:"Renforcez vos connaissances pratiques dans les métiers du bâtiment et des travaux publics."}
];

const services=[
["01","Stratégie digitale","Positionnement, stratégie de contenu et plan d'action pour une présence cohérente."],
["02","Community Management","Animation, gestion et développement de communautés."],
["03","Création graphique","Identité visuelle, campagnes et supports publicitaires."],
["04","Production vidéo","Vidéo, montage, motion design et contenus sociaux."],
["05","Publicité digitale","Campagnes orientées visibilité, prospects et conversion."],
["06","Création de sites Web","Sites vitrines et solutions Web adaptées à vos objectifs."],
["07","IA & Automatisation","Workflows, assistants IA et automatisation de tâches répétitives."],
["08","Création de contenu","Contenus éducatifs, commerciaux et sociaux pensés pour votre marque."]
];

const grid=document.querySelector("#courseGrid");
const empty=document.querySelector("#emptyState");
const search=document.querySelector("#search");
let active="all";

function renderCourses(){
  const q=(search.value||"").toLowerCase().trim();
  const list=courses.filter(c=>(active==="all"||c.cat===active)&&`${c.title} ${c.desc} ${c.label}`.toLowerCase().includes(q));
  grid.innerHTML=list.map(c=>`<article class="course-card"><span class="cat">${c.label}</span><h3>${c.title}</h3><p>${c.desc}</p><a href="https://wa.me/50938700825?text=${encodeURIComponent("Bonjour Lifteam, je souhaite recevoir les détails de la formation : "+c.title)}" target="_blank" rel="noopener">Demander les détails →</a></article>`).join("");
  empty.hidden=list.length!==0;
}
document.querySelectorAll(".filter").forEach(btn=>btn.addEventListener("click",()=>{document.querySelectorAll(".filter").forEach(b=>b.classList.remove("active"));btn.classList.add("active");active=btn.dataset.filter;renderCourses()}));
search.addEventListener("input",renderCourses);
renderCourses();

document.querySelector("#serviceGrid").innerHTML=services.map(([n,t,d])=>`<article class="service-card"><span class="num">${n}</span><h3>${t}</h3><p>${d}</p></article>`).join("");

const menu=document.querySelector(".menu-btn"), nav=document.querySelector(".desktop-nav");
menu.addEventListener("click",()=>{const open=menu.getAttribute("aria-expanded")==="true";menu.setAttribute("aria-expanded",String(!open));nav.style.display=open?"none":"flex";nav.style.position="absolute";nav.style.top="72px";nav.style.left="0";nav.style.right="0";nav.style.padding="18px 6%";nav.style.background="#fff";nav.style.flexDirection="column";nav.style.alignItems="flex-start";});
