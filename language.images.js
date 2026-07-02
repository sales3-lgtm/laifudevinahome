/* ==========================================================
   LAIFUDE VINA
   language.images.js V4 - Optimized for Speed
========================================================== */

(() => {

"use strict";

const IMAGE_MAP = {
    banner01: "banner01",
    banner2: "2banner",
    process: "process",
    contactimg: "contactimg",
    aboutus01: "aboutus01",
    aboutus02: "aboutus02",
    collections01: "collections01",
    collections03: "collections03",
    tech01: "tech01",
    tech02: "tech02",
    sustainability01: "sustainability01",
    sustainability02: "sustainability02",
    contact02: "contact02",
    contactbg02: "contactbg02",
    contactbg03: "contactbg03"
};

const SUFFIX = {
    en: "",
    ko: "-ko",
    vi: "-vi",
    "zh-CN": "-zh"
};

// 불필요한 연산을 줄이기 위한 캐싱 및 문자열 조합 최적화
function buildPath(file, lang){
    return lang === "en" ? `image/${file}.png` : `image/${file}${SUFFIX[lang]}.png`;
}

// [개선] async/await 제거 및 동기식 즉시 실행으로 전환
function change(lang){
    const keys = Object.keys(IMAGE_MAP);
    
    // 순수 Loop문이 forEach보다 속도가 훨씬 빠릅니다.
    for (let i = 0; i < keys.length; i++) {
        const id = keys[i];
        const img = document.getElementById(id);
        
        if (img) {
            const target = buildPath(IMAGE_MAP[id], lang);
            img.src = target; // 브라우저에 바로 백그라운드 로드 지시
        }
    }
}

function refresh(){
    const lang = localStorage.getItem("laifude_language") || "en";
    change(lang);
}

function init(){
    if(document.readyState==="loading"){
        document.addEventListener("DOMContentLoaded", refresh);
    }else{
        refresh();
    }
}

window.LanguageImages = Object.freeze({
    change,
    refresh,
    init
});

init();

})();
