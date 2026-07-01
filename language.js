/* ==========================================================
   LAIFUDE VINA
   language.js V3
   Part 1
========================================================== */

(() => {

    "use strict";

    const STORAGE_KEY = "laifude_language";

    const DEFAULT_LANG = "en";

    const LABELS = {
        en: "English",
        ko: "한국어",
        vi: "Tiếng Việt",
        "zh-CN": "中文"
    };

    /*
        번역 대상 이미지만 등록

        HTML 예)

        <img id="banner2" src="image/2banner.png">

    */

    const IMAGE_MAP = {

        banner2: "2banner",

        aboutus01: "aboutus01",
        aboutus02: "aboutus02",

        collections01: "collections01",

        collections03: "collections03",

        tech01: "tech01",
        tech02: "tech02",

        sustainability01: "sustainability01",
        sustainability02: "sustainability02",

        contact02: "contact02",
        contactbg03: "contactbg03"

    };

    const LANG_SUFFIX = {

        en: "",

        ko: "-ko",

        vi: "-vi",

        "zh-CN": "-zh"

    };

    //--------------------------------------------------

    function getSavedLanguage(){

        return localStorage.getItem(STORAGE_KEY) || DEFAULT_LANG;

    }

    //--------------------------------------------------

    function saveLanguage(lang){

        localStorage.setItem(STORAGE_KEY,lang);

    }

    //--------------------------------------------------

    function updateLanguageLabel(lang){

        const top=document.getElementById("current-language");

        const bottom=document.getElementById("footer-language");

        if(top){

            top.textContent=LABELS[lang];

        }

        if(bottom){

            bottom.textContent=LABELS[lang];

        }

    }

    //--------------------------------------------------

    function closeMenus(){

        document
            .querySelectorAll(".language-menu")
            .forEach(menu=>{

                menu.classList.remove("active");

            });

    }

    //--------------------------------------------------

    function toggleMenu(menu){

        if(!menu) return;

        const active=menu.classList.contains("active");

        closeMenus();

        if(!active){

            menu.classList.add("active");

        }

    }

    //--------------------------------------------------

    function bindMenus(){

        const headerBtn=document.querySelector(".language");

        const footerBtn=document.querySelector(".language-footer");

        const headerMenu=document.querySelector(".header-menu");

        const footerMenu=document.querySelector(".footer-menu");

        if(headerBtn){

            headerBtn.addEventListener("click",(e)=>{

                e.stopPropagation();

                toggleMenu(headerMenu);

            });

        }

        if(footerBtn){

            footerBtn.addEventListener("click",(e)=>{

                e.stopPropagation();

                toggleMenu(footerMenu);

            });

            footerMenu.addEventListener("click",(e)=>{

                e.stopPropagation();

            });

        }

    document.addEventListener("click",(e)=>{

    if(
        e.target.closest(".language")==null &&
        e.target.closest(".language-footer")==null &&
        e.target.closest(".language-menu")==null
    ){

        closeMenus();

    }

});

    }

    //--------------------------------------------------

    function buildImageName(baseName,lang){

        const suffix=LANG_SUFFIX[lang];

        return "image/" + baseName + suffix + ".png";

    }

    //--------------------------------------------------

    function changeImages(lang){

        Object.entries(IMAGE_MAP).forEach(([id,file])=>{

            const img=document.getElementById(id);

            if(!img) return;

            if(lang==="en"){

                img.src="image/"+file+".png";

            }else{

                img.src=buildImageName(file,lang);

            }

        });

    }

    //--------------------------------------------------

    function googleTranslate(lang){

        const combo=document.querySelector(".goog-te-combo");

        if(!combo){

            return false;

        }

        combo.value=lang;

        combo.dispatchEvent(

            new Event("change",{

                bubbles:true

            })

        );

        return true;

    }

    //--------------------------------------------------
        function waitGoogle(lang){

        let retry = 0;

        const timer = setInterval(() => {

            if (googleTranslate(lang)) {

                clearInterval(timer);
                return;

            }

            retry++;

            if (retry > 30) {

                clearInterval(timer);

            }

        }, 200);

    }

    //--------------------------------------------------

    function applyLanguage(lang){

        saveLanguage(lang);

        updateLanguageLabel(lang);

        changeImages(lang);

        waitGoogle(lang);

        closeMenus();

    }

    //--------------------------------------------------

    window.changeLanguage = function(lang){

        applyLanguage(lang);

    };

    //--------------------------------------------------

    window.googleTranslateElementInit = function(){

        new google.translate.TranslateElement({

            pageLanguage: "en",

            includedLanguages: "en,ko,vi,zh-CN",

            autoDisplay: false

        }, "google_translate_element");

        setTimeout(() => {

            applyLanguage(getSavedLanguage());

        }, 500);

    };

    //--------------------------------------------------

    function init(){

        bindMenus();

        updateLanguageLabel(getSavedLanguage());

        changeImages(getSavedLanguage());

    }

    //--------------------------------------------------

    document.addEventListener("DOMContentLoaded", init);

})();