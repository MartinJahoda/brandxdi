export const V = (id, r) => `https://assets.mixkit.co/videos/${id}/${id}-${r || "1080"}.mp4`;

const PAL = ["#1a1a1a","#b8956a","#7c6e60","#5c7268","#6b5e7a","#7a5e5e","#4a6e7c","#917a52","#c06050","#3d6b5e"];
export const bclr = s => { let h = 0; for (let i = 0; i < s.length; i++) h = s.charCodeAt(i) + ((h << 5) - h); return PAL[Math.abs(h) % PAL.length]; };
