const services = [
  {id:1,name:"Business Website",category:"website",price:150000,desc:"Responsive business website with SEO",img:"https://picsum.photos/seed/web/400/300"},
  {id:2,name:"Phone Repair",category:"repair",price:8000,desc:"Screen, battery, charging port repair",img:"https://picsum.photos/seed/phone/400/300"},
  {id:3,name:"Laptop Formatting",category:"repair",price:12000,desc:"Windows install, data backup, drivers",img:"https://picsum.photos/seed/laptop/400/300"},
  {id:4,name:"Social Media Management",category:"social",price:50000,desc:"Content creation + growth for SMEs",img:"https://picsum.photos/seed/social/400/300"},
  {id:5,name:"E-commerce Store",category:"website",price:250000,desc:"Online store with payment integration",img:"https://picsum.photos/seed/ecom/400/300"},
  {id:6,name:"Network Reset & Setup",category:"repair",price:5000,desc:"WiFi, router, internet troubleshooting",img:"https://picsum.photos/seed/net/400/300"}
];
function getCurrency(){
  const saved = localStorage.getItem("elddyCurrency");
  if(saved){return saved;}
  const lang = navigator.language || "en-NG";
  if(lang.includes("en-GH")){return "GHS";}
  if(lang.includes("zh")){return "CNY";}
  return "NGN";
}
function formatPrice(amount,currency){
  if(currency==="GHS"){const rate=0.095;return `GHS ${(amount*rate).toFixed(0)}`;}
  if(currency==="CNY"){const rate=0.05;return `¥${(amount*rate).toFixed(0)}`;}
  return `₦${amount.toLocaleString()}`;
}
function displayServices(list){
  const container = document.getElementById("serviceGrid");
  if(!container){return;}
  const currency = getCurrency();
  container.innerHTML = "";
  const htmlArray = list.map(item=>{
    return `<div class="card"><img src="${item.img}" alt="${item.name}" loading="lazy"><h3>${item.name}</h3><p>${item.desc}</p><p><strong>${formatPrice(item.price,currency)}</strong> | ${item.category}</p><button class="btn" onclick="saveFavorite(${item.id})">Save</button></div>`;
  });
  container.innerHTML = htmlArray.join("");
}
function filterServices(category){
  let filtered = services;
  if(category!=="all"){filtered = services.filter(s=>s.category===category);}
  displayServices(filtered);
  const buttons = document.querySelectorAll(".filter-bar button");
  buttons.forEach(btn=>{
    if(btn.dataset.cat===category){btn.classList.add("active");}else{btn.classList.remove("active");}
  });
  localStorage.setItem("elddyLastFilter",category);
}
function saveFavorite(id){
  let favs = JSON.parse(localStorage.getItem("elddyFavs"))||[];
  if(!favs.includes(id)){favs.push(id);localStorage.setItem("elddyFavs",JSON.stringify(favs));alert(`Service ${id} saved! You have ${favs.length} saved services.`);}else{alert(`Service ${id} already saved.`);}
  updateFavCount();
}
function updateFavCount(){
  const favs = JSON.parse(localStorage.getItem("elddyFavs"))||[];
  const el = document.getElementById("favCount");
  if(el){el.textContent=`${favs.length}`;}
}
function handleFormSubmit(e){
  e.preventDefault();
  const name = document.getElementById("cName").value.trim();
  const email = document.getElementById("cEmail").value.trim();
  const service = document.getElementById("cService").value;
  if(name.length<2){alert(`Please enter a valid name`);return;}
  const data = {name,email,service,date:new Date().toISOString()};
  localStorage.setItem("elddyLastContact",JSON.stringify(data));
  document.getElementById("formMessage").textContent=`Thanks ${name}! We received your request for ${service}. We will email ${email} within 24 hours.`;
  e.target.reset();
}
function init(){
  const currency = getCurrency();
  localStorage.setItem("elddyCurrency",currency);
  const curEl = document.getElementById("currencyDisplay");
  if(curEl){curEl.textContent=`Currency: ${currency}`;}
  const lastFilter = localStorage.getItem("elddyLastFilter")||"all";
  const initialList = lastFilter==="all"?services:services.filter(s=>s.category===lastFilter);
  displayServices(initialList);
  const menuBtn = document.getElementById("menuBtn");
  const navUl = document.querySelector("nav ul");
  if(menuBtn){menuBtn.addEventListener("click",()=>{navUl.classList.toggle("open");});}
  const form = document.getElementById("contactForm");
  if(form){form.addEventListener("submit",handleFormSubmit);}
  updateFavCount();
  const year = new Date().getFullYear();
  const yEl = document.getElementById("currentYear");
  if(yEl){yEl.textContent=`${year}`;}
  const modEl = document.getElementById("lastModified");
  if(modEl){modEl.textContent=`${document.lastModified}`;}
}
document.addEventListener("DOMContentLoaded",init);
