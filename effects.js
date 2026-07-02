// 🍀新緑・母の日エフェクト
function showGreenEffect(){

  for(let i=0;i<24;i++){

    const el=document.createElement("div");
    el.className="greenEffect";
    el.textContent="🍀";

    el.style.left=Math.random()*100+"vw";
    el.style.animationDuration=(2.8+Math.random()*3)+"s";
    el.style.fontSize=(18+Math.random()*12)+"px";

    document.body.appendChild(el);

    setTimeout(()=>el.remove(),6000);

  }

}


// 🎏こいのぼり
function showKoinobori(){

  const fish=document.createElement("div");

  fish.className="koinoboriEffect";
  fish.textContent="🎏";

  fish.style.position="fixed";
  fish.style.left="-70px";
  fish.style.top="48%";
  fish.style.opacity=".9";
  fish.style.fontSize="44px";
  fish.style.zIndex="9999";
  fish.style.pointerEvents="none";
  fish.style.filter="drop-shadow(0 8px 12px rgba(0,0,0,.35))";

  document.body.appendChild(fish);

  let x=-70;
  let t=0;

  const move=setInterval(()=>{

    x+=4.5;
    t+=0.12;

    fish.style.left=x+"px";
    fish.style.top=(48+Math.sin(t)*4)+"%";
    fish.style.transform=`rotate(${Math.sin(t)*8}deg)`;

    if(x>window.innerWidth+80){

      clearInterval(move);
      fish.remove();

    }

  },30);

}


// ⭐七夕用
function showStarRain(){

  for(let i=0;i<35;i++){

    const star=document.createElement("div");

    star.textContent=Math.random()>0.7?"🌠":"⭐";

    star.style.position="fixed";
    star.style.left=Math.random()*100+"vw";
    star.style.top="-40px";
    star.style.fontSize=(18+Math.random()*18)+"px";
    star.style.zIndex="9999";
    star.style.pointerEvents="none";

    star.animate([

      {
        transform:"translateY(0px) scale(.7)",
        opacity:0
      },

      {
        transform:`translate(${Math.random()*120-60}px,${window.innerHeight+80}px) scale(1.2)`,
        opacity:1
      }

    ],{

      duration:2500+Math.random()*2500,
      easing:"ease-in"

    });

    document.body.appendChild(star);

    setTimeout(()=>star.remove(),5200);

  }

}


// 🌠夜空専用・見えやすい流れ星
function showShootingStar(){

  for(let i=0;i<5;i++){

    setTimeout(()=>{

      const star=document.createElement("div");
      star.textContent="🌠";

      star.style.position="fixed";
      star.style.left="85vw";
      star.style.top=(10+Math.random()*35)+"vh";
      star.style.fontSize=(34+Math.random()*16)+"px";
      star.style.zIndex="99999";
      star.style.pointerEvents="none";
      star.style.opacity="1";

      document.body.appendChild(star);

      star.animate([
        {
          transform:"translate(0,0) scale(1)",
          opacity:1
        },
        {
          transform:"translate(-75vw,45vh) scale(1.25)",
          opacity:1
        },
        {
          transform:"translate(-95vw,60vh) scale(.8)",
          opacity:0
        }
      ],{
        duration:2200,
        easing:"ease-out"
      });

      setTimeout(()=>star.remove(),2300);

    },i*650);

  }

}


// 🎆花火
function showFireworks(){

  for(let i=0;i<18;i++){

    setTimeout(()=>{

      const fire=document.createElement("div");

      fire.textContent="🎆";

      fire.style.position="fixed";
      fire.style.left=(10+Math.random()*80)+"vw";
      fire.style.top=(10+Math.random()*60)+"vh";
      fire.style.fontSize=(40+Math.random()*28)+"px";
      fire.style.opacity="0";
      fire.style.zIndex="9999";
      fire.style.pointerEvents="none";

      fire.animate([

        {
          transform:"scale(.2)",
          opacity:0
        },

        {
          transform:"scale(1.4)",
          opacity:1
        },

        {
          transform:"scale(1)",
          opacity:0
        }

      ],{

        duration:1300

      });

      document.body.appendChild(fire);

      setTimeout(()=>fire.remove(),1300);

    },i*180);

  }

}


// 🌊海
function showBubbleEffect(){

  for(let i=0;i<28;i++){

    const b=document.createElement("div");

    b.textContent=Math.random()>0.75?"🐬":"🫧";

    b.style.position="fixed";
    b.style.left=Math.random()*100+"vw";
    b.style.bottom="-60px";
    b.style.fontSize=(18+Math.random()*22)+"px";
    b.style.zIndex="9999";
    b.style.pointerEvents="none";

    b.animate([

      {
        transform:"translateY(0)"
      },

      {
        transform:`translate(${Math.random()*100-50}px,-${window.innerHeight+120}px)`
      }

    ],{

      duration:3500+Math.random()*2000,
      easing:"ease-out"

    });

    document.body.appendChild(b);

    setTimeout(()=>b.remove(),6000);

  }

}


// 🏮夏祭り
function showLanternEffect(){

  const icons=["🏮","🎈","✨","🎐"];

  for(let i=0;i<22;i++){

    const el=document.createElement("div");

    el.textContent=icons[Math.floor(Math.random()*icons.length)];

    el.style.position="fixed";
    el.style.left=Math.random()*100+"vw";
    el.style.top="-40px";
    el.style.fontSize=(22+Math.random()*20)+"px";
    el.style.zIndex="9999";
    el.style.pointerEvents="none";

    el.animate([

      {
        transform:"translateY(0) rotate(0deg)"
      },

      {
        transform:`translate(${Math.random()*80-40}px,${window.innerHeight+80}px) rotate(${Math.random()*180-90}deg)`
      }

    ],{

      duration:5000+Math.random()*2000

    });

    document.body.appendChild(el);

    setTimeout(()=>el.remove(),7000);

  }

}


// 季節判定
function showSeasonEffect(reward){

  if(!reward || !reward.src) return;

  const src=reward.src.toLowerCase();

  // 🎏
  if(src.includes("kabuto") || src.includes("koinobori")){
    showKoinobori();
    return;
  }

  // 🍀
  if(src.includes("mother") || src.includes("shinryoku")){
    showGreenEffect();
    return;
  }

  // 🎋七夕
  if(src.includes("tanabata")){
    showStarRain();
    return;
  }

  // 🌌夜空
if(src.includes("starry")){
    showShootingStar();
    return;
}

  // 🎆花火
  if(src.includes("fireworks")){
    showFireworks();
    return;
  }

  // 🌊海
  if(src.includes("beach") || src.includes("ocean")){
    showBubbleEffect();
    return;
  }

  // 🏮夏祭り
  if(src.includes("festival") || src.includes("matsuri")){
    showLanternEffect();
    return;
  }

}
