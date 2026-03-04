import { useState, useEffect, useRef, useCallback } from "react";

/* ═══ MEDIA ═══ */
const V = (id, r) => `https://assets.mixkit.co/videos/${id}/${id}-${r || "1080"}.mp4`;

/* Direct fastly.picsum.photos URLs - NO redirects, safe for sandboxed iframes */
const IMG = {
  hero1: "https://fastly.picsum.photos/id/1027/800/1000.jpg?hmac=_2p68Q6QOKN9bfrRVnZIRxgW7WfLf71MYKr5Ee0JNdg",
  hero2: "https://fastly.picsum.photos/id/669/800/1000.jpg?hmac=Bl00EsUg3uK9_QYGVL6yJM3BUfXIZKkGd856s0wIj-M",
  hero3: "https://fastly.picsum.photos/id/64/800/1000.jpg?hmac=3dVgos3m5Hha-stdehb6FrGFLeopWSt4UcPrt7O1yZY",
  hero4: "https://fastly.picsum.photos/id/338/800/1000.jpg?hmac=TdVNSV8T9vANLjt2w7xfEoCvaNFDm6-pw-lNnp7UwsI",
  hero5: "https://fastly.picsum.photos/id/399/800/1000.jpg?hmac=FzCRQ2sO-qwwPhvaRZ9hVSTKRmqY4pAReKzYcGCsFNQ",
  profile: "https://fastly.picsum.photos/id/1062/600/800.jpg?hmac=_WSrVeknZSTpMRJziLp3u9Imr0SGxh_xsx1LdBFzUxw",
  t1: "https://fastly.picsum.photos/id/1027/400/710.jpg?hmac=IDaB6jY1sca6KcpFLmdi3vgCFIEYjqhaleD7v0hTTOE",
  t2: "https://fastly.picsum.photos/id/669/400/710.jpg?hmac=vQNTRlF6RJtPppEieesSxuVR8DAEL94WMQeZQaksU5w",
  t3: "https://fastly.picsum.photos/id/447/400/710.jpg?hmac=nF0TYpaq5wZqKH8HZPZWjiMb2dYN0EDjd1blk17pQNA",
  t4: "https://fastly.picsum.photos/id/338/400/710.jpg?hmac=oSu0NEj8CbIZVqc6omnoTb3bgdPQj33t6WjL9Jvq9Vk",
  t5: "https://fastly.picsum.photos/id/399/400/710.jpg?hmac=8YW-1AjePbXlZcErkwSJk8WYY6-lRvOBfQMHuf7L_eU",
  t6: "https://fastly.picsum.photos/id/64/400/710.jpg?hmac=7lCd0ccmuNNJurrgXH4OvhzB508xsym5bos-r24ONYs",
  t7: "https://fastly.picsum.photos/id/453/400/710.jpg?hmac=xGFhQ20l9htGj2M_tlrL8ljfuGz9CIpDo5vqMK9y_c4",
  t8: "https://fastly.picsum.photos/id/177/400/710.jpg?hmac=s5TlkAmOymPWDANek6jSDjNHsCV6bRAMajkrETrA-LM",
  t9: "https://fastly.picsum.photos/id/349/400/710.jpg?hmac=M9JKf38PJjIucpY-SbLFEVGvHdGt9MpgGhy9sC8V2BE",
  t10: "https://fastly.picsum.photos/id/403/400/710.jpg?hmac=WrgithGuTlQiyWQWpfAfy5NpyU02vabVDp6nIT_0rYQ",
  t11: "https://fastly.picsum.photos/id/509/400/710.jpg?hmac=7nn1GmcGwlcSXQCY6Ej7SMwSuZhBk4yI4XaMeKfVJJE",
  t12: "https://fastly.picsum.photos/id/487/400/710.jpg?hmac=x1oFzgLf-Go6ZAKnP3A3zUYZWhKvrRCmzESnM04meTc",
  t13: "https://fastly.picsum.photos/id/96/400/710.jpg?hmac=5AZQEr_sl8WGSa0J1k5-v1_wzLcjOo2zrzaZIRYwbJQ",
  t14: "https://fastly.picsum.photos/id/219/400/710.jpg?hmac=1WvDOVjJhRadcc__pEeL7MO4HJ5zdGqOowee6HVfZmk",
  t15: "https://fastly.picsum.photos/id/281/400/710.jpg?hmac=1dBACFaFDaQhnnRVCBSx5jB7Is7htZ-yGYq4tVmg2Qw",
  t16: "https://fastly.picsum.photos/id/305/400/710.jpg?hmac=quIh4T-SVzQXfGSo_cT7HkRojCbLFW2QpNAbV_mwJOA",
  t17: "https://fastly.picsum.photos/id/366/400/710.jpg?hmac=oPz8ifOktARpEHuk5_4Ku6OOfuqHHCrTALpGY_2Qb0w",
  t18: "https://fastly.picsum.photos/id/471/400/710.jpg?hmac=Z38H0k6KTjCf3izafr8GgWfsD566Tq77gi3Zb8zxXcY",
  dec1: "https://fastly.picsum.photos/id/1027/500/400.jpg?hmac=GqILk1kfnvOEXlTiag4sbI29QYYmcpEUe1Y-SdMNLfI",
  dec2: "https://fastly.picsum.photos/id/669/500/400.jpg?hmac=KzW44eHZhPjJxxe3ON3L1GQG27IwHnk6hkgY2w6ncso",
  dec3: "https://fastly.picsum.photos/id/338/500/400.jpg?hmac=qBbDkZ9IcO8evpDmQW81226UHb_nhyARv-X8g8LkhG4",
  dec4: "https://fastly.picsum.photos/id/399/500/400.jpg?hmac=wMXrL5XUTm9nzOEjwKZyIBUNkU8CFULsHRgEDe3VnVs",
};

const SECTIONS = [
  { id: "recent", title: "Recent Work Showcase", sub: "highlight of this month's work", items: [
    { id: "r1", brand: "Glossier", cat: "SKINCARE", video: V(50426), thumb: IMG.t1 },
    { id: "r2", brand: "Fenty Beauty", cat: "BEAUTY", video: V(52039), thumb: IMG.t2 },
    { id: "r3", brand: "Olaplex", cat: "HAIR", video: V(33099, "720"), thumb: IMG.t3 },
    { id: "r4", brand: "Rare Beauty", cat: "BEAUTY", video: V(52030), thumb: IMG.t4 },
    { id: "r5", brand: "The Ordinary", cat: "SKINCARE", video: V(52152), thumb: IMG.t5 },
    { id: "r6", brand: "Tatcha", cat: "SKINCARE", video: V(51177), thumb: IMG.t6 },
  ]},
  { id: "beauty", title: "Beauty", sub: "", items: [
    { id: "b1", brand: "Charlotte Tilbury", cat: "DEMO", video: V(52033), thumb: IMG.t7 },
    { id: "b2", brand: "Hourglass", cat: "BEFORE / AFTER", video: V(52055), thumb: IMG.t8 },
    { id: "b3", brand: "Tower 28", cat: "TESTIMONIAL", video: V(52041), thumb: IMG.t9 },
    { id: "b4", brand: "Kosas", cat: "SEASONAL", video: V(52057), thumb: IMG.t10 },
  ]},
  { id: "skin", title: "Skin", sub: "", items: [
    { id: "s1", brand: "Drunk Elephant", cat: "TREND", video: V(50417), thumb: IMG.t11 },
    { id: "s2", brand: "Summer Fridays", cat: "TESTIMONIAL", video: V(33462, "720"), thumb: IMG.t12 },
    { id: "s3", brand: "Glow Recipe", cat: "K BEAUTY", video: V(26532, "720"), thumb: IMG.t13 },
    { id: "s4", brand: "Youth to the People", cat: "TREND", video: V(33257, "720"), thumb: IMG.t14 },
  ]},
  { id: "fun", title: "Fun Edits", sub: "", items: [
    { id: "f1", brand: "Sol de Janeiro", cat: "TRANSFORMATION", video: V(33269, "720"), thumb: IMG.t15 },
    { id: "f2", brand: "Rhode", cat: "TREND", video: V(809), thumb: IMG.t16 },
    { id: "f3", brand: "Byredo", cat: "GREEN SCREEN", video: V(50641), thumb: IMG.t17 },
    { id: "f4", brand: "Aesop", cat: "SPLIT SCREEN", video: V(33599, "720"), thumb: IMG.t18 },
  ]},
];

const BRANDS = ["Glossier","Fenty Beauty","Rare Beauty","The Ordinary","Olaplex","Drunk Elephant","Summer Fridays","Tatcha","Sol de Janeiro","Rhode","Charlotte Tilbury","Hourglass","Tower 28","Kosas","Supergoop","Glow Recipe","Milk Makeup","Byredo","Aesop","Youth to the People"];
const STATS = [{v:"45K",l:"instagram"},{v:"50M+",l:"organic views"},{v:"3+",l:"years experience"},{v:"300+",l:"brands"}];
const ANALYTICS = [{v:"7X",l:"ROAS",d:"Return on ad spend"},{v:"$0.02",l:"CPC",d:"Cost per click"},{v:"$1.15",l:"CPM",d:"Cost per mille"},{v:"4.8M",l:"Top Views",d:"Single organic video"}];
const ALL = SECTIONS.flatMap(s => s.items);
const HERO_IMGS = [IMG.hero1, IMG.hero2, IMG.hero3, IMG.hero4, IMG.hero5];

const PAL = ["#1a1a1a","#b8956a","#7c6e60","#5c7268","#6b5e7a","#7a5e5e","#4a6e7c","#917a52","#c06050","#3d6b5e"];
const bclr = s => { let h=0; for(let i=0;i<s.length;i++) h=s.charCodeAt(i)+((h<<5)-h); return PAL[Math.abs(h)%PAL.length]; };
const serif = "'Cormorant Garamond',Georgia,serif";
const sans = "'DM Sans',system-ui,sans-serif";

const GlobalCSS = () => (<>
  <link rel="preconnect" href="https://fonts.googleapis.com"/>
  <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous"/>
  <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400&family=DM+Sans:wght@300;400;500;600&display=swap" rel="stylesheet"/>
  <style>{`*{margin:0;padding:0;box-sizing:border-box}html{scroll-behavior:smooth}body{font-family:${sans};background:#f0ece7;color:#3a3a3a;-webkit-font-smoothing:antialiased}a{text-decoration:none;color:inherit}.hs::-webkit-scrollbar{display:none}.hs{scrollbar-width:none}`}</style>
</>);

function Fade({children,delay}){
  const ref=useRef(null);const[vis,setVis]=useState(false);
  useEffect(()=>{const el=ref.current;if(!el)return;const ob=new IntersectionObserver(([e])=>{if(e.isIntersecting){setVis(true);ob.unobserve(el)}},{threshold:.08});ob.observe(el);return()=>ob.disconnect()},[]);
  return <div ref={ref} style={{opacity:vis?1:0,transform:vis?"translateY(0)":"translateY(20px)",transition:`all .7s cubic-bezier(.22,1,.36,1) ${delay||0}s`}}>{children}</div>;
}

const ChevL=()=><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="m15 18-6-6 6-6"/></svg>;
const ChevR=()=><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="m9 18 6-6-6-6"/></svg>;
const ArrowUR=()=><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M7 7h10v10"/><path d="M7 17 17 7"/></svg>;
const IcoIg=()=><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect width="20" height="20" x="2" y="2" rx="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>;
const IcoTt=()=><svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.88-2.88 2.89 2.89 0 0 1 2.88-2.88c.28 0 .56.04.82.12v-3.5a6.37 6.37 0 0 0-.82-.05A6.34 6.34 0 0 0 3.15 15.4a6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.34-6.34V9.05a8.18 8.18 0 0 0 4.76 1.52V7.12a4.81 4.81 0 0 1-1-.43z"/></svg>;
const IcoMail=()=><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="m22 7-8.991 5.727a2 2 0 0 1-2.009 0L2 7"/><rect x="2" y="4" width="20" height="16" rx="2"/></svg>;
const PlayIcon=()=><svg width="14" height="14" viewBox="0 0 24 24" fill="white"><polygon points="7,3 21,12 7,21"/></svg>;

function PhoneCard({item}){
  const vRef=useRef(null);const[playing,setPlaying]=useState(false);
  const toggle=useCallback(()=>{const v=vRef.current;if(!v)return;if(v.paused){v.play().catch(()=>{});setPlaying(true)}else{v.pause();setPlaying(false)}},[]);
  return(
    <div style={{flex:"0 0 auto",width:210,textAlign:"center",scrollSnapAlign:"start"}}>
      <div style={{position:"relative"}}>
        <div style={{position:"absolute",top:-10,right:-10,zIndex:5,width:44,height:44,borderRadius:"50%",background:bclr(item.brand),border:"3px solid white",display:"flex",alignItems:"center",justifyContent:"center",boxShadow:"0 4px 14px rgba(0,0,0,.18)",color:"white",fontSize:9,fontWeight:700,letterSpacing:".03em",textTransform:"uppercase",lineHeight:1.1,textAlign:"center",padding:5,fontFamily:sans}}>{item.brand.length>8?item.brand.slice(0,7):item.brand}</div>
        <div onClick={toggle} style={{width:195,margin:"0 auto",borderRadius:28,overflow:"hidden",background:"#000",border:"5px solid #1a1a1a",boxShadow:"0 20px 50px rgba(0,0,0,.13)",position:"relative",cursor:"pointer",paddingTop:"177.78%"}}>
          <video ref={vRef} poster={item.thumb} muted loop playsInline preload="none" style={{position:"absolute",top:0,left:0,width:"100%",height:"100%",objectFit:"cover"}}><source src={item.video} type="video/mp4"/></video>
          <div style={{position:"absolute",top:"50%",left:"50%",transform:"translate(-50%,-50%)",width:42,height:42,borderRadius:"50%",background:"rgba(0,0,0,.5)",backdropFilter:"blur(6px)",display:"flex",alignItems:"center",justifyContent:"center",opacity:playing?0:1,transition:"opacity .3s",pointerEvents:"none"}}><PlayIcon/></div>
        </div>
      </div>
      <p style={{marginTop:12,fontFamily:serif,fontSize:13,letterSpacing:".2em",textTransform:"uppercase",color:"#3a3a3a"}}>{item.cat}</p>
    </div>
  );
}

function HeroCarousel(){
  const[idx,setIdx]=useState(0);
  useEffect(()=>{const t=setInterval(()=>setIdx(i=>(i+1)%HERO_IMGS.length),5000);return()=>clearInterval(t)},[]);
  return(
    <div style={{position:"relative",width:"100%",height:"100%",borderRadius:24,overflow:"hidden",background:"#e8e4df"}}>
      {HERO_IMGS.map((src,i)=>(<div key={i} style={{position:"absolute",inset:0,opacity:i===idx?1:0,transition:"opacity .6s ease"}}><img src={src} alt="" style={{width:"100%",height:"100%",objectFit:"cover"}}/></div>))}
      <button onClick={()=>setIdx(i=>(i-1+HERO_IMGS.length)%HERO_IMGS.length)} style={{position:"absolute",left:14,top:"50%",transform:"translateY(-50%)",width:38,height:38,borderRadius:12,border:"none",cursor:"pointer",background:"rgba(23,23,23,.7)",color:"white",display:"flex",alignItems:"center",justifyContent:"center"}}><ChevL/></button>
      <button onClick={()=>setIdx(i=>(i+1)%HERO_IMGS.length)} style={{position:"absolute",right:14,top:"50%",transform:"translateY(-50%)",width:38,height:38,borderRadius:12,border:"none",cursor:"pointer",background:"rgba(23,23,23,.7)",color:"white",display:"flex",alignItems:"center",justifyContent:"center"}}><ChevR/></button>
      <div style={{position:"absolute",left:14,bottom:14}}><span style={{display:"inline-flex",alignItems:"center",gap:6,padding:"7px 14px",borderRadius:12,background:"rgba(255,255,255,.92)",backdropFilter:"blur(8px)",fontSize:13,fontWeight:500,color:"#1a1a1a"}}>View Project <ArrowUR/></span></div>
      <div style={{position:"absolute",bottom:14,left:"50%",transform:"translateX(-50%)",display:"flex",gap:7}}>{HERO_IMGS.map((_,i)=><button key={i} onClick={()=>setIdx(i)} style={{width:9,height:9,borderRadius:"50%",border:"none",cursor:"pointer",background:i===idx?"white":"rgba(255,255,255,.45)",transition:"background .3s"}}/>)}</div>
      <span style={{position:"absolute",right:12,bottom:12,padding:"4px 12px",borderRadius:14,background:"rgba(255,255,255,.92)",backdropFilter:"blur(8px)",fontSize:11,fontWeight:500,color:"#666"}}>Selected Work</span>
    </div>
  );
}

function SH({tag,count,title,sub}){
  return(<Fade><div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:10}}><p style={{fontSize:11,fontWeight:500,color:"#999",letterSpacing:".14em",textTransform:"uppercase"}}>/{tag}</p><span style={{fontSize:11,fontWeight:500,color:"#999"}}>({String(count).padStart(2,"0")})</span></div><h2 style={{fontFamily:serif,fontSize:"clamp(2rem,5vw,3.5rem)",fontWeight:300,color:"#1a1a1a",marginBottom:sub?8:16}}>{title}</h2>{sub?<p style={{fontSize:13,color:"#999",marginBottom:16}}>{sub}</p>:null}</Fade>);
}

export default function App(){
  const[scrolled,setScrolled]=useState(false);
  const[showCal,setShowCal]=useState(false);
  const[page,setPage]=useState("home");
  const[auth,setAuth]=useState(false);

  useEffect(()=>{const fn=()=>setScrolled(window.scrollY>50);window.addEventListener("scroll",fn);return()=>window.removeEventListener("scroll",fn)},[]);
  useEffect(()=>{const fn=()=>{setPage(window.location.hash.replace("#","")  === "admin"?"admin":"home")};fn();window.addEventListener("hashchange",fn);return()=>window.removeEventListener("hashchange",fn)},[]);

  if(page==="admin"&&!auth) return <LoginPage onLogin={()=>setAuth(true)}/>;
  if(page==="admin"&&auth) return <AdminPage onLogout={()=>setAuth(false)}/>;

  return(<>
    <GlobalCSS/>
    <nav style={{position:"fixed",top:0,left:0,right:0,zIndex:100,padding:"14px 24px",display:"flex",justifyContent:"space-between",alignItems:"center",background:scrolled?"rgba(240,236,231,.96)":"transparent",backdropFilter:scrolled?"blur(16px)":"none",borderBottom:scrolled?"1px solid rgba(0,0,0,.05)":"none",transition:"all .4s ease"}}>
      <a href="#" style={{fontFamily:serif,fontSize:"1.15rem",fontWeight:400,letterSpacing:".04em",color:"#1a1a1a"}}>Diana Garcia</a>
      <div style={{display:"flex",gap:22}}>{["Work","About","Book Me","Contact"].map(l=><a key={l} href={"#"+l.toLowerCase().replace(" ","-")} style={{fontSize:11,letterSpacing:".12em",textTransform:"uppercase",color:"#8a8580",fontWeight:400}}>{l}</a>)}</div>
    </nav>

    <main style={{maxWidth:1280,margin:"0 auto",padding:"0 16px"}}>
      <div style={{background:"white",borderRadius:24,marginTop:76,padding:24}}>
        <Fade><h1 style={{fontFamily:serif,fontSize:"clamp(2.8rem,9vw,6.5rem)",lineHeight:.9,fontWeight:300,letterSpacing:"-.02em",padding:"24px 0"}}>DIANA GARCIA <span style={{color:"#b5b0a8"}}>STUDIO</span></h1></Fade>
      </div>

      <div style={{display:"grid",gridTemplateColumns:"2fr 1fr",gap:24,padding:16,marginTop:16}}>
        <div style={{height:580}}><HeroCarousel/></div>
        <div style={{display:"flex",flexDirection:"column",gap:14,height:580}}>
          <Fade><div style={{border:"1px solid #e5e2dd",background:"white",borderRadius:24,padding:20}}>
            <h2 style={{fontSize:"1.1rem",fontWeight:600,fontFamily:sans}}>Diana Garcia</h2>
            <p style={{fontSize:13,color:"#777",marginTop:2}}>UGC Creator</p>
            <p style={{fontSize:13,lineHeight:1.7,color:"#555",marginTop:12}}>Authentic & premium content that converts and engages. 3+ years creating scroll-stopping UGC for beauty, skincare, and lifestyle brands.</p>
          </div></Fade>
          <div style={{flex:1,minHeight:0,borderRadius:24,overflow:"hidden",border:"1px solid #e5e2dd"}}><img src={IMG.profile} alt="Diana Garcia" style={{width:"100%",height:"100%",objectFit:"cover"}}/></div>
          <Fade delay={.1}><div style={{display:"flex",flexDirection:"column",gap:10}}>
            {[{label:"Instagram",icon:<IcoIg/>},{label:"TikTok",icon:<IcoTt/>},{label:"Contact Me",icon:<IcoMail/>,dark:true}].map(s=>(
              <a key={s.label} href="#contact" style={{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"11px 16px",borderRadius:16,border:s.dark?"none":"1px solid #e5e2dd",background:s.dark?"#1a1a1a":"white",color:s.dark?"white":"#3a3a3a",fontSize:13,fontWeight:500}}><span>{s.label}</span><span style={{opacity:s.dark?1:.5}}>{s.icon}</span></a>
            ))}
          </div></Fade>
        </div>
      </div>

      <section style={{background:"white",borderRadius:24,marginTop:32,padding:"48px 24px"}}>
        <SH tag="Trusted By" count={BRANDS.length} title="Brands that trust our content."/>
        <Fade delay={.1}><div style={{display:"flex",flexWrap:"wrap",gap:10,justifyContent:"center",maxWidth:1000,margin:"0 auto 40px"}}>{BRANDS.map((b,i)=><span key={i} style={{padding:"8px 18px",borderRadius:100,background:"#f5f3f0",border:"1px solid #e9e5e0",fontSize:12,letterSpacing:".06em",color:"#5a5550",cursor:"default"}}>{b}</span>)}</div></Fade>
        <Fade delay={.15}><div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:16,maxWidth:800,margin:"0 auto",textAlign:"center"}}>{STATS.map((s,i)=><div key={i}><p style={{fontFamily:serif,fontSize:"clamp(1.8rem,3vw,2.8rem)",fontWeight:300,fontStyle:"italic",color:"#1a1a1a",lineHeight:1}}>{s.v}</p><p style={{fontSize:10,letterSpacing:".2em",color:"#999",marginTop:6}}>{s.l}</p></div>)}</div></Fade>
      </section>

      {SECTIONS.map((sec,si)=>(
        <section key={sec.id} id={si===0?"work":undefined} style={{background:si%2===0?"white":"#f5f3f0",borderRadius:24,marginTop:32,padding:"48px 24px"}}>
          <SH tag={sec.title} count={sec.items.length} title={sec.title} sub={sec.sub}/>
          <Fade delay={.1}><div className="hs" style={{display:"flex",gap:20,overflowX:"auto",padding:"16px 0 24px",scrollSnapType:"x mandatory"}}>{sec.items.map(item=><PhoneCard key={item.id} item={item}/>)}</div></Fade>
        </section>
      ))}

      <section id="about" style={{background:"white",borderRadius:24,marginTop:32,padding:"48px 24px"}}>
        <SH tag="Analytics" count={4} title="Results that speak."/>
        <p style={{fontSize:12,color:"#aaa",fontStyle:"italic",letterSpacing:".1em",marginBottom:36,marginTop:-8}}>more analytics available on request *</p>
        <Fade delay={.1}><div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(220px,1fr))",gap:16}}>{ANALYTICS.map((a,i)=><div key={i} style={{background:"#f5f3f0",borderRadius:20,padding:28,border:"1px solid #e9e5e0",textAlign:"center"}}><p style={{fontFamily:serif,fontSize:"2.5rem",fontWeight:300,color:"#1a1a1a"}}>{a.v}</p><p style={{fontSize:10,letterSpacing:".18em",color:"#999",textTransform:"uppercase",marginBottom:4}}>{a.l}</p><p style={{fontSize:13,color:"#aaa",fontStyle:"italic"}}>{a.d}</p></div>)}</div></Fade>
      </section>

      <section style={{position:"relative",overflow:"hidden",background:"#1a1a1a",borderRadius:24,marginTop:32,padding:"80px 24px",textAlign:"center"}}>
        <div style={{position:"absolute",inset:0,pointerEvents:"none",overflow:"hidden"}}>
          {[{src:IMG.dec1,top:20,left:-24,rotate:-6,w:180},{src:IMG.dec2,top:28,right:-10,rotate:6,w:180},{src:IMG.dec3,bottom:20,left:16,rotate:-12,w:200},{src:IMG.dec4,bottom:12,right:16,rotate:6,w:180}].map((p,i)=>(
            <img key={i} src={p.src} alt="" style={{position:"absolute",width:p.w,borderRadius:16,objectFit:"cover",boxShadow:"0 4px 20px rgba(0,0,0,.3)",border:"1px solid rgba(255,255,255,.1)",top:p.top,left:p.left,right:p.right,bottom:p.bottom,transform:`rotate(${p.rotate}deg)`,opacity:.45}}/>
          ))}
        </div>
        <Fade><div style={{position:"relative",zIndex:2,maxWidth:800,margin:"0 auto"}}>
          <div style={{display:"flex",justifyContent:"space-between",marginBottom:32}}><p style={{fontSize:11,fontWeight:500,color:"rgba(255,255,255,.4)",letterSpacing:".14em",textTransform:"uppercase"}}>/Testimonials</p><span style={{fontSize:11,fontWeight:500,color:"rgba(255,255,255,.4)"}}>(100+)</span></div>
          <h2 style={{fontFamily:serif,fontSize:"clamp(1.8rem,5vw,3.5rem)",fontWeight:300,color:"white",lineHeight:1.2}}>Clients say working with Diana blends authentic creativity and meticulous attention—helping brands grow with confidence.</h2>
          <a href="#contact" style={{display:"inline-flex",alignItems:"center",gap:8,marginTop:32,padding:"12px 24px",borderRadius:100,background:"white",color:"#1a1a1a",fontSize:13,fontWeight:500}}>Read all reviews <ArrowUR/></a>
        </div></Fade>
      </section>

      <section id="book-me" style={{background:"#1a1a1a",borderRadius:24,marginTop:32,padding:"60px 24px",textAlign:"center"}}>
        <Fade><div style={{maxWidth:700,margin:"0 auto"}}>
          <div style={{display:"flex",justifyContent:"space-between",marginBottom:12}}><p style={{fontSize:11,fontWeight:500,color:"rgba(255,255,255,.4)",letterSpacing:".14em",textTransform:"uppercase"}}>/Book Me</p><span style={{fontSize:11,fontWeight:500,color:"rgba(255,255,255,.4)"}}>(01)</span></div>
          <h2 style={{fontFamily:serif,fontSize:"clamp(2rem,5vw,3.5rem)",fontWeight:300,color:"white",marginBottom:16}}>Let's create together.</h2>
          <p style={{fontSize:14,color:"rgba(255,255,255,.5)",lineHeight:1.7,marginBottom:32}}>Book a discovery call to discuss your brand's content needs.</p>
          {!showCal?(<button onClick={()=>setShowCal(true)} style={{padding:"14px 40px",background:"white",color:"#1a1a1a",border:"none",borderRadius:12,cursor:"pointer",fontSize:12,fontWeight:500,letterSpacing:".12em",textTransform:"uppercase"}}>Book a Call</button>):(<div style={{marginTop:24,borderRadius:16,overflow:"hidden",background:"white"}}><iframe src="https://calendly.com/dianagarcia/discovery-call" title="Book" style={{width:"100%",height:700,border:"none"}}/></div>)}
          <p style={{marginTop:20,fontSize:11,color:"rgba(255,255,255,.3)",letterSpacing:".1em"}}>Or email directly — hello@dianagarcia.com</p>
        </div></Fade>
      </section>

      <footer id="contact" style={{marginTop:32,marginBottom:16}}>
        <div style={{background:"#1a1a1a",borderRadius:24,color:"white",padding:"48px 32px"}}>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:32}}>
            <div><h3 style={{fontFamily:serif,fontSize:"clamp(2rem,4vw,3.5rem)",fontWeight:300}}>DIANA GARCIA</h3><p style={{marginTop:20,fontSize:13,color:"rgba(255,255,255,.5)"}}>hello@dianagarcia.com</p></div>
            <div><h4 style={{fontFamily:serif,fontSize:"1.4rem",fontWeight:300,marginBottom:8}}>Stay connected</h4><p style={{fontSize:12,color:"rgba(255,255,255,.5)",lineHeight:1.6}}>Join the newsletter for updates on new work.</p></div>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:16}}><div style={{display:"flex",flexDirection:"column",gap:8}}>{["About","Projects","Blog","Contact"].map(l=><a key={l} href="#" style={{fontSize:13,color:"rgba(255,255,255,.7)",fontWeight:500}}>{l}</a>)}</div><div style={{display:"flex",flexDirection:"column",gap:8}}>{["TikTok","Instagram","Twitter"].map(l=><a key={l} href="#" style={{fontSize:13,color:"rgba(255,255,255,.7)",fontWeight:500}}>{l}</a>)}</div></div>
          </div>
          <div style={{marginTop:32,paddingTop:24,borderTop:"1px solid rgba(255,255,255,.08)",display:"flex",justifyContent:"space-between",alignItems:"center"}}><p style={{fontSize:11,color:"rgba(255,255,255,.35)"}}>© 2026 Diana Garcia. All rights reserved.</p><p style={{fontSize:12,color:"rgba(255,255,255,.4)"}}>Authentic content that converts.</p><div style={{display:"flex",gap:16}}><a href="#" style={{fontSize:11,color:"rgba(255,255,255,.5)"}}>Privacy</a><a href="#" style={{fontSize:11,color:"rgba(255,255,255,.5)"}}>Terms</a></div></div>
        </div>
      </footer>
    </main>
  </>);
}

function LoginPage({onLogin}){
  const[u,setU]=useState("");const[p,setP]=useState("");const[err,setErr]=useState("");
  const go=()=>{if(u==="test"&&p==="123456")onLogin();else setErr("Invalid credentials.")};
  const inp={width:"100%",padding:"12px 14px",border:"1px solid #e5e2dd",borderRadius:10,fontFamily:sans,fontSize:14,background:"#f5f3f0",color:"#1a1a1a",outline:"none",marginBottom:10};
  return(<><GlobalCSS/><div style={{minHeight:"100vh",display:"flex",alignItems:"center",justifyContent:"center",padding:24}}><div style={{background:"white",border:"1px solid #e5e2dd",borderRadius:24,padding:40,width:"100%",maxWidth:380,textAlign:"center"}}><h1 style={{fontFamily:serif,fontSize:"1.8rem",fontWeight:300,marginBottom:8}}>Admin</h1><p style={{fontSize:13,color:"#999",marginBottom:24}}>Sign in to manage your portfolio</p>{err&&<div style={{background:"#fdecea",color:"#c0392b",padding:"8px 12px",borderRadius:8,fontSize:13,marginBottom:12}}>{err}</div>}<input style={inp} placeholder="Username" value={u} onChange={e=>setU(e.target.value)}/><input style={inp} type="password" placeholder="Password" value={p} onChange={e=>setP(e.target.value)} onKeyDown={e=>e.key==="Enter"&&go()}/><button onClick={go} style={{width:"100%",padding:12,background:"#1a1a1a",color:"white",border:"none",borderRadius:10,fontSize:13,letterSpacing:".1em",textTransform:"uppercase",cursor:"pointer",marginTop:8,fontFamily:sans}}>Sign In</button></div></div></>);
}

function AdminPage({onLogout}){
  const[sections,setSections]=useState(JSON.parse(JSON.stringify(SECTIONS)));
  const[newItems,setNewItems]=useState({});
  const upNew=(sec,f,v)=>setNewItems(p=>({...p,[sec]:{...(p[sec]||{}),[f]:v}}));
  const addItem=(sid)=>{const n=newItems[sid];if(!n||!n.brand||!n.cat)return;setSections(prev=>prev.map(s=>s.id===sid?{...s,items:[...s.items,{id:sid+"_"+Date.now(),brand:n.brand,cat:n.cat.toUpperCase(),video:n.video||"",thumb:n.thumb||IMG.t1}]}:s));setNewItems(p=>({...p,[sid]:{}}))};
  const rmItem=(sid,iid)=>setSections(p=>p.map(s=>s.id===sid?{...s,items:s.items.filter(i=>i.id!==iid)}:s));
  const inp={width:"100%",padding:"8px 10px",border:"1px solid #e5e2dd",borderRadius:6,fontFamily:sans,fontSize:13,background:"white",color:"#1a1a1a",outline:"none",marginBottom:6};
  const btn={padding:"7px 14px",background:"#1a1a1a",color:"white",border:"none",borderRadius:6,fontSize:11,cursor:"pointer",width:"100%",fontFamily:sans};
  return(<><GlobalCSS/><div style={{minHeight:"100vh",padding:24}}><div style={{maxWidth:1000,margin:"0 auto"}}>
    <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:24,paddingBottom:16,borderBottom:"1px solid #e5e2dd"}}><h1 style={{fontFamily:serif,fontSize:"1.6rem",fontWeight:300}}>Portfolio Admin</h1><div style={{display:"flex",gap:10}}><button onClick={()=>{window.location.hash=""}} style={{...btn,background:"transparent",color:"#999",border:"1px solid #ccc",width:"auto",padding:"7px 16px"}}>View Site</button><button onClick={onLogout} style={{...btn,background:"transparent",color:"#999",border:"1px solid #ccc",width:"auto",padding:"7px 16px"}}>Logout</button></div></div>
    {sections.map(sec=>(<div key={sec.id} style={{background:"white",borderRadius:16,padding:24,marginBottom:16,border:"1px solid #e5e2dd"}}>
      <h3 style={{fontFamily:serif,fontSize:"1.2rem",fontWeight:400,marginBottom:16}}>{sec.title}</h3>
      <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(200px,1fr))",gap:12}}>{sec.items.map(item=>(<div key={item.id} style={{background:"#f5f3f0",borderRadius:12,overflow:"hidden",border:"1px solid #e9e5e0"}}><img src={item.thumb} alt="" style={{width:"100%",height:120,objectFit:"cover"}}/><div style={{padding:10}}><p style={{fontWeight:500,fontSize:13}}>{item.brand}</p><p style={{fontSize:10,color:"#999",letterSpacing:".1em",textTransform:"uppercase",marginBottom:8}}>{item.cat}</p><button style={{...btn,background:"#c0392b"}} onClick={()=>rmItem(sec.id,item.id)}>Remove</button></div></div>))}</div>
      <div style={{display:"flex",gap:10,marginTop:16,paddingTop:16,borderTop:"1px solid #e9e5e0",alignItems:"end",flexWrap:"wrap"}}>
        <div style={{flex:1,minWidth:120}}><label style={{display:"block",fontSize:10,color:"#999",textTransform:"uppercase",marginBottom:4}}>Brand</label><input style={inp} value={newItems[sec.id]?.brand||""} onChange={e=>upNew(sec.id,"brand",e.target.value)}/></div>
        <div style={{flex:1,minWidth:120}}><label style={{display:"block",fontSize:10,color:"#999",textTransform:"uppercase",marginBottom:4}}>Category</label><input style={inp} placeholder="e.g. DEMO" value={newItems[sec.id]?.cat||""} onChange={e=>upNew(sec.id,"cat",e.target.value)}/></div>
        <div style={{flex:2,minWidth:180}}><label style={{display:"block",fontSize:10,color:"#999",textTransform:"uppercase",marginBottom:4}}>Video URL</label><input style={inp} value={newItems[sec.id]?.video||""} onChange={e=>upNew(sec.id,"video",e.target.value)}/></div>
        <button style={{...btn,width:"auto",padding:"8px 16px",marginBottom:6}} onClick={()=>addItem(sec.id)}>+ Add</button>
      </div>
    </div>))}
  </div></div></>);
}
