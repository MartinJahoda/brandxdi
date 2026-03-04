import { V } from "./utils";

export const serif = "var(--font-serif), Georgia, serif";
export const sans = "var(--font-sans), system-ui, sans-serif";

export const IMG = {
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

export const SECTIONS = [
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

export const BRANDS = ["Glossier","Fenty Beauty","Rare Beauty","The Ordinary","Olaplex","Drunk Elephant","Summer Fridays","Tatcha","Sol de Janeiro","Rhode","Charlotte Tilbury","Hourglass","Tower 28","Kosas","Supergoop","Glow Recipe","Milk Makeup","Byredo","Aesop","Youth to the People"];
export const STATS = [{v:"45K",l:"instagram"},{v:"50M+",l:"organic views"},{v:"3+",l:"years experience"},{v:"300+",l:"brands"}];
export const ANALYTICS = [{v:"7X",l:"ROAS",d:"Return on ad spend"},{v:"$0.02",l:"CPC",d:"Cost per click"},{v:"$1.15",l:"CPM",d:"Cost per mille"},{v:"4.8M",l:"Top Views",d:"Single organic video"}];
export const HERO_IMGS = [IMG.hero1, IMG.hero2, IMG.hero3, IMG.hero4, IMG.hero5];
