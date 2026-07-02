/* ==========================================================
   LAIFUDE VINA - Main Language Controller (v5)
========================================================== */
(() => {
"use strict";

const STORAGE_KEY = "laifude_language";
const DEFAULT_LANG = "en";
// language.js 파일 내부의 EN_ORIGINAL_TEXTS 블록 안에 추가하세요
const EN_ORIGINAL_TEXTS = {
    // ... 기존 데이터들 ...
    grid_work: "Workwear",
    grid_clean: "ESD & Cleanroom Wear",
    grid_corp: "Corporate Uniforms",
    grid_medi: "Medical Uniforms",
    grid_safe: "Safety & PPE"
};

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

/* 구글 번역 실행 및 이미지 엔진 연동 핵심 */
function applyLanguage(lang) {
    localStorage.setItem(STORAGE_KEY, lang);
    updateLanguageLabel(lang);
    
    // 1. [작업 분리] 내가 만든 이미지 변경 스크립트 즉시 호출하여 이미지 교체
    if (window.LanguageImages && typeof window.LanguageImages.change === "function") {
        window.LanguageImages.change(lang);
    }

    // 2. 구글 번역 위젯에 언어 값 주입
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
    
    setTimeout(() => { applyLanguage(getLanguage()); }, 200); // 안정성을 위한 최소한의 지연
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

document.addEventListener("DOMContentLoaded", () => {
    initMenus();
    updateLanguageLabel(getLanguage());
    if (window.LanguageImages && typeof window.LanguageImages.change === "function") {
        window.LanguageImages.change(getLanguage());
    }
});

})();
