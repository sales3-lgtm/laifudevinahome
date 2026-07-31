/* ==========================================================
   LAIFUDE VINA - Main Language Controller (v5 - Fixed)
========================================================== */
(() => {
"use strict";

const STORAGE_KEY = "laifude_language";
const DEFAULT_LANG = "en";

const LABELS = { en: "English", ko: "한국어", vi: "Tiếng Việt", "zh-CN": "中文" };

function getLanguage() { return localStorage.getItem(STORAGE_KEY) || DEFAULT_LANG; }

function updateLanguageLabel(lang) {
    const text = LABELS[lang] || LABELS.en;
    const top = document.getElementById("current-language");
    const bottom = document.getElementById("footer-language");
    if (top) top.textContent = text;
    if (bottom) bottom.textContent = text;
}

function closeMenus() {
    document.querySelectorAll(".language-menu").forEach(m => m.classList.remove("active"));
}

/* 다국어 페이지 번역 실행 함수 */
function translatePage(lang){
    const dict = TRANSLATIONS[lang];
    if(!dict) return;

    // 텍스트 및 <br> 태그 반영
    document.querySelectorAll("[data-lang]").forEach(el => {
        const key = el.dataset.lang;
        if(dict[key]){
            el.innerHTML = dict[key]; 
        }
    });

    // Placeholders 반영
    document.querySelectorAll("[data-lang-placeholder]").forEach(el => {
        const key = el.dataset.langPlaceholder;
        if(dict[key]){
            el.placeholder = dict[key];
        }
    });
}

function applyLanguage(lang) {
    localStorage.setItem(STORAGE_KEY, lang);
    updateLanguageLabel(lang);
    translatePage(lang); // 텍스트 번역 적용
    
    // 1. 이미지 변경 스크립트 호출
    if (window.LanguageImages && typeof window.LanguageImages.change === "function") {
        window.LanguageImages.change(lang);
    }

    // 2. 구글 번역 위젯 연동
    const combo = document.querySelector(".goog-te-combo");
    if (combo) {
        combo.value = lang;
        combo.dispatchEvent(new Event("change", { bubbles: true }));
    }
    closeMenus();
}

window.changeLanguage = function(lang) { applyLanguage(lang); };

window.googleTranslateElementInit = function() {
    new google.translate.TranslateElement({
        pageLanguage: "en",
        includedLanguages: "en,ko,vi,zh-CN",
        autoDisplay: false
    }, "google_translate_element");
    
    setTimeout(() => { applyLanguage(getLanguage()); }, 200);
};

function initMenus() {
    const btnTop = document.querySelector(".language");
    const btnBot = document.querySelector(".language-footer");
    const menuTop = document.querySelector(".header-menu");
    const menuBot = document.querySelector(".footer-menu");

    if (btnTop && menuTop) btnTop.addEventListener("click", (e) => { e.stopPropagation(); document.querySelectorAll(".language-menu").forEach(m => m !== menuTop && m.classList.remove("active")); menuTop.classList.toggle("active"); });
    if (btnBot && menuBot) btnBot.addEventListener("click", (e) => { e.stopPropagation(); document.querySelectorAll(".language-menu").forEach(m => m !== menuBot && m.classList.remove("active")); menuBot.classList.toggle("active"); });
    document.addEventListener("click", closeMenus);
}

/* 📌 TRANSLATIONS 데이터 객체 */
const TRANSLATIONS = {
    en: {
        company_name: "COMPANY NAME",
        contact_person: "CONTACT PERSON",
        email: "EMAIL ADDRESS",
        phone: "PHONE NUMBER",
        primary_collection: "PRIMARY COLLECTION",
        corporate: "CORPORATE",
        industrial: "INDUSTRIAL",
        ir4: "IR4+ESD",
        medical: "MEDICAL UNIFORM",
        safety: "SAFETY & PPE",
        custom: "CUSTOM",
        quantity: "ESTIMATED QUANTITY",
        customization: "CUSTOMIZATION NEEDS",
        notes: "ADDITIONAL NOTES",
        email_contact: "Email",
        phone_contact: "Phone",
        privacy: "I AGREE TO PRIVACY POLICY",
        submit: "SUBMIT REQUEST →",

        f_col3_h: "SUPPORT",
        f_col3_a1: "Request a Quotation",
        f_col3_a2: "LAIFUDE VINA CATALOG",
        f_col3_a3: "ESD_Cleanroom DOWNLOAD",
        f_col3_a4: "Contact Us"
    },

    ko: {
        company_name: "회사명",
        contact_person: "담당자",
        email: "이메일",
        phone: "전화번호",
        primary_collection: "관심 제품군",
        corporate: "기업 유니폼",
        industrial: "산업 작업복",
        ir4: "IR4 + 제전복",
        medical: "의료복",
        safety: "안전용품",
        custom: "맞춤 제작",
        quantity: "예상 수량",
        customization: "맞춤 제작 요청사항",
        notes: "추가 요청사항",
        email_contact: "이메일",
        phone_contact: "전화",
        privacy: "개인정보 처리방침에 동의합니다.",
        submit: "견적 요청하기 →",

        f_col3_h: "고객 지원",
        f_col3_a1: "견적 요청하기",
        f_col3_a2: "LAIFUDE VINA 카탈로그",
        f_col3_a3: "제전복/크린룸<br>카탈로그 다운로드",
        f_col3_a4: "문의하기"
    },

    vi: {
        company_name: "TÊN CÔNG TY",
        contact_person: "NGƯỜI LIÊN HỆ",
        email: "ĐỊA CHỈ EMAIL",
        phone: "SỐ ĐIỆN THOẠI",
        primary_collection: "DÒNG SẢN PHẨM",
        corporate: "ĐỒNG PHỤC DOANH NGHIỆP",
        industrial: "ĐỒNG PHỤC CÔNG NGHIỆP",
        ir4: "IR4 + ESD",
        medical: "ĐỒNG PHỤC Y TẾ",
        safety: "PPE",
        custom: "THIẾT KẾ RIÊNG",
        quantity: "SỐ LƯỢNG DỰ KIẾN",
        customization: "YÊU CẦU TÙY CHỈNH",
        notes: "GHI CHÚ",
        email_contact: "Email",
        phone_contact: "Điện thoại",
        privacy: "Tôi đồng ý với Chính sách bảo mật",
        submit: "GỬI YÊU CẦU →",

        f_col3_h: "HỖ TRỢ",
        f_col3_a1: "Yêu cầu báo giá",
        f_col3_a2: "CATALOG LAIFUDE VINA",
        f_col3_a3: "TẢI CATALOG<br>ESD & Phòng sạch",
        f_col3_a4: "Liên hệ"
    },

    "zh-CN": {
        company_name: "公司名称",
        contact_person: "联系人",
        email: "电子邮箱",
        phone: "电话号码",
        primary_collection: "产品类别",
        corporate: "企业制服",
        industrial: "工业工装",
        ir4: "IR4+防静电",
        medical: "医疗制服",
        safety: "安全防护用品",
        custom: "定制",
        quantity: "预计数量",
        customization: "定制需求",
        notes: "其他说明",
        email_contact: "电子邮件",
        phone_contact: "电话",
        privacy: "我同意隐私政策",
        submit: "提交询价 →",

        f_col3_h: "支持",
        f_col3_a1: "索取报价",
        f_col3_a2: "LAIFUDE VINA 画册",
        f_col3_a3: "防静电/无尘服<br>画册下载",
        f_col3_a4: "联系我们"
    }
};

/* 모바일 네비게이션 토글 */
window.toggleMobileMenu = function (event) {
    if (event) event.stopPropagation();
    const mainNav = document.querySelector(".main-nav");
    if (mainNav) {
        mainNav.classList.toggle("open");
    }
};

/* DOM 로드 완료 후 실행 로직 */
document.addEventListener("DOMContentLoaded", () => {
    const currentLang = getLanguage();
    
    initMenus();
    updateLanguageLabel(currentLang);
    translatePage(currentLang); // 📌 초기 실행 시 텍스트 번역 적용 로직 추가!

    if (window.LanguageImages && typeof window.LanguageImages.change === "function") {
        window.LanguageImages.change(currentLang);
    }

    // 모바일 바깥 클릭 시 메뉴 닫기
    document.addEventListener("click", function (e) {
        const mainNav = document.querySelector(".main-nav");
        if (mainNav && !mainNav.contains(e.target) && !e.target.closest(".menu-toggle")) {
            mainNav.classList.remove("open");
        }
    });

    // 📌 아코디언 메뉴 이벤트 (DOM 로드 후 안전하게 바인딩)
    document.querySelectorAll(".accordion-btn").forEach(btn => {
        btn.addEventListener("click", () => {
            btn.classList.toggle("active");
            const content = btn.nextElementSibling;
            if (content) {
                if (content.style.maxHeight) {
                    content.style.maxHeight = null;
                } else {
                    content.style.maxHeight = content.scrollHeight + "px";
                }
            }
        });
    });
});

})();