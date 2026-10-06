import {initializeApp} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import * as A from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import * as S from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";
import * as T from "https://www.gstatic.com/firebasejs/10.12.2/firebase-storage.js";
import {firebaseConfig,ADMINS,PAYSTACK_PUBLIC_KEY} from "./config.js";
import {DEFAULT_FOODS,DEFAULT_DECOR} from "./data.js";
export const app=initializeApp(firebaseConfig),auth=A.getAuth(app),db=S.getFirestore(app),store=T.getStorage(app);
export {A,S,T,ADMINS,PAYSTACK_PUBLIC_KEY,DEFAULT_FOODS,DEFAULT_DECOR};
export const $=i=>document.getElementById(i);
export function h(t,p={},...k){const e=document.createElement(t);for(const n in p){if(n=="on")for(const v in p.on)e.addEventListener(v,p.on[v]);else if(n=="text")e.textContent=p[n];else if(n=="cls")e.className=p[n];else e[n]=p[n]}k.flat().forEach(c=>{if(c!=null)e.append(c)});return e}
export const money=n=>n?"\u20A6"+Number(n).toLocaleString("en-NG"):"Price not set";
export function toast(m){let t=$("toast");if(!t){t=h("div",{id:"toast"});document.body.append(t)}t.textContent=m;t.className="on";setTimeout(()=>t.className="",3000)}
export const cart={get(){try{return JSON.parse(localStorage.cart||"{}")}catch(e){return{}}},set(c){localStorage.cart=JSON.stringify(c)},dec:()=>localStorage.dec||"",setDec(v){localStorage.dec=v}};
export async function getAll(n,defs){try{const s=await S.getDocs(S.collection(db,n));const a=s.docs.map(d=>({id:d.id,...d.data()}));return a.length?a:defs}catch(e){return defs}}
export async function getSettings(){try{const s=await S.getDoc(S.doc(db,"settings","main"));return s.exists()?s.data():{}}catch(e){return{}}}
export function lines(foods){const c=cart.get(),fm={};foods.forEach(f=>fm[f.id]=f);const o=[];for(const k in c){const [id,u]=k.split("|"),f=fm[id];if(!f||f.hidden)continue;const price=+(u=="Bag"?f.bag:f.congo)||0;o.push({key:k,id,name:f.name,unit:u,qty:c[k],price,total:price*c[k]})}return o}
export function slider(ph,fb){const w=h("div",{cls:"sl"});ph=ph||[];if(!ph.length){w.append(h("div",{cls:"fb",text:fb||"\uD83C\uDF72"}));return w}
let i=0;const im=ph.map((u,k)=>h("img",{src:u,alt:"",cls:k?"":"on"}));w.append(...im);if(ph.length>1){const go=d=>{im[i].className="";i=(i+d+im.length)%im.length;im[i].className="on"};w.append(h("button",{cls:"ar p",type:"button",text:"\u2039",on:{click:()=>go(-1)}}),h("button",{cls:"ar n",type:"button",text:"\u203A",on:{click:()=>go(1)}}));setInterval(()=>go(1),3800)}return w}
export function shell(cfg){const b=cfg.brand||"At-Tawakkul";document.title=b+" | Food & Catering";const n=Object.keys(cart.get()).length;
const lg=h("a",{cls:"logo",href:"index.html",text:b.toUpperCase()});let t=0,tm;lg.addEventListener("click",e=>{t++;clearTimeout(tm);tm=setTimeout(()=>t=0,1500);if(t>=5){e.preventDefault();location.href="admin.html"}});
$("nav").append(h("div",{cls:"w nb"},lg,h("div",{cls:"nv"},h("a",{href:"index.html",text:"Home"}),h("a",{href:"menu.html",text:"Menu"}),h("a",{cls:"btn s",href:"checkout.html",text:"Checkout ("+n+")"}))));
$("foot").append(h("div",{cls:"w"},h("b",{text:b}),` \u00B7 ${cfg.tagline||"Food & Catering \u00B7 Event Planning"}`,h("br"),cfg.phone?`Call: ${cfg.phone} `:"",cfg.wa?h("a",{href:"https://wa.me/"+cfg.wa,text:"WhatsApp us",target:"_blank"}):null))}
export function authBox(el,cb){A.onAuthStateChanged(auth,u=>{el.innerHTML="";if(u){cb(u);return}cb(null);let mode="in";const box=h("div",{cls:"card"});el.append(box);draw();
function draw(){box.innerHTML="";box.append(h("h3",{text:mode=="in"?"Sign in":"Create your account"}),h("button",{cls:"btn",type:"button",text:"Continue with Google",on:{click:google}}),h("p",{cls:"mut",text:"or use your email"}));
const nm=mode=="up"?h("input",{placeholder:"Your name"}):null,em=h("input",{type:"email",placeholder:"Email"}),pw=h("input",{type:"password",placeholder:"Password (6+ characters)"});
box.append(...[nm,em,pw].filter(Boolean),h("button",{cls:"btn o",type:"button",text:mode=="in"?"Sign in":"Sign up",on:{click:async()=>{try{if(mode=="in")await A.signInWithEmailAndPassword(auth,em.value,pw.value);else{const c=await A.createUserWithEmailAndPassword(auth,em.value,pw.value);await A.updateProfile(c.user,{displayName:nm.value})}}catch(e){toast(e.message.replace("Firebase: ",""))}}}}),
h("a",{href:"#",text:mode=="in"?"New here? Create an account":"Have an account? Sign in",on:{click:e=>{e.preventDefault();mode=mode=="in"?"up":"in";draw()}}}))}
async function google(){try{await A.signInWithPopup(auth,new A.GoogleAuthProvider())}catch(e){toast(e.message.replace("Firebase: ",""))}}})}
