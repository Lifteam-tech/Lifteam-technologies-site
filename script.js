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
  grid.innerHTML=list.map(c=>`<article class="course-card"><span class="cat">${c.label}</span><h3>${c.title}</h3><p>${c.desc}</p><a href="formation.html?course=${encodeURIComponent(c.title)}">Voir la formation →</a></article>`).join("");
  empty.hidden=list.length!==0;
}
document.querySelectorAll(".filter").forEach(btn=>btn.addEventListener("click",()=>{document.querySelectorAll(".filter").forEach(b=>b.classList.remove("active"));btn.classList.add("active");active=btn.dataset.filter;renderCourses()}));
search.addEventListener("input",renderCourses);
renderCourses();

document.querySelector("#serviceGrid").innerHTML=services.map(([n,t,d])=>`<article class="service-card"><span class="num">${n}</span><h3>${t}</h3><p>${d}</p></article>`).join("");

const menu=document.querySelector(".menu-btn"), nav=document.querySelector(".desktop-nav");
menu.addEventListener("click",()=>{const open=menu.getAttribute("aria-expanded")==="true";menu.setAttribute("aria-expanded",String(!open));nav.style.display=open?"none":"flex";nav.style.position="absolute";nav.style.top="72px";nav.style.left="0";nav.style.right="0";nav.style.padding="18px 6%";nav.style.background="#fff";nav.style.flexDirection="column";nav.style.alignItems="flex-start";});

// V4 service catalog and dynamic detail page
const agencyServices=[
{id:'strategie',n:'01',title:'Stratégie digitale',problem:'Votre communication existe, mais manque de direction, de cohérence ou de priorité.',solution:'Nous construisons une feuille de route alignée sur votre positionnement, vos offres, votre audience et vos objectifs.',deliverables:['Audit de présence digitale','Positionnement et messages clés','Plan de contenu','Calendrier d’actions','Indicateurs de suivi'],benefit:'Une direction claire pour investir votre temps et votre budget là où cela compte.'},
{id:'community',n:'02',title:'Community Management',problem:'Vos réseaux sont irréguliers, peu animés ou ne reflètent pas votre niveau professionnel.',solution:'Nous organisons votre présence sociale avec une ligne éditoriale, des contenus et une routine de publication cohérente.',deliverables:['Ligne éditoriale','Calendrier de publication','Création et programmation','Animation et modération','Reporting'],benefit:'Une présence plus régulière, plus professionnelle et plus utile à votre communauté.'},
{id:'contenu',n:'03',title:'Création de contenu',problem:'Vous manquez de temps ou d’idées pour produire du contenu qui explique et vend.',solution:'Nous transformons vos offres, actualités et expertises en contenus adaptés aux plateformes.',deliverables:['Posts et carrousels','Scripts vidéo','Contenus éducatifs','Contenus commerciaux','Déclinaisons multi-formats'],benefit:'Un système de contenu capable d’alimenter votre visibilité sans improvisation permanente.'},
{id:'publicite',n:'04',title:'Publicité digitale',problem:'Vous dépensez en publicité sans savoir précisément ce qui fonctionne.',solution:'Nous structurons les campagnes autour d’un objectif, d’une audience, d’une création et d’un suivi.',deliverables:['Objectif et ciblage','Créatifs publicitaires','Structure de campagne','Suivi des performances','Optimisations'],benefit:'Des campagnes plus lisibles et une meilleure capacité à apprendre de vos données.'},
{id:'design',n:'05',title:'Design graphique & identité visuelle',problem:'Votre marque manque de cohérence visuelle ou vos supports ne donnent pas une image suffisamment professionnelle.',solution:'Nous créons des systèmes visuels cohérents, reconnaissables et adaptés au digital.',deliverables:['Identité visuelle','Visuels réseaux sociaux','Affiches et flyers','Présentations commerciales','Templates réutilisables'],benefit:'Une image de marque plus forte, plus cohérente et plus facile à décliner.'},
{id:'video',n:'06',title:'Production vidéo',problem:'Votre activité mérite d’être montrée, mais vous ne disposez pas d’un contenu vidéo structuré.',solution:'Nous concevons des vidéos pensées pour informer, valoriser une offre ou attirer l’attention sur les réseaux.',deliverables:['Concept et script','Captation selon projet','Montage','Motion design','Formats sociaux'],benefit:'Des vidéos qui rendent votre marque plus visible et plus mémorable.'},
{id:'web',n:'07',title:'Création de sites Web',problem:'Votre entreprise n’a pas de vitrine digitale claire ou votre site ne transforme pas assez bien les visiteurs.',solution:'Nous concevons des sites rapides, responsives, structurés pour présenter votre activité et guider vers l’action.',deliverables:['Architecture de pages','Design responsive','Intégration Web','SEO de base','Mise en ligne et maintenance selon projet'],benefit:'Une présence Web professionnelle qui peut servir de point central à votre communication.'},
{id:'ia',n:'08',title:'Automatisation & IA',problem:'Des tâches répétitives prennent du temps et votre équipe utilise encore trop de processus manuels.',solution:'Nous identifions les tâches adaptées à l’IA et concevons des workflows simples, documentés et réutilisables.',deliverables:['Audit des tâches','Prompts et assistants','Workflows IA','Automatisations selon outils','Documentation et transfert'],benefit:'Moins de répétition, plus de structure et une meilleure utilisation des outils IA.'}
];
function serviceCard(s){return `<article class="service-card"><span class="num">${s.n}</span><h3>${s.title}</h3><p>${s.solution}</p><a href="service.html?service=${s.id}">Voir la solution →</a></article>`}
const sg=document.querySelector('#serviceGrid'); if(sg) sg.innerHTML=agencyServices.map(serviceCard).join('');
const asg=document.querySelector('#agencyServices'); if(asg) asg.innerHTML=agencyServices.map(serviceCard).join('');
const servicePage=document.querySelector('#servicePage');
if(servicePage){const key=new URLSearchParams(location.search).get('service')||'strategie';const s=agencyServices.find(x=>x.id===key)||agencyServices[0];document.title=s.title+' | Lifteam & Technologies';servicePage.innerHTML=`<section class="inner-hero compact"><p class="eyebrow">AGENCE DIGITALE • ${s.n}</p><h1>${s.title}</h1><p>${s.solution}</p><div class="actions"><a class="btn btn-gold" href="index.html#contact">Demander un devis →</a><a class="btn btn-outline" href="agence.html">Voir tous les services</a></div></section><section class="section service-detail"><div class="detail-columns"><div><p class="eyebrow dark">LE PROBLÈME</p><h2>${s.problem}</h2><p class="detail-lead">La solution Lifteam : ${s.solution}</p></div><aside class="service-result"><span>RÉSULTAT RECHERCHÉ</span><strong>${s.benefit}</strong></aside></div><div class="detail-deliverables"><h2>Ce que nous réalisons</h2><div class="deliverable-grid">${s.deliverables.map((x,i)=>`<div><span>0${i+1}</span><strong>${x}</strong></div>`).join('')}</div></div><div class="service-cta"><h2>Construisons votre prochaine étape.</h2><p>Parlez-nous de votre activité, de votre objectif et de vos contraintes. Nous pourrons cadrer la mission et les livrables adaptés.</p><a class="btn btn-gold" href="index.html#contact">Demander un devis →</a></div></section>`}
