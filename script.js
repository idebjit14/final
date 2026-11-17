const $=id=>document.getElementById(id);
const eventStart=new Date("2027-01-25T10:00:00+05:30").getTime();
function tick(){let d=eventStart-Date.now();if(d<0)d=0;$("days").textContent=Math.floor(d/86400000);$("hours").textContent=String(Math.floor(d%86400000/3600000)).padStart(2,"0");$("minutes").textContent=String(Math.floor(d%3600000/60000)).padStart(2,"0");$("seconds").textContent=String(Math.floor(d%60000/1000)).padStart(2,"0")}
tick();setInterval(tick,1000);
$("calendar-link").href="https://calendar.google.com/calendar/render?action=TEMPLATE&text="+encodeURIComponent("Ashirvad Ceremony - Deepika & Subham")+"&dates=20270125T043000Z/20270125T100000Z&details="+encodeURIComponent("Ashirvad ceremony of Deepika and Subham. 10:00 AM onwards.")+"&location="+encodeURIComponent("Venue: https://maps.app.goo.gl/xbm7Q7ipcZchZLzYA?g_st=ac");
const rsvpUrl="https://wa.me/918670232181?text="+encodeURIComponent("Hello! I would like to confirm my attendance for Deepika & Subham's Ashirvad ceremony on 25 January 2027, 10:00 AM onwards.");
$("rsvp-link").href=rsvpUrl;
let count=Number(localStorage.getItem("ds_rsvp_clicks")||0);$("rsvp-count").textContent=count;
$("rsvp-link").addEventListener("click",()=>{count++;localStorage.setItem("ds_rsvp_clicks",count);$("rsvp-count").textContent=count});
$("share-button").addEventListener("click",()=>{const url=location.href;const msg="You're warmly invited to Deepika & Subham's Ashirvad Ceremony on 25 January 2027 from 10:00 AM onwards. "+url;window.open("https://wa.me/?text="+encodeURIComponent(msg),"_blank")});
// Enter through the palace doors, then show language chooser.
$("enter-site").addEventListener("click",()=>{$("door-screen").classList.add("open");setTimeout(()=>$("language-gate").classList.add("show"),1100);setTimeout(()=>$("door-screen").remove(),2800)});
let lang="en";
function setLanguage(next){lang=next;document.documentElement.lang=next;document.querySelectorAll("[data-en][data-bn]").forEach(el=>{if(el.tagName==="INPUT"||el.tagName==="TEXTAREA"){el.placeholder=el.dataset[next]}else el.textContent=el.dataset[next]});document.body.classList.toggle("lang-bn",next==="bn");$("sound-toggle").lastElementChild.textContent=next==="bn"?(musicOn?"সুর বন্ধ করুন":"সুর চালু করুন"):(musicOn?"Sound on":"Sound off");}
document.querySelectorAll(".lang-choice").forEach(b=>b.addEventListener("click",()=>{$("language-gate").classList.remove("show");setLanguage(b.dataset.lang)}));
const menu=document.querySelector(".menu-toggle"),nav=document.querySelector(".navlinks");menu.addEventListener("click",()=>nav.classList.toggle("open"));nav.querySelectorAll("a").forEach(a=>a.addEventListener("click",()=>nav.classList.remove("open")));
// Local guestbook demo: stored only on the visitor's current browser.
const wishKey="ds_local_wishes";function renderWishes(){let list=JSON.parse(localStorage.getItem(wishKey)||"[]");$("wish-list").innerHTML="";list.slice().reverse().forEach(w=>{let card=document.createElement("article");card.className="wish";let strong=document.createElement("strong");strong.textContent=w.name;let p=document.createElement("p");p.textContent=w.message;card.append(strong,p);$("wish-list").append(card)})}
renderWishes();$("wish-form").addEventListener("submit",e=>{e.preventDefault();let list=JSON.parse(localStorage.getItem(wishKey)||"[]");list.push({name:$("wish-name").value.trim(),message:$("wish-message").value.trim()});localStorage.setItem(wishKey,JSON.stringify(list.slice(-30)));e.target.reset();renderWishes()});
// Floating petals.
for(let i=0;i<24;i++){let p=document.createElement("i");p.className="petal";p.style.left=Math.random()*100+"%";p.style.animationDuration=9+Math.random()*12+"s";p.style.animationDelay=-Math.random()*18+"s";p.style.setProperty("--drift",(Math.random()*140-70)+"px");$("petals").append(p)}
// Optional original instrumental: gentle synthesized melodic arpeggio and drone, not a Bollywood recording.
let audio=null,musicOn=false,musicTimer=null,beat=0;const melody=[0,4,7,9,7,4,2,5],base=523.25;
function note(freq,dur=.8,vol=.025,type="sine",delay=0){if(!audio||!musicOn)return;let t=audio.currentTime+delay,o=audio.createOscillator(),g=audio.createGain();o.type=type;o.frequency.value=freq;g.gain.setValueAtTime(.0001,t);g.gain.exponentialRampToValueAtTime(vol,t+.04);g.gain.exponentialRampToValueAtTime(.0001,t+dur);o.connect(g);g.connect(audio.destination);o.start(t);o.stop(t+dur+.03)}
function phrase(){let n=melody[beat%melody.length];note(base*2**(n/12),1,.026);note(base*2*2**(melody[(beat+2)%8]/12),.65,.009,"triangle",.14);if(beat%4===0){note(130.81,2,.009);note(196,2,.007)}note(beat%2?82.4:110,.12,.013,"triangle",.02);beat++}
$("sound-toggle").addEventListener("click",async()=>{if(!audio)audio=new(window.AudioContext||window.webkitAudioContext)();if(audio.state==="suspended")await audio.resume();musicOn=!musicOn;$("sound-toggle").firstElementChild.textContent=musicOn?"♫":"♪";$("sound-toggle").lastElementChild.textContent=lang==="bn"?(musicOn?"সুর বন্ধ করুন":"সুর চালু করুন"):(musicOn?"Sound on":"Sound off");if(musicOn){phrase();musicTimer=setInterval(phrase,900)}else clearInterval(musicTimer)});
// Fireworks + gold confetti on a tap; limited bursts and reduced-motion friendly.
const canvas=$("celebration-canvas"),ctx=canvas.getContext("2d");let particles=[],raf=0;
function resize(){canvas.width=innerWidth*devicePixelRatio;canvas.height=innerHeight*devicePixelRatio;ctx.setTransform(devicePixelRatio,0,0,devicePixelRatio,0,0)}resize();addEventListener("resize",resize);
function burst(x,y){for(let i=0;i<75;i++){let a=Math.random()*Math.PI*2,s=1+Math.random()*4;particles.push({x,y,vx:Math.cos(a)*s,vy:Math.sin(a)*s,life:70+Math.random()*30,gold:Math.random()>.25,size:1+Math.random()*3})}if(!raf)animate()}
function animate(){ctx.clearRect(0,0,innerWidth,innerHeight);particles=particles.filter(p=>p.life>0);for(let p of particles){p.x+=p.vx;p.y+=p.vy;p.vy+=.035;p.vx*=.99;p.life--;ctx.fillStyle=p.gold?"rgba(232,194,108,"+p.life/100+")":"rgba(218,117,111,"+p.life/100+")";ctx.fillRect(p.x,p.y,p.size,p.size*1.5)}if(particles.length)raf=requestAnimationFrame(animate);else{cancelAnimationFrame(raf);raf=0}}
document.querySelectorAll(".gold-btn").forEach(b=>b.addEventListener("click",e=>{if(b.id!=="enter-site"&&b.classList.contains("lang-choice"))return;let x=e.clientX||innerWidth/2,y=e.clientY||innerHeight/2;burst(x,y)}));
document.querySelectorAll("main section").forEach(el=>el.classList.add("reveal"));if("IntersectionObserver"in window){let io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add("visible");io.unobserve(e.target)}}),{threshold:.12});document.querySelectorAll(".reveal").forEach(el=>io.observe(el))}else document.querySelectorAll(".reveal").forEach(el=>el.classList.add("visible"));

// Personalised downloadable invitation PDF with an independent language choice.
const pdfModal=document.getElementById("pdf-modal");
document.getElementById("download-invite").addEventListener("click",()=>{
 pdfModal.classList.add("open");pdfModal.setAttribute("aria-hidden","false");
 document.getElementById("guest-invite-name").focus();
});
document.getElementById("close-pdf").addEventListener("click",()=>{
 pdfModal.classList.remove("open");pdfModal.setAttribute("aria-hidden","true");
});
pdfModal.addEventListener("click",e=>{if(e.target===pdfModal){pdfModal.classList.remove("open");pdfModal.setAttribute("aria-hidden","true")}});
const guestNameInput=document.getElementById("guest-invite-name");
const guestNameBnInput=document.getElementById("guest-invite-name-bn");
const bnNameHelp=document.getElementById("bn-name-help");
const inviteLangSelect=document.getElementById("invite-language");
// Lightweight offline-friendly phonetic transliteration for common Bengali names.
// The suggested spelling remains editable because personal names can have variant spellings.
function romanToBengali(input){
 const text=input.toLowerCase().trim().replace(/([aeiou])r/g,"$1r");
 const tokens=[
  ["ksh","ক্ষ"],["chh","ছ"],["sh","শ"],["kh","খ"],["gh","ঘ"],["ch","চ"],["jh","ঝ"],["th","থ"],["dh","ধ"],["ph","ফ"],["bh","ভ"],["ng","ং"],["ny","ন্য"],["gy","জ্ঞ"],["tr","ত্র"],["dr","দ্র"],["kr","ক্র"],["gr","গ্র"],["pr","প্র"],["br","ব্র"],["sr","স্র"],
  ["aa","আ"],["ii","ঈ"],["ee","ঈ"],["oo","ঊ"],["ou","ঔ"],["oi","ঐ"],["ai","ঐ"],
  ["a","অ"],["i","ই"],["u","উ"],["e","এ"],["o","ও"],
  ["k","ক"],["g","গ"],["c","ক"],["j","জ"],["t","ত"],["d","দ"],["n","ন"],["p","প"],["b","ব"],["m","ম"],["r","র"],["l","ল"],["s","স"],["h","হ"],["y","য়"],["w","ও"],["v","ভ"],["f","ফ"],["x","ক্স"],["q","ক"]
 ];
 let out="",i=0;
 while(i<text.length){
  if(text[i]===" "){out+=" ";i++;continue;}
  if(!/[a-z]/.test(text[i])){out+=text[i++];continue;}
  let hit=false;
  for(const [latin,bn] of tokens){if(text.startsWith(latin,i)){out+=bn;i+=latin.length;hit=true;break;}}
  if(!hit)i++;
 }
 return out.replace(/অা/g,"আ").replace(/অি/g,"ই").replace(/অু/g,"উ").replace(/অে/g,"এ").replace(/অো/g,"ও");
}
let transliterationRequest=0;
async function updateBengaliName(){
 if(inviteLangSelect.value!=="bn")return;
 const source=guestNameInput.value.trim();
 const request=++transliterationRequest;
 if(!source){guestNameBnInput.value="";return;}
 // Prefer Google's Bengali transliteration suggestions; fall back to local phonetic conversion.
 try{
  const url="https://inputtools.google.com/request?text="+encodeURIComponent(source)+"&itc=bn-t-i0-und&num=1&cp=0&cs=1&ie=utf-8&oe=utf-8";
  const response=await fetch(url);
  const data=await response.json();
  const suggestion=data?.[1]?.[0]?.[1]?.[0];
  if(request===transliterationRequest&&suggestion)guestNameBnInput.value=suggestion;
  else if(request===transliterationRequest)guestNameBnInput.value=romanToBengali(source);
 }catch(error){
  if(request===transliterationRequest)guestNameBnInput.value=romanToBengali(source);
 }
}
guestNameInput.addEventListener("input",updateBengaliName);
inviteLangSelect.addEventListener("change",()=>{
 const isBn=inviteLangSelect.value==="bn";
 guestNameBnInput.style.display=isBn?"":"none";
 bnNameHelp.style.display=isBn?"":"none";
 if(isBn){updateBengaliName();guestNameInput.placeholder="Type guest name in English";guestNameInput.focus();}
 else {guestNameInput.placeholder="Your name";guestNameBnInput.value="";}
});
document.getElementById("make-pdf").addEventListener("click",()=>{
 const bengali=inviteLangSelect.value==="bn";
 const rawName=(bengali?guestNameBnInput.value:guestNameInput.value).trim();
 if(!guestNameInput.value.trim()||!rawName){guestNameInput.focus();return;}
 const button=document.getElementById("make-pdf");
 const printWin=window.open("","_blank");
 if(!printWin){alert("Please allow pop-ups for this website, then try again.");return;}
 const guestName=bengali?rawName:rawName.toLowerCase().replace(/(^|[\s'-])([a-z])/g,(_,sep,ch)=>sep+ch.toUpperCase());
 const safeName=escapePdfText(guestName);
 const t=bengali?{
  invite:"সাদর আমন্ত্রণ",kind:"শুভ আশীর্বাদ অনুষ্ঠান",dear:"প্রিয়",message:"আমাদের জীবনের এই শুভ সূচনায় আপনাকে সপরিবারে উপস্থিত থাকার এবং আমাদের আশীর্বাদ করার জন্য আন্তরিক আমন্ত্রণ জানাই। আপনার উপস্থিতি ও আশীর্বাদ আমাদের আনন্দকে পূর্ণতা দেবে।",
  date:"২৫ জানুয়ারি ২০২৭ · সোমবার",time:"সকাল ১০টা থেকে",venue:"অনুষ্ঠানস্থল ও যাতায়াত",map:"Google Maps-এ অনুষ্ঠানের স্থান দেখুন",brideFamily:"কনের পরিবার",groomFamily:"বরের পরিবার",brideParents:"ভবান চন্দ্র সরকার ও রীনা সরকার",groomParents:"সুবীর সেন ও সুচিতা সেন",brother:"কনের ভাই",brotherName:"দেবজিত সরকার",marriage:"বিবাহের তারিখ শীঘ্রই জানানো হবে",regards:"সস্নেহে ও সশ্রদ্ধায়",families:"সরকার ও সেন পরিবার",blessing:"আপনাদের আশীর্বাদ কাম্য",bride:"দীপিকা",groom:"শুভম",cover:"একটি শুভ সূচনার আনন্দে"
 }:{
  invite:"YOU ARE CORDIALLY INVITED",kind:"ASHIRVAD CEREMONY",dear:"Dear",message:"With the blessings of our families, we warmly invite you and your family to join us for this auspicious Ashirvad ceremony. Your presence and blessings will make this occasion truly special.",
  date:"Monday, 25 January 2027",time:"10:00 AM onwards",venue:"VENUE & DIRECTIONS",map:"Tap here to open the venue in Google Maps",brideFamily:"BRIDE’S PARENTS",groomFamily:"GROOM’S PARENTS",brideParents:"Bhaban Chandra Sarkar & Rina Sarkar",groomParents:"Subir Sen & Suchita Sen",brother:"BRIDE’S BROTHER",brotherName:"Debjit Sarkar",marriage:"The wedding date will be revealed soon.",regards:"With love and warm regards",families:"The Sarkar & Sen Families",blessing:"We look forward to your blessings",bride:"Deepika",groom:"Subham",cover:"A joyful beginning, blessed by family"
 };
 const mapUrl="https://maps.app.goo.gl/xbm7Q7ipcZchZLzYA?g_st=ac";
 const font=bengali?"'Noto Serif Bengali',serif":"'Cormorant Garamond',Georgia,serif";
 const html=`<!doctype html><html lang="${bengali?"bn":"en"}"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Deepika &amp; Subham - Invitation</title>
 <link href="https://fonts.googleapis.com/css2?family=Noto+Serif+Bengali:wght@400;600;700&family=Cormorant+Garamond:wght@400;500;600;700&display=swap" rel="stylesheet">
 <style>
 @page{size:A4 portrait;margin:0}
 *{box-sizing:border-box}
 html,body{margin:0;padding:0;font-family:${font};color:#f8edda;background:#4b101b;-webkit-print-color-adjust:exact;print-color-adjust:exact}
 .page{width:210mm;height:297mm;padding:13mm;background:#4b101b;position:relative;overflow:hidden;page-break-after:always;break-after:page}
 .page:last-child{page-break-after:auto;break-after:auto}
 .frame{height:100%;width:100%;border:1.1mm double #d8b56e;outline:.25mm solid #d8b56e;outline-offset:-4mm;padding:15mm 13mm;display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;position:relative}
 .orn{font-size:28pt;color:#e4c27b;margin-bottom:10mm}
 .eyebrow{font-size:12pt;letter-spacing:2px;color:#e4c27b}
 h1{font-size:44pt;line-height:1.15;font-weight:600;margin:12mm 0 4mm;color:#fff0d8}
 .kind{font-size:22pt;color:#e8c984;margin-bottom:9mm}
 .rule{width:42mm;border-top:.3mm solid #d8b56e;margin:4mm 0 8mm}
 .coverline{font-size:16pt;line-height:1.7;max-width:145mm}
 .guest{font-size:19pt;color:#e8c984;margin-top:12mm}
 .coverfoot{position:absolute;bottom:18mm;font-size:11pt;color:#e8c984;letter-spacing:1px}
 .dear{font-size:17pt}
 .message{font-size:14pt;line-height:1.7;max-width:155mm;margin:6mm auto}
 .date{font-size:21pt;color:#e8c984;margin-top:4mm}
 .time{font-size:16pt;letter-spacing:1px;margin-top:2mm}
 .familylabel{font-size:11pt;color:#e8c984;letter-spacing:1px;margin-top:5mm}
 .family{font-size:15pt;margin:1mm 0 1mm}
 .venue{font-size:15pt;color:#e8c984;margin-top:8mm}
 a{color:#fff0d8;font-size:14pt;text-decoration:underline;text-decoration-color:#d8b56e;text-underline-offset:2mm}
 .mapnote{font-size:10pt;color:#f3dfbd;margin-top:2mm}
 .marriage{font-size:14pt;color:#e8c984;margin-top:8mm}
 .regards{font-size:14pt;color:#e8c984;margin-top:10mm}
 .families{font-size:18pt;margin-top:2mm}
 .blessing{font-size:11pt;color:#e8c984;margin-top:7mm}
 .page-number{position:absolute;bottom:9mm;color:#d8b56e;font-size:9pt}
 @media screen{body{background:#ddd;padding:12px}.page{margin:12px auto;box-shadow:0 2px 15px #777}}
 </style></head><body>
 <section class="page"><div class="frame">
 <div class="orn">❀ ❧ ✦ ❧ ❀</div><div class="eyebrow">${t.invite}</div>
 <h1>${t.bride}<br><span style="color:#d8b56e">&amp;</span><br>${t.groom}</h1><div class="kind">${t.kind}</div><div class="rule"></div>
 <div class="coverline">${t.cover}</div><div class="guest">${t.dear} ${safeName}</div>
 <div class="coverfoot">❧ ✦ ❧</div>
 </div></section>
 <section class="page"><div class="frame">
 <div class="orn" style="font-size:20pt;margin-bottom:4mm">❧ ✦ ❧</div>
 <div class="eyebrow">${t.kind}</div><div class="rule"></div>
 <div class="dear">${t.dear} <strong style="color:#e8c984">${safeName}</strong>,</div>
 <p class="message">${t.message}</p><div class="date">${t.date}</div><div class="time">${t.time}</div>
 <div class="rule"></div>
 <div class="familylabel">${t.brideFamily}</div><div class="family">${t.brideParents}</div>
 <div class="familylabel">${t.groomFamily}</div><div class="family">${t.groomParents}</div>
 <div class="familylabel">${t.brother}</div><div class="family">${t.brotherName}</div>
 <div class="venue">${t.venue}</div><a href="${mapUrl}" target="_blank" rel="noopener">${t.map}</a>
 <div class="mapnote">${bengali?"স্থান দেখতে লিংকে চাপ দিন":"The link above is clickable in the PDF."}</div>
 <div class="marriage">${t.marriage}</div><div class="regards">${t.regards}</div><div class="families">${t.families}</div><div class="blessing">${t.blessing} · ❀</div>
 <div class="page-number">❧ 2 ❧</div>
 </div></section>
 <script>window.onload=()=>{setTimeout(()=>{window.focus();window.print()},1200)};<\/script></body></html>`;
 printWin.document.open();printWin.document.write(html);printWin.document.close();
 pdfModal.classList.remove("open");pdfModal.setAttribute("aria-hidden","true");
});
function escapePdfText(s){return s.replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));}
