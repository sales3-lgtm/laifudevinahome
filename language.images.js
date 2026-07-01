
/* ==========================================================
   LAIFUDE VINA
   language.images.js V4
========================================================== */

(() => {

"use strict";

/* ---------------------------------------------------------
   Language Image Engine
--------------------------------------------------------- */

const IMAGE_MAP = {

    // index
    banner01: "banner01",
    banner2: "2banner",
    process: "process",
    contactimg: "contactimg",

    // about
    aboutus01: "aboutus01",
    aboutus02: "aboutus02",

    // collections
    collections01: "collections01",
    collections03: "collections03",

    // technology
    tech01: "tech01",
    tech02: "tech02",

    // sustainability
    sustainability01: "sustainability01",
    sustainability02: "sustainability02",

    // contact
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

/* ---------------------------------------------------------
   파일명 생성
--------------------------------------------------------- */

function buildPath(file, lang){

    if(lang==="en"){

        return `image/${file}.png`;

    }

    return `image/${file}${SUFFIX[lang]}.png`;

}

/* ---------------------------------------------------------
   이미지 존재 여부 확인
--------------------------------------------------------- */

function imageExists(src){

    return new Promise(resolve=>{

        const img=new Image();

        img.onload=()=>resolve(true);

        img.onerror=()=>resolve(false);

        img.src=src;

    });

}

/* ---------------------------------------------------------
   이미지 변경
--------------------------------------------------------- */

async function change(lang){

    const jobs=[];

    Object.entries(IMAGE_MAP).forEach(([id,file])=>{

        jobs.push(changeOne(id,file,lang));

    });

    await Promise.all(jobs);

}
/* ---------------------------------------------------------
   개별 이미지 변경
--------------------------------------------------------- */

async function changeOne(id, file, lang){

    const img = document.getElementById(id);

    if(!img){

        return;

    }

    const target = buildPath(file, lang);

    /* 이미 적용되어 있으면 종료 */
    if(img.getAttribute("src") === target){

        return;

    }

    /* 파일 존재 확인 */
    const exists = await imageExists(target);

    if(!exists){

        console.warn("[LanguageImages] Missing :", target);

        return;

    }

    img.src = target;

}

/* ---------------------------------------------------------
   현재 언어 다시 적용
--------------------------------------------------------- */

function refresh(){

    const lang =
        localStorage.getItem("laifude_language") || "en";

    change(lang);

}

/* ---------------------------------------------------------
   초기화
--------------------------------------------------------- */

function init(){

    if(document.readyState==="loading"){

        document.addEventListener("DOMContentLoaded",refresh);

    }else{

        refresh();

    }

}
/* ---------------------------------------------------------
   외부 공개 API
--------------------------------------------------------- */

window.LanguageImages = Object.freeze({

    change,
    refresh,
    init

});

/* ---------------------------------------------------------
   자동 초기화
--------------------------------------------------------- */

init();

})();