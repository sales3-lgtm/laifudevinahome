/* ==========================================================================
   🌐 [LAIFUDE VINA] 다국어 팝업 상/하단 독립 개폐 제어 스크립트 (완전판)
   ========================================================================== */

window.addEventListener("DOMContentLoaded", () => {
    // 💡 모든 다국어 메뉴들을 일괄 관리하기 위해 전체 종료하는 공통 함수
    function closeAllMenus() {
        document.querySelectorAll(".language-menu").forEach(menu => {
            menu.classList.remove("active");
        });
    }

    // 1. [상단 헤더 버튼 인터페이스] -> 오직 header-menu만 조종
    const headerLangBtn = document.querySelector(".language");
    const headerMenu = document.querySelector(".language-menu.header-menu");
    
    if (headerLangBtn && headerMenu) {
        headerLangBtn.addEventListener("click", (e) => {
            e.stopPropagation(); // body 클릭 전파 차단
            
            if (headerMenu.classList.contains("active")) {
                headerMenu.classList.remove("active");
            } else {
                closeAllMenus(); // 다른 메뉴가 켜져있다면 먼저 닫음
                headerMenu.classList.add("is-header");
                headerMenu.classList.add("active");
            }
        });
    }

    // 2. [하단 푸터 버튼 인터페이스] -> 오직 footer-menu만 조종
    const footerLangBtn = document.querySelector(".language-footer");
    const footerMenu = document.querySelector(".language-menu.footer-menu");
    
    if (footerLangBtn && footerMenu) {
        footerLangBtn.addEventListener("click", (e) => {
            e.stopPropagation();
            
            if (footerMenu.classList.contains("active")) {
                footerMenu.classList.remove("active");
            } else {
                closeAllMenus(); // 다른 메뉴가 켜져있다면 먼저 닫음
                footerMenu.classList.add("is-footer");
                footerMenu.classList.add("active");
            }
        });
    }

    // 3. [바탕화면 클릭 인터페이스] 바탕화면 누르면 열려있는 모든 메뉴 부드럽게 완전 자동 종료
    document.addEventListener("click", (e) => {
        const isMenuClick = e.target.closest(".language-menu");
        if (!isMenuClick) {
            closeAllMenus();
        }
    });
});

// 💡 자체 언어 버튼 클릭 시 구글 번역 연동 작동 함수
function changeLanguage(lang) {
    const combo = document.querySelector(".goog-te-combo");
    if (combo) {
        combo.value = lang;
        combo.dispatchEvent(new Event("change"));
    }

    const names = {
        en: "English",
        ko: "한국어",
        vi: "Tiếng Việt",
        "zh-CN": "中文"
    };

    const currentLangEl = document.getElementById("current-language");
    const footerLangEl = document.getElementById("footer-language");

    if (currentLangEl) currentLangEl.innerText = names[lang];
    if (footerLangEl) footerLangEl.innerText = names[lang];

    // 번역 완료 후 활성화되어 있던 모든 다국어 팝업창 완전 종료
    document.querySelectorAll(".language-menu").forEach(menu => {
        menu.classList.remove("active");
    });
}

// 구글 자동 디스플레이 방지 위젯 초기화
function googleTranslateElementInit() {
    new google.translate.TranslateElement({
        pageLanguage: 'en',
        includedLanguages: 'en,ko,vi,zh-CN',
        autoDisplay: false 
    }, 'google_translate_element');
}
