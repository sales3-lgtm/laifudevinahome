/* ==========================================================
   LAIFUDE VINA
   language.images.js
   Version 1.0
========================================================== */

window.LanguageImages = (function () {

    const suffixMap = {
        "en": "",
        "ko": "-ko",
        "vi": "-vi",
        "zh-CN": "-zh"
    };

    // 절대 변경하지 않을 이미지
    const ignoreList = [
        "logo",
        "footer-logo",
        "favicon",
        "process",
        "contactimg",
        "icon-"
    ];

    function ignore(src) {

        return ignoreList.some(item => src.includes(item));

    }

    function getTarget(src, lang){

        if(!src) return null;

        if(!src.startsWith("image/")) return null;

        if(src.endsWith(".svg")) return null;

        if(ignore(src)) return null;

        // 이미 언어 이미지인 경우 원본으로 변환
        src = src.replace("-ko.png",".png");
        src = src.replace("-vi.png",".png");
        src = src.replace("-zh.png",".png");

        const suffix = suffixMap[lang] || "";

        return src.replace(".png", suffix + ".png");

    }

    function fileExists(url){

        return new Promise(resolve=>{

            const img = new Image();

            img.onload=()=>resolve(true);

            img.onerror=()=>resolve(false);

            img.src=url;

        });

    }

    async function change(lang){

        const images=document.querySelectorAll("img");

        for(const img of images){

            const src=img.getAttribute("src");

            const target=getTarget(src,lang);

            if(!target) continue;

            const ok=await fileExists(target);

            if(ok){

                img.src=target;

            }

        }

    }

    return{

        change

    };

})();