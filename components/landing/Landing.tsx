/* eslint-disable */
// @ts-nocheck
// Landing v2 de Platita.pe, portada desde el proyecto de Claude Design
// "Rediseño web Platita.pe" (página "Platita Landing v2"). La lógica es la del
// diseño; el marcado se convirtió a JSX con estilos en línea.
"use client";
import React from "react";
import { preload } from "react-dom";
import DS from "./ds";
import "./landing.css";
import { sx } from "./sx";
import { WA_CONTACT_URL } from "@/lib/config";
import TurnstileWidget from "@/components/TurnstileWidget";

const STOPS=[10000,50000,100000,500000,1000000];
const TIERS=[[10000,0.14,"Plan Inicial"],[50000,0.16,"Plan Avanza"],[100000,0.18,"Plan Crece"],[500000,0.20,"Plan Patrimonio"]];
const FAQ=[["¿Qué es un contrato de mutuo?","Es un contrato por el que prestas un monto a la empresa y ella se obliga a devolvértelo con los intereses pactados. En Platita.pe se firma ante notario y define tu tasa, plazo y cronograma de abonos."],["¿Qué respalda mi inversión?","Tu capital se destina a proyectos inmobiliarios del grupo Bercorp, respaldados por lotes e inmuebles reales. Cada operación queda formalizada en tu contrato notarial."],["¿Cuándo y cómo recibo mis abonos?","Cada mes, por transferencia a la cuenta bancaria que registres. El primer abono llega al mes siguiente de firmar tu contrato."],["¿Puedo retirar mi dinero antes de los 12 meses?","Las condiciones de salida anticipada se detallan en tu contrato. Escríbenos y te explicamos tu caso antes de invertir."],["¿Qué pasa si un proyecto se retrasa?","Los proyectos se evalúan antes de financiarse y tu contrato fija la tasa y el cronograma de abonos. Te informaremos del avance de cada proyecto en todo momento."],["¿Tengo que pagar impuestos por mis ganancias?","Los intereses que recibes pueden estar afectos al impuesto a la renta. Te recomendamos consultarlo con tu contador según tu situación."],["¿Cuándo sale la app?","La app móvil llega en 2027. Mientras tanto, te registras, firmas y recibes tus abonos por web y WhatsApp, con acompañamiento de un asesor."],["¿Es seguro unirme a la lista de espera?","Sí. No tiene costo ni compromiso, y tus datos se tratan bajo la Ley N.° 29733 de Protección de Datos Personales."]];
const TCOL=["#007a96","#3f6fd8","#7a45d6","#a234cc"],TTAG=["Tu primera inversión inmobiliaria","Haz que tus ahorros avancen","Más capital, más rendimiento","Construye patrimonio a largo plazo"];
const fmt=n=>Math.round(n).toString().replace(/\B(?=(\d{3})+(?!\d))/g,",");
const posToAmt=p=>{const s=Math.min(3,Math.floor(p*4));const lt=p*4-s;return Math.round((STOPS[s]+lt*(STOPS[s+1]-STOPS[s]))/1000)*1000;};
const amtToPos=a=>{for(let i=0;i<4;i++){if(a<=STOPS[i+1])return (i+(a-STOPS[i])/(STOPS[i+1]-STOPS[i]))/4;}return 1;};
const CMP=[["Rentabilidad anual","3% – 5%","4% – 6%","5% – 10%","6% – 12%*","14% – 20% anual","trending","#bc45e9",null,[5,6,10,12]],["Inversión mínima","S/ 1,000+","S/ 500+","S/ 5,000+","S/ 100+","S/ 10,000","coins","#6cdcff",null,null],["Respaldo del capital","Fondo de Seguro de Depósitos (con tope)","Fondo de Seguro de Depósitos (con tope)","Patrimonio del fondo (no asegurado)","No hay respaldo del capital","Activo inmobiliario (sin Fondo de Seguro de Depósitos)","shield","#bc45e9",[2,2,0,0],null],["Proceso","Colas presenciales","Colas presenciales","A través de intermediarios","Plataformas de bolsa","100% online","zap","#6cdcff",[0,0,1,1],null],["Comisiones de entrada","Varía","Varía","1% – 3% anual + comisiones","0.1% – 0.5% por operación","S/ 0","tag","#6cdcff",[1,1,0,1],null],["Ingresos","Al vencimiento","Al vencimiento","Al rescate","Al vender","Mensuales","wallet","#bc45e9",[0,0,0,0],null]];
const CMPH=["Banco","Cajas","Fondos","Acciones"];
const RT=[["x","#dc2626","rgba(220,38,38,.08)"],["minus","#b45309","rgba(245,158,11,.12)"],["check","#007a96","rgba(0,137,168,.10)"]];
const rt=v=>({hasRate:v!=null,ri:v!=null?RT[v][0]:"check",rc:v!=null?RT[v][1]:"#000",rb:v!=null?RT[v][2]:"transparent"});
const DEMO=[{k:"01 · Inicio",short:"Inicio",t:"Tu capital, en tiempo real",d:"Mira cuánto llevas invertido, tu rendimiento acumulado y la evolución de tu portafolio en un vistazo.",icon:"trending",accent:"#6cdcff",tint:"rgba(108,220,255,.16)"},{k:"02 · Invertir",short:"Invertir",t:"Elige proyectos verificados",d:"Explora urbanizaciones, remates, compra-venta y construcción con su tasa, plazo y avance de financiamiento.",icon:"urbanizacion",accent:"#bc45e9",tint:"rgba(188,69,233,.10)"},{k:"03 · Cartera",short:"Cartera",t:"Cada abono, a la vista",d:"Calendario de pagos mensuales, historial de abonos y tus contratos notariales listos para descargar.",icon:"calendarCheck",accent:"#6cdcff",tint:"rgba(108,220,255,.16)"},{k:"04 · Kids",short:"Kids",t:"Platita Kids, en la misma app",d:"Vincula el perfil de tus hijos, sigue su meta de ahorro y acompáñalos con lecciones según su edad.",icon:"award",accent:"#bc45e9",tint:"rgba(188,69,233,.10)"}];
const WS1="Tu platita merece trabajar más duro. Proyectos reales, contrato notarial y pagos cada mes.",WS2="Detrás de cada sol hay un activo real.";
const words=(txt,acc,p,dark)=>{const w=txt.split(" "),n=w.length;return w.map((t,i)=>{const lit=Math.min(1,Math.max(0,p*n*1.05-i));const g=acc.includes(i)&&lit>=1;return {t,cls:"",c:g?(dark?"#7fe3ff":"#a234cc"):(dark?"rgba(255,255,255,"+(0.16+0.84*lit).toFixed(2)+")":"rgba(28,15,76,"+(0.12+0.88*lit).toFixed(2)+")")};});};
const SECT=[{n:"01",name:"Urbanizaciones",icon:"urbanizacion",accent:"#007a96",image:"/design/p-habilitaciones.webp",tag:"Lotes con alta proyección de crecimiento",headline:"Lotes en zonas de alta demanda, con plusvalía desde el día uno.",bullets:["Desarrollo de lotes con alta proyección de crecimiento.","Zonas estratégicas y de alta demanda.","Plusvalía respaldada en el terreno."],chain:["Terreno estratégico","Habilitación urbana","Venta de lotes"]},{n:"02",name:"Remates judiciales",icon:"remate",accent:"#3f6fd8",image:"/design/p-subastas.webp",tag:"Propiedades bajo su valor comercial",headline:"Propiedades adquiridas por debajo de su valor comercial.",bullets:["Adquisición bajo el valor de mercado.","Oportunidades con alta rentabilidad.","Procesos 100% legales y transparentes."],chain:["Evaluación legal","Adjudicación","Reventa a valor de mercado"]},{n:"03",name:"Compra y venta",icon:"inmueble",accent:"#7a45d6",image:"/design/p-inmuebles.webp",tag:"Inmuebles con alto potencial",headline:"Inmuebles seleccionados para comprar bien y vender mejor.",bullets:["Selección de inmuebles con alto potencial.","Compra estratégica.","Venta rápida y rentable."],chain:["Selección del inmueble","Compra estratégica","Venta rentable"]},{n:"04",name:"Construcción",icon:"construccion",accent:"#a234cc",image:"/design/p-construccion.webp",tag:"Residencial y comercial",headline:"Proyectos residenciales y comerciales, rentables desde la preventa.",bullets:["Proyectos residenciales y comerciales.","Construcción eficiente y de calidad.","Rentabilidad desde la etapa de preventa."],chain:["Diseño y licencias","Construcción","Preventa y entrega"]}];
// Registro o autorización de la empresa (entidad y número). Vacío = no se muestra.
// Completar con el dato exacto antes de publicarlo; no inventar.
const SUPERVISION="";
// Secciones que solo existen en una variante (escritorio/móvil) y su alternativa.
const ALT_ID={respaldo:"respaldo-legal"};
const SECTIONS=["como-funciona","planes","simulador","asesores","app","kids","respaldo"];
const KSTOPS=[500,2000,5000,10000];
const KTIERS=[[500,0.14,"Kids Inicial"],[2000,0.16,"Kids Avanza"],[5000,0.18,"Kids Crece"],[10000,0.20,"Kids Patrimonio"]];
const kPosToAmt=p=>{const s=Math.min(2,Math.floor(p*3));const lt=p*3-s;return Math.round((KSTOPS[s]+lt*(KSTOPS[s+1]-KSTOPS[s]))/100)*100;};
const kAmtToPos=a=>{for(let i=0;i<3;i++){if(a<=KSTOPS[i+1])return (i+(a-KSTOPS[i])/(KSTOPS[i+1]-KSTOPS[i]))/3;}return 1;};
const RS=p=>p;
export default class Landing extends React.Component<any, any> {
  static defaultProps = {
    simuladorEstilo: "Simplificado",
  };
  state={dir:null,mobile:false,scrollY:0,active:"",amount:100000,months:12,heroEmail:"",f:{nombre:"",correo:"",telefono:"",monto:"",mayor:false},tried:false,loading:false,sent:false,vsl:false,kInit:500,kMon:100,kYears:5,demo:0,pj:0,sim:false,kOpen:false,af:{nombre:"",dni:"",cel:"",correo:"",ciudad:"",cci:"",exp:"",acepta:false},afTried:false,afLoading:false,afSent:false,copied:false,wsA:0,wsB:0,narrow:false};
  componentDidMount(){
    {
      const v=document.getElementById("heroVid");
      const reduceMotion=window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const saveData=(navigator as Navigator & { connection?: { saveData?: boolean } }).connection?.saveData;
      if(v&&!reduceMotion&&!saveData&&"IntersectionObserver" in window){
        this.hvIO=new IntersectionObserver(entries=>entries.forEach(entry=>{
          if(entry.isIntersecting&&entry.intersectionRatio>.35){
            this.hvLeft=false;
            if(v.dataset.loaded==="true"){
              v.play().catch(()=>{});
            }else{
              clearTimeout(this.hvLoadTimer);
              this.hvLoadTimer=setTimeout(()=>{
                if(!v.isConnected||this.hvLeft)return;
                v.dataset.loaded="true";
                v.src=v.dataset.src;
                v.load();
                v.play().catch(()=>{});
              },1200);
            }
          }else{
            this.hvLeft=true;
            clearTimeout(this.hvLoadTimer);
            v.pause();
          }
        }),{threshold:[0,.35]});
        this.hvIO.observe(v);
      }
    }
    this.onPx=()=>{if(this.pxR)return;this.pxR=requestAnimationFrame(()=>{this.pxR=0;if(false){const ap=document.getElementById("app");if(ap){const ar=ap.getBoundingClientRect(),span=ap.offsetHeight-window.innerHeight;if(span>0&&ar.top<window.innerHeight&&ar.bottom>0){const q=Math.max(0,Math.min(.9999,-ar.top/span));const idx=Math.floor(q*(this.apN||6));if(idx!==this.state.appScr)this.setState({appScr:idx});}}}const el=document.getElementById("px");if(!el)return;const r=el.getBoundingClientRect(),vh=window.innerHeight;if(r.bottom<0||r.top>vh)return;const p=Math.max(0,Math.min(1,(vh-r.top)/(vh+r.height)));const rows=el.firstElementChild&&el.firstElementChild.children;if(rows&&rows[0]){rows[0].style.transform="translateX("+(-6-p*14).toFixed(2)+"%)";if(rows[1])rows[1].style.transform="translateX("+(-30+p*14).toFixed(2)+"%)";}});};window.addEventListener("scroll",this.onPx,{passive:true});this.onPx();
    {const rm=window.matchMedia&&window.matchMedia("(prefers-reduced-motion: reduce)").matches;
     const exit=()=>{if(this.state.ld>=2)return;this.setState({ld:2});this.ldT2=setTimeout(()=>this.setState({ld:3}),750);};
     const ready=()=>this.state.hv&&document.readyState==="complete";
     let seen=false;try{seen=sessionStorage.getItem("platita_ld_seen")==="1";sessionStorage.setItem("platita_ld_seen","1");}catch(e){}if(true){this.setState({ld:3,hv:true});}else{const t0=performance.now(),WD=960,LD=420;const tick=()=>{const el=performance.now()-t0;if(el<WD){const wi=Math.min(2,Math.floor(el/320));if(wi!==this.state.ldWi||this.state.ldPh!==1)this.setState({ldPh:1,ldWi:wi});this.ldR=requestAnimationFrame(tick);}else{const k=Math.min(1,(el-WD)/LD);this.setState({ldPh:2,ldWi:3,ldK:k});if(k<1)this.ldR=requestAnimationFrame(tick);else{const wait=()=>{if(ready()||performance.now()-t0>1700)this.ldT=setTimeout(exit,60);else this.ldT=setTimeout(wait,80);};wait();}}};this.setState({ld:1,ldPh:1,ldWi:0});this.ldR=requestAnimationFrame(tick);this.ldSafe=setTimeout(()=>{this.setState({hv:true});exit();},2200);}}
    {const tz=(Intl.DateTimeFormat().resolvedOptions().timeZone||""),lang=((navigator.language||"").split("-")[1]||"").toUpperCase();const TZ={"America/Lima":"51","America/Bogota":"57","America/Santiago":"56","America/Mexico_City":"52","America/Guayaquil":"593","America/La_Paz":"591","America/Caracas":"58","Europe/Madrid":"34","America/Montevideo":"598","America/Asuncion":"595","America/New_York":"1","America/Chicago":"1","America/Los_Angeles":"1"};const LG={PE:"51",CO:"57",CL:"56",MX:"52",EC:"593",BO:"591",VE:"58",ES:"34",AR:"54",US:"1",UY:"598",PY:"595"};const cc=TZ[tz]||(tz.indexOf("America/Argentina")===0?"54":"")||LG[lang]||"51";this.setState({cc});}
    this.onResize=()=>{if(this.rzT)cancelAnimationFrame(this.rzT);this.rzT=requestAnimationFrame(()=>{const w=window.innerWidth,nx={mobile:w<768,narrow:w<1060,vh:Math.round(window.innerHeight/40)*40,vw:Math.round(w/16)*16},S=this.state,ch={};for(const k in nx)if(S[k]!==nx[k])ch[k]=nx[k];if(Object.keys(ch).length)this.setState(ch);});};this.onResize();
    this.onScroll=()=>{let a="";for(const id of SECTIONS){const el=document.getElementById(id)||document.getElementById(ALT_ID[id]);if(el&&el.getBoundingClientRect().top<140)a=id;}const vh=window.innerHeight;const wp=id=>{const el=document.getElementById(id);if(!el)return 0;const r=el.getBoundingClientRect();const st=vh*0.4,en=vh*1.25-r.height;return Math.min(1,Math.max(0,(st-r.top)/Math.max(1,st-en)));};let d=this.state.demo;if(!this.state.mobile){d=0;for(let i=0;i<5;i++){const el=document.getElementById("demo-step-"+i);if(el&&el.getBoundingClientRect().top<vh*0.55)d=i;}}const rbEl=!this.state.mobile&&document.querySelector("#respaldo > div");let rb=0;if(rbEl){const r=rbEl.getBoundingClientRect();rb=Math.min(1,Math.max(0,-r.top/Math.max(1,r.height-vh)));}const q=x=>Math.round(x*400)/400;const sy=window.scrollY;const rgEl=document.getElementById("registro");let regV=false;if(rgEl){const r=rgEl.getBoundingClientRect();regV=r.top<vh*0.85&&r.bottom>vh*0.15;}const nx={regV,scrollY:sy>400?401:(sy>30?31:0),active:a,wsA:q(wp("ws1")),wsB:q(this.state.mobile?wp("ws2"):Math.min(1,rb/0.32)),rb:q(rb),demo:d};const S=this.state,ch={};for(const k in nx)if(S[k]!==nx[k])ch[k]=nx[k];if(Object.keys(ch).length)this.setState(ch);};
    window.addEventListener("resize",this.onResize);this.onKey=e=>{if(e.key==="Escape"&&this.state.sim)this.setSim(false);};window.addEventListener("keydown",this.onKey);this.onScrollT=()=>{if(this.sR)return;this.sR=requestAnimationFrame(()=>{this.sR=0;this.onScroll();});};window.addEventListener("scroll",this.onScrollT,{passive:true});this.onScroll();
    this.apI=setInterval(()=>{const el=document.getElementById("app");if(!el)return;const r=el.getBoundingClientRect();if(r.bottom<0||r.top>window.innerHeight)return;this.setState(z=>({appScr:((z.appScr||0)+1)%6}));},3200);
    // Los reveals de [data-reveal] son CSS (animation-timeline: view()) en landing.css.
  }
  componentWillUnmount(){this.hvIO&&this.hvIO.disconnect();window.removeEventListener("scroll",this.onPx);cancelAnimationFrame(this.pxR);clearTimeout(this.hvLoadTimer);clearInterval(this.apI);cancelAnimationFrame(this.ldR);clearTimeout(this.ldT);clearTimeout(this.ldT2);clearTimeout(this.ldSafe);window.removeEventListener("keydown",this.onKey);document.body.style.overflow="";clearInterval(this.tiv);clearTimeout(this.rt);this.io&&this.io.disconnect();window.removeEventListener("resize",this.onResize);window.removeEventListener("scroll",this.onScrollT);cancelAnimationFrame(this.sR);}
  componentDidUpdate(pp){if(pp.direccion!==this.props.direccion)this.setState({dir:null});}
  go=(id)=>{id=String(id||"").replace("#","");const el=document.getElementById(id)||document.getElementById(ALT_ID[id]);if(el)window.scrollTo({top:el.getBoundingClientRect().top+window.scrollY-72,behavior:"smooth"});};
  setSim=v=>{if(v&&!this.state.simMounted){this.setState({simMounted:true});requestAnimationFrame(()=>requestAnimationFrame(()=>this.setSim(true)));return;}this.setState({sim:v});document.body.style.overflow=v?"hidden":"";};
  setAf=(k,v)=>this.setState(s=>({af:{...s.af,[k]:v}}));
  afErrors(){const f=this.state.af;return{nombre:f.nombre.trim().split(/\s+/).length<2?"Escribe tu nombre y apellido":undefined,dni:!/^\d{8}$/.test(f.dni.trim())?"El DNI debe tener 8 dígitos":undefined,cel:!/^\+?\d[\d\s]{7,}$/.test(f.cel.trim())?"Ingresa un celular válido":undefined,correo:!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(f.correo)?"Ingresa un correo válido":undefined,ciudad:!f.ciudad.trim()?"Indica tu ciudad":undefined,cci:f.cci.replace(/\D/g,"").length!==20?"Ingresa tu CCI de 20 dígitos":undefined,acepta:!f.acepta};}
  setF=(k,v)=>this.setState(s=>({f:{...s.f,[k]:v}}));
  errors(){const f=this.state.f;return{
    nombre:f.nombre.trim().split(/\s+/).length<2?"Escribe tu nombre y apellido":undefined,
    correo:!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(f.correo)?"Ingresa un correo válido":undefined,
    telefono:!/^\+?\d[\d\s]{7,}$/.test(f.telefono.trim())?"Ingresa un número válido":undefined,
    monto:!f.monto?"Elige un rango":undefined,
    mayor:!f.mayor};}
  // ── Envío real a las APIs del proyecto ──────────────────────────
  tsReg = React.createRef();
  tsAf = React.createRef();
  meta(){
    try{
      const p=new URLSearchParams(window.location.search);
      return {utmSource:p.get("utm_source")||"",utmMedium:p.get("utm_medium")||"",utmCampaign:p.get("utm_campaign")||"",referrer:document.referrer||""};
    }catch(e){return {};}
  }
  phone(num){return "+"+(this.state.cc||"51")+String(num||"").replace(/\D/g,"");}
  async post(url,payload){
    const res=await fetch(url,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({website:"",...payload,...this.meta()})});
    const data=await res.json().catch(()=>({}));
    if(!res.ok)throw new Error(data.error||"Hubo un error al enviar. Intenta de nuevo o escríbenos por WhatsApp.");
    return data;
  }
  submitRegistro=async()=>{
    if(this.state.loading)return;
    const f=this.state.f,cc=this.state.cc||"51";
    this.setState({loading:true,regErr:""});
    try{
      await this.post("/api/registro",{nombre:f.nombre,correo:f.correo,telefono:this.phone(f.telefono),montoInteres:f.monto,mayorDeEdad:f.mayor,viveExtranjero:cc!=="51",ubicacionExtranjero:"",turnstileToken:this.state.regToken||undefined});
      this.setState({loading:false,sent:true});
    }catch(err){
      this.setState({loading:false,regErr:err.message,regToken:null});
      this.tsReg.current&&this.tsReg.current.reset();
    }
  };
  submitAsesor=async()=>{
    if(this.state.afLoading)return;
    const a=this.state.af;
    this.setState({afLoading:true,afErr:""});
    try{
      await this.post("/api/asesores",{nombre:a.nombre,dni:a.dni,telefono:this.phone(a.cel),correo:a.correo,ciudad:a.ciudad,experiencia:a.exp,cci:a.cci,aceptaTerminos:a.acepta,turnstileToken:this.state.afToken||undefined});
      this.setState({afLoading:false,afSent:true});
    }catch(err){
      this.setState({afLoading:false,afErr:err.message,afToken:null});
      this.tsAf.current&&this.tsAf.current.reset();
    }
  };
  renderVals(){
    const s=this.state;
    const dir=s.dir||(String(this.props.direccion||"A").startsWith("B")?"B":"A");
    const t=[...TIERS].reverse().find(x=>s.amount>=x[0])||TIERS[0];
    const monthly=s.amount*t[1]/12, earnings=monthly*s.months;
    const tierIdx=TIERS.indexOf(t);
    const kt=[...KTIERS].reverse().find(x=>s.kInit>=x[0])||KTIERS[0];
    const kr=kt[1]/12,kn=s.kYears*12,kg=Math.pow(1+kr,kn);
    const kFv=s.kInit*kg+s.kMon*(kg-1)/kr,kAport=s.kInit+s.kMon*kn;
    const wide=!s.mobile&&s.months===12;
    const err=this.errors(); const e=s.tried?err:{};
    const ok=!Object.values(err).some(Boolean);
    return {
      isA:dir==="A",isB:dir==="B",mobile:s.mobile,scrolled:s.scrollY>30,active:s.active,showSticky:s.mobile&&s.scrollY>400&&!s.regV,
      showCompare:this.props.mostrarComparativo??true,
      navLinks:[["Cómo funciona","#como-funciona"],["Planes","#planes"],["Simulador","#simulador"],["App","#app"],["Kids","#kids"],["Respaldo","#respaldo"],["Asesores","#asesores"]],
      go:this.go,goRegistro:()=>this.go(s.mobile?"registro-form":"registro"),goSimulador:()=>this.go("simulador"),
      heroEmail:s.heroEmail,onHeroEmail:ev=>this.setState({heroEmail:ev.target.value}),
      heroSubmit:()=>{if(s.heroEmail)this.setF("correo",s.heroEmail);this.go(s.mobile?"registro-form":"registro");},
      heroChecks:["Contrato mutuo notarial","Garantía en activo inmobiliario","Abonos mensuales a tu cuenta"],
      heroFacts:[{icon:"wallet",v:"Desde S/ 10,000",l:"Inversión mínima"},{icon:"trending",v:"Hasta 20% anual",l:"Según tu plan"},{icon:"calendarCheck",v:"Pagos mensuales",l:"Desde el primer mes"},{icon:"fileSign",v:"SUNARP 11094181",l:"Partida registral"}],
      tickerLabel:["Respaldo","legal"],
      tickerItems:[{src:RS("/design/respaldo/sunarp.webp"),alt:"SUNARP",label:"Partida 11094181"},{src:RS("/design/respaldo/notaria.webp"),alt:"Notaría",label:"Contratos notariales"},{src:RS("/design/respaldo/sunat.webp"),alt:"SUNAT",label:"RUC 20613498878"},{src:RS("/design/respaldo/indecopi.webp"),alt:"INDECOPI",label:"Libro de reclamaciones"}],
      amountFmt:fmt(s.amount),sliderPos:Math.round(amtToPos(s.amount)*1000),onSlider:v=>this.setState({amount:Math.max(10000,posToAmt(v/1000))}),
      ticks:["S/10K","S/50K","S/100K","S/500K","S/1M"],months:s.months,
      m12:s.months===12,m18:s.months===18,m24:s.months===24,
      set12:()=>this.setState({months:12}),set18:()=>this.setState({months:18}),set24:()=>this.setState({months:24}),
      simCols:s.narrow?"1fr":"0.85fr 1.7fr 0.75fr",statCols:s.mobile?"1fr 1fr":"repeat(4,1fr)",barGap:wide?"8px":"3px",
      planNum:tierIdx+1,planUpTo:"Hasta "+Math.round(t[1]*100)+"%",amountS:"S/ "+fmt(s.amount),earningsS:"S/ "+fmt(earnings),monthlyS:"S/ "+fmt(monthly),
      earnLabel:s.months===12?"Rentabilidad anual":"Rentabilidad total",
      bars:Array.from({length:s.months},(_,i)=>({showTop:wide,top:"S/"+fmt(monthly),label:wide?"Mes "+(i+1):String(i+1)})),
      vslPlaying:s.vsl,vslIdle:!s.vsl,playVsl:()=>this.setState({vsl:true,vslT:0}),vslStart:ev=>{try{if(s.vslT)ev.currentTarget.currentTime=s.vslT;}catch(e){}},vbAR:s.mobile?"4 / 5":"16 / 7",vbPos:s.mobile?"72% center":"center 30%",vbJust:s.mobile?"flex-end":"center",vbScrim:s.mobile?"linear-gradient(180deg,rgba(13,8,38,0) 30%,rgba(13,8,38,.85) 62%,#0d0826 100%)":"linear-gradient(90deg,rgba(13,8,38,.9) 0%,rgba(13,8,38,.55) 35%,transparent 60%)",
      vsCols:s.narrow?"minmax(0,1fr)":"minmax(0,1.35fr) minmax(0,1fr)",
      goKidsSim:()=>{this.setState({kOpen:true});setTimeout(()=>this.go("kids-simulador"),60);},
      kidsPerks:["Desde S/ 500 de aporte inicial","Aportes mensuales familiares opcionales","Historial de aportes, ciclos y contratos"],
      kidsStages:[{num:"01",age:"10 a 12 años",t:"Descubro",d:"Qué es ahorrar, qué es invertir y cómo fijar su primera meta."},{num:"02",age:"13 a 15 años",t:"Aprendo",d:"Capital, rentabilidad, riesgo e interés compuesto."},{num:"03",age:"16 a 17 años",t:"Me preparo",d:"Planificación y responsabilidad financiera a largo plazo."},{num:"04",age:"18 años",t:"Transición",d:"Pasa al ecosistema de inversión para adultos."}],
      stageCols:s.mobile?"1fr 1fr":"repeat(4,minmax(0,1fr))",
      kidsPlans:[{n:"Kids Inicial",min:"S/ 500",r:14,c:"#007a96",ring:"rgba(0,137,168,.12)",tc:"#1c0f4c"},{n:"Kids Avanza",min:"S/ 2,000",r:16,c:"#3f6fd8",ring:"rgba(63,111,216,.12)",tc:"#1c0f4c"},{n:"Kids Crece",min:"S/ 5,000",r:18,c:"#7a45d6",ring:"rgba(122,69,214,.12)",tc:"#1c0f4c"},{n:"Kids Patrimonio",min:"S/ 10,000",r:20,c:"#a234cc",ring:"rgba(162,52,204,.12)",tc:"#a234cc"}],
      kInitFmt:fmt(s.kInit),kInitPos:Math.round(kAmtToPos(s.kInit)*999),onKInit:v=>this.setState({kInit:Math.max(500,kPosToAmt(v/999))}),kInitTicks:["S/500","S/2K","S/5K","S/10K"],
      kMon:s.kMon,kMonFmt:fmt(s.kMon),onKMon:v=>this.setState({kMon:v}),kMonTicks:["S/0","S/100","S/200","S/300","S/400","S/500"],
      kYears:s.kYears,ky3:s.kYears===3,ky5:s.kYears===5,ky8:s.kYears===8,setKy3:()=>this.setState({kYears:3}),setKy5:()=>this.setState({kYears:5}),setKy8:()=>this.setState({kYears:8}),
      kPlanName:kt[2],kPlanRate:Math.round(kt[1]*100),kFvFmt:fmt(kFv),kAportFmt:fmt(kAport),kGainFmt:fmt(kFv-kAport),kAportPct:Math.round(kAport/kFv*100)+"%",
      kidsFlow:["Cuenta del padre/tutor","Perfil Kids","Aportes","Inversión","Crecimiento","Educación","Metas"].map((t,i,a)=>({t,arrow:i<a.length-1})),
      kidsTopics:["¿Qué es ahorrar?","¿Qué es invertir?","¿Qué es el capital?","¿Qué es la rentabilidad?","¿Qué es el riesgo?","Interés compuesto","Invertir a largo plazo","Mi meta financiera"],
      pjCols:s.mobile?"1fr":"minmax(0,0.78fr) minmax(0,1.6fr)",pjDir:s.mobile?"row":"column",pjTabsMargin:s.mobile?"0 -20px":"0",pjTabsPad:s.mobile?"0 20px 4px":"0",
      sectors:SECT.map((x,i)=>{const on=s.pj===i;return {...x,pick:()=>this.setState({pj:i}),hover:()=>{if(!s.mobile)this.setState({pj:i});},flex:s.mobile?"0 0 auto":"1",bd:on?x.accent+"55":"rgba(28,15,76,.08)",bg:on?"#fff":"rgba(255,255,255,.6)",sh:on?"0 14px 36px rgba(28,15,76,.12)":"none",bar:on?x.accent:"transparent",tint:x.accent+"1a",tagDisp:s.mobile?"none":"block",arrowOp:on&&!s.mobile?1:0};}),
      pj:(x=>({...x,chain:x.chain.map((t,i)=>({t,n:i+1,dot:i===2?"#6cdcff":"#fff",line:i===2?"transparent":"rgba(255,255,255,.3)"}))}))(SECT[s.pj]),
      openSim:()=>this.go("simulador"),closeSim:()=>this.setSim(false),drReserve:()=>{this.setSim(false);setTimeout(()=>this.go(s.mobile?"registro-form":"registro"),250);},drFull:()=>{this.setSim(false);setTimeout(()=>this.go("simulador"),250);},
      simMounted:!!s.simMounted,drTf:s.sim?"translateX(0)":"translateX(105%)",drOp:s.sim?1:0,drPe:s.sim?"auto":"none",drHidden:s.sim?"false":"true",
      kOpen:s.kOpen,toggleKSim:()=>this.setState(x=>({kOpen:!x.kOpen})),kSimLabel:s.kOpen?"Ocultar simulador":"Simula su futuro",kSimRot:s.kOpen?"rotate(180deg)":"none",
      simOrig:String(this.props.simuladorEstilo||"").startsWith("Original"),simNew:!String(this.props.simuladorEstilo||"").startsWith("Original"),
      prjSelSpan:(s.narrow&&!s.mobile)?"1 / -1":"auto",prjCols:s.mobile?"minmax(0,1fr)":(s.narrow?"minmax(0,1fr) minmax(0,1fr)":"minmax(0,1.15fr) minmax(0,1.1fr) minmax(0,.9fr)"),cumBarsL:Array.from({length:s.months},(_,i)=>({h:Math.round((i+1)/s.months*100)+"%",bg:i===s.months-1?"#bc45e9":"rgba(108,220,255,.75)"})),
      tierSegs:[0,1,2,3].map(i=>i<=tierIdx?["#007a96","#3f6fd8","#7a45d6","#a234cc"][i]:"#e0ddf2"),
      cumBars:Array.from({length:s.months},(_,i)=>({h:Math.round((i+1)/s.months*100)+"%",bg:i===s.months-1?"#6cdcff":"rgba(188,69,233,.75)"})),
      afCols:s.mobile?"1fr":(s.narrow?"repeat(5,minmax(0,1fr))":"repeat(5,minmax(0,1fr))"),afSteps:[{n:"1",t:"Postula",d:"Completa el formulario con tus datos.",bg:"#007a96"},{n:"2",t:"Te aprobamos",d:"Platita.pe revisa y valida tu perfil.",bg:"#3f6fd8"},{n:"3",t:"Recibe tu enlace",d:"Código y enlace personalizados.",bg:"#5a5ad8"},{n:"4",t:"Comparte",d:"Recomienda Platita.pe a tu red.",bg:"#7a45d6"},{n:"5",t:"Gana tu comisión",d:"Cuando tu referido invierte y es validado.",bg:"#a234cc"}],
      afStats:[{l:"Referidos",v:"12",c:"#fff"},{l:"Registros",v:"9",c:"#fff"},{l:"Aprobados",v:"5",c:"#fff"},{l:"Monto generado",v:"S/ 85,000",c:"#fff"},{l:"Comisión pendiente",v:"S/ 640",c:"#6cdcff"},{l:"Comisión pagada",v:"S/ 1,150",c:"#e0a6f7"}],
      afPays:[{t:"Abono a cuenta BCP",d:"15 Sep 2026 · CCI ••• 4821",v:"S/ 750"},{t:"Abono a cuenta BCP",d:"15 Ago 2026 · CCI ••• 4821",v:"S/ 400"}],afHist:[{n:"María L.",d:"Plan Avanza · Oct 2026",st:"Pendiente",fc:"#fcd34d",bg:"rgba(245,158,11,.16)"},{n:"Ricardo T.",d:"Plan Crece · Sep 2026",st:"Pagada",fc:"#6ee7b7",bg:"rgba(16,185,129,.16)"},{n:"Ana P.",d:"Plan Inicial · Ago 2026",st:"Pagada",fc:"#6ee7b7",bg:"rgba(16,185,129,.16)"}],
      copyLabel:s.copied?"¡Copiado!":"Copiar",copyRef:()=>{try{navigator.clipboard&&navigator.clipboard.writeText("https://platita.pe/r/JUAN24");}catch(e){}this.setState({copied:true});clearTimeout(this.cpT);this.cpT=setTimeout(()=>this.setState({copied:false}),1800);},
      af:s.af,ae:s.afTried?this.afErrors():{},afNotSent:!s.afSent,afSent:s.afSent,afLoading:s.afLoading,afFirst:s.af.nombre.trim().split(" ")[0]||"asesor",
      onAf:Object.fromEntries(["nombre","dni","cel","correo","ciudad","cci","exp"].map(k=>[k,ev=>this.setAf(k,ev.target.value)])),onAfAcepta:ev=>this.setAf("acepta",ev.target.checked),
      afSubmit:()=>{this.setState({afTried:true});if(Object.values(this.afErrors()).some(Boolean))return;this.submitAsesor();},
      cfChips:!s.narrow,planCols:s.mobile?"1fr":(s.narrow?"repeat(2,minmax(0,1fr))":"repeat(4,minmax(0,1fr))"),cfCols:s.mobile?"minmax(0,1fr)":(s.narrow?"repeat(2,minmax(0,1fr))":"repeat(4,minmax(0,1fr))"),cfAlign:s.mobile?"flex-start":"center",cfText:s.mobile?"left":"center",
      cfSteps:[{n:"01",icon:"userCheck",t:"Regístrate gratis",d:"Completa tu perfil en minutos, sin costos de apertura.",time:"5 minutos",bg:"#007a96",acc:"#6cdcff"},{n:"02",icon:"arrowUpCircle",t:"Invierte desde S/ 10,000",d:"Elige tu plan y transfiere de forma segura desde tu banco.",time:"100% online",bg:"#3f6fd8",acc:"#6cdcff"},{n:"03",icon:"fileSign",t:"Firma tu contrato notarial",d:"Contrato mutuo con validación notarial, digitalizado.",time:"2 días hábiles",bg:"#7a45d6",acc:"#e0a6f7"},{n:"04",icon:"award",t:"Recibe tus ganancias",d:"Abonos a tu cuenta. Reinvierte o retira sin complicaciones.",time:"Cada mes",bg:"#a234cc",acc:"#e0a6f7"}].map((x,i)=>{const T=[0,18,42,63][i];return {...x,ts:"0:"+String(T).padStart(2,"0"),play:()=>this.setState({vsl:true,vslT:T})};}),
      planCards:TIERS.map((x,i)=>{const on=i===tierIdx;return {tier:i+1,min:"S/ "+fmt(x[0]),rate:Math.round(x[1]*100),on,op:on?1:0.78,tf:on?"translateY(-8px)":"none",exL:on?"Con S/ "+fmt(s.amount)+" recibes":"Con S/ "+fmt(x[0])+" recibes",exV:"S/ "+fmt((on?s.amount:x[0])*x[1]/12)+"/mes",exBg:on?"#fff":"rgba(28,15,76,.03)",exBd:on?"#bc45e9":"transparent"};}),
      lvTitle:tierIdx<3?"Te faltan S/ "+fmt(TIERS[tierIdx+1][0]-s.amount)+" para el "+TIERS[tierIdx+1][2]+" · "+Math.round(TIERS[tierIdx+1][1]*100)+"%":"Estás en el nivel máximo · 20% anual",
      lvPct:(Math.min(1,amtToPos(Math.min(s.amount,500000))/0.75)*100).toFixed(1)+"%",
      lvNodes:TIERS.map((x,i)=>({x:(i/3*100)+"%",tx:i===0?"0":i===3?"-100%":"-50%",bg:i<=tierIdx?["#007a96","#3f6fd8","#7a45d6","#a234cc"][i]:"#fff",l:"Plan "+(i+1),r:Math.round(x[1]*100)+"%",c:i===tierIdx?"#a234cc":"#1c0f4c"})),
      ...(()=>{const p=1,cl=x=>Math.min(1,Math.max(0,x)),m=cl((p-0.36)/0.14),e=1-Math.pow(1-m,3),vw=s.vw||1280,big=Math.min(73.6,Math.max(33.6,vw*0.054)),sub=cl((p-0.42)/0.1);
        const cardV=i=>{const q=cl((p-(0.52+i*0.1))/0.1),eq=1-Math.pow(1-q,3);return {op:q.toFixed(3),tf:"translateY("+((1-eq)*60).toFixed(1)+"px)"};};
        return {bcColTy:((1-e)*170).toFixed(1)+"px",bcFs:(big*(1-0.42*e)).toFixed(1)+"px",bcSubOp:sub.toFixed(3),bcSubTy:((1-sub)*16).toFixed(1)+"px",bc0:cardV(0),bc1:cardV(1),bc2:cardV(2)};})(),
      goAsesores:()=>this.go("asesores"),jardOpen:!!s.jardOpen,openJard:()=>this.setState({jardOpen:true}),closeJard:()=>this.setState({jardOpen:false}),stopProp:e=>e.stopPropagation(),goAsesorForm:()=>this.go("asesor-form"),
      heroPadTop:s.narrow?"84px":"92px",heroGap:s.narrow?"24px":"clamp(24px,4vw,64px)",heroVisH:s.mobile?"min(78vw,460px)":(s.narrow&&!s.mobile)?"min(56vw,540px)":"min(calc(100vh - 120px),700px)",heroDisc:s.narrow?"420px":"620px",cardAx:s.narrow?"0":"-6%",cardBx:s.narrow?"0":"-4%",bigFs:s.narrow?"min(44vw,220px)":"clamp(200px,22vw,330px)",bigBottom:s.narrow?"0%":"2%",h1Fs:s.narrow?"clamp(2.5rem,10.5vw,3.6rem)":"clamp(3rem,5.6vw,5.4rem)",cGap:s.narrow?"8px":"12px",cPad:s.narrow?"8px 12px 8px 8px":"12px 16px 12px 12px",cIco:s.narrow?"32px":"42px",cFs:s.narrow?"14px":"17px",
      navFull:!s.narrow,navCompact:!!s.narrow,navCta:!s.mobile,navMenu:!!(s.narrow&&s.navOpen),navPad:s.scrollY>30?(s.narrow?"8px 8px 0":"12px 16px 0"):(s.narrow?"6px 0 0":"12px 0 0"),navRadius:s.scrollY>30?"22px":"0",navBg:(s.scrollY>30||s.navOpen)?"rgba(255,255,255,.94)":"rgba(255,255,255,0)",navShadow:s.scrollY>30?"0 1px 0 rgba(28,15,76,.06),0 12px 32px rgba(28,15,76,.10)":"none",
      bar1:s.navOpen?"translateY(7px) rotate(45deg)":"none",bar2:s.navOpen?0:1,bar3:s.navOpen?"translateY(-7px) rotate(-45deg)":"none",
      toggleNav:()=>this.setState(x=>({navOpen:!x.navOpen})),goTop:e=>{e.preventDefault();this.setState({navOpen:false});window.scrollTo({top:0,behavior:"smooth"});},
      goAsesoresM:()=>{this.setState({navOpen:false});this.go("asesores");},
      navItems:[["Cómo funciona","como-funciona"],["Planes","planes"],["Simulador","simulador"],["Kids","kids"],["Respaldo","respaldo"]].map(([l,id])=>({l,href:"#"+id,color:s.active===id?"#1c0f4c":"rgba(15,10,46,.66)",bg:s.active===id?"#f5f3fc":"transparent",colorM:s.active===id?"#a234cc":"#1c0f4c",click:e=>{e.preventDefault();this.setState({navOpen:false});this.go(id);}})),heroCols:s.narrow?"minmax(0,1fr)":"minmax(0,1.05fr) minmax(0,1fr)",heroTextOrder:s.narrow?2:1,heroVAlign:s.narrow?"center":"flex-end",heroVMinH:s.narrow?"0":"560px",heroVH2:s.mobile?"min(62vh,520px)":(s.narrow&&!s.mobile)?"min(58vh,560px)":"min(calc(100vh - 140px),700px)",heroVAR:"9 / 14",
      planTag:TTAG[tierIdx],annualFmt:fmt(s.amount*t[1]),plGrid:s.narrow?"minmax(0,1fr)":"minmax(0,1.25fr) minmax(0,1fr)",plStairH:s.mobile?"280px":"380px",plGap:s.mobile?"6px":"12px",plPad:s.mobile?"12px 8px":"18px 16px",plRateFs:s.mobile?"22px":"clamp(28px,3vw,40px)",plNameFs:s.mobile?"11px":"14px",
      plBg:"linear-gradient(150deg,#1c0f4c 0%,"+TCOL[tierIdx]+" 140%)",tierSegsW:[0,1,2,3].map(i=>i<=tierIdx?"#6cdcff":"rgba(255,255,255,.22)"),
      stairs:TIERS.map((x,i)=>{const on=i===tierIdx,past=i<tierIdx;return {name:x[2],short:x[2].replace("Plan ",""),rate:Math.round(x[1]*100),minC:"S/ "+(x[0]>=1000?fmt(x[0]/1000)+"K":fmt(x[0])),minL:(s.mobile?"S/":"Desde S/ ")+(x[0]>=1000?fmt(x[0]/1000)+"K":fmt(x[0])),on,pressed:on?"true":"false",h:(46+i*18)+"%",
        bg:on?"linear-gradient(180deg,"+TCOL[i]+",#1c0f4c)":past?"linear-gradient(180deg,"+TCOL[i]+"33,"+TCOL[i]+"14)":"#fff",sh:on?"0 20px 40px "+TCOL[i]+"55":"inset 0 0 0 1px #e0ddf2",tf:on?"translateY(-6px)":"none",
        rc:on?"#fff":TCOL[i],nc:on?"#fff":"#1c0f4c",mc:on?"rgba(255,255,255,.75)":"rgba(15,10,46,.64)",pick:()=>{if(i!==tierIdx)this.setState({amount:x[0]});}};}),
      ...(()=>{const age=s.kAge||12,yrs=18-age,kt2=[...KTIERS].reverse().find(x=>s.kInit>=x[0])||KTIERS[0],r=kt2[1]/12,n=yrs*12,g=Math.pow(1+r,n),fv=s.kInit*g+s.kMon*(g-1)/r,si=age<=12?0:age<=15?1:age<=17?2:3,ST=[["Descubro","Qué es ahorrar, qué es invertir y cómo fijar su primera meta."],["Aprendo","Capital, rentabilidad, riesgo e interés compuesto."],["Me preparo","Planificación y responsabilidad financiera a largo plazo."],["Transición","Pasa al ecosistema de inversión para adultos."]],f=s.kCard?1:0;
        const pos=front=>front?{l:"4%",t:"30%",z:2,tf:"rotate(-4deg)",sh:"0 30px 60px rgba(28,15,76,.28),0 8px 18px rgba(28,15,76,.12)",sheen:"translateX(120%)"}:{l:"24%",t:"4%",z:1,tf:"rotate(7deg) scale(.94)",sh:"0 16px 36px rgba(28,15,76,.16)",sheen:"translateX(-120%)"};
        return {kAge:age,kYrs18:yrs,kAt18:fmt(fv),kStage:{t:ST[si][0],d:ST[si][1]},
          kAges:[10,11,12,13,14,15,16,17].map(a=>({a,pr:a===age?"true":"false",bg:a===age?"#1c0f4c":"#f5f3fc",c:a===age?"#fff":"#1c0f4c",pick:()=>this.setState({kAge:a})})),
          kMap:ST.map((x,i)=>{const on=i===si,done=i<si,C=["#007a96","#3f6fd8","#7a45d6","#a234cc"][i];return {t:x[0],ic:done?"✓":(i===3?"★":String(i+1)),fs:on?"18px":"15px",c:(on||done)?"#fff":"rgba(15,10,46,.64)",bg:on?"linear-gradient(135deg,"+C+",#bc45e9)":(done?C:"#fff"),sh:on?"0 0 0 5px rgba(188,69,233,.18),0 10px 20px rgba(122,69,214,.3)":(done?"none":"inset 0 0 0 2px #e0ddf2"),tf:on?"scale(1.12)":"none",tc:on?"#1c0f4c":"rgba(15,10,46,.64)"};}),
          kStageBar:ST.map((x,i)=>({t:x[0],bg:i<=si?["#6cdcff","#9b8cf0","#bc45e9","#a234cc"][i]:"#ece9f6",c:i===si?"#1c0f4c":"rgba(15,10,46,.64)"})),
          kcA:pos(f===0),kcB:pos(f===1),kSwap:()=>this.setState(x=>({kCard:x.kCard?0:1}))};})(),
      ...(()=>{const sel=s.cmpSel??0,full=sel===4,OPP=[{l:"Banco",i:"banco"},{l:"Cajas",i:"cajas"},{l:"Fondos",i:"fondos"},{l:"Acciones",i:"acciones"}],o=Math.min(sel,3);
        const rows=CMP.map(r=>({l:r[0],p:r[5],icon:r[6],col:r[7],v:r[o+1],...rt(r[8]?r[8][o]:null),hasBar:!!r[9],bw:r[9]?(r[9][o]/20*100)+"%":"0%",win:r[8]?r[8][o]<2:true}));
        return {cmpDuel:!full,cmpFull:full,duelOpp:OPP[o],duelRows:rows,duelWins:rows.filter(r=>r.win).length,duelTotal:rows.length,duelCols:"minmax(0,1fr) minmax(0,1fr)",
          cmpTabs:[...OPP.map(x=>x.l),"Tabla completa"].map((l,i)=>({l,sel:i===sel?"true":"false",c:i===sel?"#fff":"#1c0f4c",bg:i===sel?(i===4?"#1c0f4c":"linear-gradient(135deg,#1c0f4c,#7a45d6)"):"transparent",sh:i===sel?"0 8px 20px rgba(28,15,76,.2)":"none",pick:()=>this.setState({cmpSel:i})}))};})(),
      chainCols:s.mobile?"1fr":"repeat(4,minmax(0,1fr))",chainGap:s.mobile?"28px":"24px",chainItemDir:s.mobile?"row":"column",chainLine:s.mobile?"left:27px;top:28px;bottom:28px;width:2px":"left:28px;right:12%;top:27px;height:2px",chainDir:s.mobile?"180deg":"90deg",chainDotPos:s.mobile?"left:1px;top:0":"top:1px;left:0",chainAnim:s.mobile?"flow-y":"flow-x",
      chain:[{n:"01",t:"Tu inversión",d:"Transfieres desde tu banco a una cuenta empresarial a nombre de la empresa.",i:"wallet",a:"#6cdcff",bg:"#007a96"},{n:"02",t:"Contrato mutuo notarial",d:"Se firma ante notario y lo recibes digitalizado en 2 días hábiles.",i:"fileSign",a:"#6cdcff",bg:"#3f6fd8"},{n:"03",t:"Proyecto Bercorp",d:"El capital se destina a proyectos inmobiliarios evaluados del grupo.",i:"urbanizacion",a:"#e0a6f7",bg:"#7a45d6"},{n:"04",t:"Activo real de respaldo",d:"Inmuebles y lotes del grupo respaldan la operación. Recibes tus abonos cada mes.",i:"shield",a:"#e0a6f7",bg:"#a234cc"}],
      verify:[{org:"SUNARP",val:"Partida 11094181",img:RS("/design/respaldo/sunarp.webp"),d:"Empresa inscrita en el Registro de Personas Jurídicas.",canCopy:true,cv:"11094181",hasLink:true,href:"https://www.sunarp.gob.pe/",linkL:"Ir a SUNARP ↗"},{org:"SUNAT",val:"RUC 20613498878",img:RS("/design/respaldo/sunat.webp"),d:"HOLDING BERCORP GROUP S.A.C., contribuyente activo y habido.",canCopy:true,cv:"20613498878",hasLink:true,href:"https://e-consultaruc.sunat.gob.pe/",linkL:"Consultar RUC ↗"},{org:"Notaría",val:"Contrato mutuo",img:RS("/design/respaldo/notaria.webp"),d:"Cada inversión se formaliza ante notario público.",canCopy:false,hasLink:false},{org:"INDECOPI",val:"Libro de reclamaciones",img:RS("/design/respaldo/indecopi.webp"),d:"Canal oficial para consultas y reclamos del consumidor.",canCopy:false,hasLink:true,href:"/libro-de-reclamaciones",linkL:"Abrir libro ↗"}].map(v=>({...v,bgi:"url("+v.img+")",copyL:s.vCopied===v.cv?"¡Copiado!":"Copiar número",copy:()=>{try{navigator.clipboard&&navigator.clipboard.writeText(v.cv);}catch(e){}this.setState({vCopied:v.cv});clearTimeout(this.vcT);this.vcT=setTimeout(()=>this.setState({vCopied:null}),1600);}})),
      ...(()=>{const st=s.afStep||1,er=this.afErrors(),bad=st===1?["nombre","cel","ciudad","correo"].some(k=>er[k]):["dni","cci","acepta"].some(k=>er[k]);
        return {afStep:st,afS1:st===1,afS2:st===2,afCta:st===1?"Continuar →":"Enviar postulación",afBars:[1,2].map(i=>i<=st?"linear-gradient(90deg,#6cdcff,#bc45e9)":"#e0ddf2"),
          afBack:()=>this.setState({afStep:1,afTried:false}),
          afNext:()=>{if(bad){this.setState({afTried:true});return;}if(st===1){this.setState({afStep:2,afTried:false});return;}this.submitAsesor();},
          afStepper:[["1","Tus datos"],["2","Validación"]].map(([n,t],i)=>{const st=(s.afStep||1);const on=i+1<=st;return {n:i+1<st?"✓":n,t,bar:on?"linear-gradient(90deg,#6cdcff,#bc45e9)":"#ece9f6",c:on?"#1c0f4c":"rgba(15,10,46,.64)",nc:on?"#fff":"rgba(15,10,46,.64)",nb:on?"#1c0f4c":"#ece9f6"};}),afRow:s.mobile?"minmax(0,1fr)":"minmax(0,1.3fr) minmax(0,1fr)",afStick:s.narrow?"static":"sticky",
      afGrid:s.narrow?"minmax(0,1fr)":"minmax(0,.9fr) minmax(0,1.1fr)",
          afKpis:[{l:"Referidos",v:"12",c:"#fff"},{l:"Aprobados",v:"5",c:"#fff"},{l:"Comisión",v:"S/ 1,150",c:"#6cdcff"}]};})(),
      ...(()=>{const d=Math.max(0,Math.min(4,(s.appScr||0))),COL=["#007a96","#3f6fd8","#5a5ad8","#7a45d6","#a234cc"],GL=["rgba(108,220,255,.35)","rgba(63,111,216,.28)","rgba(122,69,214,.28)","rgba(188,69,233,.28)","rgba(108,220,255,.32)"],RY=[-10,8,-6,8,-10];
        const J=[["Explora","Explora proyectos reales","Urbanizaciones, remates, compra-venta y construcción, con su tasa, plazo y avance de financiamiento a la vista.","urbanizacion"],["Revisa","Revisa la ficha a fondo","Ubicación, respaldo, cuánto se ha recaudado y cuántos inversionistas participan, antes de poner un sol.","building"],["Invierte","Elige tu monto e invierte","La app te dice en qué plan entras y cuánto recibirías cada mes. Transfieres desde tu banco.","wallet"],["Firma","Firma tu contrato notarial","Firmas en la app y el contrato de mutuo se valida ante notario. Lo descargas en PDF cuando quieras.","fileSign"],["Cobra","Recibe tu abono cada mes","Te avisamos con una notificación cada vez que llega tu abono. Tu cartera se actualiza al instante.","calendarCheck"]];
        const go=i=>this.setState({demo:Math.max(0,Math.min(4,i))});const phSc=Math.min(1,Math.max(.62,((s.vh||800)-110)/700));
        return {jSteps:J.map((x,i)=>({id:"demo-step-"+i,n:i+1,s:x[0],t:x[1],d:x[2],i:x[3],bg:COL[i],glow:COL[i]+"55",op:i===d?1:0.25,tf:i===d?"none":"translateX(-8px)",pick:()=>go(i),cc:i===d?"#fff":"#1c0f4c",cb:i===d?"#1c0f4c":"#f5f3fc"})),
          jCur:{t:J[d][1],d:J[d][2]},jPrev:()=>go(d-1),jNext:()=>go(d+1),
          jDots:J.map((_,i)=>({w:i===d?"22px":"6px",bg:i===d?"#bc45e9":"#d9d4ec"})),
          phTf:"none",phStickyTop:Math.max(84,((s.vh||800)+84)/2-(700*phSc)/2)+"px",phStickyH:Math.round(700*phSc)+"px",phGlow:GL[d],
          phTs:e=>{this.tx0=e.touches[0].clientX;},phTe:e=>{const dx=e.changedTouches[0].clientX-(this.tx0||0);if(Math.abs(dx)>40)go(d+(dx<0?1:-1));},
          sv0:{op:d===0?1:0,tf:d===0?"none":(d>0?"translateX(-24px)":"translateX(24px)")},sv1:{op:d===1?1:0,tf:d===1?"none":(d>1?"translateX(-24px)":"translateX(24px)")},sv2:{op:d===2?1:0,tf:d===2?"none":(d>2?"translateX(-24px)":"translateX(24px)")},sv3:{op:d===3?1:0,tf:d===3?"none":(d>3?"translateX(-24px)":"translateX(24px)")},sv4:{op:d===4?1:0,tf:d===4?"none":(d>4?"translateX(-24px)":"translateX(24px)")},sv5:{op:d===5?1:0,tf:d===5?"none":"translateX(24px)"},
          ntOp:(d===3||d===4)?1:0,ntTf:(d===3||d===4)?"translateY(0)":"translateY(-130%)",ntText:d===3?"Tu contrato N.° PLT-2026-00418 fue validado ante notario.":"Recibiste tu abono mensual de S/ 666.67",
          roadmap:[["Lista de espera · ahora",1],["Inversiones · Q4 2026",0],["App móvil · 2027",0]].map(([t,on])=>({t,c:on?"#fff":"#1c0f4c",bg:on?"#1c0f4c":"#fff",sh:on?"none":"inset 0 0 0 1px #e0ddf2",dot:on?"#6cdcff":"#d9d4ec"})),
          phList:[{n:"Jardines de la Colina",l:"Jaén",pz:"12 meses",cat:"Urbanización",r:"Hasta 18%",w:"72%",bgi:"url("+RS(RS("/design/jardines-de-la-colina.webp"))+")"},{n:"Remate Av. Arequipa",l:"Lima",pz:"10 meses",cat:"Remate judicial",r:"Hasta 16%",w:"45%",bgi:"url("+RS(RS("/design/p-subastas.webp"))+")"}],
          phFacts:[{l:"Tasa anual",v:"Hasta 18%"},{l:"Plazo",v:"12 meses"},{l:"Mínimo",v:"S/ 10,000"},{l:"Abonos",v:"Mensuales"}],
          phSteps:[{t:"Firmado por ti",d:"Hoy 10:24",m:"✓",bg:"#10b981"},{t:"Validación notarial",d:"Hoy 16:05",m:"✓",bg:"#10b981"},{t:"Contrato digitalizado",d:"2 días hábiles",m:"3",bg:"#bc45e9"}],
          phBars2:["22%","30%","38%","46%","55%","66%","80%","100%"].map((h,i)=>({h,bg:i===7?"#6cdcff":"rgba(255,255,255,.28)"})),
          phMoves:[{t:"Abono mensual",d:"15 dic 2026 · Jardines de la Colina",v:"+S/ 666.67",s:"+",c:"#047857",bg:"rgba(16,185,129,.12)"},{t:"Contrato validado",d:"28 nov 2026 · Notaría",v:"✓",s:"✓",c:"#3f6fd8",bg:"rgba(63,111,216,.12)"},{t:"Inversión",d:"26 nov 2026 · Plan Avanza",v:"S/ 50,000",s:"↑",c:"#1c0f4c",bg:"#f1effa"}]};})(),
      chLbl:s.mobile?"12 meses":"12 meses",chLblFs:s.mobile?"11.5px":"12px",chTop:s.mobile?"64%":(s.narrow?"52%":"44%"),chW:s.mobile?"min(164px,42vw)":"236px",bigTop:s.mobile?"30%":"34%",bigDisp:s.mobile?"none":"block",bigFs:s.mobile?"clamp(84px,26vw,120px)":"clamp(120px,12vw,190px)",chPad:s.mobile?"10px 12px":"13px 15px",chFs:s.mobile?"17px":"22px",chH:s.mobile?"26px":"36px",chVal:s.ld===3||!s.ld?"11,400":"10,000",
      px1:"translateX("+(-6-(s.px||0)*14)+"%)",px2:"translateX("+(-30+(s.px||0)*14)+"%)",px3:"translateX("+(-8-(s.px||0)*22)+"%)",
      ldWords:[["Tu ","platita"],["trabaja ","por ti"],["cada ","mes."]].map(([pre,hi],i)=>{const wi=s.ldWi||0;return {pre,hi,tf:i===wi?"translateY(0)":(i<wi?"translateY(-110%)":"translateY(110%)"),op:i===wi?1:0,blur:i===wi?"none":"blur(6px)"};}),ldWordsOp:(s.ldPh||1)===1?1:0,ldWordsTf:(s.ldPh||1)===1?"none":"scale(.92)",
      ldShow:(s.ld||0)<3,ldPe:s.ld===2?"none":"auto",ldHole:s.ld===2?"300vmax":"0px",ldRingOp:s.ld===2?0:1,ldGlowOp:s.ld===2?0:1,ldLogoTf:s.ld===2?"scale(1.5)":(s.ldPh===2?"scale(1)":"scale(.7)"),ldLogoOp:s.ld===2?0:(s.ldPh===2?1:0),hvOp:s.hv?1:0,onHv:()=>{if(!this.state.hv)this.setState({hv:true});},
      faqGrid:s.mobile?"minmax(0,1fr)":"repeat(2,minmax(0,1fr))",faqCols:(s.mobile||(s.vw||0)<900)?"minmax(0,1fr)":"minmax(0,.8fr) minmax(0,1.2fr)",faqPos:(s.mobile||(s.vw||0)<900)?"static":"sticky",
      faqs:FAQ.map((x,i)=>{const o=s.faq===i;return {q:x[0],a:x[1],exp:o?"true":"false",rows:o?"1fr":"0fr",rot:o?"rotate(45deg)":"none",bg:o?"#f8f7fe":"#fff",bd:o?"#e0ddf2":"#e6e9f2",ic:o?"#fff":"#1c0f4c",ib:o?"var(--grad-brand)":"#f1effa",toggle:()=>this.setState(z=>({faq:z.faq===i?null:i}))};}),ldNum:Math.round(20*(1-Math.pow(1-(s.ldK||0),3))),ldPct:Math.round(100*(1-Math.pow(1-(s.ldK||0),3)))+"%",ldClip:s.ld===2?"inset(0 0 100% 0 round 0 0 48px 48px)":"inset(0 0 0% 0 round 0 0 0px 0px)",ldInTf:s.ld===2?"translateY(-40px) scale(.96)":"none",ldInOp:s.ld===2?0:1,
      cc:s.cc||"51",onCc:ev=>this.setState({cc:ev.target.value}),ccPh:({"51":"999 999 999","1":"(555) 123-4567","34":"612 345 678","52":"55 1234 5678","54":"11 2345 6789","56":"9 1234 5678","57":"300 123 4567"})[s.cc||"51"]||"Tu número",
      ccList:[["51","PE +51"],["57","CO +57"],["56","CL +56"],["593","EC +593"],["591","BO +591"],["52","MX +52"],["54","AR +54"],["58","VE +58"],["598","UY +598"],["595","PY +595"],["34","ES +34"],["1","US +1"]].map(([v,l])=>({v,l})),
      apCols:(s.mobile||(s.vw||0)<900)?"minmax(0,1fr)":"minmax(0,1fr) minmax(0,1fr)",apTextOrder:1,apPhOrder:2,apPhH:s.narrow?"600px":Math.min(700,(s.vh||900)-80)+"px",apSc:s.mobile?0.9:(s.narrow?1:Math.max(.72,Math.min(1,((s.vh||900)-110)/640))),isDeskApp:!s.narrow,apSecH:"auto",apStickPos:"relative",apStickMinH:"0",apPad:"clamp(72px,9vw,128px) 20px",apProg:Math.round(((s.appScr||0)+1)/6*100)+"%",apPills:!s.narrow,
      apScreens:["Explorar","Ficha","Invertir","Contrato","Mi cartera","Kids"].map((l,i)=>{const on=((s.appScr||0)%6)===i;return {l,c:on?"#1c0f4c":"#fff",bg:on?"#fff":"rgba(255,255,255,.06)",sh:on?"0 8px 20px rgba(255,255,255,.15)":"inset 0 0 0 1px rgba(255,255,255,.14)",pick:()=>this.setState({appScr:i})};}),
      
      
      
      isMob:s.narrow,isDesk:!s.narrow,youLbl:s.mobile?"Tú":"Tú estás aquí",youTop:s.mobile?"-30px":"-38px",youPad:s.mobile?"4px 10px":"6px 12px",pjScrim:s.mobile?"linear-gradient(180deg,rgba(28,15,76,.05) 0%,rgba(20,10,58,.7) 22%,rgba(20,10,58,.96) 40%)":"linear-gradient(180deg,rgba(28,15,76,.05) 0%,rgba(28,15,76,.35) 40%,rgba(20,10,58,.94) 100%)",pjBodyPad:s.mobile?"150px 18px 20px":"96px clamp(20px,3vw,32px) clamp(20px,3vw,32px)",jdW:s.mobile?"104px":"150px",jdH:s.mobile?"72px":"96px",jdJust:s.mobile?"flex-start":"flex-end",asCardD:s.mobile?"none":"block",heroCardBD:s.mobile?"none":"flex",kAgeCols:s.mobile?"repeat(4,minmax(0,1fr))":"repeat(8,minmax(0,1fr))",kAgeAR:s.mobile?"auto":"1",pjChainCols:s.mobile?"minmax(0,1fr)":"repeat(3,minmax(0,1fr))",
      asImgH:s.mobile?"260px":"clamp(360px,42vw,560px)",asImgOrd:s.mobile?-1:0,asImgScrim:s.mobile?"linear-gradient(0deg,#140a3c 0%,rgba(20,10,60,.15) 45%,transparent 70%)":"linear-gradient(90deg,#140a3c 0%,rgba(20,10,60,.2) 30%,transparent 60%)",
      bcGridD:s.mobile?"flex":"grid",bcGap:s.mobile?"14px":"20px",bcOx:s.mobile?"auto":"visible",bcBleed:s.mobile?"-20px":"0",bcPadX:s.mobile?"20px":"0",bcItemF:s.mobile?"0 0 82%":"initial",
      ws1:words(WS1,[3,4,5],s.wsA,false),ws2:words(WS2,[6,7],1,true),
      demoCols:s.mobile?"1fr":"minmax(0,1fr) 300px minmax(0,1fr)",phonePos:s.mobile?"relative":"sticky",
      demoSteps:DEMO.map((x,i)=>({...x,pick:()=>this.setState({demo:i}),chipBg:s.demo===i?"#1c0f4c":"#fff",chipColor:s.demo===i?"#fff":"#1c0f4c"})),
      demoLeft:[0,2].map(i=>({...DEMO[i],id:"demo-step-"+i,op:s.demo===i?1:0.28})),demoRight:[1,3].map(i=>({...DEMO[i],id:"demo-step-"+i,op:s.demo===i?1:0.28})),
      demoCur:DEMO[s.demo],ph0:s.demo===0,ph1:s.demo===1,ph2:s.demo===2,ph3:s.demo===3,
      phTabs:[["Inicio","home"],["Invertir","invertir"],["Cartera","cartera"],["Kids","award"]].map(([l,ic],i)=>({l,i:ic,c:s.demo===i?"#a234cc":"rgba(15,10,46,.64)",pick:()=>this.setState({demo:i})})),
      phBars:["30%","42%","38%","55%","50%","62%","58%","72%","80%","96%"],
      phActions:[{l:"Invertir",i:"zap"},{l:"Reinvertir",i:"arrowUpCircle"},{l:"Contratos",i:"fileSign"}],
      phProjects:[{n:"Condominio Los Andes",l:"Cajamarca",img:RS("/design/p-habilitaciones.webp")},{n:"Residencial Miraflores",l:"Lima",img:RS("/design/p-inmuebles.webp")},{n:"Paseo de las Palmeras",l:"Chiclayo",img:RS("/design/p-construccion.webp")}],
      phInvest:[{n:"Jardines de la Colina",l:"Jaén",cat:"Urbanización",r:"18% anual",w:"72%",img:RS("/design/jardines-de-la-colina.webp")},{n:"Remate Av. Arequipa",l:"Lima",cat:"Remate judicial",r:"16% anual",w:"45%",img:RS("/design/p-subastas.webp")}],
      phPays:[{d:"15",m:"OCT",t:"Abono mensual",s:"Jardines de la Colina",st:"Próximo",fc:"#a234cc",bg:"rgba(188,69,233,.1)"},{d:"15",m:"SEP",t:"Abono mensual",s:"Jardines de la Colina",st:"Pagado",fc:"#047857",bg:"rgba(16,185,129,.12)"},{d:"15",m:"AGO",t:"Abono mensual",s:"Jardines de la Colina",st:"Pagado",fc:"#047857",bg:"rgba(16,185,129,.12)"},{d:"15",m:"JUL",t:"Abono mensual",s:"Jardines de la Colina",st:"Pagado",fc:"#047857",bg:"rgba(16,185,129,.12)"}],
      projFlow:s.mobile?"column":"row",projCols:s.mobile?"none":"repeat(4,minmax(0,1fr))",
      bcFacts:[{l:"Proyectos en total",v:"8",i:"building"},{l:"Fundación del grupo",v:"2024",i:"calendar"},{l:"Partida registral",v:"SUNARP 11094181",i:"fileSign"},{l:"RUC oficial",v:"20613498878",i:"shield"}],
      cmpHead:[{i:"info",l:"Información",a:"#bc45e9"},{i:"banco",l:"Banco",a:"#6cdcff"},{i:"cajas",l:"Cajas",a:"#6cdcff"},{i:"fondos",l:"Fondos",a:"#6cdcff"},{i:"acciones",l:"Acciones",a:"#6cdcff"}],
      cmpRows:CMP.map((r,ri)=>({l:r[0],p:r[5],icon:r[6],col:r[7],tb:r[7]+"14",tbd:"1px solid "+r[7]+"2a",hasRate:!!r[8],hasBar:!!r[9],dir:r[9]?"column":"row",gap:r[9]?"0px":"8px",zb:ri%2?"rgba(28,15,76,.025)":"transparent",pzb:ri%2?"rgba(255,255,255,.06)":"transparent",
        cells:[0,1,2,3].map(i=>({h:CMPH[i],v:r[i+1],...rt(r[8]?r[8][i]:null),hasBar:!!r[9],bw:r[9]?(r[9][i]/20*100)+"%":"0%",dir:r[9]?"column":"row",gap:r[9]?"0px":"8px"}))})),
      cmpLegend:[[2,"Ventaja"],[1,"Parcial / variable"],[0,"Desventaja"]].map(([v,l])=>({l,...rt(v)})),
      planName:t[2],planRate:Math.round(t[1]*100),monthlyFmt:fmt(monthly),earningsFmt:fmt(earnings),totalFmt:fmt(s.amount+earnings),
      projects:[
        {name:"Urbanizaciones",icon:"urbanizacion",accent:"#007a96",image:RS("/design/p-habilitaciones.webp"),featured:true,bullets:["Lotes con alta proyección de crecimiento.","Zonas estratégicas y de alta demanda."]},
        {name:"Remates judiciales",icon:"remate",accent:"#3f6fd8",image:RS("/design/p-subastas.webp"),featured:false,bullets:["Propiedades por debajo del valor comercial.","Procesos 100% legales y transparentes."]},
        {name:"Compra y venta",icon:"inmueble",accent:"#7a45d6",image:RS("/design/p-inmuebles.webp"),featured:false,bullets:["Inmuebles con alto potencial.","Compra estratégica, venta rápida."]},
        {name:"Construcción",icon:"construccion",accent:"#a234cc",image:RS("/design/p-construccion.webp"),featured:false,bullets:["Residencial y comercial.","Rentabilidad desde la preventa."]}],
      pillars:[
        {icon:"fileSign",t:"Contrato notarial",d:"Cada inversión se formaliza con un contrato mutuo validado ante notario. Lo recibes digitalizado en 2 días hábiles."},
        {icon:"shield",t:"Garantía inmobiliaria",d:"Tu capital está respaldado por activos inmobiliarios reales, no por promesas ni fondos de terceros."},
        {icon:"lock",t:"Datos protegidos",d:"Tratamiento de datos personales bajo la Ley N.° 29733 y empresa formal con RUC y partida en SUNARP."}],
      bercorpFacts:[{v:"8",l:"Proyectos"},{v:"11094181",l:"SUNARP"},{v:"20613498878",l:"RUC"}],
      compareRows:[{c:"Rentabilidad anual",b:"3% – 5%",f:"5% – 10%",p:"14% – 20%"},{c:"Inversión mínima",b:"S/ 1,000+",f:"S/ 5,000+",p:"S/ 10,000"},{c:"Respaldo",b:"Fondo de seguro",f:"Patrimonio del fondo",p:"Activo inmobiliario"},{c:"Ingresos",b:"Al vencimiento",f:"Al rescate",p:"Mensuales"},{c:"Proceso",b:"Presencial",f:"Intermediarios",p:"100% online"}],
      perks:["Acceso prioritario antes del lanzamiento","Primeras oportunidades de inversión","Sin compromiso ni costo"],
      supervision:SUPERVISION,goQueEs:e=>{e&&e.preventDefault&&e.preventDefault();this.go("que-es");},
      proofs:[{i:"shield",v:"RUC 20613498878",l:"HOLDING BERCORP GROUP S.A.C. · contribuyente activo",href:"https://e-consultaruc.sunat.gob.pe/",ext:true,cta:"SUNAT ↗"},{i:"fileSign",v:"Partida 11094181",l:"Registro de Personas Jurídicas · SUNARP",href:"https://www.sunarp.gob.pe/",ext:true,cta:"SUNARP ↗"},{i:"lock",v:"Contrato de mutuo notarial",l:"Cada inversión se firma ante notario"},{i:"building",v:"Libro de Reclamaciones",l:"Canal oficial para consultas y reclamos",href:"/libro-de-reclamaciones",ext:false,cta:"Abrir ↗"}].map((x,k)=>({...x,bt:k?"1px solid rgba(255,255,255,.12)":"0"})),
      regErr:s.regErr||"",afErr:s.afErr||"",onRegToken:t=>this.setState({regToken:t}),onAfToken:t=>this.setState({afToken:t}),
      f:s.f,e,notSent:!s.sent,sent:s.sent,loading:s.loading,firstName:s.f.nombre.trim().split(" ")[0]||"inversionista",
      onNombre:ev=>this.setF("nombre",ev.target.value),onCorreo:ev=>this.setF("correo",ev.target.value),onTelefono:ev=>this.setF("telefono",ev.target.value),onMonto:ev=>this.setF("monto",ev.target.value),onMayor:ev=>this.setF("mayor",ev.target.checked),
      montoOptions:[["10-50k","S/ 10,000 – S/ 50,000"],["50-100k","S/ 50,000 – S/ 100,000"],["100-500k","S/ 100,000 – S/ 500,000"],["500k+","Más de S/ 500,000"],["explorando","Aún estoy explorando"]],
      submit:()=>{this.setState({tried:true});if(!ok)return;this.submitRegistro();},
      ...(()=>{const st=s.step||1,KEYS=[["nombre","correo"],["monto"],["telefono","mayor"]],bad=k=>KEYS[k-1].some(x=>err[x]);
        return {step:st,st1:st===1,st2:st===2,st3:st===3,canBack:st>1,stepTitle:["Tus datos","Tu monto","Tu contacto"][st-1],stepCta:st<3?"Continuar →":"Únete a la lista de espera",
          stepBars:[1,2,3].map(i=>i<=st?"linear-gradient(90deg,#6cdcff,#bc45e9)":"#e0ddf2"),
          stepBack:()=>this.setState({step:st-1,tried:false}),
          stepNext:()=>{if(bad(st)){this.setState({tried:true});return;}if(st<3){this.setState({step:st+1,tried:false});return;}this.setState({tried:true});this.submitRegistro();},
          monChips:[["10-50k","S/ 10K – 50K"],["50-100k","S/ 50K – 100K"],["100-500k","S/ 100K – 500K"],["500k+","Más de S/ 500K"],["explorando","Aún estoy explorando"]].map(([v,l])=>({l,sel:s.f.monto===v,pick:()=>this.setF("monto",v)}))};})(),
      ctaCols:s.mobile?"minmax(0,1fr)":(s.narrow&&!s.mobile)?"minmax(0,1.1fr) minmax(0,.9fr)":"minmax(0,1.2fr) minmax(0,.8fr)",ctaImgH:s.mobile?"300px":(s.narrow&&!s.mobile)?"380px":"440px",
      setA:()=>this.setState({dir:"A"}),setB:()=>this.setState({dir:"B"}),
      pillABg:dir==="A"?"#1c0f4c":"transparent",pillAColor:dir==="A"?"#fff":"#1c0f4c",
      pillBBg:dir==="B"?"#1c0f4c":"transparent",pillBColor:dir==="B"?"#fff":"#1c0f4c",
    };
  }
  render() {
    preload("/design/llama-hero-poster.webp", { as: "image", fetchPriority: "high" });
    const v: any = this.renderVals();
    return (
<div style={sx("position:relative;font-family:var(--font-nunito),sans-serif;color:#1c0f4c;overflow-x:clip")}>

  {v.ldShow ? (<>
  <div aria-hidden="true" style={sx(`position:fixed;inset:0;z-index:1000;overflow:hidden;display:flex;align-items:center;justify-content:center;pointer-events:${v.ldPe}`)}>
    <div style={sx(`position:absolute;left:50%;top:50%;width:${v.ldHole};height:${v.ldHole};transform:translate(-50%,-50%);border-radius:50%;box-shadow:0 0 0 200vmax #140a3c;transition:width .7s cubic-bezier(.76,0,.24,1),height .7s cubic-bezier(.76,0,.24,1)`)}></div>
    <div style={sx(`position:absolute;left:50%;top:50%;width:${v.ldHole};height:${v.ldHole};transform:translate(-50%,-50%);border-radius:50%;border:2px solid #6cdcff;box-shadow:0 0 40px 6px rgba(188,69,233,.55),inset 0 0 40px rgba(108,220,255,.4);opacity:${v.ldRingOp};transition:width .7s cubic-bezier(.76,0,.24,1),height .7s cubic-bezier(.76,0,.24,1),opacity .3s .4s`)}></div>
    <div style={sx(`position:absolute;inset:0;background:radial-gradient(circle at 50% 45%,rgba(188,69,233,.28),transparent 40%),radial-gradient(circle at 50% 60%,rgba(108,220,255,.16),transparent 50%);opacity:${v.ldGlowOp};transition:opacity .35s;pointer-events:none`)}></div>
    <div style={sx(`position:absolute;inset:0;display:flex;align-items:center;justify-content:center;padding:0 24px;opacity:${v.ldWordsOp};transform:${v.ldWordsTf};transition:opacity .35s,transform .5s cubic-bezier(.22,1,.36,1);pointer-events:none`)}>
      <div style={sx("position:relative;width:100%;max-width:900px;height:clamp(64px,11vw,128px);overflow:hidden;text-align:center")}>
        {(v.ldWords || []).map((w, __i1) => (<React.Fragment key={__i1}><div style={sx(`position:absolute;left:0;right:0;top:0;font-family:var(--font-display);font-size:clamp(48px,9vw,112px);font-weight:800;line-height:1.1;letter-spacing:-0.05em;color:#fff;transform:${w.tf};opacity:${w.op};filter:${w.blur};transition:transform .32s cubic-bezier(.76,0,.24,1),opacity .25s,filter .25s`)}>{w.pre}<span style={sx("color:#7fe3ff")}>{w.hi}</span></div></React.Fragment>))}
      </div>
    </div>
    <div style={sx(`position:relative;display:flex;flex-direction:column;align-items:center;gap:22px;transform:${v.ldLogoTf};opacity:${v.ldLogoOp};transition:transform .6s cubic-bezier(.22,1,.36,1),opacity .35s`)}>
      <div style={sx("position:relative;width:132px;height:132px;display:flex;align-items:center;justify-content:center")}>
        <div style={sx(`position:absolute;inset:0;border-radius:50%;background:conic-gradient(from -90deg,#6cdcff 0%,#bc45e9 ${v.ldPct},rgba(255,255,255,.08) ${v.ldPct});-webkit-mask:radial-gradient(circle,transparent 66%,#000 67%);mask:radial-gradient(circle,transparent 66%,#000 67%)`)}></div>
        <img src="/design/icon-512.png" alt="" style={sx("width:88px;height:88px;border-radius:24px;box-shadow:0 18px 40px rgba(0,0,0,.4)")} />
      </div>
      <div style={sx("font-family:var(--font-display);font-size:28px;font-weight:800;letter-spacing:-0.03em;color:#fff")}>platita<span style={sx("color:#e0a6f7")}>.pe</span></div>
    </div>
  </div>
</>) : null}
  <a className="skip-link" href="#main-content">Saltar al contenido principal</a>
  <nav style={sx(`position:fixed;top:0;left:0;right:0;z-index:60;padding:${v.navPad};transition:padding .3s ease`)}>
    <div style={sx(`max-width:1200px;margin:0 auto;border-radius:${v.navRadius};background:${v.navBg};backdrop-filter:blur(18px);-webkit-backdrop-filter:blur(18px);box-shadow:${v.navShadow};transition:all .3s ease`)}>
      <div style={sx("height:64px;padding:0 10px 0 clamp(14px,2vw,20px);display:flex;align-items:center;gap:12px")}>
        <a href="#top" onClick={v.goTop} style={sx("display:flex;align-items:center;flex-shrink:0")}><img src="/design/isotipo.webp" alt="Platita.pe" style={sx("height:36px;width:112px;object-fit:contain;object-position:left center;display:block")} /></a>
        {v.navFull ? (<>
          <div style={sx("flex:1;display:flex;justify-content:center;gap:2px;min-width:0")}>
            {(v.navItems || []).map((n, __i2) => (<React.Fragment key={__i2}><a href={n.href} onClick={n.click} style={sx(`padding:8px 14px;border-radius:9999px;font-size:14px;font-weight:700;text-decoration:none;white-space:nowrap;color:${n.color};background:${n.bg};transition:background .2s,color .2s`)} className="dch1">{n.l}</a></React.Fragment>))}
          </div>
          <div style={sx("display:flex;align-items:center;gap:6px;flex-shrink:0")}>
            <button onClick={v.goAsesores} style={sx("padding:10px 14px;border:0;border-radius:9999px;background:transparent;cursor:pointer;font-family:inherit;font-size:14px;font-weight:800;color:#a234cc;white-space:nowrap")} className="dch2">Quiero ser asesor</button>
            <DS.Button size="sm" onClick={v.goRegistro} style={sx("border-radius:9999px;white-space:nowrap")}>Lista de espera</DS.Button>
          </div>
        </>) : null}
        {v.navCompact ? (<>
          <div style={sx("margin-left:auto;display:flex;align-items:center;gap:4px")}>
            {v.navCta ? (<><DS.Button size="sm" onClick={v.goRegistro} style={sx("border-radius:9999px;white-space:nowrap;padding:9px 14px;font-size:13px")}>Lista de espera</DS.Button></>) : null}
            <button onClick={v.toggleNav} aria-label="Menú" style={sx("width:44px;height:44px;border:0;background:none;cursor:pointer;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:5px")}>
              <span style={sx(`display:block;width:20px;height:2px;border-radius:2px;background:#1c0f4c;transition:transform .2s;transform:${v.bar1}`)}></span>
              <span style={sx(`display:block;width:20px;height:2px;border-radius:2px;background:#1c0f4c;transition:opacity .2s;opacity:${v.bar2}`)}></span>
              <span style={sx(`display:block;width:20px;height:2px;border-radius:2px;background:#1c0f4c;transition:transform .2s;transform:${v.bar3}`)}></span>
            </button>
          </div>
        </>) : null}
      </div>
      {v.navMenu ? (<>
        <div style={sx("padding:6px 16px 18px;border-top:1px solid rgba(28,15,76,.08);display:flex;flex-direction:column;gap:2px")}>
          {(v.navItems || []).map((n, __i3) => (<React.Fragment key={__i3}><a href={n.href} onClick={n.click} style={sx(`padding:12px 4px;font-size:16px;font-weight:700;text-decoration:none;color:${n.colorM}`)}>{n.l}</a></React.Fragment>))}
          <button onClick={v.goAsesoresM} style={sx("margin-top:8px;height:48px;border-radius:14px;border:1.5px solid #bc45e9;background:#fff;cursor:pointer;font-family:inherit;font-size:15px;font-weight:800;color:#a234cc")}>Quiero ser asesor</button>
        </div>
      </>) : null}
    </div>
  </nav>

  <main id="main-content" tabIndex={-1}>
  <section id="top" style={sx(`position:relative;overflow:hidden;padding:${v.heroPadTop} 0 clamp(32px,5vw,64px);background:linear-gradient(180deg,#f4f2fc 0%,#f8f7fe 55%,#fff 100%)`)}>
    <div style={sx(`position:relative;max-width:1200px;margin:0 auto;padding:0 clamp(20px,4vw,40px);display:grid;grid-template-columns:${v.heroCols};align-items:center;gap:${v.heroGap}`)}>
      <div style={sx("min-width:0;max-width:580px")}>
        <h1 style={sx(`font-family:var(--font-display);margin:0;font-size:${v.h1Fs};font-weight:800;line-height:1;letter-spacing:-0.03em;text-wrap:balance`)}>Haz que tu <span style={sx("background-image:linear-gradient(135deg,#007a96,#bc45e9)")} className="gradient-text">platita</span> trabaje por ti.</h1>
        <p style={sx("margin:20px 0 0;max-width:480px;font-size:clamp(1.02rem,1.3vw,1.15rem);line-height:1.6;color:rgba(15,10,46,.66);text-wrap:pretty")}>Invierte desde <strong style={sx("color:#1c0f4c")}>S/ 10,000</strong> en proyectos inmobiliarios reales y recibe hasta <strong style={sx("color:#1c0f4c")}>20% anual</strong>, abonado cada mes bajo contrato notarial. Lanzamos en el cuarto trimestre de 2026.</p>
        <div style={sx("margin-top:28px;padding:6px;border-radius:18px;background:#fff;border:1px solid #d2dcea;box-shadow:0 18px 44px rgba(28,15,76,.10);display:flex;flex-wrap:wrap;gap:6px;align-items:center")}>
          <input type="email" value={v.heroEmail} onChange={v.onHeroEmail} placeholder="Tu correo electrónico" aria-label="Correo electrónico" style={sx("flex:1 1 200px;min-width:0;height:52px;border:none;outline:none;padding:0 14px;font-family:inherit;font-size:16px;font-weight:600;color:#1c0f4c;background:transparent")} />
          <DS.Button size="hero" onClick={v.heroSubmit} style={sx("flex:1 0 auto")}>Únete a la lista de espera</DS.Button>
        </div>
        <div style={sx("margin-top:14px;display:flex;flex-wrap:wrap;align-items:center;gap:8px 12px;font-size:13px;font-weight:700;color:rgba(15,10,46,.6)")}>
          <span style={sx("display:flex;align-items:flex-start;gap:8px;line-height:1.45")}><DS.Icon name="shield" size={16} color="#1c0f4c" accent="#6cdcff" style={sx("flex-shrink:0;margin-top:1px")} /><span>Empresa formal · <strong style={sx("color:#1c0f4c")}>RUC 20613498878</strong> · Partida SUNARP 11094181</span></span>
        </div>
        <button onClick={v.goAsesores} style={sx("margin-top:22px;width:100%;max-width:580px;display:flex;align-items:center;gap:14px;padding:10px 14px;border-radius:14px;border:1px solid #e0ddf2;cursor:pointer;text-align:left;font-family:inherit;color:#1c0f4c;background:rgba(255,255,255,.7);box-shadow:none;transition:border-color .2s,transform .2s")} className="dch3">
          <span style={sx("display:flex;flex-shrink:0")}><img decoding="async" src="/design/asesor-1.webp" alt="" style={sx("width:30px;height:30px;border-radius:50%;object-fit:cover;object-position:top;border:2px solid #fff")} /><img decoding="async" src="/design/asesor-2.webp" alt="" style={sx("width:30px;height:30px;border-radius:50%;object-fit:cover;object-position:top;border:2px solid #fff;margin-left:-12px")} /><img decoding="async" src="/design/asesor-3.webp" alt="" style={sx("width:30px;height:30px;border-radius:50%;object-fit:cover;object-position:top;border:2px solid #fff;margin-left:-12px")} /></span>
          <span style={sx("flex:1;min-width:0;display:flex;flex-direction:column;line-height:1.3")}><span style={sx("font-size:14px;font-weight:800")}>¿Eres asesor comercial?</span><span style={sx("font-size:12.5px;font-weight:600;color:rgba(15,10,46,.62)")}>Gana comisiones refiriendo inversionistas</span></span>
          <span style={sx("flex-shrink:0;font-size:14px;font-weight:900;color:#a234cc;white-space:nowrap")}>Postula →</span>
        </button>
      </div>
      <div style={sx(`position:relative;min-width:0;height:${v.heroVisH};display:flex;align-items:flex-end;justify-content:center`)}>
        <div aria-hidden="true" style={sx(`position:absolute;left:50%;bottom:6%;width:min(92%,${v.heroDisc});aspect-ratio:1;transform:translateX(-50%);border-radius:50%;background:radial-gradient(circle,rgba(108,220,255,.22) 0%,rgba(188,69,233,.14) 45%,transparent 70%)`)}></div>
        
        <video id="heroVid" data-src="/design/llama-hero-v5.mp4" poster="/design/llama-hero-poster.webp" width="540" height="960"muted={true} loop={true} preload="none" playsInline={true} aria-hidden="true" style={sx("position:relative;z-index:2;height:100%;width:auto;max-width:100%;aspect-ratio:9 / 15;object-fit:cover;object-position:center 45%;mix-blend-mode:multiply;filter:brightness(1.05) contrast(1.05);-webkit-mask-image:radial-gradient(ellipse 60% 60% at 50% 50%,#000 80%,transparent 100%);mask-image:radial-gradient(ellipse 60% 60% at 50% 50%,#000 80%,transparent 100%)")}></video>
        <div style={sx(`position:absolute;left:${v.cardAx};top:${v.chTop};z-index:3;width:${v.chW};padding:${v.chPad};border-radius:20px;background:rgba(255,255,255,.96);backdrop-filter:blur(12px);border:1px solid rgba(28,15,76,.06);box-shadow:0 1px 3px rgba(28,15,76,.05),0 24px 50px rgba(28,15,76,.16)`)}>
            <div style={sx("display:flex;flex-wrap:wrap;align-items:center;justify-content:space-between;gap:6px 8px;min-width:0")}><span style={sx(`min-width:0;font-size:${v.chLblFs};font-weight:800;letter-spacing:.06em;text-transform:uppercase;color:rgba(15,10,46,.64);white-space:nowrap;overflow:hidden;text-overflow:ellipsis`)}>{v.chLbl}</span><span style={sx(`flex-shrink:0;padding:3px 8px;border-radius:9999px;font-size:${v.chLblFs};font-weight:900;color:#047857;background:rgba(16,185,129,.12);white-space:nowrap`)}>14% anual</span></div>
            <div style={sx(`margin-top:4px;font-family:var(--font-display);font-size:${v.chFs};font-weight:800;line-height:1.05;letter-spacing:-0.03em;color:#1c0f4c;font-variant-numeric:tabular-nums`)}>S/ {v.chVal}</div>
            <svg viewBox="0 0 200 60" preserveAspectRatio="none" style={sx(`display:block;margin-top:8px;width:100%;height:${v.chH};overflow:visible`)}>
              <defs><linearGradient id="hcA" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#bc45e9" stopOpacity=".28"></stop><stop offset="1" stopColor="#6cdcff" stopOpacity="0"></stop></linearGradient><linearGradient id="hcL" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stopColor="#6cdcff"></stop><stop offset="1" stopColor="#bc45e9"></stop></linearGradient></defs>
              <path d="M0 52 L18 49 L36 47 L54 43 L72 41 L90 36 L108 33 L126 28 L144 24 L162 18 L180 13 L200 6 L200 60 L0 60 Z" fill="url(#hcA)" style={sx("animation:hc-fade 1.6s ease .4s both")}></path>
              <path d="M0 52 L18 49 L36 47 L54 43 L72 41 L90 36 L108 33 L126 28 L144 24 L162 18 L180 13 L200 6" fill="none" stroke="url(#hcL)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" pathLength="1" style={sx("stroke-dasharray:1;stroke-dashoffset:1;animation:hc-draw 1.8s cubic-bezier(.22,1,.36,1) .3s forwards")}></path>
              <circle cx="200" cy="6" r="5" fill="#bc45e9" stroke="#fff" strokeWidth="2" style={sx("animation:hc-fade .4s ease 1.9s both")}></circle>
            </svg>
            <div style={sx("margin-top:6px;display:flex;justify-content:space-between;gap:6px;font-size:12px;font-weight:800;color:rgba(15,10,46,.62)")}><span>S/ 10,000</span><span style={sx("color:#047857")}>+S/ 1,400 ganados</span></div>
          </div>
        <div style={sx(`position:absolute;right:${v.cardBx};top:74%;z-index:3;display:${v.heroCardBD};align-items:center;gap:${v.cGap};padding:${v.cPad};border-radius:16px;background:rgba(255,255,255,.95);backdrop-filter:blur(12px);border:1px solid rgba(28,15,76,.06);box-shadow:0 1px 3px rgba(28,15,76,.05),0 18px 40px rgba(28,15,76,.14)`)}>
            <span style={sx(`width:${v.cIco};height:${v.cIco};border-radius:11px;background:linear-gradient(135deg,#7a45d6,#a234cc);display:flex;align-items:center;justify-content:center;flex-shrink:0`)}><DS.Icon name="calendarCheck" size={20} color="#fff" accent="#e0a6f7" /></span>
            <span style={sx("display:flex;flex-direction:column;line-height:1.15")}><span style={sx(`font-family:var(--font-display);font-size:${v.cFs};font-weight:800;color:#1c0f4c;white-space:nowrap`)}>+S/ 116.67</span>{v.navFull ? (<><span style={sx("font-size:12px;font-weight:700;color:rgba(15,10,46,.6);white-space:nowrap")}>Tu abono cada mes</span></>) : null}</span>
          </div>
        
      </div>
    </div>
    
  </section>

  

    <div style={sx("border-top:1px solid rgba(28,15,76,.08);border-bottom:1px solid rgba(28,15,76,.08);background:#fff;padding:14px 20px")}>
      <div style={sx("max-width:1152px;margin:0 auto;display:flex;flex-wrap:wrap;align-items:center;justify-content:center;gap:12px 32px")}>
        <span style={sx("font-size:13px;font-weight:800;color:#1c0f4c")}>Respaldo legal</span>
        {(v.tickerItems || []).map((it, __it) => (<React.Fragment key={__it}><span style={sx("display:inline-flex;align-items:center;gap:10px")}><img src={it.src} alt={it.alt} decoding="async" style={sx("height:26px;width:auto")} /><span style={sx("font-size:13px;font-weight:700;color:rgba(15,10,46,.7)")}>{it.label}</span></span></React.Fragment>))}
      </div>
    </div>

  
  <section id="como-funciona" style={sx("position:relative;overflow:hidden;padding:clamp(40px,5vw,72px) clamp(12px,2vw,24px) clamp(64px,8vw,104px);background:var(--grad-dark-section);color:#fff")}>
    <div data-reveal="1" style={sx("position:relative;max-width:1240px;margin:0 auto")}>
      <div style={sx(`position:relative;aspect-ratio:${v.vbAR};min-height:440px;border-radius:clamp(24px,3vw,36px);overflow:hidden;background:#0d0826;box-shadow:0 40px 100px rgba(0,0,0,.45),inset 0 0 0 1px rgba(255,255,255,.08)`)}>
        {v.vslPlaying ? (<>
          <video src="/design/conocenos.mp4" poster="/design/vsl-thumb.webp" title="Conoce Platita.pe" controls={true} autoPlay={true} playsInline={true} preload="auto" onLoadedMetadata={v.vslStart} style={sx("position:absolute;inset:0;width:100%;height:100%;object-fit:contain;background:#000")}></video>
        </>) : null}
        {v.vslIdle ? (<>
          <img loading="lazy" src="/design/vsl-thumb.webp" alt="" decoding="async" style={sx(`position:absolute;inset:0;width:100%;height:100%;object-fit:cover;object-position:${v.vbPos}`)} />
          <div aria-hidden="true" style={sx(`position:absolute;inset:0;background:${v.vbScrim};pointer-events:none`)}></div>
          <div style={sx(`position:absolute;inset:0;padding:clamp(24px,5vw,64px);display:flex;flex-direction:column;justify-content:${v.vbJust};max-width:640px`)}>
            <h2 style={sx("font-family:var(--font-display);margin:18px 0 0;font-size:clamp(2.2rem,5vw,4.2rem);font-weight:800;line-height:.98;letter-spacing:-0.04em;text-wrap:balance")}>Tu platita, en <span style={sx("color:#7fe3ff")}>buenas manos</span>.</h2>
            <p style={sx("margin:14px 0 0;max-width:420px;font-size:clamp(15px,1.4vw,17px);line-height:1.6;color:rgba(255,255,255,.8);text-wrap:pretty")}>Conoce quiénes somos y por qué tu platita puede rendir más.</p>
            <button onClick={v.playVsl} aria-label="Reproducir video: conoce Platita.pe" style={sx("margin-top:26px;align-self:flex-start;display:inline-flex;align-items:center;gap:14px;padding:8px 22px 8px 8px;border:0;border-radius:9999px;cursor:pointer;font-family:inherit;font-size:15px;font-weight:900;color:#1c0f4c;background:#fff;box-shadow:0 20px 40px rgba(0,0,0,.35)")} className="dch4">
              <span style={sx("width:52px;height:52px;border-radius:50%;display:flex;align-items:center;justify-content:center;background:var(--grad-brand)")}><DS.Icon name="play" size={22} color="#fff" style={sx("margin-left:3px")} /></span>Ver video · 1:15
            </button>
          </div>
        </>) : null}
      </div>
      <div style={sx("max-width:1152px;margin:clamp(48px,6vw,80px) auto 0;padding:0 8px")}>
        <div style={sx("display:flex;flex-wrap:wrap;align-items:flex-end;justify-content:space-between;gap:12px 40px")}>
          <div>
            <h3 style={sx("font-family:var(--font-display);margin:14px 0 0;font-size:clamp(1.8rem,3.6vw,2.8rem);font-weight:800;line-height:1.05;letter-spacing:-0.03em;text-wrap:balance")}>De tu registro a tu <span style={sx("color:#7fe3ff")}>primer abono</span>.</h3>
          </div>
          <p style={sx("margin:0;max-width:340px;font-size:15px;line-height:1.6;color:rgba(255,255,255,.68)")}>Cuatro pasos, todo online y sin comisiones de apertura.</p>
        </div>
        <div style={sx(`position:relative;margin-top:clamp(28px,4vw,44px);display:grid;grid-template-columns:${v.cfCols};gap:clamp(12px,1.6vw,18px)`)}>
          {(v.cfSteps || []).map((s, __i4) => (<React.Fragment key={__i4}>
            <div style={sx("position:relative;min-width:0;border-radius:24px;padding:22px;background:rgba(255,255,255,.04);box-shadow:inset 0 0 0 1px rgba(255,255,255,.1);display:flex;flex-direction:column;gap:12px;overflow:hidden")}>
              <span style={sx(`position:relative;width:48px;height:48px;border-radius:15px;display:flex;align-items:center;justify-content:center;background:${s.bg}`)}><DS.Icon name={s.icon} size={24} color="#fff" accent={s.acc} /></span>
              <span style={sx("position:relative;font-family:var(--font-display);font-size:18px;font-weight:800;line-height:1.2")}>{s.t}</span>
              <span style={sx("position:relative;font-size:14px;line-height:1.55;color:rgba(255,255,255,.66)")}>{s.d}</span>
              <span style={sx("position:relative;margin-top:auto;align-self:flex-start;display:inline-flex;align-items:center;gap:6px;padding:5px 11px;border-radius:9999px;font-size:12px;font-weight:800;background:rgba(255,255,255,.08)")}><DS.Icon name="zap" size={12} variant="line" color="#6cdcff" />{s.time}</span>
            </div>
          </React.Fragment>))}
        </div>
        <div style={sx("margin-top:clamp(28px,4vw,40px);display:flex;flex-wrap:wrap;align-items:center;gap:16px 28px")}>
          <DS.Button size="hero" onClick={v.goRegistro} trailingArrow={true}>Únete a la lista de espera</DS.Button>
          <div style={sx("display:flex;flex-wrap:wrap;gap:10px 20px;font-size:13px;font-weight:700;color:rgba(255,255,255,.72)")}>
            <span style={sx("display:inline-flex;align-items:center;gap:6px")}><DS.Icon name="fileSign" size={16} color="#fff" accent="#bc45e9" />Contrato notarial</span>
            <span style={sx("display:inline-flex;align-items:center;gap:6px")}><DS.Icon name="shield" size={16} color="#fff" accent="#6cdcff" />Respaldo en activos reales</span>
          </div>
        </div>
      </div>
    </div>
  </section>

  
  <section id="planes" style={sx("position:relative;overflow:hidden;padding:clamp(56px,8vw,104px) 20px;background:#fff")}>
    <div data-reveal="1" style={sx("position:relative;max-width:1152px;margin:0 auto")}>
      <div style={sx("display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,420px),1fr));gap:24px 48px;align-items:end")}>
        <div>
          <h2 style={sx("font-family:var(--font-display);margin:16px 0 0;font-size:clamp(2.2rem,4.8vw,3.6rem);font-weight:800;line-height:1.04;letter-spacing:-0.03em;color:#1c0f4c;text-wrap:balance")}>Cada escalón, <span style={sx("color:#a234cc")}>más rentabilidad</span>.</h2>
          <p style={sx("margin:14px 0 0;max-width:460px;font-size:16px;line-height:1.6;color:rgba(15,10,46,.66)")}>Cuatro planes que suben contigo. Mueve el monto o toca un escalón: verás tu plan, tu abono mensual y tu proyección.</p>
        </div>
        <div style={sx("border-radius:24px;padding:20px 22px 12px;background:#fff;border:1px solid #d2dcea;box-shadow:var(--shadow-card)")}>
          <div style={sx("display:flex;justify-content:space-between;align-items:baseline;gap:12px;flex-wrap:wrap")}><span style={sx("font-size:12px;font-weight:800;letter-spacing:.12em;text-transform:uppercase;color:rgba(15,10,46,.64)")}>Tengo para invertir</span><span style={sx("font-family:var(--font-display);font-size:clamp(1.6rem,3vw,2.1rem);font-weight:800;color:#1c0f4c;font-variant-numeric:tabular-nums")}>S/ {v.amountFmt}</span></div>
          <div style={sx("margin-top:8px")}><DS.RangeSlider ariaLabel="Monto a invertir" min={0} max={1000} step={2} value={v.sliderPos} onChange={v.onSlider} ticks={v.ticks} /></div>
        </div>
      </div>
      <div style={sx(`margin-top:clamp(28px,4vw,44px);display:grid;grid-template-columns:${v.plGrid};gap:20px;align-items:stretch`)}>
        <div style={sx("position:relative;border-radius:28px;padding:clamp(18px,3vw,28px) clamp(12px,2.4vw,24px) 0;background:linear-gradient(180deg,#f8f7fe,#f1eefb);border:1px solid #e0ddf2;display:flex;flex-direction:column;min-width:0;overflow:hidden")}>
          <div style={sx("display:flex;justify-content:space-between;align-items:center;gap:12px;flex-wrap:wrap")}><span style={sx("font-size:12px;font-weight:900;letter-spacing:.14em;text-transform:uppercase;color:rgba(15,10,46,.64)")}>Tu escalera de rentabilidad</span><span style={sx("font-size:12px;font-weight:700;color:rgba(15,10,46,.64)")}>Tasa anual · abono mensual</span></div>
          <div style={sx(`position:relative;flex:1;min-height:${v.plStairH};margin-top:18px;display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:${v.plGap};align-items:end`)}>
            {(v.stairs || []).map((st, __i5) => (<React.Fragment key={__i5}>
              <button onClick={st.pick} aria-label={st.name} aria-pressed={st.pressed} style={sx(`position:relative;height:${st.h};min-width:0;border:0;padding:0;cursor:pointer;font-family:inherit;text-align:left;display:flex;flex-direction:column;justify-content:flex-start;border-radius:18px 18px 0 0;background:${st.bg};box-shadow:${st.sh};transition:background .4s,box-shadow .4s,transform .4s cubic-bezier(.22,1,.36,1);transform:${st.tf}`)} className="dch5">
                {st.on ? (<><span style={sx(`position:absolute;left:50%;top:${v.youTop};z-index:2;transform:translateX(-50%);white-space:nowrap;padding:${v.youPad};border-radius:9999px;font-size:12px;font-weight:900;letter-spacing:.06em;text-transform:uppercase;color:#fff;background:#1c0f4c;box-shadow:0 8px 20px rgba(28,15,76,.25)`)}>{v.youLbl}</span></>) : null}
                <span style={sx(`padding:${v.plPad};display:flex;flex-direction:column;gap:4px;min-width:0`)}>
                  <span style={sx(`font-family:var(--font-display);font-size:${v.plRateFs};font-weight:800;line-height:1;letter-spacing:-0.03em;color:${st.rc}`)}>{st.rate}%</span>
                  <span style={sx(`font-size:${v.plNameFs};font-weight:900;line-height:1.2;color:${st.nc}`)}>{st.short}</span>
                  <span style={sx(`font-size:12px;font-weight:700;color:${st.mc};white-space:nowrap`)}>{st.minL}</span>
                </span>
              </button>
            </React.Fragment>))}
          </div>
        </div>
        <div style={sx(`position:relative;overflow:hidden;border-radius:28px;padding:clamp(22px,3.4vw,34px);color:#fff;background:${v.plBg};box-shadow:0 30px 70px rgba(28,15,76,.28);transition:background .5s;display:flex;flex-direction:column;min-width:0`)}>
          <div style={sx("position:relative;display:flex;justify-content:space-between;align-items:center;gap:12px")}>
            <span style={sx("display:inline-flex;align-items:center;gap:8px;padding:6px 12px;border-radius:9999px;font-size:12px;font-weight:900;letter-spacing:.08em;text-transform:uppercase;background:rgba(255,255,255,.14);box-shadow:inset 0 0 0 1px rgba(255,255,255,.22)")}>Nivel {v.planNum} de 4</span>
            <span style={sx("display:flex;gap:4px")}>{(v.tierSegsW || []).map((g, __i6) => (<React.Fragment key={__i6}><span style={sx(`width:22px;height:6px;border-radius:9999px;background:${g}`)}></span></React.Fragment>))}</span>
          </div>
          <div style={sx("position:relative;margin-top:18px;font-family:var(--font-display);font-size:clamp(1.9rem,3.4vw,2.6rem);font-weight:800;line-height:1.02;letter-spacing:-0.03em")}>{v.planName}</div>
          <div style={sx("position:relative;margin-top:6px;font-size:15px;font-weight:600;color:rgba(255,255,255,.78)")}>{v.planTag}</div>
          <div style={sx("position:relative;margin-top:22px;padding:18px;border-radius:20px;background:rgba(255,255,255,.1);box-shadow:inset 0 0 0 1px rgba(255,255,255,.16);display:grid;grid-template-columns:1fr 1fr;gap:14px")}>
            <div style={sx("grid-column:1 / -1")}><div style={sx("font-size:12px;font-weight:800;letter-spacing:.1em;text-transform:uppercase;color:rgba(255,255,255,.7)")}>Recibirías cada mes</div><div style={sx("margin-top:4px;font-family:var(--font-display);font-size:clamp(2.2rem,4.4vw,3.2rem);font-weight:800;line-height:1;letter-spacing:-0.03em;font-variant-numeric:tabular-nums")}>S/ {v.monthlyFmt}</div></div>
            <div><div style={sx("font-size:12px;font-weight:700;color:rgba(255,255,255,.7)")}>Tasa anual</div><div style={sx("font-family:var(--font-display);font-size:20px;font-weight:800")}>{v.planRate}%</div></div>
            <div><div style={sx("font-size:12px;font-weight:700;color:rgba(255,255,255,.7)")}>En 12 meses</div><div style={sx("font-family:var(--font-display);font-size:20px;font-weight:800;font-variant-numeric:tabular-nums")}>S/ {v.annualFmt}</div></div>
          </div>
          <div style={sx("position:relative;margin-top:16px;display:flex;flex-direction:column;gap:8px;font-size:14px;font-weight:700;color:rgba(255,255,255,.88)")}>
            <span style={sx("display:flex;align-items:center;gap:8px")}><DS.Icon name="check" size={16} variant="line" strokeWidth={2.6} color="#6cdcff" />Contrato mutuo notarial a 12 meses</span>
            <span style={sx("display:flex;align-items:center;gap:8px")}><DS.Icon name="check" size={16} variant="line" strokeWidth={2.6} color="#6cdcff" />Abono de intereses cada mes</span>
            <span style={sx("display:flex;align-items:center;gap:8px")}><DS.Icon name="check" size={16} variant="line" strokeWidth={2.6} color="#6cdcff" />Respaldo en activos inmobiliarios</span>
          </div>
          <div style={sx("position:relative;margin-top:auto;padding-top:22px;display:flex;flex-wrap:wrap;gap:10px 18px;align-items:center")}>
            <button onClick={v.goRegistro} style={sx("height:52px;padding:0 22px;border:0;border-radius:14px;cursor:pointer;font-family:inherit;font-size:15px;font-weight:900;color:#1c0f4c;background:#fff;box-shadow:0 12px 30px rgba(0,0,0,.2)")} className="dch6">Únete a la lista de espera →</button>
            <button onClick={v.openSim} style={sx("min-height:44px;padding:0 4px;border:0;background:none;cursor:pointer;font-family:inherit;font-size:14px;font-weight:800;color:#fff;text-decoration:underline;text-underline-offset:4px;text-decoration-color:rgba(255,255,255,.45)")}>Ver proyección ↓</button>
          </div>
        </div>
      </div>
      <div style={sx("margin-top:16px;border-radius:20px;padding:16px 20px;background:#f5f3fc;border:1px solid #e0ddf2;display:flex;flex-wrap:wrap;align-items:center;gap:12px 20px")}>
        <div style={sx("display:flex;align-items:center;gap:10px;flex:1 1 280px;min-width:0")}><DS.Icon name="escalon" size={22} color="#1c0f4c" accent="#bc45e9" /><span style={sx("font-size:15px;font-weight:800;color:#1c0f4c")}>{v.lvTitle}</span></div>
        <span style={sx("flex:1 1 260px;font-size:13px;line-height:1.5;color:rgba(15,10,46,.62)")}>Al subir de plan, tu saldo se consolida en un nuevo contrato de 12 meses con la nueva tasa.</span>
      </div>
      <div id="simulador" style={sx(`margin-top:16px;border-radius:24px;padding:clamp(18px,3vw,28px);background:#fff;border:1px solid #d2dcea;box-shadow:var(--shadow-card);display:grid;grid-template-columns:${v.prjCols};gap:clamp(18px,3vw,32px);align-items:center`)}>
        <div style={sx(`min-width:0;grid-column:${v.prjSelSpan}`)}>
          <div style={sx("font-size:12px;font-weight:800;letter-spacing:.12em;text-transform:uppercase;color:rgba(15,10,46,.64);margin-bottom:12px")}>Proyección · ¿Por cuánto tiempo?</div>
          <div style={sx("display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:8px;white-space:nowrap")}>
            <DS.OptionButton selected={v.m12} onClick={v.set12}>12 meses</DS.OptionButton>
            <DS.OptionButton selected={v.m18} onClick={v.set18}>18 meses</DS.OptionButton>
            <DS.OptionButton selected={v.m24} onClick={v.set24}>24 meses</DS.OptionButton>
          </div>
        </div>
        <div style={sx("min-width:0")}>
          <div style={sx("font-size:12px;font-weight:700;color:rgba(15,10,46,.64);margin-bottom:8px")}>Ganancia acumulada</div>
          <div style={sx("display:flex;align-items:flex-end;gap:3px;height:64px")}>{(v.cumBarsL || []).map((b, __i7) => (<React.Fragment key={__i7}><div style={sx(`flex:1;border-radius:4px 4px 0 0;background:${b.bg};height:${b.h}`)}></div></React.Fragment>))}</div>
          <div style={sx("display:flex;justify-content:space-between;margin-top:6px;font-size:12px;font-weight:700;color:rgba(15,10,46,.64)")}><span>Mes 1</span><span>Mes {v.months}</span></div>
        </div>
        <div style={sx("min-width:0;display:flex;flex-direction:column;gap:6px")}>
          <div style={sx("display:flex;justify-content:space-between;gap:8px;font-size:14px")}><span style={sx("color:rgba(15,10,46,.62)")}>Ganancia total</span><strong style={sx("color:#a234cc;font-variant-numeric:tabular-nums")}>S/ {v.earningsFmt}</strong></div>
          <div style={sx("display:flex;justify-content:space-between;gap:8px;font-size:14px")}><span style={sx("color:rgba(15,10,46,.62)")}>Capital + ganancia</span><strong style={sx("color:#1c0f4c;font-variant-numeric:tabular-nums")}>S/ {v.totalFmt}</strong></div>
          <div style={sx("font-size:12px;color:rgba(15,10,46,.62)")}>Abono mensual durante {v.months} meses</div>
        </div>
      </div>
      <p style={sx("margin:12px 0 0;font-size:13px;line-height:1.5;color:rgba(15,10,46,.66)")}>Montos referenciales. No constituye una promesa ni garantía de rentabilidad.</p>
      <div id="que-es" style={sx("margin-top:28px;border-radius:24px;padding:clamp(20px,3vw,32px);background:#f8f7fe;border:1px solid #e0ddf2")}>
        <h3 style={sx("font-family:var(--font-display);margin:0;font-size:clamp(1.4rem,2.6vw,1.9rem);font-weight:800;line-height:1.15;letter-spacing:-0.02em;color:#1c0f4c")}>Qué es y qué no es Platita.pe</h3>
        <p style={sx("margin:8px 0 0;max-width:640px;font-size:15px;line-height:1.6;color:rgba(15,10,46,.7)")}>Antes de unirte, esto es lo que firmas y lo que no te cubre.</p>
        <div style={sx("margin-top:20px;display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,300px),1fr));gap:20px 40px")}>
          <div>
            <div style={sx("font-size:15px;font-weight:900;color:#1c0f4c")}>Lo que es</div>
            <ul style={sx("margin:10px 0 0;padding:0;list-style:none;display:flex;flex-direction:column;gap:10px")}>
              <li style={sx("display:flex;gap:10px;font-size:14.5px;line-height:1.5;color:rgba(15,10,46,.78)")}><DS.Icon name="check" size={18} variant="line" strokeWidth={2.6} color="#00728c" /><span>Un <strong style={sx("color:#1c0f4c")}>contrato de mutuo</strong> con HOLDING BERCORP GROUP S.A.C., firmado ante notario por 12 meses.</span></li>
              <li style={sx("display:flex;gap:10px;font-size:14.5px;line-height:1.5;color:rgba(15,10,46,.78)")}><DS.Icon name="check" size={18} variant="line" strokeWidth={2.6} color="#00728c" /><span>Tu dinero financia proyectos inmobiliarios del grupo Bercorp, como Jardines de la Colina en Jaén.</span></li>
              <li style={sx("display:flex;gap:10px;font-size:14.5px;line-height:1.5;color:rgba(15,10,46,.78)")}><DS.Icon name="check" size={18} variant="line" strokeWidth={2.6} color="#00728c" /><span>Recibes intereses cada mes según tu plan, del 14% al 20% anual, con la tasa fijada en tu contrato.</span></li>
              {v.supervision ? (<><li style={sx("display:flex;gap:10px;font-size:14.5px;line-height:1.5;color:rgba(15,10,46,.78)")}><DS.Icon name="check" size={18} variant="line" strokeWidth={2.6} color="#00728c" /><span>{v.supervision}</span></li></>) : null}
            </ul>
          </div>
          <div>
            <div style={sx("font-size:15px;font-weight:900;color:#1c0f4c")}>Lo que no es</div>
            <ul style={sx("margin:10px 0 0;padding:0;list-style:none;display:flex;flex-direction:column;gap:10px")}>
              <li style={sx("display:flex;gap:10px;font-size:14.5px;line-height:1.5;color:rgba(15,10,46,.78)")}><DS.Icon name="x" size={18} variant="line" strokeWidth={2.6} color="#c2410c" /><span>No es un depósito bancario y <strong style={sx("color:#1c0f4c")}>no lo cubre el Fondo de Seguro de Depósitos</strong>.</span></li>
              <li style={sx("display:flex;gap:10px;font-size:14.5px;line-height:1.5;color:rgba(15,10,46,.78)")}><DS.Icon name="x" size={18} variant="line" strokeWidth={2.6} color="#c2410c" /><span>No es una ganancia garantizada: los montos del simulador son referenciales.</span></li>
              <li style={sx("display:flex;gap:10px;font-size:14.5px;line-height:1.5;color:rgba(15,10,46,.78)")}><DS.Icon name="x" size={18} variant="line" strokeWidth={2.6} color="#c2410c" /><span>No es dinero disponible en cualquier momento: la salida antes de los 12 meses depende de las condiciones de tu contrato.</span></li>
            </ul>
          </div>
        </div>
        <p style={sx("margin:20px 0 0;padding-top:16px;border-top:1px solid #e0ddf2;font-size:14px;line-height:1.6;color:rgba(15,10,46,.72)")}><strong style={sx("color:#1c0f4c")}>Riesgos que debes conocer:</strong> un proyecto puede retrasarse o rendir menos de lo previsto, y los pagos podrían demorarse. Lee tu contrato antes de firmar: ahí están la tasa, el cronograma de abonos, el respaldo y las condiciones de salida.</p>
      </div>
    </div>
  </section>

  

  
  {v.isDesk ? (<>
  <section id="respaldo" style={sx("position:relative;background:linear-gradient(180deg,#1c0f4c 0%,#221058 45%,#1f0f52 100%);color:#fff")}>
    <div style={sx("position:relative")}>
      <div style={sx("position:relative;overflow:hidden;padding:clamp(72px,9vw,120px) 0;display:flex;flex-direction:column;justify-content:center")}>
        <div style={sx(`position:relative;transform:translateY(${v.bcColTy});display:flex;flex-direction:column;align-items:center`)}>
        <div style={sx("position:relative;padding:0 24px;display:flex;flex-direction:column;align-items:center;text-align:center")}>
          
          <p style={sx(`font-family:var(--font-display);margin:0;max-width:1040px;font-size:${v.bcFs};font-weight:800;line-height:1.08;letter-spacing:-0.035em;display:flex;flex-wrap:wrap;justify-content:center;gap:0 .26em`)}>
            {(v.ws2 || []).map((w, __i23) => (<React.Fragment key={__i23}><span style={sx(`color:${w.c};transition:color .25s`)} className={w.cls}>{w.t}</span></React.Fragment>))}
          </p>
          <p style={sx(`margin:14px auto 0;max-width:640px;font-size:16px;line-height:1.6;color:rgba(255,255,255,.72);opacity:${v.bcSubOp};transform:translateY(${v.bcSubTy})`)}>Y detrás de Platita.pe está <strong style={sx("color:#fff")}>Bercorp Holding</strong>: el grupo que aporta los proyectos, las garantías y la solidez patrimonial.</p>
        </div>
        <div style={sx("position:relative;margin-top:clamp(28px,5vh,52px);width:min(1152px,calc(100vw - 48px));display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:24px;align-items:stretch")}>
          <div style={sx(`opacity:${v.bc0.op};transform:${v.bc0.tf};transition:opacity .2s linear;min-width:0`)}><div style={sx("height:100%;display:flex;flex-direction:column;border-radius:24px;padding:20px;background:rgba(255,255,255,.05);box-shadow:inset 0 0 0 1px rgba(255,255,255,.10);backdrop-filter:blur(12px)")}>
              <span style={sx("align-self:flex-start;display:inline-flex;align-items:center;gap:6px;border-radius:9999px;padding:4px 10px;font-size:12px;font-weight:900;text-transform:uppercase;letter-spacing:.06em;color:#6cdcff;background:rgba(255,255,255,.06);box-shadow:inset 0 0 0 1px rgba(255,255,255,.12)")}><DS.Icon name="urbanizacion" size={13} variant="line" color="#6cdcff" />Desarrollo inmobiliario</span>
              <div style={sx("margin-top:14px;height:72px;border-radius:14px;padding:12px;background:#fff;display:flex;align-items:center;justify-content:center;box-shadow:0 10px 24px rgba(0,0,0,.25)")}><img loading="lazy" decoding="async" src="/design/bercorp-real-state.webp" alt="Bercorp Real Estate" style={sx("height:100%;max-width:90%;object-fit:contain")} /></div>
              <h3 style={sx("font-family:var(--font-display);margin:16px 0 0;font-size:19px;font-weight:800")}>Bercorp Real Estate</h3>
              <p style={sx("margin:6px 0 0;font-size:13px;line-height:1.55;color:rgba(255,255,255,.7);flex:1")}>Desarrollo, habilitación urbana y comercialización de proyectos con alta plusvalía y respaldo en lotes.</p>
              <div style={sx("margin-top:14px;padding-top:12px;border-top:1px solid rgba(255,255,255,.10);display:flex;align-items:center;justify-content:space-between;gap:8px;font-size:12.5px;font-weight:700;color:rgba(255,255,255,.78)")}><span style={sx("display:inline-flex;align-items:center;gap:8px")}><span style={sx("width:8px;height:8px;border-radius:50%;background:#6cdcff;box-shadow:0 0 8px #6cdcff")}></span>Proyectos en ejecución</span><a href="https://bercorprealestate.com.pe/" target="_blank" rel="noopener noreferrer" style={sx("color:#fff;font-weight:800;white-space:nowrap")}>Conocer ↗</a></div>
            </div></div>
          <div style={sx(`opacity:${v.bc1.op};transform:${v.bc1.tf};transition:opacity .2s linear;min-width:0`)}><div style={sx("position:relative;height:100%;padding:1.5px;border-radius:24px;background:var(--grad-brand);box-shadow:0 24px 60px rgba(188,69,233,.30),0 0 0 6px rgba(188,69,233,.08)")}>
            <div style={sx("position:absolute;top:-13px;left:50%;transform:translateX(-50%);z-index:2;display:inline-flex;align-items:center;gap:5px;border-radius:9999px;background:#fff;padding:4px 12px;font-size:12px;font-weight:900;text-transform:uppercase;letter-spacing:.06em;color:#a234cc;white-space:nowrap;box-shadow:0 6px 16px rgba(28,15,76,.3)")}><DS.Icon name="star" size={11} color="#bc45e9" />Matriz central</div><div style={sx("height:100%;display:flex;flex-direction:column;border-radius:22.5px;padding:20px;background:linear-gradient(170deg,#2a1466 0%,#1f0f52 100%);backdrop-filter:blur(12px)")}>
              <span style={sx("align-self:flex-start;display:inline-flex;align-items:center;gap:6px;border-radius:9999px;padding:4px 10px;font-size:12px;font-weight:900;text-transform:uppercase;letter-spacing:.06em;color:#e0a6f7;background:rgba(255,255,255,.06);box-shadow:inset 0 0 0 1px rgba(255,255,255,.12)")}><DS.Icon name="shield" size={13} variant="line" color="#e0a6f7" />Matriz corporativa</span>
              <div style={sx("margin-top:14px;height:72px;border-radius:14px;padding:12px;background:linear-gradient(#181329,#090613);display:flex;align-items:center;justify-content:center;box-shadow:0 10px 24px rgba(0,0,0,.25)")}><img loading="lazy" decoding="async" src="/design/bercorp-holding.webp" alt="Holding Bercorp Group" style={sx("height:100%;max-width:90%;object-fit:contain")} /></div>
              <h3 style={sx("font-family:var(--font-display);margin:16px 0 0;font-size:19px;font-weight:800")}>Holding Bercorp Group</h3>
              <p style={sx("margin:6px 0 0;font-size:13px;line-height:1.55;color:rgba(255,255,255,.7);flex:1")}>Lidera el gobierno corporativo, respalda patrimonialmente la operación y garantiza los activos del grupo.</p>
              <div style={sx("margin-top:14px;padding-top:12px;border-top:1px solid rgba(255,255,255,.10);display:flex;align-items:center;justify-content:space-between;gap:8px;font-size:12.5px;font-weight:700;color:rgba(255,255,255,.78)")}><span style={sx("display:inline-flex;align-items:center;gap:8px")}><span style={sx("width:8px;height:8px;border-radius:50%;background:#6cdcff;box-shadow:0 0 8px #6cdcff")}></span>Matriz y respaldo patrimonial</span><a href="https://holdingbercorp.com.pe/" target="_blank" rel="noopener noreferrer" style={sx("color:#fff;font-weight:800;white-space:nowrap")}>Conocer ↗</a></div>
            </div></div></div>
          <div style={sx(`opacity:${v.bc2.op};transform:${v.bc2.tf};transition:opacity .2s linear;min-width:0`)}><div style={sx("height:100%;display:flex;flex-direction:column;border-radius:24px;padding:20px;background:rgba(255,255,255,.05);box-shadow:inset 0 0 0 1px rgba(255,255,255,.10);backdrop-filter:blur(12px)")}>
              <span style={sx("align-self:flex-start;display:inline-flex;align-items:center;gap:6px;border-radius:9999px;padding:4px 10px;font-size:12px;font-weight:900;text-transform:uppercase;letter-spacing:.06em;color:#a9b8ff;background:rgba(255,255,255,.06);box-shadow:inset 0 0 0 1px rgba(255,255,255,.12)")}><DS.Icon name="coins" size={13} variant="line" color="#a9b8ff" />Inversiones y finanzas</span>
              <div style={sx("margin-top:14px;height:72px;border-radius:14px;padding:12px;background:#9ecb28;display:flex;align-items:center;justify-content:center;box-shadow:0 10px 24px rgba(0,0,0,.25)")}><img loading="lazy" decoding="async" src="/design/bercorp-capital.webp" alt="Bercorp Capital" style={sx("height:100%;max-width:90%;object-fit:contain")} /></div>
              <h3 style={sx("font-family:var(--font-display);margin:16px 0 0;font-size:19px;font-weight:800")}>Bercorp Capital</h3>
              <p style={sx("margin:6px 0 0;font-size:13px;line-height:1.55;color:rgba(255,255,255,.7);flex:1")}>Gestión de capitales, estructuración financiera y colocación de fondos con respaldo real.</p>
              <div style={sx("margin-top:14px;padding-top:12px;border-top:1px solid rgba(255,255,255,.10);display:flex;align-items:center;justify-content:space-between;gap:8px;font-size:12.5px;font-weight:700;color:rgba(255,255,255,.78)")}><span style={sx("display:inline-flex;align-items:center;gap:8px")}><span style={sx("width:8px;height:8px;border-radius:50%;background:#6cdcff;box-shadow:0 0 8px #6cdcff")}></span>Estructuración activa</span><a href="https://bercorpcapital.com.pe/" target="_blank" rel="noopener noreferrer" style={sx("color:#fff;font-weight:800;white-space:nowrap")}>Conocer ↗</a></div>
            </div></div>
        </div>
        </div>
      </div>
    </div>
    <div style={sx("position:relative;padding:0 20px clamp(64px,8vw,104px)")}>
      <div style={sx("max-width:1152px;margin:0 auto")}>
        <div style={sx("margin-top:0;border-radius:20px;padding:clamp(20px,3vw,32px);background:rgba(255,255,255,.03);box-shadow:inset 0 0 0 1px rgba(255,255,255,.10);display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,200px),1fr));gap:24px 32px")}>
        {(v.bcFacts || []).map((f, __i24) => (<React.Fragment key={__i24}>
          <div style={sx("display:flex;gap:12px;align-items:flex-start;min-width:0")}>
            <div style={sx("width:40px;height:40px;flex-shrink:0;border-radius:14px;display:flex;align-items:center;justify-content:center;background:rgba(255,255,255,.06);box-shadow:inset 0 0 0 1px rgba(255,255,255,.12)")}><DS.Icon name={f.i} size={20} color="#fff" accent="#6cdcff" /></div>
            <div style={sx("min-width:0")}><div style={sx("font-family:var(--font-display);font-size:clamp(1.2rem,2vw,1.55rem);font-weight:800;line-height:1.05;word-break:break-word")}>{f.v}</div><div style={sx("margin-top:6px;font-size:12px;font-weight:800;text-transform:uppercase;letter-spacing:.12em;color:#6cdcff")}>{f.l}</div></div>
          </div>
        </React.Fragment>))}
      </div>
      </div>
    </div>
  </section>
  </>) : null}
  {v.isMob ? (<>
  
  <section id="ws2" style={sx("position:relative;background:#1c0f4c")}>
    <div style={sx("position:relative;padding:clamp(72px,14vw,120px) 24px clamp(40px,8vw,64px);display:flex;align-items:center;justify-content:center;overflow:hidden")}>
      <p style={sx("font-family:var(--font-display);position:relative;max-width:1040px;margin:0;font-size:clamp(2.1rem,5.4vw,4.6rem);font-weight:800;line-height:1.08;letter-spacing:-0.035em;text-align:center;display:flex;flex-wrap:wrap;justify-content:center;gap:0 .26em")}>
        {(v.ws2 || []).map((w, __i25) => (<React.Fragment key={__i25}><span style={sx(`color:${w.c};transition:color .25s`)} className={w.cls}>{w.t}</span></React.Fragment>))}
      </p>
    </div>
  </section>

  
  <section id="respaldo-legal" style={sx("position:relative;overflow:hidden;padding:clamp(40px,6vw,72px) 20px clamp(72px,9vw,120px);background:linear-gradient(180deg,#1c0f4c 0%,#1c0f4c 10%,transparent 40%),var(--grad-dark-section);color:#fff")}>
    <div data-reveal="1" style={sx("position:relative;max-width:1152px;margin:0 auto")}>
      <div style={sx("max-width:768px;margin:0 auto;text-align:center")}>
        <h2 style={sx("font-family:var(--font-display);margin:16px 0 0;font-size:clamp(2.1rem,4.6vw,3.4rem);font-weight:800;line-height:1.06;letter-spacing:-0.03em;text-wrap:balance")}>Detrás de Platita.pe está <span style={sx("color:#a234cc")}>Bercorp Holding</span>.</h2>
        <p style={sx("margin:16px auto 0;max-width:672px;font-size:1.02rem;line-height:1.625;color:rgba(255,255,255,.7)")}>Un grupo empresarial con presencia operativa en desarrollo inmobiliario y estructuración de capitales en el Perú. Platita.pe aporta la tecnología; el grupo aporta los proyectos, las garantías y la solidez patrimonial.</p>
      </div>
      <div style={sx(`margin-top:clamp(28px,4vw,40px);display:${v.bcGridD};grid-template-columns:repeat(3,minmax(0,1fr));gap:${v.bcGap};align-items:stretch;overflow-x:${v.bcOx};scroll-snap-type:x mandatory;margin-left:${v.bcBleed};margin-right:${v.bcBleed};padding:16px ${v.bcPadX} 8px;scrollbar-width:none;-webkit-overflow-scrolling:touch`)}>
        <div style={sx(`flex:${v.bcItemF};scroll-snap-align:center;position:relative;height:100%;display:flex;flex-direction:column;border-radius:24px;padding:24px;background:rgba(255,255,255,.04);box-shadow:inset 0 0 0 1px rgba(255,255,255,.10);backdrop-filter:blur(12px)`)}>
            <span style={sx("align-self:flex-start;display:inline-flex;align-items:center;gap:6px;border-radius:9999px;padding:4px 10px;font-size:12px;font-weight:900;text-transform:uppercase;letter-spacing:.06em;color:#6cdcff;background:rgba(255,255,255,.06);box-shadow:inset 0 0 0 1px rgba(255,255,255,.12)")}><DS.Icon name="urbanizacion" size={13} variant="line" color="#6cdcff" />Desarrollo inmobiliario</span>
            <div style={sx("margin-top:16px;height:88px;border-radius:16px;padding:14px;background:#fff;display:flex;align-items:center;justify-content:center;box-shadow:0 10px 24px rgba(0,0,0,.25)")}><img loading="lazy" decoding="async" src="/design/bercorp-real-state.webp" alt="Bercorp Real Estate" style={sx("height:100%;max-width:90%;object-fit:contain")} /></div>
            <h3 style={sx("font-family:var(--font-display);margin:20px 0 0;font-size:20px;font-weight:800")}>Bercorp Real Estate</h3>
            <p style={sx("margin:8px 0 0;font-size:13px;line-height:1.6;color:rgba(255,255,255,.7);flex:1")}>Desarrollo, habilitación urbana y comercialización de proyectos inmobiliarios en el Perú con alta plusvalía y respaldo en lotes.</p>
            <div style={sx("margin-top:20px;padding-top:16px;border-top:1px solid rgba(255,255,255,.10);display:flex;align-items:center;gap:8px;font-size:13px;font-weight:700;color:rgba(255,255,255,.78)")}><span style={sx("width:8px;height:8px;border-radius:50%;background:#6cdcff;box-shadow:0 0 8px #6cdcff")}></span>Proyectos en ejecución</div>
            <a href="https://bercorprealestate.com.pe/" target="_blank" rel="noopener noreferrer" style={sx("margin-top:14px;display:flex;align-items:center;justify-content:space-between;padding:11px 14px;border-radius:12px;font-size:13px;font-weight:800;color:#fff;background:rgba(255,255,255,.06);box-shadow:inset 0 0 0 1px rgba(255,255,255,.12)")}><span>Conocer Bercorp Real Estate</span><span>↗</span></a>
          </div>
        <div style={sx(`flex:${v.bcItemF};scroll-snap-align:center;position:relative;padding:1.5px;border-radius:24px;background:var(--grad-brand);box-shadow:0 24px 60px rgba(188,69,233,.30),0 0 0 6px rgba(188,69,233,.08)`)}>
          <div style={sx("position:absolute;top:-14px;left:50%;transform:translateX(-50%);z-index:2;display:inline-flex;align-items:center;gap:5px;border-radius:9999px;background:#fff;padding:5px 14px;font-size:12px;font-weight:900;text-transform:uppercase;letter-spacing:.06em;color:#a234cc;white-space:nowrap;box-shadow:0 6px 16px rgba(28,15,76,.3)")}><DS.Icon name="star" size={11} color="#bc45e9" />Matriz central</div>
          <div style={sx("height:100%;display:flex;flex-direction:column;border-radius:22.5px;padding:24px;background:linear-gradient(170deg,#2a1466 0%,#1f0f52 100%)")}>
            <span style={sx("align-self:flex-start;display:inline-flex;align-items:center;gap:6px;border-radius:9999px;padding:4px 10px;font-size:12px;font-weight:900;text-transform:uppercase;letter-spacing:.06em;color:#e0a6f7;background:rgba(255,255,255,.06);box-shadow:inset 0 0 0 1px rgba(255,255,255,.12)")}><DS.Icon name="shield" size={13} variant="line" color="#e0a6f7" />Matriz corporativa</span>
            <div style={sx("margin-top:16px;height:88px;border-radius:16px;padding:14px;background:linear-gradient(#181329,#090613);display:flex;align-items:center;justify-content:center;box-shadow:0 10px 24px rgba(0,0,0,.25)")}><img loading="lazy" decoding="async" src="/design/bercorp-holding.webp" alt="Holding Bercorp Group" style={sx("height:100%;max-width:90%;object-fit:contain")} /></div>
            <h3 style={sx("font-family:var(--font-display);margin:20px 0 0;font-size:20px;font-weight:800")}>Holding Bercorp Group</h3>
            <p style={sx("margin:8px 0 0;font-size:13px;line-height:1.6;color:rgba(255,255,255,.7);flex:1")}>Entidad matriz que lidera el gobierno corporativo, respalda patrimonialmente la operación y garantiza los activos del grupo.</p>
            <div style={sx("margin-top:20px;padding-top:16px;border-top:1px solid rgba(255,255,255,.10);display:flex;align-items:center;gap:8px;font-size:13px;font-weight:700;color:rgba(255,255,255,.78)")}><span style={sx("width:8px;height:8px;border-radius:50%;background:#6cdcff;box-shadow:0 0 8px #6cdcff")}></span>Matriz y respaldo patrimonial</div>
            <a href="https://holdingbercorp.com.pe/" target="_blank" rel="noopener noreferrer" style={sx("margin-top:14px;display:flex;align-items:center;justify-content:space-between;padding:11px 14px;border-radius:12px;font-size:13px;font-weight:800;color:#fff;background:var(--grad-brand);box-shadow:0 8px 20px rgba(188,69,233,.35)")}><span>Conocer Bercorp Group</span><span>↗</span></a>
          </div>
        </div>
        <div style={sx(`flex:${v.bcItemF};scroll-snap-align:center;position:relative;height:100%;display:flex;flex-direction:column;border-radius:24px;padding:24px;background:rgba(255,255,255,.04);box-shadow:inset 0 0 0 1px rgba(255,255,255,.10);backdrop-filter:blur(12px)`)}>
            <span style={sx("align-self:flex-start;display:inline-flex;align-items:center;gap:6px;border-radius:9999px;padding:4px 10px;font-size:12px;font-weight:900;text-transform:uppercase;letter-spacing:.06em;color:#a9b8ff;background:rgba(255,255,255,.06);box-shadow:inset 0 0 0 1px rgba(255,255,255,.12)")}><DS.Icon name="coins" size={13} variant="line" color="#a9b8ff" />Inversiones y finanzas</span>
            <div style={sx("margin-top:16px;height:88px;border-radius:16px;padding:14px;background:#9ecb28;display:flex;align-items:center;justify-content:center;box-shadow:0 10px 24px rgba(0,0,0,.25)")}><img loading="lazy" decoding="async" src="/design/bercorp-capital.webp" alt="Bercorp Capital" style={sx("height:100%;max-width:90%;object-fit:contain")} /></div>
            <h3 style={sx("font-family:var(--font-display);margin:20px 0 0;font-size:20px;font-weight:800")}>Bercorp Capital</h3>
            <p style={sx("margin:8px 0 0;font-size:13px;line-height:1.6;color:rgba(255,255,255,.7);flex:1")}>Gestión de capitales, estructuración financiera y colocación de fondos orientados a maximizar rentabilidad con respaldo real.</p>
            <div style={sx("margin-top:20px;padding-top:16px;border-top:1px solid rgba(255,255,255,.10);display:flex;align-items:center;gap:8px;font-size:13px;font-weight:700;color:rgba(255,255,255,.78)")}><span style={sx("width:8px;height:8px;border-radius:50%;background:#6cdcff;box-shadow:0 0 8px #6cdcff")}></span>Estructuración activa</div>
            <a href="https://bercorpcapital.com.pe/" target="_blank" rel="noopener noreferrer" style={sx("margin-top:14px;display:flex;align-items:center;justify-content:space-between;padding:11px 14px;border-radius:12px;font-size:13px;font-weight:800;color:#fff;background:rgba(255,255,255,.06);box-shadow:inset 0 0 0 1px rgba(255,255,255,.12)")}><span>Conocer Bercorp Capital</span><span>↗</span></a>
          </div>
      </div>
      <div style={sx("margin-top:clamp(40px,5vw,56px);border-radius:20px;padding:clamp(20px,3vw,32px);background:rgba(255,255,255,.03);box-shadow:inset 0 0 0 1px rgba(255,255,255,.10);display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,200px),1fr));gap:24px 32px")}>
        {(v.bcFacts || []).map((f, __i26) => (<React.Fragment key={__i26}>
          <div style={sx("display:flex;gap:12px;align-items:flex-start;min-width:0")}>
            <div style={sx("width:40px;height:40px;flex-shrink:0;border-radius:14px;display:flex;align-items:center;justify-content:center;background:rgba(255,255,255,.06);box-shadow:inset 0 0 0 1px rgba(255,255,255,.12)")}><DS.Icon name={f.i} size={20} color="#fff" accent="#6cdcff" /></div>
            <div style={sx("min-width:0")}><div style={sx("font-family:var(--font-display);font-size:clamp(1.2rem,2vw,1.55rem);font-weight:800;line-height:1.05;word-break:break-word")}>{f.v}</div><div style={sx("margin-top:6px;font-size:12px;font-weight:800;text-transform:uppercase;letter-spacing:.12em;color:#6cdcff")}>{f.l}</div></div>
          </div>
        </React.Fragment>))}
      </div>
    </div>
  </section>
  </>) : null}

  <section id="proyectos" style={sx("position:relative;overflow:hidden;padding:clamp(56px,8vw,104px) 20px;background:#fff;border-top:1px solid rgba(28,15,76,.06)")}>
    <div data-reveal="1" style={sx("position:relative;max-width:1152px;margin:0 auto")}>
      <div style={sx("display:flex;flex-wrap:wrap;justify-content:space-between;align-items:flex-end;gap:24px;margin-bottom:clamp(32px,5vw,56px)")}>
        <div style={sx("max-width:640px")}>
          <h2 style={sx("font-family:var(--font-display);margin:16px 0 0;font-size:clamp(2.2rem,4.8vw,3.6rem);font-weight:800;line-height:1.04;letter-spacing:-0.03em;color:#1c0f4c;text-wrap:balance")}>Invertimos en proyectos que generan <span style={sx("color:#a234cc")}>valor real</span>.</h2>
          <p style={sx("margin:14px 0 0;font-size:16px;line-height:1.6;color:rgba(15,10,46,.66)")}>Diversificamos en cuatro sectores estratégicos del Perú para generar <span style={sx("color:#a234cc;font-weight:700")}>rentabilidad sostenible</span>.</p>
        </div>
        <DS.CalloutChip icon="shield">Cada proyecto, respaldado en <span style={sx("color:#a234cc")}>activos reales</span>.</DS.CalloutChip>
      </div>
      <div style={sx(`display:grid;grid-template-columns:${v.pjCols};gap:clamp(16px,2.4vw,28px);align-items:stretch`)}>
        <div style={sx(`display:flex;flex-direction:${v.pjDir};gap:10px;min-width:0;overflow-x:auto;margin:${v.pjTabsMargin};padding:${v.pjTabsPad}`)}>
          {(v.sectors || []).map((p, __i17) => (<React.Fragment key={__i17}>
            <button onClick={p.pick} onMouseEnter={p.hover} style={sx(`flex:${p.flex};position:relative;overflow:hidden;text-align:left;cursor:pointer;font-family:inherit;display:flex;align-items:center;gap:14px;padding:16px 18px;border-radius:20px;border:1px solid ${p.bd};background:${p.bg};box-shadow:${p.sh};transition:background .3s,box-shadow .3s,border-color .3s`)}>
              <span style={sx(`position:absolute;left:0;top:14px;bottom:14px;width:3px;border-radius:0 3px 3px 0;background:${p.bar}`)}></span>
              <span style={sx(`width:44px;height:44px;flex-shrink:0;border-radius:14px;display:flex;align-items:center;justify-content:center;background:${p.tint}`)}><DS.Icon name={p.icon} size={22} color="#1c0f4c" accent={p.accent} /></span>
              <span style={sx("min-width:0;flex:1;display:flex;flex-direction:column;gap:2px")}>
                <span style={sx(`font-size:12px;font-weight:900;letter-spacing:.12em;color:${p.accent}`)}>{p.n}</span>
                <span style={sx("font-family:var(--font-display);font-size:16px;font-weight:800;color:#1c0f4c;white-space:nowrap")}>{p.name}</span>
                <span style={sx(`font-size:13px;line-height:1.4;color:rgba(15,10,46,.62);display:${p.tagDisp}`)}>{p.tag}</span>
              </span>
              <span style={sx(`font-size:18px;font-weight:900;color:${p.accent};opacity:${p.arrowOp};transition:opacity .3s`)}>→</span>
            </button>
          </React.Fragment>))}
        </div>
        <div style={sx("position:relative;min-width:0;border-radius:28px;overflow:hidden;min-height:clamp(440px,48vw,560px);display:flex;flex-direction:column;justify-content:flex-end;background:#1c0f4c;box-shadow:0 30px 80px rgba(28,15,76,.22)")}>
          <img loading="lazy" decoding="async" src={v.pj.image} alt={v.pj.name} style={sx("position:absolute;inset:0;width:100%;height:100%;object-fit:cover")} />
          <div style={sx(`position:absolute;inset:0;background:${v.pjScrim}`)}></div>
          <div style={sx("position:absolute;left:clamp(18px,3vw,32px);top:clamp(18px,3vw,28px);display:flex;flex-wrap:wrap;gap:8px")}>
            <span style={sx("display:inline-flex;align-items:center;gap:6px;padding:6px 12px;border-radius:9999px;font-size:12px;font-weight:900;color:#1c0f4c;background:#fff")}><DS.Icon name={v.pj.icon} size={14} variant="line" color={v.pj.accent} />{v.pj.name}</span>
            <span style={sx("display:inline-flex;align-items:center;gap:6px;padding:6px 12px;border-radius:9999px;font-size:12px;font-weight:800;color:#fff;background:rgba(255,255,255,.14);backdrop-filter:blur(10px);box-shadow:inset 0 0 0 1px rgba(255,255,255,.2)")}><DS.Icon name="pin" size={13} variant="line" color="#fff" />Proyectos verificados en Perú</span>
          </div>
          <div style={sx(`position:relative;padding:${v.pjBodyPad};color:#fff`)}>
            <h3 style={sx("font-family:var(--font-display);margin:0;font-size:clamp(1.6rem,3vw,2.4rem);font-weight:800;line-height:1.1;letter-spacing:-0.02em;text-wrap:balance")}>{v.pj.headline}</h3>
            <div style={sx("margin-top:16px;display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,180px),1fr));gap:8px 20px")}>
              {(v.pj.bullets || []).map((b, __i18) => (<React.Fragment key={__i18}>
                <div style={sx("display:flex;gap:8px;align-items:flex-start;font-size:14px;font-weight:600;line-height:1.45;color:rgba(255,255,255,.86)")}><span style={sx("width:18px;height:18px;margin-top:1px;flex-shrink:0;border-radius:50%;display:flex;align-items:center;justify-content:center;background:#fff")}><DS.Icon name="check" size={10} variant="line" strokeWidth={2.6} color="#a234cc" /></span>{b}</div>
              </React.Fragment>))}
            </div>
            <div style={sx("margin-top:20px;padding:14px;border-radius:18px;background:rgba(255,255,255,.08);backdrop-filter:blur(14px);box-shadow:inset 0 0 0 1px rgba(255,255,255,.14)")}>
              <div style={sx("font-size:12px;font-weight:900;letter-spacing:.12em;text-transform:uppercase;color:#6cdcff;margin-bottom:10px")}>Cómo genera valor</div>
              <div style={sx(`display:grid;grid-template-columns:${v.pjChainCols};gap:8px`)}>
                {(v.pj.chain || []).map((c, __i19) => (<React.Fragment key={__i19}>
                  <div style={sx("position:relative;display:flex;flex-direction:column;gap:6px;min-width:0")}>
                    <div style={sx("display:flex;align-items:center;gap:6px")}><span style={sx(`width:22px;height:22px;flex-shrink:0;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:12px;font-weight:900;color:#1c0f4c;background:${c.dot}`)}>{c.n}</span><span style={sx(`flex:1;height:2px;border-radius:2px;background:${c.line}`)}></span></div>
                    <span style={sx("font-size:13px;font-weight:700;line-height:1.35;color:#fff")}>{c.t}</span>
                  </div>
                </React.Fragment>))}
              </div>
            </div>
            <div style={sx("margin-top:18px;display:flex;flex-wrap:wrap;gap:12px;align-items:center;justify-content:space-between")}>
              <span style={sx("font-size:13px;font-weight:700;color:rgba(255,255,255,.72)")}>Rentabilidad según tu plan: <strong style={sx("color:#fff")}>14% – 20% anual</strong></span>
              <DS.Button size="md" onClick={v.goRegistro} trailingArrow={true}>Únete a la lista de espera</DS.Button>
            </div>
          </div>
        </div>
      </div>
      <div style={sx("margin-top:20px;display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,320px),1fr));gap:20px;align-items:center;padding:14px;border-radius:24px;background:#f5f3fc;border:1px solid #e0ddf2")}>
        <div style={sx("display:flex;align-items:center;gap:14px;min-width:0")}>
          <button onClick={v.openJard} aria-label="Ver video de Jardines de la Colina" style={sx(`position:relative;width:${v.jdW};height:${v.jdH};flex-shrink:0;border:0;padding:0;cursor:pointer;border-radius:14px;overflow:hidden;background:#1c0f4c`)}><img loading="lazy" decoding="async" src="/design/jardines-de-la-colina.webp" alt="Jardines de la Colina" style={sx("width:100%;height:100%;object-fit:cover;display:block")} /><span style={sx("position:absolute;inset:0;display:flex;align-items:center;justify-content:center;background:rgba(28,15,76,.28)")}><span style={sx("width:38px;height:38px;border-radius:50%;background:#fff;display:flex;align-items:center;justify-content:center;box-shadow:0 8px 20px rgba(0,0,0,.25)")}><span style={sx("width:0;height:0;margin-left:3px;border-left:11px solid #1c0f4c;border-top:7px solid transparent;border-bottom:7px solid transparent")}></span></span></span></button>
          <div style={sx("min-width:0")}><div style={sx("display:flex;align-items:center;gap:8px;flex-wrap:wrap")}><span style={sx("font-family:var(--font-display);font-size:17px;font-weight:800;color:#1c0f4c")}>Jardines de la Colina</span><span style={sx("font-size:11.5px;font-weight:900;letter-spacing:.08em;color:#1c0f4c;background:#6cdcff;border-radius:9999px;padding:3px 8px")}>PRE-VENTA</span></div><div style={sx("margin-top:2px;font-size:13px;color:rgba(15,10,46,.62)")}>Proyecto destacado · Urbanización en Jaén, Cajamarca</div></div>
        </div>
        <div style={sx(`display:flex;flex-wrap:wrap;gap:8px 20px;justify-content:${v.jdJust};font-size:13px;font-weight:700;color:#1c0f4c`)}>
          <span style={sx("display:inline-flex;align-items:center;gap:6px")}><DS.Icon name="fileSign" size={16} color="#1c0f4c" accent="#6cdcff" />Partida SUNARP 11094181</span>
          <span style={sx("display:inline-flex;align-items:center;gap:6px")}><DS.Icon name="building" size={16} color="#1c0f4c" accent="#bc45e9" />Bercorp Real Estate</span>
        </div>
      </div>
    </div>
  </section>


  <section id="comparativo" style={sx("position:relative;overflow:hidden;padding:clamp(56px,8vw,104px) 20px;background:#fff")}>
    <div data-reveal="1" style={sx("position:relative;max-width:1152px;margin:0 auto")}>
      <div style={sx("margin:0 auto 48px;max-width:720px;text-align:center")}>
        <h2 style={sx("font-family:var(--font-display);margin:0;font-size:clamp(2.2rem,4.8vw,3.6rem);font-weight:800;line-height:1.04;letter-spacing:-0.03em;color:#1c0f4c;text-wrap:balance")}>Compara y decide <span style={sx("color:#a234cc")}>con datos</span>.</h2>
        <p style={sx("margin:14px auto 0;max-width:560px;font-size:16px;line-height:1.6;color:rgba(15,10,46,.7)")}>Tu platita merece trabajar más duro. Mira cómo se compara Platita.pe con las alternativas tradicionales.</p>
      </div>
      <div style={sx("margin-top:clamp(28px,4vw,40px);display:flex;flex-direction:column;align-items:center;gap:14px")}>
        <span style={sx("font-size:13px;font-weight:800;color:rgba(15,10,46,.6)")}>Compara Platita.pe contra:</span>
        <div role="tablist" style={sx("display:flex;flex-wrap:wrap;justify-content:center;gap:6px;padding:6px;border-radius:9999px;background:#f5f3fc;box-shadow:inset 0 0 0 1px #e0ddf2")}>
          {(v.cmpTabs || []).map((t, __i27) => (<React.Fragment key={__i27}><button role="tab" aria-selected={t.sel} onClick={t.pick} style={sx(`display:inline-flex;align-items:center;gap:8px;height:42px;padding:0 16px;border:0;border-radius:9999px;cursor:pointer;font-family:inherit;font-size:14px;font-weight:800;color:${t.c};background:${t.bg};box-shadow:${t.sh};transition:all .25s`)}>{t.l}</button></React.Fragment>))}
        </div>
      </div>
      {v.cmpDuel ? (<>
        <div style={sx("margin:clamp(24px,3vw,32px) auto 0;max-width:920px;border-radius:28px;background:#fff;border:1px solid #d2dcea;box-shadow:var(--shadow-card);overflow:hidden")}>
          <div style={sx(`display:grid;grid-template-columns:${v.duelCols};align-items:stretch`)}>
            <div style={sx("padding:16px clamp(14px,2.4vw,24px);display:flex;align-items:center;gap:10px;background:#f8f7fe;border-bottom:1px solid #e0ddf2")}><span style={sx("width:38px;height:38px;border-radius:12px;background:#1c0f4c;display:flex;align-items:center;justify-content:center;flex-shrink:0")}><DS.Icon name={v.duelOpp.i} size={22} color="#fff" accent="#6cdcff" /></span><span style={sx("font-family:var(--font-display);font-size:18px;font-weight:800;color:#1c0f4c")}>{v.duelOpp.l}</span></div>
            <div style={sx("padding:16px clamp(14px,2.4vw,24px);display:flex;flex-wrap:wrap;align-items:center;gap:8px 10px;min-width:0;color:#fff;background:linear-gradient(135deg,#1c0f4c,#7a45d6)")}><span style={sx("width:38px;height:38px;border-radius:12px;background:#fff;display:flex;align-items:center;justify-content:center;flex-shrink:0;overflow:hidden")}><img decoding="async" src="/design/isotipo.webp" alt="" style={sx("height:30px;width:auto;object-fit:cover;object-position:left center;max-width:30px")} /></span><span style={sx("font-family:var(--font-display);font-size:18px;font-weight:800")}>Platita.pe</span></div>
          </div>
          {(v.duelRows || []).map((r, __i28) => (<React.Fragment key={__i28}>
            <div style={sx("border-top:1px solid #eef0f6")}>
              <div style={sx("padding:12px clamp(14px,2.4vw,24px) 0;display:flex;align-items:center;gap:8px;font-size:12px;font-weight:900;letter-spacing:.1em;text-transform:uppercase;color:rgba(15,10,46,.64)")}><DS.Icon name={r.icon} size={16} color={r.col} />{r.l}</div>
              <div style={sx(`display:grid;grid-template-columns:${v.duelCols};align-items:center`)}>
                <div style={sx("padding:8px clamp(14px,2.4vw,24px) 14px;min-width:0")}>
                  <div style={sx("display:flex;align-items:center;gap:8px")}>{r.hasRate ? (<><span style={sx(`width:22px;height:22px;flex-shrink:0;border-radius:50%;display:flex;align-items:center;justify-content:center;background:${r.rb}`)}><DS.Icon name={r.ri} size={12} variant="line" strokeWidth={3} color={r.rc} /></span></>) : null}<span style={sx("font-size:15px;font-weight:700;color:rgba(15,10,46,.75)")}>{r.v}</span></div>
                  {r.hasBar ? (<><div style={sx("margin-top:8px;height:8px;border-radius:9999px;background:#eef0f6;overflow:hidden")}><div style={sx(`height:100%;width:${r.bw};border-radius:9999px;background:#9aa6c4;transition:width .6s cubic-bezier(.22,1,.36,1)`)}></div></div></>) : null}
                </div>
                <div style={sx("padding:8px clamp(14px,2.4vw,24px) 14px;min-width:0;background:rgba(188,69,233,.04);align-self:stretch;display:flex;flex-direction:column;justify-content:center")}>
                  <div style={sx("display:flex;align-items:center;gap:8px")}><span style={sx("width:22px;height:22px;flex-shrink:0;border-radius:50%;display:flex;align-items:center;justify-content:center;background:var(--grad-brand)")}><DS.Icon name="check" size={12} variant="line" strokeWidth={3} color="#fff" /></span><span style={sx("font-size:15px;font-weight:900;color:#1c0f4c")}>{r.p}</span></div>
                  {r.hasBar ? (<><div style={sx("margin-top:8px;height:8px;border-radius:9999px;background:#eef0f6;overflow:hidden")}><div style={sx("height:100%;width:100%;border-radius:9999px;background:linear-gradient(90deg,#6cdcff,#bc45e9)")}></div></div></>) : null}
                </div>
              </div>
            </div>
          </React.Fragment>))}
        </div>
      </>) : null}
      {v.cmpFull ? (<>
      {v.isDesk ? (<>
        <div style={sx("overflow-x:auto;padding:16px 12px;margin:0 -12px")}>
          <div style={sx("min-width:880px;display:flex;gap:12px;align-items:stretch")}>
            <div style={sx("flex:1;border-radius:24px;overflow:hidden;border:1px solid rgba(28,15,76,.08);box-shadow:var(--shadow-card);background:#fff")}>
              <div style={sx("display:grid;grid-template-columns:0.85fr 1fr 1fr 1fr 1fr;background:#1c0f4c")}>
                {(v.cmpHead || []).map((c, __i29) => (<React.Fragment key={__i29}><div style={sx("min-height:140px;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:6px")}><div style={sx("width:52px;height:52px;border-radius:16px;display:flex;align-items:center;justify-content:center;background:rgba(255,255,255,.07);border:1px solid rgba(255,255,255,.14)")}><DS.Icon name={c.i} size={28} color="#fff" accent={c.a} /></div><span style={sx("font-size:12px;font-weight:700;color:rgba(255,255,255,.75)")}>{c.l}</span></div></React.Fragment>))}
              </div>
              {(v.cmpRows || []).map((r, __i30) => (<React.Fragment key={__i30}>
                <div style={sx(`display:grid;grid-template-columns:0.85fr 1fr 1fr 1fr 1fr;border-top:1px solid rgba(28,15,76,.06);background:${r.zb}`)}>
                  <div style={sx("min-height:68px;display:flex;align-items:center;gap:8px;padding:0 12px")}><div style={sx(`width:28px;height:28px;flex-shrink:0;border-radius:8px;display:flex;align-items:center;justify-content:center;background:${r.tb};border:${r.tbd}`)}><DS.Icon name={r.icon} size={18} color={r.col} /></div><span style={sx("font-size:13px;font-weight:800;color:#1c0f4c")}>{r.l}</span></div>
                  {(r.cells || []).map((c, __i31) => (<React.Fragment key={__i31}><div style={sx(`min-height:68px;display:flex;flex-direction:${c.dir};align-items:center;justify-content:center;gap:${c.gap};text-align:center;padding:0 10px;font-size:13px;font-weight:600;line-height:1.3;color:rgba(15,10,46,.66)`)}>{c.hasRate ? (<><span style={sx(`width:20px;height:20px;flex-shrink:0;border-radius:50%;display:inline-flex;align-items:center;justify-content:center;background:${c.rb}`)}><DS.Icon name={c.ri} size={12} variant="line" strokeWidth={2.2} color={c.rc} /></span></>) : null}<span>{c.v}</span>{c.hasBar ? (<><div style={sx("width:100%;max-width:96px;height:6px;border-radius:9999px;background:rgba(28,15,76,.08);overflow:hidden;margin-top:6px")}><div style={sx(`height:100%;border-radius:9999px;background:rgba(28,15,76,.32);width:${c.bw}`)}></div></div></>) : null}</div></React.Fragment>))}
                </div>
              </React.Fragment>))}
            </div>
            <div style={sx("width:190px;flex-shrink:0;border-radius:24px;overflow:hidden;background:var(--grad-featured);box-shadow:var(--shadow-featured-col);transform:scale(1.045);position:relative;z-index:2")}>
              <div style={sx("min-height:140px;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:6px;background:rgba(255,255,255,.08)")}><div style={sx("width:54px;height:54px;border-radius:50%;overflow:hidden;background:#1c0f4c")}><img decoding="async" src="/design/isotipo.webp" alt="platita.pe" style={sx("height:100%;object-fit:cover;object-position:left center")} /></div><span style={sx("font-family:var(--font-display);font-size:15px;font-weight:800;color:#fff")}>platita.pe</span></div>
              {(v.cmpRows || []).map((r, __i32) => (<React.Fragment key={__i32}>
                <div style={sx(`min-height:68px;display:flex;flex-direction:${r.dir};align-items:center;justify-content:center;gap:${r.gap};text-align:center;padding:0 12px;font-size:14px;font-weight:800;line-height:1.25;color:#fff;border-top:1px solid rgba(255,255,255,.14);background:${r.pzb}`)}>
                  {r.hasRate ? (<><span style={sx("width:20px;height:20px;flex-shrink:0;border-radius:50%;display:inline-flex;align-items:center;justify-content:center;background:#fff")}><DS.Icon name="check" size={12} variant="line" strokeWidth={2.4} color="#a234cc" /></span></>) : null}
                  <span>{r.p}</span>
                  {r.hasBar ? (<><div style={sx("width:100%;max-width:96px;height:6px;border-radius:9999px;background:rgba(255,255,255,.25);overflow:hidden;margin-top:6px")}><div style={sx("width:100%;height:100%;border-radius:9999px;background:#fff")}></div></div></>) : null}
                </div>
              </React.Fragment>))}
            </div>
          </div>
        </div>
      </>) : null}
      {v.isMob ? (<>
        <div style={sx("display:flex;flex-direction:column;gap:12px")}>
          {(v.cmpRows || []).map((r, __i33) => (<React.Fragment key={__i33}>
            <div style={sx("border-radius:18px;padding:14px;background:#fff;border:1px solid rgba(28,15,76,.08);box-shadow:var(--shadow-card)")}>
              <div style={sx("display:flex;align-items:center;gap:8px;margin-bottom:12px")}><div style={sx(`width:28px;height:28px;flex-shrink:0;border-radius:8px;display:flex;align-items:center;justify-content:center;background:${r.tb};border:${r.tbd}`)}><DS.Icon name={r.icon} size={18} color={r.col} /></div><span style={sx("font-size:14px;font-weight:800;color:#1c0f4c")}>{r.l}</span></div>
              <div style={sx("display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-bottom:8px")}>
                {(r.cells || []).map((c, __i34) => (<React.Fragment key={__i34}><div style={sx("border-radius:12px;padding:10px;text-align:center;background:rgba(28,15,76,.03);display:flex;flex-direction:column;align-items:center")}><div style={sx("font-size:11.5px;font-weight:800;text-transform:uppercase;letter-spacing:.04em;margin-bottom:4px;color:rgba(15,10,46,.6)")}>{c.h}</div><div style={sx("display:flex;align-items:center;justify-content:center;gap:6px;font-size:12px;font-weight:700;line-height:1.3;color:rgba(15,10,46,.66)")}>{c.hasRate ? (<><span style={sx(`width:20px;height:20px;flex-shrink:0;border-radius:50%;display:inline-flex;align-items:center;justify-content:center;background:${c.rb}`)}><DS.Icon name={c.ri} size={12} variant="line" strokeWidth={2.2} color={c.rc} /></span></>) : null}<span>{c.v}</span></div>{c.hasBar ? (<><div style={sx("width:100%;max-width:96px;height:6px;border-radius:9999px;background:rgba(28,15,76,.08);overflow:hidden;margin-top:6px")}><div style={sx(`height:100%;border-radius:9999px;background:rgba(28,15,76,.32);width:${c.bw}`)}></div></div></>) : null}</div></React.Fragment>))}
              </div>
              <div style={sx("border-radius:12px;padding:10px;display:flex;align-items:center;justify-content:center;gap:8px;background:var(--grad-featured)")}><span style={sx("font-size:11.5px;font-weight:900;text-transform:uppercase;color:rgba(255,255,255,.85)")}>platita.pe</span><span style={sx("font-size:13px;font-weight:900;color:#fff")}>{r.p}</span></div>
            </div>
          </React.Fragment>))}
        </div>
      </>) : null}
      </>) : null}
      <div style={sx("display:flex;flex-wrap:wrap;justify-content:center;gap:18px;margin-top:28px;font-size:12px;font-weight:700;color:rgba(15,10,46,.66)")}>
        {(v.cmpLegend || []).map((c, __i35) => (<React.Fragment key={__i35}><span style={sx("display:inline-flex;align-items:center;gap:6px")}>{c.hasRate ? (<><span style={sx(`width:20px;height:20px;flex-shrink:0;border-radius:50%;display:inline-flex;align-items:center;justify-content:center;background:${c.rb}`)}><DS.Icon name={c.ri} size={12} variant="line" strokeWidth={2.2} color={c.rc} /></span></>) : null}{c.l}</span></React.Fragment>))}
        <span style={sx("display:inline-flex;align-items:center;gap:6px")}><span style={sx("width:28px;height:6px;border-radius:9999px;background:rgba(28,15,76,.32)")}></span>Rentabilidad máx. vs 20%</span>
      </div>
      <p style={sx("text-align:center;font-size:13px;line-height:1.5;margin-top:12px;color:rgba(15,10,46,.66)")}>*Rentabilidades estimadas basadas en datos históricos del mercado peruano. No garantizan resultados futuros.</p>
      <div style={sx("margin-top:clamp(48px,6vw,72px);padding-top:clamp(32px,4vw,48px);border-top:1px solid rgba(28,15,76,.08)")}>
        <div style={sx("display:flex;flex-wrap:wrap;align-items:flex-end;justify-content:space-between;gap:12px 40px")}>
          <h3 style={sx("font-family:var(--font-display);margin:0;font-size:clamp(1.6rem,3vw,2.2rem);font-weight:800;line-height:1.08;letter-spacing:-0.03em;color:#1c0f4c;text-wrap:balance")}>Y así viaja tu platita, <span style={sx("color:#a234cc")}>paso a paso</span>.</h3>
          <p style={sx("margin:0;max-width:420px;font-size:15px;line-height:1.6;color:rgba(15,10,46,.66)")}>Cada sol queda amarrado a un contrato y a un activo real. Sin letra chica.</p>
        </div>
        <div style={sx(`position:relative;margin-top:24px;display:grid;grid-template-columns:${v.chainCols};gap:${v.chainGap}`)}>
        <div aria-hidden="true" style={sx(`position:absolute;${v.chainLine};background:linear-gradient(${v.chainDir},rgba(108,220,255,.5),rgba(188,69,233,.5))`)}>
          <span style={sx(`position:absolute;${v.chainDotPos};width:14px;height:14px;margin:-7px;border-radius:50%;background:#6cdcff;box-shadow:0 0 16px 4px rgba(108,220,255,.7);animation:${v.chainAnim} 4s cubic-bezier(.45,0,.55,1) infinite`)}></span>
        </div>
        {(v.chain || []).map((c, __i36) => (<React.Fragment key={__i36}>
          <div style={sx(`position:relative;display:flex;flex-direction:${v.chainItemDir};gap:14px;align-items:flex-start;min-width:0`)}>
            <span style={sx(`position:relative;z-index:1;width:56px;height:56px;flex-shrink:0;border-radius:18px;display:flex;align-items:center;justify-content:center;background:${c.bg};box-shadow:0 0 0 6px #fff,0 14px 30px rgba(28,15,76,.18)`)}><DS.Icon name={c.i} size={26} color="#fff" accent={c.a} /></span>
            <div style={sx("min-width:0")}><div style={sx("font-size:12px;font-weight:900;letter-spacing:.14em;color:#007a96")}>{c.n}</div><div style={sx("margin-top:4px;font-family:var(--font-display);font-size:18px;font-weight:800;line-height:1.2")}>{c.t}</div><div style={sx("margin-top:6px;font-size:14px;line-height:1.55;color:rgba(15,10,46,.66);max-width:250px")}>{c.d}</div></div>
          </div>
        </React.Fragment>))}
      </div>
      </div>
    </div>
  </section>

  <section id="registro" style={sx("padding:clamp(56px,8vw,104px) 20px;background:#eef2f9")}>
    <div style={sx("max-width:1152px;margin:0 auto;display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,420px),1fr));border-radius:32px;overflow:hidden;background:#fff;border:1px solid #d2dcea;box-shadow:var(--shadow-form)")}>
      <div style={sx("position:relative;overflow:hidden;padding:clamp(28px,4vw,48px);background:linear-gradient(160deg,#1c0f4c 0%,#3a1673 70%,#5a1f8f 100%);color:#fff;display:flex;flex-direction:column;min-height:420px")}>
        <div style={sx("position:relative")}>
          <h2 style={sx("font-family:var(--font-display);margin:14px 0 0;font-size:clamp(2rem,3.8vw,2.8rem);font-weight:900;line-height:1.06;letter-spacing:-0.02em;text-wrap:balance")}>Reserva tu lugar en el <span style={sx("color:#7fe3ff")}>primer grupo</span>.</h2>
          <div style={sx("margin-top:24px;display:flex;flex-direction:column;gap:12px")}>
            {(v.perks || []).map((k, __i37) => (<React.Fragment key={__i37}>
              <div style={sx("display:flex;gap:10px;align-items:center;font-size:15px;font-weight:700;color:rgba(255,255,255,.86)")}><span style={sx("width:22px;height:22px;flex-shrink:0;border-radius:50%;display:flex;align-items:center;justify-content:center;background:#fff")}><DS.Icon name="check" size={12} variant="line" strokeWidth={2.4} color="#a234cc" /></span>{k}</div>
            </React.Fragment>))}
          </div>
        </div>
        <div style={sx("position:relative;margin-top:auto;padding-top:36px")}>
          <div style={sx("font-family:var(--font-display);font-size:17px;font-weight:800;color:#fff")}>Verifica quién está detrás</div>
          <ul style={sx("margin:12px 0 0;padding:4px 18px;list-style:none;border-radius:20px;background:rgba(255,255,255,.07);box-shadow:inset 0 0 0 1px rgba(255,255,255,.14)")}>
            {(v.proofs || []).map((pf, __ip) => (<React.Fragment key={__ip}>
              <li style={sx(`display:flex;align-items:center;gap:12px;padding:12px 0;border-top:${pf.bt}`)}>
                <DS.Icon name={pf.i} size={20} color="#fff" accent="#6cdcff" />
                <span style={sx("flex:1;min-width:0;display:flex;flex-direction:column;line-height:1.35")}><span style={sx("font-size:14px;font-weight:800;color:#fff")}>{pf.v}</span><span style={sx("font-size:12.5px;color:rgba(255,255,255,.72)")}>{pf.l}</span></span>
                {pf.href ? (<><a href={pf.href} target={pf.ext ? "_blank" : undefined} rel={pf.ext ? "noopener noreferrer" : undefined} style={sx("flex-shrink:0;display:inline-flex;align-items:center;min-height:44px;font-size:13px;font-weight:800;color:#6cdcff;white-space:nowrap")}>{pf.cta}</a></>) : null}
              </li>
            </React.Fragment>))}
          </ul>
          <button type="button" onClick={v.openJard} style={sx("margin-top:12px;width:100%;display:flex;align-items:center;gap:14px;padding:10px;border:0;border-radius:18px;cursor:pointer;text-align:left;font-family:inherit;color:#fff;background:rgba(255,255,255,.07);box-shadow:inset 0 0 0 1px rgba(255,255,255,.14);transition:transform .2s")} className="dch4">
            <img loading="lazy" decoding="async" src="/design/jardines-de-la-colina.webp" alt="" style={sx("width:72px;height:56px;flex-shrink:0;border-radius:12px;object-fit:cover")} />
            <span style={sx("flex:1;min-width:0;display:flex;flex-direction:column;line-height:1.35")}><span style={sx("font-size:14px;font-weight:800")}>Jardines de la Colina</span><span style={sx("font-size:12.5px;color:rgba(255,255,255,.72)")}>Urbanización del grupo Bercorp en Jaén, Cajamarca</span></span>
            <span style={sx("flex-shrink:0;font-size:13px;font-weight:800;color:#6cdcff;white-space:nowrap")}>Ver video</span>
          </button>
        </div>
      </div>

      <div id="registro-form" style={sx("padding:clamp(24px,4vw,48px);min-width:0;display:flex;flex-direction:column;justify-content:center;scroll-margin-top:80px")}>
        {v.notSent ? (<>
          <div style={sx("display:flex;flex-direction:column;gap:16px")}>
            <div style={sx("display:flex;align-items:center;justify-content:space-between;gap:12px")}><span style={sx("font-size:12px;font-weight:900;letter-spacing:.12em;text-transform:uppercase;color:rgba(15,10,46,.64)")}>Paso {v.step} de 3</span><span style={sx("font-size:13px;font-weight:800;color:#a234cc")}>{v.stepTitle}</span></div>
            <div style={sx("display:grid;grid-template-columns:repeat(3,1fr);gap:6px")}>{(v.stepBars || []).map((b, __i40) => (<React.Fragment key={__i40}><span style={sx(`height:6px;border-radius:9999px;background:${b};transition:background .4s`)}></span></React.Fragment>))}</div>
            {v.st1 ? (<>
              <div style={sx("display:flex;flex-direction:column;gap:14px")}>
                <div style={sx("font-family:var(--font-display);font-size:22px;font-weight:800;color:#1c0f4c;line-height:1.2")}>Empecemos por lo básico</div>
                <DS.TextField label="Nombre y apellido" icon="user" placeholder="Juan Pérez" value={v.f.nombre} onChange={v.onNombre} error={v.e.nombre} />
                <DS.TextField label="Correo electrónico" icon="mail" type="email" placeholder="juan@email.com" value={v.f.correo} onChange={v.onCorreo} error={v.e.correo} />
              </div>
            </>) : null}
            {v.st2 ? (<>
              <div style={sx("display:flex;flex-direction:column;gap:12px")}>
                <div style={sx("font-family:var(--font-display);font-size:22px;font-weight:800;color:#1c0f4c;line-height:1.2")}>¿Cuánto te gustaría invertir, {v.firstName}?</div>
                <div style={sx("display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,200px),1fr));gap:8px")}>
                  {(v.monChips || []).map((m, __i41) => (<React.Fragment key={__i41}><DS.OptionButton selected={m.sel} onClick={m.pick}>{m.l}</DS.OptionButton></React.Fragment>))}
                </div>
                {v.e.monto ? (<><div style={sx("font-size:13px;font-weight:700;color:#dc2626")}>Elige un rango para continuar.</div></>) : null}
              </div>
            </>) : null}
            {v.st3 ? (<>
              <div style={sx("display:flex;flex-direction:column;gap:14px")}>
                <div style={sx("font-family:var(--font-display);font-size:22px;font-weight:800;color:#1c0f4c;line-height:1.2")}>¿A qué WhatsApp te avisamos?</div>
                <div style={sx("display:flex;flex-direction:column;gap:9px;min-width:0")}>
  <span style={sx("font-size:12px;font-weight:600;line-height:1.2;color:rgba(15,10,46,.66)")}>WhatsApp</span>
  <div style={sx("display:flex;align-items:stretch;height:52px;border-radius:14px;border:1.5px solid #d2dcea;background:#fff;overflow:hidden;transition:border-color .2s,box-shadow .2s")} className="dch9">
    <span style={sx("position:relative;flex-shrink:0;display:flex;align-items:center;background:#f7f6fb;border-right:1.5px solid #e6e3f1")}>
      <select value={v.cc} onChange={v.onCc} aria-label="Código de país" style={sx("appearance:none;-webkit-appearance:none;height:100%;padding:0 30px 0 14px;border:0;background:transparent;font-family:inherit;font-size:15px;font-weight:800;color:#1c0f4c;cursor:pointer;outline:none")}>{(v.ccList || []).map((o, __i42) => (<React.Fragment key={__i42}><option value={o.v}>{o.l}</option></React.Fragment>))}</select>
      <span aria-hidden="true" style={sx("position:absolute;right:11px;top:50%;transform:translateY(-50%);font-size:11.5px;color:rgba(15,10,46,.64);pointer-events:none")}>▼</span>
    </span>
    <input type="tel" inputMode="tel" autoComplete="tel-national" value={v.f.telefono} onChange={v.onTelefono} placeholder={v.ccPh} aria-label="WhatsApp" style={sx("flex:1;min-width:0;border:0;outline:none;padding:0 14px;font-family:inherit;font-size:16px;font-weight:600;color:#1c0f4c;background:transparent")} />
  </div>
  {v.e.telefono ? (<><span style={sx("font-size:13px;font-weight:700;color:#dc2626")}>{v.e.telefono}</span></>) : null}
</div>
                <label style={sx("display:flex;align-items:flex-start;gap:10px;font-size:13px;line-height:1.5;color:rgba(15,10,46,.7);cursor:pointer")}>
                  <input type="checkbox" checked={v.f.mayor} onChange={v.onMayor} style={sx("margin-top:3px;width:18px;height:18px;accent-color:#bc45e9;flex-shrink:0")} />
                  <span>Soy mayor de 18 años y acepto los <a href="/terminos" target="_blank" rel="noopener">Términos</a> y la <a href="/privacidad" target="_blank" rel="noopener">Política de Privacidad</a>.</span>
                </label>
                {v.e.mayor ? (<><div style={sx("font-size:13px;font-weight:700;color:#dc2626")}>Confirma que eres mayor de edad para continuar.</div></>) : null}
              </div>
            </>) : null}
            {v.st3 ? (<><TurnstileWidget ref={this.tsReg} action="registro" onToken={v.onRegToken} /></>) : null}
            {v.regErr ? (<><div role="alert" style={sx("font-size:13px;font-weight:700;color:#dc2626")}>{v.regErr}</div></>) : null}
            <div style={sx("display:flex;gap:10px;align-items:center")}>
              {v.canBack ? (<><button onClick={v.stepBack} aria-label="Paso anterior" style={sx("height:56px;padding:0 18px;flex-shrink:0;border-radius:14px;border:1px solid #d2dcea;background:#fff;cursor:pointer;font-family:inherit;font-size:15px;font-weight:800;color:#1c0f4c")}>←</button></>) : null}
              <div style={sx("flex:1;min-width:0")}><DS.Button size="block" fullWidth={true} loading={v.loading} onClick={v.stepNext} style={sx("width:100%")}>{v.stepCta}</DS.Button></div>
            </div>
            <div style={sx("display:flex;align-items:center;justify-content:center;gap:6px;font-size:12px;font-weight:700;color:rgba(15,10,46,.64)")}><DS.Icon name="lock" size={14} color="#059669" /><span>Datos protegidos bajo la Ley N.° 29733 · Cero spam</span></div>
            <a href="#que-es" onClick={v.goQueEs} style={sx("align-self:center;display:inline-flex;align-items:center;min-height:44px;font-size:13px;font-weight:800;color:#a234cc;text-decoration:underline;text-underline-offset:3px")}>Antes de unirte: qué es y qué no es Platita.pe</a>
          </div>
        </>) : null}
        {v.sent ? (<>
          <div style={sx("display:flex;flex-direction:column;align-items:center;text-align:center;gap:14px")}>
            <img loading="lazy" decoding="async" src="/design/llama-celebra.webp" alt="Llama Platita celebrando" style={sx("width:170px;filter:drop-shadow(0 18px 24px rgba(28,15,76,.2))")} />
            <span style={sx("display:inline-flex;align-items:center;gap:6px;padding:5px 12px;border-radius:9999px;font-size:12px;font-weight:800;color:#047857;background:rgba(16,185,129,.10);border:1px solid rgba(16,185,129,.25)")}>Registro recibido</span>
            <h3 style={sx("font-family:var(--font-display);margin:0;font-size:clamp(1.6rem,3vw,2rem);font-weight:900;line-height:1.15")}>¡Listo, {v.firstName}! <span style={sx("color:#a234cc")}>Ya estás en la lista.</span></h3>
            <p style={sx("margin:0;font-size:15px;line-height:1.6;color:rgba(15,10,46,.66);max-width:400px")}>Te escribiremos a tu correo y WhatsApp antes del lanzamiento, con acceso prioritario.</p>
            <DS.Button variant="whatsapp">Unirme al canal de WhatsApp</DS.Button>
          </div>
        </>) : null}
      </div>
    </div>
    <div id="faq" data-reveal="1" style={sx("max-width:1152px;margin:clamp(40px,5vw,64px) auto 0")}>
      <div style={sx("display:flex;flex-wrap:wrap;align-items:flex-end;justify-content:space-between;gap:10px 32px")}>
        <h3 style={sx("font-family:var(--font-display);margin:0;font-size:clamp(1.5rem,2.8vw,2rem);font-weight:800;letter-spacing:-0.03em;color:#1c0f4c")}>¿Dudas antes de unirte?</h3>
        <span style={sx("font-size:14px;font-weight:700;color:rgba(15,10,46,.6)")}>Lo que todos preguntan antes de invertir</span>
      </div>
      <div style={sx(`margin-top:20px;display:grid;grid-template-columns:${v.faqGrid};gap:10px;align-items:start`)}>
        {(v.faqs || []).map((q, __i43) => (<React.Fragment key={__i43}>
          <div style={sx(`border-radius:18px;background:#fff;border:1px solid ${q.bd};transition:border-color .3s`)}>
            <button onClick={q.toggle} aria-expanded={q.exp} style={sx("width:100%;display:flex;align-items:center;justify-content:space-between;gap:14px;padding:16px 18px;border:0;background:none;cursor:pointer;text-align:left;font-family:inherit;font-size:15px;font-weight:800;color:#1c0f4c")}>{q.q}<span style={sx(`width:28px;height:28px;flex-shrink:0;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:17px;font-weight:700;color:${q.ic};background:${q.ib};transform:${q.rot};transition:transform .3s,background .3s`)}>+</span></button>
            <div style={sx(`display:grid;grid-template-rows:${q.rows};transition:grid-template-rows .35s cubic-bezier(.22,1,.36,1)`)}><div style={sx("overflow:hidden")}><p style={sx("margin:0;padding:0 18px 16px;font-size:14px;line-height:1.65;color:rgba(15,10,46,.7);text-wrap:pretty")}>{q.a}</p></div></div>
          </div>
        </React.Fragment>))}
      </div>
    </div>
  </section>

  <section id="app" style={sx(`position:relative;height:${v.apSecH};background:#0b0726;color:#fff`)}>
  <div style={sx(`position:${v.apStickPos};top:0;min-height:${v.apStickMinH};overflow:hidden;display:flex;align-items:center;padding:${v.apPad}`)}>
    <div style={sx(`position:relative;width:100%;max-width:1152px;margin:0 auto;display:grid;grid-template-columns:${v.apCols};gap:clamp(40px,6vw,80px);align-items:center`)}>
      <div data-reveal="1" style={sx(`min-width:0;order:${v.apTextOrder}`)}>
        <h2 style={sx("font-family:var(--font-display);margin:20px 0 0;font-size:clamp(2.6rem,5.6vw,4.6rem);font-weight:800;line-height:.98;letter-spacing:-0.04em;text-wrap:balance")}>Toda tu platita, <span style={sx("color:#7fe3ff")}>en una app</span>.</h2>
        <p style={sx("margin:18px 0 0;max-width:470px;font-size:1.08rem;line-height:1.65;color:rgba(255,255,255,.72);text-wrap:pretty")}>Llega en 2027. Estamos construyendo la app de Platita.pe: proyectos, contratos, abonos y la cuenta de tus hijos en un mismo lugar. Sé de los primeros en probarla.</p>
        <div style={sx("margin-top:28px;max-width:500px")}>
          <button type="button" onClick={v.goRegistro} style={sx("height:52px;padding:0 22px;border:0;border-radius:14px;cursor:pointer;font-family:inherit;font-size:15px;font-weight:900;color:#1c0f4c;background:#fff")} className="dch4">Únete a la lista de espera →</button>
          <div style={sx("margin-top:10px;font-size:13px;font-weight:700;color:rgba(255,255,255,.72)")}>Quienes estén en la lista de espera tendrán acceso anticipado a la app.</div>
        </div>
        {v.isDeskApp ? (<><div style={sx("margin-top:24px;max-width:420px;height:3px;border-radius:9999px;background:rgba(255,255,255,.12);overflow:hidden")}><div style={sx(`width:${v.apProg};height:100%;background:linear-gradient(90deg,#6cdcff,#bc45e9);transition:width .4s cubic-bezier(.22,1,.36,1)`)}></div></div></>) : null}
        <div style={sx("margin-top:14px;display:flex;flex-wrap:wrap;gap:8px")}>
          {(v.apScreens || []).map((x, __i11) => (<React.Fragment key={__i11}><button onClick={x.pick} style={sx(`min-height:40px;height:34px;padding:0 12px;border:0;border-radius:9999px;cursor:pointer;font-family:inherit;font-size:12px;font-weight:800;color:${x.c};background:${x.bg};box-shadow:${x.sh};transition:all .3s`)}>{x.l}</button></React.Fragment>))}
        </div>
      </div>
      <div style={sx(`position:relative;min-width:0;height:${v.apPhH};display:flex;align-items:center;justify-content:center;order:${v.apPhOrder}`)}>
        <div style={sx(`transform:scale(${v.apSc});transform-origin:center`)}><div style={sx("perspective:1400px;display:flex;justify-content:center")}>
          <div onTouchStart={v.phTs} onTouchEnd={v.phTe} style={sx("position:relative;width:300px;height:620px;border-radius:50px;padding:4px;background:linear-gradient(135deg,#8c8fa3 0%,#3a3c4a 18%,#1b1c24 50%,#4a4c5c 82%,#9a9db0 100%);box-shadow:0 60px 120px rgba(0,0,0,.55),0 0 80px rgba(188,69,233,.25)")}>
            <span aria-hidden="true" style={sx("position:absolute;left:-3px;top:120px;width:3px;height:34px;border-radius:2px 0 0 2px;background:#55576a")}></span><span aria-hidden="true" style={sx("position:absolute;left:-3px;top:170px;width:3px;height:58px;border-radius:2px 0 0 2px;background:#55576a")}></span><span aria-hidden="true" style={sx("position:absolute;right:-3px;top:150px;width:3px;height:84px;border-radius:0 2px 2px 0;background:#55576a")}></span>
            <div style={sx("position:relative;width:100%;height:100%;border-radius:46px;padding:8px;background:#05040c")}>
            <div style={sx("position:relative;width:100%;height:100%;border-radius:38px;overflow:hidden;background:#fff")}>
              <div style={sx("position:absolute;left:0;right:0;top:0;height:38px;z-index:5;display:flex;align-items:center;justify-content:space-between;padding:0 24px;font-size:12px;font-weight:800;color:#1c0f4c")}><span>9:41</span><span style={sx("position:absolute;left:50%;top:8px;width:86px;height:24px;transform:translateX(-50%);border-radius:9999px;background:#0d0826")}></span><span style={sx("display:flex;align-items:center;gap:4px")}><span style={sx("display:flex;align-items:flex-end;gap:1px;height:10px")}><span style={sx("width:3px;height:4px;background:#1c0f4c;border-radius:1px")}></span><span style={sx("width:3px;height:6px;background:#1c0f4c;border-radius:1px")}></span><span style={sx("width:3px;height:8px;background:#1c0f4c;border-radius:1px")}></span><span style={sx("width:3px;height:10px;background:#1c0f4c;border-radius:1px")}></span></span><span style={sx("width:20px;height:10px;border-radius:3px;box-shadow:inset 0 0 0 1.5px #1c0f4c;padding:2px")}><span style={sx("display:block;width:70%;height:100%;border-radius:1px;background:#1c0f4c")}></span></span></span></div>
              <div style={sx(`position:absolute;inset:0;padding:44px 14px 14px;display:flex;flex-direction:column;gap:10px;opacity:${v.sv0.op};transform:${v.sv0.tf};transition:opacity .45s ease,transform .6s cubic-bezier(.22,1,.36,1);pointer-events:none;overflow:hidden`)}><div style={sx("display:flex;justify-content:space-between;align-items:center")}><div><div style={sx("font-size:11px;font-weight:700;color:rgba(15,10,46,.64)")}>Hola, Juan</div><div style={sx("font-family:var(--font-display);font-size:17px;font-weight:800;color:#1c0f4c")}>Explora proyectos</div></div><span style={sx("width:32px;height:32px;border-radius:50%;background:var(--grad-brand);display:flex;align-items:center;justify-content:center;font-size:12px;font-weight:900;color:#fff")}>JP</span></div>
  <div style={sx("height:36px;border-radius:12px;background:#f1effa;display:flex;align-items:center;gap:8px;padding:0 12px;font-size:12px;color:rgba(15,10,46,.64)")}><DS.Icon name="pin" size={14} color="rgba(15,10,46,.64)" />Buscar por ciudad o tipo</div>
  <div style={sx("display:flex;gap:6px")}><span style={sx("padding:5px 10px;border-radius:9999px;font-size:11px;font-weight:800;color:#fff;background:#1c0f4c")}>Todos</span><span style={sx("padding:5px 10px;border-radius:9999px;font-size:11px;font-weight:800;color:#1c0f4c;background:#f1effa")}>Urbanización</span><span style={sx("padding:5px 10px;border-radius:9999px;font-size:11px;font-weight:800;color:#1c0f4c;background:#f1effa")}>Remate</span></div>
  {(v.phList || []).map((p, __i12) => (<React.Fragment key={__i12}><div style={sx("border-radius:16px;overflow:hidden;background:#fff;box-shadow:0 0 0 1px #ebe8f5,0 6px 14px rgba(28,15,76,.06)")}><div style={sx("position:relative;height:86px;background:#ddd")}><span style={sx(`display:block;width:100%;height:100%;background-image:${p.bgi};background-size:cover;background-position:center`)}></span><span style={sx("position:absolute;left:8px;top:8px;padding:3px 8px;border-radius:9999px;font-size:11px;font-weight:900;color:#fff;background:rgba(28,15,76,.75)")}>{p.cat}</span></div><div style={sx("padding:9px 10px")}><div style={sx("display:flex;justify-content:space-between;gap:6px")}><span style={sx("font-size:13px;font-weight:900;color:#1c0f4c")}>{p.n}</span><span style={sx("font-size:12px;font-weight:900;color:#a234cc;white-space:nowrap")}>{p.r}</span></div><div style={sx("font-size:11px;color:rgba(15,10,46,.64)")}>{p.l} · {p.pz}</div><div style={sx("margin-top:6px;height:5px;border-radius:9999px;background:#efedf7;overflow:hidden")}><div style={sx(`height:100%;width:${p.w};background:linear-gradient(90deg,#6cdcff,#bc45e9)`)}></div></div><div style={sx("margin-top:3px;font-size:11px;font-weight:700;color:rgba(15,10,46,.64)")}>{p.w} financiado</div></div></div></React.Fragment>))}</div><div style={sx(`position:absolute;inset:0;padding:44px 14px 14px;display:flex;flex-direction:column;gap:10px;opacity:${v.sv1.op};transform:${v.sv1.tf};transition:opacity .45s ease,transform .6s cubic-bezier(.22,1,.36,1);pointer-events:none;overflow:hidden`)}><div style={sx("display:flex;align-items:center;gap:8px")}><span style={sx("width:28px;height:28px;border-radius:9px;background:#f1effa;display:flex;align-items:center;justify-content:center;font-size:14px;font-weight:900;color:#1c0f4c")}>‹</span><span style={sx("font-family:var(--font-display);font-size:16px;font-weight:800;color:#1c0f4c")}>Jardines de la Colina</span></div>
  <div style={sx("position:relative;height:120px;border-radius:16px;overflow:hidden;background:#ddd")}><img loading="lazy" decoding="async" src="/design/jardines-de-la-colina.webp" alt="" style={sx("width:100%;height:100%;object-fit:cover;display:block")} /><span style={sx("position:absolute;left:8px;bottom:8px;display:inline-flex;align-items:center;gap:4px;padding:3px 8px;border-radius:9999px;font-size:11px;font-weight:900;color:#1c0f4c;background:#fff")}><DS.Icon name="pin" size={11} color="#1c0f4c" />Jaén, Cajamarca</span></div>
  <div style={sx("display:grid;grid-template-columns:1fr 1fr;gap:6px")}>{(v.phFacts || []).map((f, __i13) => (<React.Fragment key={__i13}><div style={sx("padding:8px 10px;border-radius:12px;background:#f7f6fb")}><div style={sx("font-size:11px;font-weight:700;color:rgba(15,10,46,.64)")}>{f.l}</div><div style={sx("font-family:var(--font-display);font-size:15px;font-weight:800;color:#1c0f4c")}>{f.v}</div></div></React.Fragment>))}</div>
  <div><div style={sx("display:flex;justify-content:space-between;font-size:11px;font-weight:800;color:#1c0f4c")}><span>S/ 360,000 recaudados</span><span style={sx("color:#a234cc")}>72%</span></div><div style={sx("margin-top:5px;height:6px;border-radius:9999px;background:#efedf7;overflow:hidden")}><div style={sx("height:100%;width:72%;background:linear-gradient(90deg,#6cdcff,#bc45e9)")}></div></div><div style={sx("margin-top:4px;font-size:11px;color:rgba(15,10,46,.64)")}>Meta S/ 500,000 · 38 inversionistas</div></div>
  <div style={sx("display:flex;align-items:center;gap:8px;padding:8px 10px;border-radius:12px;background:rgba(0,137,168,.08)")}><DS.Icon name="shield" size={16} color="#007a96" accent="#6cdcff" /><span style={sx("font-size:11px;font-weight:700;color:#1c0f4c")}>Respaldo: lotes inscritos en SUNARP</span></div>
  <div style={sx("margin-top:auto;height:44px;border-radius:14px;display:flex;align-items:center;justify-content:center;font-size:13px;font-weight:900;color:#fff;background:var(--grad-brand);box-shadow:0 10px 20px rgba(188,69,233,.3)")}>Invertir en este proyecto</div></div><div style={sx(`position:absolute;inset:0;padding:44px 14px 14px;display:flex;flex-direction:column;gap:10px;opacity:${v.sv2.op};transform:${v.sv2.tf};transition:opacity .45s ease,transform .6s cubic-bezier(.22,1,.36,1);pointer-events:none;overflow:hidden`)}><div style={sx("display:flex;align-items:center;gap:8px")}><span style={sx("width:28px;height:28px;border-radius:9px;background:#f1effa;display:flex;align-items:center;justify-content:center;font-size:14px;font-weight:900;color:#1c0f4c")}>‹</span><span style={sx("font-family:var(--font-display);font-size:16px;font-weight:800;color:#1c0f4c")}>¿Cuánto inviertes?</span></div>
  <div style={sx("padding:16px 12px;border-radius:18px;background:#f7f6fb;text-align:center")}><div style={sx("font-size:11px;font-weight:700;color:rgba(15,10,46,.64)")}>Monto a invertir</div><div style={sx("margin-top:2px;font-family:var(--font-display);font-size:32px;font-weight:800;color:#1c0f4c;letter-spacing:-0.02em")}>S/ 50,000</div><span style={sx("display:inline-block;margin-top:6px;padding:4px 10px;border-radius:9999px;font-size:11px;font-weight:900;color:#fff;background:#3f6fd8")}>Plan Avanza · 16% anual</span></div>
  <div style={sx("display:grid;grid-template-columns:repeat(3,1fr);gap:6px")}><span style={sx("padding:8px 0;text-align:center;border-radius:10px;font-size:11px;font-weight:800;color:#1c0f4c;background:#f1effa")}>S/ 10K</span><span style={sx("padding:8px 0;text-align:center;border-radius:10px;font-size:11px;font-weight:800;color:#fff;background:#1c0f4c")}>S/ 50K</span><span style={sx("padding:8px 0;text-align:center;border-radius:10px;font-size:11px;font-weight:800;color:#1c0f4c;background:#f1effa")}>S/ 100K</span></div>
  <div style={sx("border-radius:14px;box-shadow:0 0 0 1px #ebe8f5;padding:4px 12px")}>
    <div style={sx("display:flex;justify-content:space-between;padding:8px 0;border-bottom:1px solid #f1effa;font-size:12px")}><span style={sx("color:rgba(15,10,46,.64)")}>Abono mensual</span><strong style={sx("color:#1c0f4c")}>S/ 666.67</strong></div>
    <div style={sx("display:flex;justify-content:space-between;padding:8px 0;border-bottom:1px solid #f1effa;font-size:12px")}><span style={sx("color:rgba(15,10,46,.64)")}>En 12 meses</span><strong style={sx("color:#1c0f4c")}>S/ 8,000</strong></div>
    <div style={sx("display:flex;justify-content:space-between;padding:8px 0;font-size:12px")}><span style={sx("color:rgba(15,10,46,.64)")}>Primer abono</span><strong style={sx("color:#1c0f4c")}>15 dic 2026</strong></div>
  </div>
  <div style={sx("font-size:11px;line-height:1.4;color:rgba(15,10,46,.64)")}>Simulación referencial. No constituye garantía de rentabilidad.</div>
  <div style={sx("margin-top:auto;height:44px;border-radius:14px;display:flex;align-items:center;justify-content:center;font-size:13px;font-weight:900;color:#fff;background:var(--grad-brand);box-shadow:0 10px 20px rgba(188,69,233,.3)")}>Confirmar inversión</div></div><div style={sx(`position:absolute;inset:0;padding:44px 14px 14px;display:flex;flex-direction:column;gap:10px;opacity:${v.sv3.op};transform:${v.sv3.tf};transition:opacity .45s ease,transform .6s cubic-bezier(.22,1,.36,1);pointer-events:none;overflow:hidden`)}><div style={sx("display:flex;align-items:center;gap:8px")}><span style={sx("width:28px;height:28px;border-radius:9px;background:#f1effa;display:flex;align-items:center;justify-content:center;font-size:14px;font-weight:900;color:#1c0f4c")}>‹</span><span style={sx("font-family:var(--font-display);font-size:16px;font-weight:800;color:#1c0f4c")}>Tu contrato</span></div>
  <div style={sx("position:relative;border-radius:14px;background:#fff;box-shadow:0 0 0 1px #ebe8f5,0 10px 22px rgba(28,15,76,.08);padding:14px 14px 18px")}>
    <div style={sx("font-size:11px;font-weight:900;letter-spacing:.14em;color:rgba(15,10,46,.64)")}>CONTRATO DE MUTUO</div>
    <div style={sx("margin-top:4px;font-size:12px;font-weight:900;color:#1c0f4c")}>N.° PLT-2026-00418</div>
    <div style={sx("margin-top:10px;display:flex;flex-direction:column;gap:5px")}><span style={sx("height:5px;border-radius:3px;background:#efedf7")}></span><span style={sx("height:5px;width:92%;border-radius:3px;background:#efedf7")}></span><span style={sx("height:5px;width:80%;border-radius:3px;background:#efedf7")}></span><span style={sx("height:5px;width:88%;border-radius:3px;background:#efedf7")}></span><span style={sx("height:5px;width:60%;border-radius:3px;background:#efedf7")}></span></div>
    <div style={sx("margin-top:12px;display:flex;justify-content:space-between;align-items:flex-end")}><span style={sx("font-family:cursive;font-size:16px;color:#3f6fd8;transform:rotate(-6deg)")}>Juan Pérez</span><span style={sx("width:54px;height:54px;border-radius:50%;border:2px dashed #a234cc;display:flex;align-items:center;justify-content:center;text-align:center;font-size:7px;font-weight:900;line-height:1.1;color:#a234cc;transform:rotate(-12deg)")}>VALIDADO<br  />NOTARÍA</span></div>
  </div>
  <div style={sx("display:flex;flex-direction:column;gap:8px")}>{(v.phSteps || []).map((t, __i14) => (<React.Fragment key={__i14}><div style={sx("display:flex;align-items:center;gap:8px")}><span style={sx(`width:20px;height:20px;flex-shrink:0;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:11px;font-weight:900;color:#fff;background:${t.bg}`)}>{t.m}</span><span style={sx("flex:1;font-size:12px;font-weight:800;color:#1c0f4c")}>{t.t}</span><span style={sx("font-size:11px;font-weight:700;color:rgba(15,10,46,.64)")}>{t.d}</span></div></React.Fragment>))}</div>
  <div style={sx("margin-top:auto;height:40px;border-radius:12px;display:flex;align-items:center;justify-content:center;gap:6px;font-size:12px;font-weight:900;color:#1c0f4c;box-shadow:inset 0 0 0 1.5px #d9d4ec")}><DS.Icon name="fileSign" size={14} color="#1c0f4c" />Descargar PDF</div></div><div style={sx(`position:absolute;inset:0;padding:44px 14px 14px;display:flex;flex-direction:column;gap:10px;opacity:${v.sv4.op};transform:${v.sv4.tf};transition:opacity .45s ease,transform .6s cubic-bezier(.22,1,.36,1);pointer-events:none;overflow:hidden`)}><div style={sx("display:flex;justify-content:space-between;align-items:center")}><div><div style={sx("font-size:11px;font-weight:700;color:rgba(15,10,46,.64)")}>Hola, Juan</div><div style={sx("font-family:var(--font-display);font-size:17px;font-weight:800;color:#1c0f4c")}>Mi cartera</div></div><span style={sx("width:32px;height:32px;border-radius:10px;background:#f1effa;display:flex;align-items:center;justify-content:center")}><DS.Icon name="bell" size={16} color="#1c0f4c" accent="#bc45e9" /></span></div>
  <div style={sx("border-radius:18px;padding:14px;color:#fff;background:linear-gradient(150deg,#1c0f4c,#3f6fd8)")}><div style={sx("font-size:11px;font-weight:700;color:rgba(255,255,255,.7)")}>Capital invertido</div><div style={sx("font-family:var(--font-display);font-size:26px;font-weight:800")}>S/ 50,000.00</div><div style={sx("margin-top:2px;font-size:11px;font-weight:800;color:#6cdcff")}>+ S/ 666.67 recibidos este mes</div><div style={sx("margin-top:10px;display:flex;align-items:flex-end;gap:4px;height:42px")}>{(v.phBars2 || []).map((b, __i15) => (<React.Fragment key={__i15}><span style={sx(`flex:1;height:${b.h};border-radius:4px 4px 0 0;background:${b.bg}`)}></span></React.Fragment>))}</div></div>
  <div style={sx("display:flex;align-items:center;gap:10px;padding:10px;border-radius:14px;background:#f7f6fb")}><span style={sx("width:34px;height:34px;border-radius:10px;background:#fff;display:flex;align-items:center;justify-content:center")}><DS.Icon name="calendarCheck" size={18} color="#1c0f4c" accent="#6cdcff" /></span><div style={sx("flex:1")}><div style={sx("font-size:11px;color:rgba(15,10,46,.64)")}>Próximo abono</div><div style={sx("font-size:13px;font-weight:900;color:#1c0f4c")}>15 ene 2027 · S/ 666.67</div></div></div>
  <div style={sx("font-size:11px;font-weight:900;letter-spacing:.1em;color:rgba(15,10,46,.64)")}>MOVIMIENTOS</div>
  {(v.phMoves || []).map((m, __i16) => (<React.Fragment key={__i16}><div style={sx("display:flex;align-items:center;gap:10px")}><span style={sx(`width:30px;height:30px;border-radius:9px;background:${m.bg};display:flex;align-items:center;justify-content:center;font-size:13px;font-weight:900;color:${m.c}`)}>{m.s}</span><div style={sx("flex:1;min-width:0")}><div style={sx("font-size:12px;font-weight:800;color:#1c0f4c")}>{m.t}</div><div style={sx("font-size:11px;color:rgba(15,10,46,.64)")}>{m.d}</div></div><strong style={sx(`font-size:12px;color:${m.c}`)}>{m.v}</strong></div></React.Fragment>))}</div>
              <div style={sx(`position:absolute;inset:0;padding:44px 14px 14px;display:flex;flex-direction:column;gap:10px;opacity:${v.sv5.op};transform:${v.sv5.tf};transition:opacity .45s ease,transform .6s cubic-bezier(.22,1,.36,1);pointer-events:none;overflow:hidden`)}>
  <div style={sx("display:flex;justify-content:space-between;align-items:center")}><div><div style={sx("font-size:11px;font-weight:700;color:rgba(15,10,46,.64)")}>Perfil Kids</div><div style={sx("font-family:var(--font-display);font-size:17px;font-weight:800;color:#1c0f4c")}>Platita Kids</div></div><span style={sx("padding:4px 10px;border-radius:9999px;font-size:11px;font-weight:900;color:#a234cc;background:#f5f3fc")}>Tutor: Juan</span></div>
  <div style={sx("position:relative;height:118px;border-radius:14px;overflow:hidden;background-image:url(/design/kids/card-kid-boy.webp);background-size:cover;background-position:center;box-shadow:0 10px 22px rgba(28,15,76,.18)")}></div>
  <div style={sx("display:flex;align-items:center;gap:10px")}><span style={sx("width:34px;height:34px;border-radius:50%;background:linear-gradient(135deg,#6cdcff,#3f6fd8);display:flex;align-items:center;justify-content:center;font-size:12px;font-weight:900;color:#fff")}>M</span><div style={sx("flex:1")}><div style={sx("font-size:13px;font-weight:900;color:#1c0f4c")}>Mateo · 12 años</div><div style={sx("font-size:11px;color:rgba(15,10,46,.64)")}>Kids Avanza · 16% anual</div></div><div style={sx("text-align:right")}><div style={sx("font-size:11px;color:rgba(15,10,46,.64)")}>Su capital</div><div style={sx("font-family:var(--font-display);font-size:16px;font-weight:800;color:#1c0f4c")}>S/ 3,250</div></div></div>
  <div style={sx("padding:10px 12px;border-radius:14px;background:#f7f6fb")}><div style={sx("display:flex;justify-content:space-between;font-size:11px;font-weight:800;color:#1c0f4c")}><span>Meta: su primera laptop</span><span style={sx("color:#a234cc")}>65%</span></div><div style={sx("margin-top:6px;height:6px;border-radius:9999px;background:#e9e6f4;overflow:hidden")}><div style={sx("width:65%;height:100%;background:linear-gradient(90deg,#6cdcff,#bc45e9)")}></div></div></div>
  <div style={sx("display:flex;align-items:center;gap:10px;padding:10px 12px;border-radius:14px;box-shadow:inset 0 0 0 1px #ebe8f5")}><span style={sx("width:30px;height:30px;border-radius:9px;background:rgba(188,69,233,.12);display:flex;align-items:center;justify-content:center;font-size:12px;font-weight:900;color:#a234cc")}>3</span><div style={sx("flex:1")}><div style={sx("font-size:12px;font-weight:900;color:#1c0f4c")}>Lección: interés compuesto</div><div style={sx("font-size:11px;color:rgba(15,10,46,.64)")}>4 min · Aprendo</div></div><span style={sx("font-size:14px;color:#1c0f4c")}>›</span></div>
</div>
              <div style={sx(`position:absolute;left:8px;right:8px;top:8px;z-index:6;display:flex;gap:10px;align-items:center;padding:10px 12px;border-radius:18px;background:rgba(250,250,255,.92);backdrop-filter:blur(14px);box-shadow:0 12px 30px rgba(28,15,76,.22);transform:${v.ntTf};opacity:${v.ntOp};transition:transform .6s cubic-bezier(.34,1.4,.64,1),opacity .4s`)}>
                <img decoding="async" src="/design/icon-512.png" alt="" style={sx("width:30px;height:30px;border-radius:8px;flex-shrink:0")} /><div style={sx("min-width:0;flex:1")}><div style={sx("display:flex;justify-content:space-between;font-size:11px;font-weight:900;color:#1c0f4c")}><span>Platita.pe</span><span style={sx("font-weight:700;color:rgba(15,10,46,.64)")}>ahora</span></div><div style={sx("font-size:11.5px;line-height:1.3;color:#1c0f4c")}>{v.ntText}</div></div>
              </div>
              <div style={sx("position:absolute;left:50%;bottom:7px;width:110px;height:4px;transform:translateX(-50%);border-radius:9999px;background:#1c0f4c;opacity:.85;z-index:5")}></div>
            </div>
            <span aria-hidden="true" style={sx("position:absolute;inset:8px;border-radius:38px;background:linear-gradient(125deg,rgba(255,255,255,.14) 0%,rgba(255,255,255,0) 28%,rgba(255,255,255,0) 70%,rgba(255,255,255,.06) 100%);pointer-events:none;z-index:9")}></span>
            </div>
          </div>
        </div></div>
        {v.apPills ? (<>
          <div style={sx("position:absolute;left:-2%;top:14%;z-index:3;display:flex;align-items:center;gap:10px;padding:10px 14px 10px 10px;border-radius:16px;background:#fff;box-shadow:0 0 0 1px rgba(255,255,255,.6),0 24px 50px rgba(0,0,0,.45)")}><span style={sx("width:34px;height:34px;border-radius:10px;display:flex;align-items:center;justify-content:center;background:linear-gradient(135deg,#1c0f4c,#5a1f8f)")}><DS.Icon name="zap" size={18} color="#fff" accent="#6cdcff" /></span><span style={sx("font-size:13px;font-weight:900;color:#1c0f4c;white-space:nowrap")}>Invierte en 3 toques</span></div>
          <div style={sx("position:absolute;right:-4%;top:46%;z-index:3;display:flex;align-items:center;gap:10px;padding:10px 14px 10px 10px;border-radius:16px;background:#fff;box-shadow:0 0 0 1px rgba(255,255,255,.6),0 24px 50px rgba(0,0,0,.45)")}><span style={sx("width:34px;height:34px;border-radius:10px;display:flex;align-items:center;justify-content:center;background:linear-gradient(135deg,#1c0f4c,#5a1f8f)")}><DS.Icon name="fileSign" size={18} color="#fff" accent="#e0a6f7" /></span><span style={sx("font-size:13px;font-weight:900;color:#1c0f4c;white-space:nowrap")}>Tu contrato en el bolsillo</span></div>
          <div style={sx("position:absolute;left:2%;bottom:12%;z-index:3;display:flex;align-items:center;gap:10px;padding:10px 14px 10px 10px;border-radius:16px;background:#fff;box-shadow:0 0 0 1px rgba(255,255,255,.6),0 24px 50px rgba(0,0,0,.45)")}><span style={sx("width:34px;height:34px;border-radius:10px;display:flex;align-items:center;justify-content:center;background:linear-gradient(135deg,#1c0f4c,#5a1f8f)")}><DS.Icon name="award" size={18} color="#fff" accent="#6cdcff" /></span><span style={sx("font-size:13px;font-weight:900;color:#1c0f4c;white-space:nowrap")}>Platita Kids integrado</span></div>
        </>) : null}
      </div>
    </div>
  </div>
  </section>

  <section id="kids" style={sx("padding:clamp(48px,6vw,80px) clamp(12px,3vw,32px);background:#fff")}>
    <div data-reveal="1" style={sx("position:relative;max-width:1240px;margin:0 auto;border-radius:clamp(28px,4vw,48px);background:#f7f6fb;overflow:hidden")}>
      <div style={sx("position:relative;padding:clamp(28px,5vw,64px) clamp(18px,5vw,72px)")}>
        <div style={sx("position:relative;display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,380px),1fr));gap:clamp(32px,5vw,64px);align-items:center")}>
          <div style={sx("min-width:0")}>
            <h2 style={sx("font-family:var(--font-display);margin:0;font-size:clamp(2.2rem,4.4vw,3.4rem);font-weight:800;line-height:1.02;letter-spacing:-0.035em;color:#1c0f4c;text-wrap:balance")}>Su primera platita <span style={sx("color:#a234cc")}>con superpoderes</span>.</h2>
            <p style={sx("margin:16px 0 0;max-width:460px;font-size:1.05rem;line-height:1.65;color:rgba(15,10,46,.68);text-wrap:pretty")}>Próximamente, para chicos de 10 a 17 años. Abre un capital para tus hijos desde S/ 500. Tú administras y autorizas; ellos aprenden jugando, cumplen metas y ven crecer su platita con su propia tarjeta.</p>
            <div style={sx("margin-top:26px;max-width:500px;border-radius:28px;padding:20px;background:#fff;box-shadow:0 0 0 2px #ece8f8,0 18px 40px rgba(28,15,76,.08)")}>
              <div style={sx("font-size:15px;font-weight:900;color:#1c0f4c")}>¿Cuántos años tiene tu peque?</div>
              <div style={sx(`margin-top:12px;display:grid;grid-template-columns:${v.kAgeCols};gap:6px`)}>
                {(v.kAges || []).map((g, __i20) => (<React.Fragment key={__i20}><button onClick={g.pick} aria-pressed={g.pr} style={sx(`aspect-ratio:${v.kAgeAR};min-height:44px;min-width:0;border:0;border-radius:50%;cursor:pointer;font-family:inherit;font-size:16px;font-weight:900;color:${g.c};background:${g.bg};box-shadow:inset 0 -3px 0 rgba(28,15,76,.12);transition:background .2s,color .2s,transform .2s`)} className="dch8">{g.a}</button></React.Fragment>))}
              </div>
              <div style={sx("margin-top:18px;font-size:12px;font-weight:900;letter-spacing:.12em;text-transform:uppercase;color:rgba(15,10,46,.64)")}>Su camino de misiones</div>
              <div style={sx("position:relative;margin-top:12px;display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:4px")}>
                {(v.kMap || []).map((m, __i21) => (<React.Fragment key={__i21}>
                  <div style={sx("position:relative;min-width:0;display:flex;flex-direction:column;align-items:center;gap:6px;text-align:center")}>
                    <span style={sx(`width:44px;height:44px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:${m.fs};font-weight:900;color:${m.c};background:${m.bg};box-shadow:${m.sh};transform:${m.tf};transition:all .35s cubic-bezier(.34,1.56,.64,1)`)}>{m.ic}</span>
                    <span style={sx(`font-size:12px;font-weight:900;line-height:1.15;color:${m.tc}`)}>{m.t}</span>
                  </div>
                </React.Fragment>))}
              </div>
              <div style={sx("margin-top:16px;padding:14px 16px;border-radius:20px;background:linear-gradient(135deg,#f3fbff,#f8f1fd);display:flex;flex-wrap:wrap;align-items:center;justify-content:space-between;gap:10px 16px")}>
                <div style={sx("min-width:0;flex:1 1 180px")}><div style={sx("font-size:14px;font-weight:900;color:#1c0f4c")}>Misión «{v.kStage.t}»</div><div style={sx("margin-top:2px;font-size:13px;line-height:1.45;color:rgba(15,10,46,.62)")}>{v.kStage.d}</div></div>
                <div style={sx("text-align:right")}><div style={sx("font-size:12px;font-weight:800;color:rgba(15,10,46,.64)")}>A los 18 podría tener*</div><div style={sx("font-family:var(--font-display);font-size:28px;font-weight:800;line-height:1.05;color:#a234cc;font-variant-numeric:tabular-nums")}>S/ {v.kAt18}</div><div style={sx("font-size:12px;font-weight:700;color:rgba(15,10,46,.64)")}>S/ {v.kInitFmt} + S/ {v.kMonFmt}/mes · {v.kYrs18} años</div></div>
              </div>
            </div>
          </div>
          <div style={sx("position:relative;min-width:0;aspect-ratio:6/5;max-width:540px;width:100%;justify-self:center")}>
            <div style={sx("position:absolute;inset:0")}><button onClick={v.kSwap} aria-label="Cambiar tarjeta" style={sx(`position:absolute;left:${v.kcA.l};top:${v.kcA.t};width:74%;z-index:${v.kcA.z};transform:${v.kcA.tf};aspect-ratio:1200/710;border:0;padding:0;cursor:pointer;border-radius:16px;overflow:hidden;background:#ddd;box-shadow:${v.kcA.sh};transition:transform .7s cubic-bezier(.34,1.3,.64,1),left .7s cubic-bezier(.22,1,.36,1),top .7s cubic-bezier(.22,1,.36,1),box-shadow .5s`)}><img loading="lazy" decoding="async" src="/design/kids/card-kid-boy.webp" alt="Tarjeta Platita Kids azul" style={sx("position:relative;display:block;width:106.67%;max-width:none;margin-left:-3.33%;margin-top:-5.83%")} /><span style={sx(`position:absolute;inset:0;background:linear-gradient(115deg,transparent 30%,rgba(255,255,255,.35) 45%,transparent 60%);transform:${v.kcA.sheen};transition:transform 1s ease`)}></span></button>
            <button onClick={v.kSwap} aria-label="Cambiar tarjeta" style={sx(`position:absolute;left:${v.kcB.l};top:${v.kcB.t};width:74%;z-index:${v.kcB.z};transform:${v.kcB.tf};aspect-ratio:1200/710;border:0;padding:0;cursor:pointer;border-radius:16px;overflow:hidden;background:#ddd;box-shadow:${v.kcB.sh};transition:transform .7s cubic-bezier(.34,1.3,.64,1),left .7s cubic-bezier(.22,1,.36,1),top .7s cubic-bezier(.22,1,.36,1),box-shadow .5s`)}><img loading="lazy" decoding="async" src="/design/kids/card-kid-girl.webp" alt="Tarjeta Platita Kids rosada" style={sx("position:relative;display:block;width:106.67%;max-width:none;margin-left:-3.33%;margin-top:-5.83%")} /><span style={sx(`position:absolute;inset:0;background:linear-gradient(115deg,transparent 30%,rgba(255,255,255,.35) 45%,transparent 60%);transform:${v.kcB.sheen};transition:transform 1s ease`)}></span></button></div>
            <span style={sx("position:absolute;left:-2%;top:2%;z-index:4;display:inline-flex;align-items:center;gap:6px;padding:8px 14px;border-radius:9999px;font-size:13px;font-weight:900;color:#1c0f4c;background:#fff;box-shadow:0 10px 24px rgba(28,15,76,.16),inset 0 0 0 2px rgba(255,255,255,.7);transform:rotate(-6deg);white-space:nowrap")}>★ Meta: su primera bici</span>
            <span style={sx("position:absolute;right:0;top:34%;z-index:4;display:inline-flex;align-items:center;gap:6px;padding:8px 14px;border-radius:9999px;font-size:13px;font-weight:900;color:#1c0f4c;background:#6cdcff;box-shadow:0 10px 24px rgba(28,15,76,.16),inset 0 0 0 2px rgba(255,255,255,.7);transform:rotate(5deg);white-space:nowrap")}>+ S/ 50 este mes</span>
            <span style={sx("position:absolute;left:4%;bottom:6%;z-index:4;display:inline-flex;align-items:center;gap:6px;padding:8px 14px;border-radius:9999px;font-size:13px;font-weight:900;color:#a234cc;background:#fce7ff;box-shadow:0 10px 24px rgba(28,15,76,.16),inset 0 0 0 2px rgba(255,255,255,.7);transform:rotate(-4deg);white-space:nowrap")}>Nivel 2 · Aprendo</span>
            <span style={sx("position:absolute;right:6%;bottom:0;z-index:3;font-size:12px;font-weight:800;color:rgba(15,10,46,.64)")}>Toca la tarjeta para cambiarla</span>
          </div>
        </div>
      
        <div style={sx("margin-top:clamp(28px,4vw,40px);padding-top:24px;border-top:1px solid #e6e3f1;display:flex;flex-wrap:wrap;align-items:center;justify-content:space-between;gap:16px")}>
          <div style={sx("display:flex;flex-wrap:wrap;gap:8px")}>
            {(v.kidsPlans || []).map((p, __i22) => (<React.Fragment key={__i22}>
              <span style={sx("display:inline-flex;align-items:center;gap:8px;padding:8px 12px;border-radius:9999px;background:#fff;border:1px solid #e6e3f1;font-size:13px;white-space:nowrap")}><span style={sx(`width:8px;height:8px;border-radius:50%;background:${p.c}`)}></span><strong style={sx("color:#1c0f4c")}>{p.r}%</strong><span style={sx("color:rgba(15,10,46,.62)")}>desde {p.min}</span></span>
            </React.Fragment>))}
          </div>
          <div style={sx("display:flex;flex-wrap:wrap;align-items:center;gap:14px")}>
            <button onClick={v.toggleKSim} style={sx("white-space:nowrap;flex-shrink:0;display:inline-flex;align-items:center;gap:8px;padding:12px 18px;border-radius:12px;border:1px solid #d9d4ec;background:#fff;cursor:pointer;font-family:inherit;font-size:14px;font-weight:800;color:#1c0f4c")}>{v.kSimLabel}<span style={sx(`display:inline-block;transition:transform .3s;transform:${v.kSimRot}`)}>↓</span></button>
            <DS.Button size="md" onClick={v.goRegistro}>Quiero Platita Kids</DS.Button>
          </div>
        </div>
        {v.kOpen ? (<>
          <div id="kids-simulador" style={sx("margin-top:20px;border-radius:24px;background:#fff;border:1px solid #e6e3f1;display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,320px),1fr));gap:clamp(20px,3vw,40px);padding:clamp(20px,3vw,32px)")}>
            <div style={sx("display:flex;flex-direction:column;gap:18px;min-width:0")}>
              <div>
                <div style={sx("display:flex;justify-content:space-between;align-items:baseline;gap:8px")}><span style={sx("font-size:13px;font-weight:600;color:rgba(15,10,46,.66)")}>Aporte inicial</span><span style={sx("font-family:var(--font-display);font-size:20px;font-weight:800;color:#1c0f4c")}>S/ {v.kInitFmt}</span></div>
                <div style={sx("margin-top:8px")}><DS.RangeSlider ariaLabel="Aporte inicial" min={0} max={999} step={3} value={v.kInitPos} onChange={v.onKInit} ticks={v.kInitTicks} /></div>
              </div>
              <div>
                <div style={sx("display:flex;justify-content:space-between;align-items:baseline;gap:8px")}><span style={sx("font-size:13px;font-weight:600;color:rgba(15,10,46,.66)")}>Aporte mensual familiar</span><span style={sx("font-family:var(--font-display);font-size:20px;font-weight:800;color:#1c0f4c")}>S/ {v.kMonFmt}</span></div>
                <div style={sx("margin-top:8px")}><DS.RangeSlider ariaLabel="Aporte mensual" min={0} max={500} step={50} value={v.kMon} onChange={v.onKMon} ticks={v.kMonTicks} /></div>
              </div>
              <div style={sx("display:grid;grid-template-columns:repeat(3,1fr);gap:8px")}>
                <DS.OptionButton selected={v.ky3} onClick={v.setKy3}>3 años</DS.OptionButton>
                <DS.OptionButton selected={v.ky5} onClick={v.setKy5}>5 años</DS.OptionButton>
                <DS.OptionButton selected={v.ky8} onClick={v.setKy8}>8 años</DS.OptionButton>
              </div>
            </div>
            <div style={sx("border-radius:20px;padding:22px;background:#f7f6fb;min-width:0;display:flex;flex-direction:column;justify-content:center")}>
              <div style={sx("font-size:12px;font-weight:800;color:#5b3fa8")}>{v.kPlanName} · {v.kPlanRate}% anual*</div>
              <div style={sx("margin-top:4px;font-size:13px;font-weight:700;line-height:1.35;color:rgba(15,10,46,.66)")}>Capital estimado en {v.kYears} años</div>
              <div style={sx("font-family:var(--font-display);margin-top:8px;font-size:clamp(2rem,4vw,2.6rem);font-weight:800;line-height:1.05;color:#1c0f4c;font-variant-numeric:tabular-nums")}>S/ {v.kFvFmt}</div>
              <div style={sx("margin-top:14px;display:flex;height:8px;border-radius:9999px;overflow:hidden;background:#e6e3f1")}><div style={sx(`width:${v.kAportPct};background:#1c0f4c`)}></div><div style={sx("flex:1;background:#bc45e9")}></div></div>
              <div style={sx("margin-top:10px;display:flex;flex-direction:column;gap:6px;font-size:13px;color:rgba(15,10,46,.66)")}>
                <span style={sx("display:flex;align-items:center;gap:6px;white-space:nowrap")}><span style={sx("width:8px;height:8px;border-radius:50%;background:#1c0f4c")}></span>Aportado<strong style={sx("margin-left:auto;color:#1c0f4c")}>S/ {v.kAportFmt}</strong></span>
                <span style={sx("display:flex;align-items:center;gap:6px;white-space:nowrap")}><span style={sx("width:8px;height:8px;border-radius:50%;background:#bc45e9")}></span>Rentabilidad generada<strong style={sx("margin-left:auto;color:#1c0f4c")}>S/ {v.kGainFmt}</strong></span>
              </div>
            </div>
          </div>
        </>) : null}
        <p style={sx("margin:20px auto 0;max-width:820px;text-align:center;font-size:13px;line-height:1.6;color:rgba(15,10,46,.66);text-wrap:pretty")}>*Platita Kids está en desarrollo. Tasas conceptuales que <strong>no constituyen promesa ni garantía de rentabilidad</strong>; se definirán según la estructura financiera, contractual y regulatoria aplicable. La simulación asume reinversión mensual.</p>
      </div>
    </div>
    
  </section>

  <section id="asesores" style={sx("position:relative;overflow:hidden;padding:clamp(56px,8vw,104px) 20px;background:#fff;border-top:1px solid rgba(28,15,76,.06)")}>
    <div data-reveal="1" style={sx("position:relative;max-width:1152px;margin:0 auto")}>
      <div style={sx("position:relative;overflow:hidden;border-radius:clamp(28px,4vw,40px);background:#140a3c;color:#fff;display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,420px),1fr));box-shadow:0 40px 100px rgba(28,15,76,.35)")}>
        <div style={sx("position:relative;padding:clamp(28px,5vw,64px);display:flex;flex-direction:column;justify-content:center;min-width:0")}>
          <h2 style={sx("font-family:var(--font-display);margin:20px 0 0;font-size:clamp(2.3rem,5vw,3.8rem);font-weight:800;line-height:1.02;letter-spacing:-0.035em;text-wrap:balance")}>Conviértete en asesor de <span style={sx("color:#7fe3ff")}>Platita.pe</span>.</h2>
          <p style={sx("margin:18px 0 0;max-width:460px;font-size:1.05rem;line-height:1.65;color:rgba(255,255,255,.76);text-wrap:pretty")}>Comparte tu enlace personalizado, acompaña a tus referidos y gana una comisión por cada inversionista validado. Tú decides tu ritmo.</p>
          <div style={sx("margin-top:22px;display:flex;flex-direction:column;gap:10px")}>
            <span style={sx("display:flex;align-items:center;gap:10px;font-size:15px;font-weight:700")}><DS.Icon name="check" size={18} variant="line" strokeWidth={2.6} color="#6cdcff" />Comisión por cada inversionista válido</span>
            <span style={sx("display:flex;align-items:center;gap:10px;font-size:15px;font-weight:700")}><DS.Icon name="check" size={18} variant="line" strokeWidth={2.6} color="#6cdcff" />Panel propio con referidos y pagos</span>
            <span style={sx("display:flex;align-items:center;gap:10px;font-size:15px;font-weight:700")}><DS.Icon name="check" size={18} variant="line" strokeWidth={2.6} color="#6cdcff" />Un solo nivel. Sin multinivel, sin cuotas</span>
          </div>
          <div style={sx("margin-top:28px;display:flex;flex-wrap:wrap;align-items:center;gap:16px 20px")}>
            <DS.Button size="hero" onClick={v.goAsesorForm} trailingArrow={true}>Quiero ser asesor</DS.Button>
            <div style={sx("display:flex;align-items:center;gap:10px")}><span style={sx("display:flex")}><img decoding="async" src="/design/asesor-1.webp" alt="" style={sx("width:30px;height:30px;border-radius:50%;object-fit:cover;object-position:top;border:2px solid #140a3c")} /><img decoding="async" src="/design/asesor-2.webp" alt="" style={sx("width:30px;height:30px;border-radius:50%;object-fit:cover;object-position:top;border:2px solid #140a3c;margin-left:-10px")} /><img decoding="async" src="/design/asesor-3.webp" alt="" style={sx("width:30px;height:30px;border-radius:50%;object-fit:cover;object-position:top;border:2px solid #140a3c;margin-left:-10px")} /></span><span style={sx("font-size:13px;font-weight:700;color:rgba(255,255,255,.72)")}>Postulación gratuita<br  />y sin compromiso</span></div>
          </div>
        </div>
        <div style={sx(`position:relative;min-height:${v.asImgH};min-width:0;order:${v.asImgOrd}`)}>
          <img loading="lazy" decoding="async" src="/design/asesor-cafe.webp" alt="Asesor de Platita.pe compartiendo su enlace con un cliente" style={sx("position:absolute;inset:0;width:100%;height:100%;object-fit:cover;object-position:center 40%")} />
          <div style={sx(`position:absolute;inset:0;background:${v.asImgScrim};pointer-events:none`)}></div>
          <div style={sx(`position:absolute;right:clamp(14px,3vw,28px);bottom:clamp(14px,3vw,28px);display:${v.asCardD};width:min(260px,80%);padding:16px;border-radius:18px;background:rgba(255,255,255,.96);color:#1c0f4c;box-shadow:0 24px 50px rgba(0,0,0,.3)`)}>
            <div style={sx("display:flex;align-items:center;justify-content:space-between;gap:8px")}><span style={sx("font-size:12px;font-weight:800;color:rgba(15,10,46,.6)")}>Nuevo referido validado</span><span style={sx("width:8px;height:8px;border-radius:50%;background:#10b981")}></span></div>
            <div style={sx("font-family:var(--font-display);margin-top:6px;font-size:22px;font-weight:800")}>+ Comisión generada</div>
            <div style={sx("margin-top:4px;font-size:12px;color:rgba(15,10,46,.6)")}>platita.pe/r/JUAN24 · ilustrativo</div>
          </div>
        </div>
      </div>

      <div style={sx(`margin-top:clamp(48px,6vw,80px);display:grid;grid-template-columns:${v.afGrid};gap:clamp(32px,5vw,72px);align-items:start`)}>
        <div style={sx(`min-width:0;position:${v.afStick};top:110px`)}>
          <h3 style={sx("font-family:var(--font-display);margin:16px 0 0;font-size:clamp(1.8rem,3.4vw,2.6rem);font-weight:800;line-height:1.05;letter-spacing:-0.03em;color:#1c0f4c;text-wrap:balance")}>Postula hoy, <span style={sx("color:#a234cc")}>gana desde tu primer referido</span>.</h3>
          <div style={sx("position:relative;margin-top:28px;display:flex;flex-direction:column;gap:22px")}>
            <div aria-hidden="true" style={sx("position:absolute;left:17px;top:18px;bottom:18px;width:2px;background:linear-gradient(180deg,#6cdcff,#bc45e9)")}><span style={sx("position:absolute;left:1px;top:0;width:12px;height:12px;margin:-6px;border-radius:50%;background:#6cdcff;box-shadow:0 0 14px 4px rgba(108,220,255,.75);animation:flow-y 4s cubic-bezier(.45,0,.55,1) infinite")}></span></div>
            {(v.afSteps || []).map((s, __i8) => (<React.Fragment key={__i8}>
              <div style={sx("position:relative;display:flex;gap:16px;align-items:flex-start")}>
                <span style={sx(`width:36px;height:36px;flex-shrink:0;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:14px;font-weight:900;color:#fff;background:${s.bg};box-shadow:0 0 0 5px #fff`)}>{s.n}</span>
                <div style={sx("min-width:0;padding-top:6px")}><div style={sx("font-size:16px;font-weight:800;color:#1c0f4c")}>{s.t}</div><div style={sx("margin-top:3px;font-size:14px;line-height:1.55;color:rgba(15,10,46,.62)")}>{s.d}</div></div>
              </div>
            </React.Fragment>))}
          </div>
          <div style={sx("margin-top:28px;padding-top:20px;border-top:1px solid rgba(28,15,76,.08);display:flex;flex-wrap:wrap;align-items:center;gap:10px 14px;font-size:14px;color:rgba(15,10,46,.62)")}>
            <span>Así se verá tu enlace:</span><span style={sx("font-weight:900;color:#1c0f4c")}>platita.pe/r/JUAN24</span><button onClick={v.copyRef} style={sx("height:40px;padding:0 16px;border:0;border-radius:9999px;cursor:pointer;font-family:inherit;font-size:12px;font-weight:800;color:#a234cc;background:#f5f3fc")}>{v.copyLabel}</button>
          </div>
        </div>
        <div id="asesor-form" style={sx("position:relative;border-radius:32px;padding:1.5px;background:linear-gradient(135deg,rgba(108,220,255,.8),rgba(188,69,233,.8));box-shadow:0 30px 80px rgba(122,69,214,.18);min-width:0")}>
          <div style={sx("border-radius:31px;padding:clamp(22px,3.4vw,40px);background:#fff")}>
          {v.afNotSent ? (<>
            <div style={sx("display:flex;flex-direction:column;gap:14px")}>
              <div><div style={sx("font-family:var(--font-display);font-size:clamp(1.5rem,2.6vw,1.9rem);font-weight:800;letter-spacing:-0.02em;color:#1c0f4c")}>Postula como asesor</div><div style={sx("margin-top:4px;font-size:14px;color:rgba(15,10,46,.6)")}>Sin costo ni exclusividad · Te toma 2 minutos</div></div>
              <div style={sx("display:grid;grid-template-columns:1fr 1fr;gap:10px")}>{(v.afStepper || []).map((b, __i9) => (<React.Fragment key={__i9}><div style={sx("display:flex;flex-direction:column;gap:8px;min-width:0")}><span style={sx(`height:4px;border-radius:9999px;background:${b.bar};transition:background .4s`)}></span><span style={sx(`display:flex;align-items:center;gap:8px;font-size:13px;font-weight:800;color:${b.c}`)}><span style={sx(`width:22px;height:22px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:12px;font-weight:900;color:${b.nc};background:${b.nb}`)}>{b.n}</span>{b.t}</span></div></React.Fragment>))}</div>
              {v.afS1 ? (<>
                <div style={sx("display:flex;flex-direction:column;gap:12px")}>
                                    <DS.TextField label="Nombres y apellidos" icon="user" placeholder="Juan Pérez" value={v.af.nombre} onChange={v.onAf.nombre} error={v.ae.nombre} />
                  <div style={sx(`display:grid;grid-template-columns:${v.afRow};gap:12px`)}><div style={sx("display:flex;flex-direction:column;gap:9px;min-width:0")}>
  <span style={sx("font-size:12px;font-weight:600;line-height:1.2;color:rgba(15,10,46,.66)")}>Celular</span>
  <div style={sx("display:flex;align-items:stretch;height:52px;border-radius:14px;border:1.5px solid #d2dcea;background:#fff;overflow:hidden;transition:border-color .2s,box-shadow .2s")} className="dch7">
    <span style={sx("position:relative;flex-shrink:0;display:flex;align-items:center;background:#f7f6fb;border-right:1.5px solid #e6e3f1")}>
      <select value={v.cc} onChange={v.onCc} aria-label="Código de país" style={sx("appearance:none;-webkit-appearance:none;height:100%;padding:0 30px 0 14px;border:0;background:transparent;font-family:inherit;font-size:15px;font-weight:800;color:#1c0f4c;cursor:pointer;outline:none")}>{(v.ccList || []).map((o, __i10) => (<React.Fragment key={__i10}><option value={o.v}>{o.l}</option></React.Fragment>))}</select>
      <span aria-hidden="true" style={sx("position:absolute;right:11px;top:50%;transform:translateY(-50%);font-size:11.5px;color:rgba(15,10,46,.64);pointer-events:none")}>▼</span>
    </span>
    <input type="tel" inputMode="tel" autoComplete="tel-national" value={v.af.cel} onChange={v.onAf.cel} placeholder={v.ccPh} aria-label="Celular" style={sx("flex:1;min-width:0;border:0;outline:none;padding:0 14px;font-family:inherit;font-size:16px;font-weight:600;color:#1c0f4c;background:transparent")} />
  </div>
  {v.ae.cel ? (<><span style={sx("font-size:13px;font-weight:700;color:#dc2626")}>{v.ae.cel}</span></>) : null}
</div><DS.TextField label="Ciudad" icon="pin" placeholder="Lima" value={v.af.ciudad} onChange={v.onAf.ciudad} error={v.ae.ciudad} /></div>
                  <DS.TextField label="Correo electrónico" icon="mail" placeholder="juan@email.com" value={v.af.correo} onChange={v.onAf.correo} error={v.ae.correo} type="email" />
                </div>
              </>) : null}
              {v.afS2 ? (<>
                <div style={sx("display:flex;flex-direction:column;gap:12px")}>
                  <div style={sx("font-size:14px;color:rgba(15,10,46,.62)")}>Solo para validar tu identidad y pagarte tus comisiones.</div>
                  <div style={sx("display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,180px),1fr));gap:12px")}><DS.TextField label="DNI" icon="fileSign" placeholder="12345678" value={v.af.dni} onChange={v.onAf.dni} error={v.ae.dni} /><DS.TextField label="Experiencia (opcional)" icon="award" placeholder="3 años en seguros" value={v.af.exp} onChange={v.onAf.exp} error={v.ae.exp} /></div>
                  <DS.TextField label="Cuenta bancaria (CCI)" icon="wallet" placeholder="002-XXX-XXXXXXXXXXXX-XX" value={v.af.cci} onChange={v.onAf.cci} error={v.ae.cci} />
                  <label style={sx("display:flex;align-items:flex-start;gap:10px;font-size:13px;line-height:1.5;color:rgba(15,10,46,.7);cursor:pointer")}><input type="checkbox" checked={v.af.acepta} onChange={v.onAfAcepta} style={sx("margin-top:3px;width:18px;height:18px;accent-color:#bc45e9;flex-shrink:0")} /><span>Acepto los <a href="/terminos" target="_blank" rel="noopener">términos del programa de asesores</a> y la <a href="/privacidad" target="_blank" rel="noopener">Política de Privacidad</a>.</span></label>
                  {v.ae.acepta ? (<><div style={sx("font-size:13px;font-weight:700;color:#dc2626")}>Acepta los términos para continuar.</div></>) : null}
                </div>
              </>) : null}
              {v.afS2 ? (<><TurnstileWidget ref={this.tsAf} action="asesores" onToken={v.onAfToken} /></>) : null}
              {v.afErr ? (<><div role="alert" style={sx("font-size:13px;font-weight:700;color:#dc2626")}>{v.afErr}</div></>) : null}
              <div style={sx("display:flex;gap:10px;align-items:center")}>
                {v.afS2 ? (<><button onClick={v.afBack} aria-label="Paso anterior" style={sx("height:56px;padding:0 18px;flex-shrink:0;border-radius:14px;border:1px solid #d2dcea;background:#fff;cursor:pointer;font-family:inherit;font-size:15px;font-weight:800;color:#1c0f4c")}>←</button></>) : null}
                <div style={sx("flex:1;min-width:0")}><DS.Button size="block" fullWidth={true} loading={v.afLoading} onClick={v.afNext} style={sx("width:100%")}>{v.afCta}</DS.Button></div>
              </div>
            </div>
          </>) : null}
          {v.afSent ? (<>
            <div style={sx("display:flex;flex-direction:column;align-items:center;text-align:center;gap:12px;padding:12px 0")}>
              <img loading="lazy" decoding="async" src="/design/llama-celebra.webp" alt="Llama Platita celebrando" style={sx("width:150px;mix-blend-mode:multiply")} />
              <span style={sx("padding:5px 12px;border-radius:9999px;font-size:12px;font-weight:800;color:#a234cc;background:#f5f3fc")}>Pendiente de aprobación</span>
              <h3 style={sx("font-family:var(--font-display);margin:0;font-size:24px;font-weight:800;color:#1c0f4c")}>¡Gracias, {v.afFirst}! Recibimos tu postulación.</h3>
              <p style={sx("margin:0;max-width:380px;font-size:14px;line-height:1.6;color:rgba(15,10,46,.66)")}>Si es aprobada, te enviaremos tu código y enlace personalizado por correo y WhatsApp.</p>
            </div>
          </>) : null}
          </div>
        </div>
      </div>
      <p style={sx("margin:20px auto 0;max-width:860px;text-align:center;font-size:13px;line-height:1.6;color:rgba(15,10,46,.66);text-wrap:pretty")}>La comisión es un porcentaje sobre la inversión elegible de tus referidos directos, <strong>pendiente de definición comercial y revisión legal</strong>. No se pagan autoreferidos ni cuentas duplicadas. Ningún asesor opera sin aprobación previa.</p>
    </div>
  </section>

  

  <section style={sx("position:relative;padding:clamp(24px,4vw,48px) clamp(12px,3vw,32px) 0;background:#eef2f9")}>
    <div style={sx(`position:relative;max-width:1240px;margin:0 auto;overflow:hidden;border-radius:clamp(28px,4vw,44px);background:linear-gradient(135deg,#1c0f4c 0%,#3a1a7a 55%,#7a2fa8 100%);color:#fff;display:grid;grid-template-columns:${v.ctaCols};align-items:end`)}>
      <div style={sx("position:relative;padding:clamp(32px,5vw,64px);min-width:0;align-self:center")}>
        <h2 style={sx("font-family:var(--font-display);margin:0;font-size:clamp(2.2rem,5vw,3.8rem);font-weight:800;line-height:1.02;letter-spacing:-0.035em;text-wrap:balance")}>Tu platita puede empezar a trabajar <span style={sx("color:#7fe3ff")}>este año</span>.</h2>
        <p style={sx("margin:16px 0 0;max-width:460px;font-size:1.05rem;line-height:1.6;color:rgba(255,255,255,.78)")}>Únete a la lista de espera sin compromiso ni costo. Te avisaremos antes de abrir las primeras inversiones.</p>
        <div style={sx("margin-top:26px;display:flex;flex-wrap:wrap;align-items:center;gap:12px 20px")}>
          <button onClick={v.goRegistro} style={sx("height:56px;padding:0 26px;border:0;border-radius:14px;cursor:pointer;font-family:inherit;font-size:16px;font-weight:900;color:#1c0f4c;background:#fff;box-shadow:0 14px 34px rgba(0,0,0,.25)")} className="dch10">Únete a la lista de espera →</button>
          <button onClick={v.goAsesores} style={sx("border:0;background:none;cursor:pointer;font-family:inherit;font-size:15px;font-weight:800;color:#fff;text-decoration:underline;text-underline-offset:4px;text-decoration-color:rgba(255,255,255,.45)")}>Quiero ser asesor</button>
        </div>
        <div style={sx("margin-top:22px;display:flex;align-items:center;gap:10px;font-size:13px;font-weight:700;color:rgba(255,255,255,.75)")}><DS.Icon name="fileSign" size={16} color="#fff" accent="#bc45e9" /><span>Contrato notarial</span><DS.Icon name="shield" size={16} color="#fff" accent="#6cdcff" /><span>Respaldo en activos inmobiliarios</span></div>
      </div>
      <div style={sx(`position:relative;min-width:0;height:${v.ctaImgH};display:flex;justify-content:center;align-items:flex-end`)}>
        <img loading="lazy" decoding="async" src="/design/llama-heroe-presenta.webp" alt="Llama Platita presentando" style={sx("position:relative;height:100%;width:auto;max-width:100%;object-fit:contain;object-position:bottom;filter:drop-shadow(0 30px 40px rgba(0,0,0,.35))")} />
      </div>
    </div>
  </section>
  </main>

  <DS.Footer logoSrc="/design/isotipo.webp" llamaSrc="/design/llama-bg.webp" razonSocial="HOLDING BERCORP GROUP S.A.C." ruc="20613498878" year={2026} />
  {v.mobile ? (<></>) : null}

  {v.jardOpen ? (<>
    <div onClick={v.closeJard} style={sx("position:fixed;inset:0;z-index:200;background:rgba(13,8,40,.82);backdrop-filter:blur(8px);display:flex;align-items:center;justify-content:center;padding:20px")}>
      <div onClick={v.stopProp} style={sx("position:relative;width:min(960px,100%);border-radius:20px;overflow:hidden;background:#000;box-shadow:0 40px 100px rgba(0,0,0,.5)")}>
        <video src="/design/jardines.mp4" autoPlay={true} controls={true} playsInline={true} style={sx("display:block;width:100%;max-height:80vh")}></video>
        <button onClick={v.closeJard} aria-label="Cerrar" style={sx("position:absolute;top:12px;right:12px;width:40px;height:40px;border-radius:50%;border:0;cursor:pointer;background:rgba(255,255,255,.92);color:#1c0f4c;font-size:20px;font-weight:800;line-height:1")}>×</button>
      </div>
    </div>
  </>) : null}
  <DS.WhatsAppFab href={WA_CONTACT_URL} mobile={v.mobile} />
  {v.showSticky ? (<><DS.StickyCTA visible={v.showSticky} rate={20} label="Lista de espera" onCta={v.goRegistro} /></>) : null}

  
  
</div>
    );
  }
}
