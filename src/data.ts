import { Project, Skill, PlaylistSong } from "./types";

export const PROJECTS: Project[] = [
  {
    id: "proj-1",
    title: "nuances-and-brat",
    subtitle: "Brutalist Collage & Digital Poster",
    category: "design",
    tags: ["Photoshop", "Halftone Slicer", "Brat Style", "Poster Graphic"],
    description: "以2024最潮热的Brat（酸性绿）风为灵感创作的数码艺术海报。融合标志性青苹果、酸性流体色块、倾斜裁判的复古眼部高对比特写，以及带有颗粒质感的半色调网点。上面印有歌词：'I know there's lots of different nuances to you and to me'，探索数字拼贴中的亚文化无序性与真实感。",
    color: "#9ACD32",
    year: "2024",
    link: "https://github.com",
    image: "collage"
  },
  {
    id: "proj-2",
    title: "android-3d-rave",
    subtitle: "Charli & Android Mascot Render",
    category: "art",
    tags: ["Blender 3D", "Lighting Render", "Pop Art", "Exhibition Design"],
    description: "3D Blender 渲染艺术。标志性的绿色安卓机器人伫立在极简主义艺术展台上，背后是一幅巨大的 Charli XCX 风格经典黑白人像特写。空间墙面被涂刷以代表性的酸性荧光绿，融合电子大众符号与现代俱乐部锐舞美学。",
    color: "#9ACD32",
    year: "2024",
    link: "https://github.com",
    image: "rave-android"
  },
  {
    id: "proj-3",
    title: "brat-studio",
    subtitle: "Minimal Concrete 3D Ambient",
    category: "art",
    tags: ["3D Modeling", "Octane Render", "V-Ray", "Minimal Space"],
    description: "在极简三维水泥空间内的绿色光影练习。将现代主义的冷灰色混凝土基底与高对比度、高饱和度的发光荧光绿极速碰撞。安卓机器人安静伫立，背景墙壁压塑了经典的低清 Arial 粗体 'brat' 标识，极度纯粹。",
    color: "#9ACD32",
    year: "2024",
    link: "https://github.com",
    image: "studio-android"
  },
  {
    id: "proj-4",
    title: "brat-chair",
    subtitle: "Subcultural Furniture Concept",
    category: "art",
    tags: ["Industrial Render", "Soft Body Physics", "Post-Modernism", "Warm Light"],
    description: "超现实主义概念家具 3D 渲染表现。将经典的白色木饰椅改造成流动着黏润液体感、上面印有低频拉伸 'brat' 文本的酸性荧光绿皮革软垫椅。配合深邃的暗红色到明亮橙红的环境渐变低频光影，营造出迷幻而反常态的现代氛围。",
    color: "#fff",
    year: "2024",
    link: "https://github.com",
    image: "brat-chair"
  },
  {
    id: "proj-5",
    title: "neon-graffiti-synth",
    subtitle: "3D WebGL WebAudio Synthesizer",
    category: "web",
    tags: ["Three.js", "WebAudio API", "GLSL Splicer"],
    description: "一个全交互式、基于 WebGL 的音乐合成器与视觉染色器。玩家可以在立体空间中通过涂鸦手势直接改变俱乐部低音频率、延迟与波形包络，让声频在屏幕上爆发为酸性绿色的粒子流。",
    color: "#9ACD32",
    year: "2026",
    link: "https://github.com",
    image: "synth"
  },
  {
    id: "proj-6",
    title: "analog-bleeding-clipping",
    subtitle: "VCF Filter & Feedback Simulator",
    category: "audio",
    tags: ["DSP", "WebAssembly", "Tone.js"],
    description: "一个在浏览器端模拟模拟磁带饱和与电路削波（Clipping）的单页合成器效果器模块。通过控制反馈环路和信号超载，产生充满颗粒感、肮脏却带有温暖感的低保真酸性音色。",
    color: "#000",
    year: "2026",
    link: "https://github.com",
    image: "audio-filter"
  }
];

export const SKILLS: Skill[] = [
  { name: "React / SolidJS / Next.js", level: 95, category: "Code" },
  { name: "WebGL / Three.js / Canvas", level: 85, category: "Code" },
  { name: "WebAudio DSP / Tone.js", level: 80, category: "Code" },
  { name: "Acidic Yellow-Green Design", level: 100, category: "Vibe" },
  { name: "Alternative Layout & Anti-Design", level: 90, category: "Vibe" },
  { name: "Raw Type Strecthing & Ink bleeding", level: 95, category: "Vibe" },
  { name: "Tailwind CSS v4 Workflow", level: 95, category: "Code" },
  { name: "Motion & Micro-Animation", level: 90, category: "Code" }
];

export const PLAYLIST: PlaylistSong[] = [
  { id: "song-1", title: "360", artist: "Charli XCX", duration: "2:26", energyLevel: "100% Club Pop" },
  { id: "song-2", title: "Von dutch", artist: "Charli XCX", duration: "2:44", energyLevel: "Acid Synth Overdrive" },
  { id: "song-3", title: "b2b", artist: "Charli XCX", duration: "2:58", energyLevel: "Strobe Lights Loop" },
  { id: "song-4", title: "365", artist: "Charli XCX", duration: "3:23", energyLevel: "Endless Green Rave Simulator" },
  { id: "song-5", title: "Sympathy is a knife", artist: "Charli XCX", duration: "2:52", energyLevel: "Low-res Contrast Vibe" }
];

export const MEMORABLE_QUOTES = [
  "brat and it's the same but it's a website so it's fully interactive to type whatever you want.",
  "i'm your favorite digital subculture designer, call me when you want something messy yet pristine.",
  "everything is fuzzy, everything is green, but the code is perfectly structured and responsive.",
  "we don't do boring corporate margins here. select black, select green, let text blur.",
  "who cares about polished clean gradients when you can have brutal yellowgreen overload?"
];
