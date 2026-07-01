/* ==========================================================
   LAIFUDE VINA
   language.js V4
========================================================== */

(() => {

"use strict";

/* ---------------------------------------------------------
   CONFIG
--------------------------------------------------------- */

const STORAGE_KEY = "laifude_language";

const DEFAULT_LANG = "en";

const LABELS = {

    en: "English",
    ko: "한국어",
    vi: "Tiếng Việt",
    "zh-CN": "中文"

};

/* ---------------------------------------------------------
   STORAGE
--------------------------------------------------------- */

function saveLanguage(lang){

    localStorage.setItem(STORAGE_KEY,lang);

}

function getLanguage(){

    return localStorage.getItem(STORAGE_KEY) || DEFAULT_LANG;

}

/* ---------------------------------------------------------
   LABEL
--------------------------------------------------------- */

function updateLanguageLabel(lang){

    const top=document.getElementById("current-language");

    const bottom=document.getElementById("footer-language");

    const text=LABELS[lang] || LABELS.en;

    if(top){

        top.textContent=text;

    }

    if(bottom){

        bottom.textContent=text;

    }

}

/* ---------------------------------------------------------
   MENU
--------------------------------------------------------- */

function closeMenus(){

    document.querySelectorAll(".language-menu")
        .forEach(menu=>{

            menu.classList.remove("active");

        });

}

function toggleMenu(menu){

    if(!menu){

        return;

    }

    const opened=menu.classList.contains("active");

    closeMenus();

    if(!opened){

        menu.classList.add("active");

    }

}
/* ---------------------------------------------------------
   MENU EVENT
--------------------------------------------------------- */

function bindMenus(){

    const headerButton =
        document.querySelector(".language");

    const footerButton =
        document.querySelector(".language-footer");

    const headerMenu =
        document.querySelector(".header-menu");

    const footerMenu =
        document.querySelector(".footer-menu");

    if(headerButton && headerMenu){

        headerButton.addEventListener("click",(e)=>{

            e.stopPropagation();

            toggleMenu(headerMenu);

        });

    }

    if(footerButton && footerMenu){

        footerButton.addEventListener("click",(e)=>{

            e.stopPropagation();

            toggleMenu(footerMenu);

        });

    }

    document.addEventListener("click",(e)=>{

        if(
            e.target.closest(".language") ||
            e.target.closest(".language-footer") ||
            e.target.closest(".language-menu")
        ){

            return;

        }

        closeMenus();

    });

}

/* ---------------------------------------------------------
   GOOGLE TRANSLATE
--------------------------------------------------------- */

function translate(lang){

    const combo =
        document.querySelector(".goog-te-combo");

    if(!combo){

        return false;

    }

    combo.value = lang;

    combo.dispatchEvent(

        new Event("change",{

            bubbles:true

        })

    );

    return true;

}

/* ---------------------------------------------------------
   WAIT GOOGLE
--------------------------------------------------------- */

function waitGoogle(lang){

    let retry = 0;

    const timer = setInterval(()=>{

        if(translate(lang)){

            clearInterval(timer);

            if(
                window.LanguageImages &&
                typeof window.LanguageImages.change==="function"
            ){

                window.LanguageImages.change(lang);

            }

            closeMenus();

            return;

        }

        retry++;

        if(retry>=30){

            clearInterval(timer);

            console.warn(
                "[Language] Google Translate timeout."
            );

            if(
                window.LanguageImages &&
                typeof window.LanguageImages.change==="function"
            ){

                window.LanguageImages.change(lang);

            }

            closeMenus();

        }

    },200);

}
/* ---------------------------------------------------------
   APPLY LANGUAGE
--------------------------------------------------------- */

function applyLanguage(lang){

    saveLanguage(lang);

    updateLanguageLabel(lang);

    waitGoogle(lang);

}

/* ---------------------------------------------------------
   GLOBAL
--------------------------------------------------------- */

window.changeLanguage = function(lang){

    applyLanguage(lang);

};

/* ---------------------------------------------------------
   GOOGLE INIT
--------------------------------------------------------- */

window.googleTranslateElementInit = function(){

    new google.translate.TranslateElement({

        pageLanguage : "en",

        includedLanguages : "en,ko,vi,zh-CN",

        autoDisplay : false

    }, "google_translate_element");

    setTimeout(()=>{

        applyLanguage(getLanguage());

    },500);

};

/* ---------------------------------------------------------
   INIT
--------------------------------------------------------- */

function init(){

    bindMenus();

    const lang = getLanguage();

    updateLanguageLabel(lang);

    if(
        window.LanguageImages &&
        typeof window.LanguageImages.change==="function"
    ){

        window.LanguageImages.change(lang);

    }

}

/* ---------------------------------------------------------
   START
--------------------------------------------------------- */

document.addEventListener(

    "DOMContentLoaded",

    init

);

})();