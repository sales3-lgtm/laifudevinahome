window.addEventListener("DOMContentLoaded",()=>{

    const menu=document.querySelector(".language-menu");

    function openMenu(btn,isFooter=false){

        if(!menu) return;

        menu.classList.add("active");

        const rect=btn.getBoundingClientRect();

        // 메뉴 높이 계산
        const menuHeight=menu.offsetHeight || 180;

        if(isFooter){
            menu.style.top=(rect.top-menuHeight-10)+"px";
        }else{
            menu.style.top=(rect.bottom+10)+"px";
        }

        menu.style.left=rect.left+"px";
    }

    // Header 버튼
    document.querySelector(".language")?.addEventListener("click",(e)=>{

        e.stopPropagation();

        openMenu(e.currentTarget,false);

    });

    // Footer 버튼
    document.querySelector(".language-footer")?.addEventListener("click",(e)=>{

        e.stopPropagation();

        openMenu(e.currentTarget,true);

    });

    // 메뉴 바깥 클릭시 닫기
    document.addEventListener("click",()=>{

        menu?.classList.remove("active");

    });

});

function changeLanguage(lang){

    const combo=document.querySelector(".goog-te-combo");

    if(combo){

        combo.value=lang;
        combo.dispatchEvent(new Event("change"));

    }

    const names={
        en:"English",
        ko:"한국어",
        vi:"Tiếng Việt",
        "zh-CN":"中文"
    };

    document.getElementById("current-language") &&
    (document.getElementById("current-language").innerText=names[lang]);

    document.getElementById("footer-language") &&
    (document.getElementById("footer-language").innerText=names[lang]);

    document.querySelector(".language-menu")?.classList.remove("active");

}

function googleTranslateElementInit() {

    new google.translate.TranslateElement({

        pageLanguage:'en',
        includedLanguages:'en,ko,vi,zh-CN',
        autoDisplay:false

    }, 'google_translate_element');

}