/* ==========================================================================
   🌐 [LAIFUDE VINA] 다국어 팝업 연동 및 구글 엔진 제어 스크립트 (번역 버그 수정본)
   ========================================================================== */

window.addEventListener("DOMContentLoaded", () => {
    const menu = document.querySelector(".language-menu");
    if (!menu) return;

    // 모든 다국어 메뉴들을 일괄 종료하는 공통 함수
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
            e.stopPropagation();
            if (headerMenu.classList.contains("active")) {
                headerMenu.classList.remove("active");
            } else {
                closeAllMenus();
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
                closeAllMenus();
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

// 💡 [🚨 핵심 수정] 구글 번역 콤보박스를 강제로 깨우고 실제 번역을 실현하는 최적화 함수
function changeLanguage(lang) {
    // 숨겨진 구글 순정 드롭다운 요소를 정밀 저격하여 탐색
    const combo = document.querySelector(".goog-te-combo");

    if (combo) {
        // 값을 교체
        combo.value = lang;
        
        // 🚨 최신 브라우저 표준에 맞는 가상 변경 이벤트 및 마우스 클릭 인지 트리거 가동
        if (typeof(Event) === 'function') {
            combo.dispatchEvent(new Event("change", { bubbles: true, cancelable: true }));
        } else {
            // 구형 브라우저 및 호환성 대비 인터페이스
            const event = document.createEvent('HTMLEvents');
            event.initEvent('change', true, true);
            combo.dispatchEvent(event);
        }
    } else {
        // 만약 구글 위젯 스크립트가 로딩 지연 상태일 경우를 대비한 0.5초 비동기 복구 대기 큐(Queue) 실행
        setTimeout(() => {
            const retryCombo = document.querySelector(".goog-te-combo");
            if (retryCombo) {
                retryCombo.value = lang;
                retryCombo.dispatchEvent(new Event("change", { bubbles: true }));
            }
        }, 500);
    }

    // 상/하단 버튼 내부 텍스트 즉시 새로고침 국가 명칭 데이터
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
//언어 별 이미지 변환
function changePageImages(lang){

    const imageMap = {

        collections01: {
            en: "image/collections01-en.png",
            ko: "image/collections01-ko.png",
            vi: "image/collections01-vi.png",
            "zh-CN": "image/collections01-zh.png"
        },

        collections03: {
            en: "image/collections03-en.png",
            ko: "image/collections03-ko.png",
            vi: "image/collections03-vi.png",
            "zh-CN": "image/collections03-zh.png"
        },

        technology01: {
            en: "image/technology01-en.png",
            ko: "image/technology01-ko.png",
            vi: "image/technology01-vi.png",
            "zh-CN": "image/technology01-zh.png"
        },

        about01: {
            en: "image/about01-en.png",
            ko: "image/about01-ko.png",
            vi: "image/about01-vi.png",
            "zh-CN": "image/about01-zh.png"
        },

        contact01: {
            en: "image/contact01-en.png",
            ko: "image/contact01-ko.png",
            vi: "image/contact01-vi.png",
            "zh-CN": "image/contact01-zh.png"
        }

    };


    for(let id in imageMap){

        const img=document.getElementById(id);

        if(img && imageMap[id][lang]){
            img.src=imageMap[id][lang];
        }

    }

}

}

// 구글 자동 디스플레이 방지 위젯 초기화
function googleTranslateElementInit() {
    new google.translate.TranslateElement({
        pageLanguage: 'en',
        includedLanguages: 'en,ko,vi,zh-CN',
        autoDisplay: false 
    }, 'google_translate_element');
}
