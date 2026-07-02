/* ==========================================================
   LAIFUDE VINA - Integrated Language System V5
   Optimized for Instant Matching & Multi-language Sync
========================================================== */

(() => {
"use strict";

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

const SUFFIX = { en: "", ko: "-ko", vi: "-vi", "zh-CN": "-zh" };

const LANG_TEXTS = {
    en: {
        nav_about: "ABOUT US", nav_collections: "COLLECTIONS", nav_tech: "TECHNOLOGY", nav_sust: "SUSTAINABILITY", nav_contact: "CONTACT",
        hero_title: "Technology Built on Trust,<br>Value Defined by Quality<span>.</span>",
        hero_desc: "Korean engineering expertise, strategic sourcing and precision manufacturing infrastructure delivering reliable performance worldwide.",
        feat1_title: "TRUSTED QUALITY", feat1_desc: "Reliable performance<br>you can count on",
        feat2_title: "ENGINEERING SOLUTIONS", feat2_desc: "Purpose-built for<br>every profession",
        feat3_title: "GLOBAL PARTNERSHIP", feat3_desc: "Trusted by partners<br>worldwide",
        feat4_title: "SUSTAINABLE FUTURE", feat4_desc: "Responsible practices<br>for a better tomorrow",
        btn_view: "VIEW COLLECTIONS", btn_story: "BRAND STORY",
        prem_title: "Let's Build Your<br>Uniform Program Together.",
        prem_desc: "Speak with our specialists about customized workwear, classroom garments, medical uniforms, and industrial supply solutions.",
        btn_req: 'REQUEST A QUOTATION <i class="fa-solid fa-arrow-right"></i>',
        btn_dl: 'CATALOG DOWNLOAD <i class="fa-solid fa-arrow-down"></i>',
        footer_moto: "Technology Built on Trust,<br>Value Defined by Quality<span>.</span>",
        f_col1_h: "COMPANY", f_col1_a1: "About Us", f_col1_a2: "Brand Philosophy", f_col1_a3: "Sustainability", f_col1_a4: "News & Insights", f_col1_a5: "Careers",
        f_col2_h: "COLLECTIONS", f_col2_a1: "Workwear", f_col2_a2: "Corporate Wear", f_col2_a3: "ESD & Cleanroom Wear", f_col2_a4: "Medical Uniforms", f_col2_a5: "Safety & PPE",
        f_col3_h: "SUPPORT", f_col3_a1: "Request a Quotation", f_col3_a2: "FAQ", f_col3_a3: "CATALOG DOWNLOAD", f_col3_a4: "Contact Us",
        f_col4_h: "LEGAL", f_col4_a1: "Privacy Policy", f_col4_a2: "Terms of Use", f_col5_h: "FOLLOW US"
    },
    ko: {
        nav_about: "회사소개", nav_collections: "컬렉션", nav_tech: "기술력", nav_sust: "지속가능성", nav_contact: "문의하기",
        hero_title: "신뢰 위에 세운 기술,<br>품질로 증명하는 가치<span>.</span>",
        hero_desc: "한국의 엔지니어링 전문성, 전략적 소싱, 정밀 제조 인프라를 바탕으로 전 세계에 신뢰할 수 있는 성능을 제공합니다.",
        feat1_title: "신뢰할 수 있는 품질", feat1_desc: "믿고 맡길 수 있는<br>안정적인 성능",
        feat2_title: "엔지니어링 솔루션", feat2_desc: "모든 비즈니스 환경에<br>맞춤화된 설계",
        feat3_title: "글로벌 파트너십", feat3_desc: "전 세계 파트너사들이<br>신뢰하는 기업",
        feat4_title: "지속 가능한 미래", feat4_desc: "더 나은 내일을 위한<br>책임감 있는 실천",
        btn_view: "컬렉션 보기", btn_story: "브랜드 스토리",
        prem_title: "귀사의 통합 유니폼 프로그램을<br>함께 구축해 나갑니다.",
        prem_desc: "맞춤형 작업복, 원내복, 의료용 유니폼 및 산업용 소모품 솔루션에 대해 전문가와 상담해 보세요.",
        btn_req: '견적 요청하기 <i class="fa-solid fa-arrow-right"></i>',
        btn_dl: '카탈로그 다운로드 <i class="fa-solid fa-arrow-down"></i>',
        footer_moto: "신뢰 위에 세운 기술,<br>품질로 증명하는 가치<span>.</span>",
        f_col1_h: "기업 정보", f_col1_a1: "회사 소개", f_col1_a2: "브랜드 철학", f_col1_a3: "지속가능경영", f_col1_a4: "뉴스 및 소식", f_col1_a5: "채용 안내",
        f_col2_h: "제품군", f_col2_a1: "일반 작업복", f_col2_a2: "오피스/사무복", f_col2_a3: "제전복 및 방진복", f_col2_a4: "메디컬 유니폼", f_col2_a5: "안전 용품 & PPE",
        f_col3_h: "고객 지원", f_col3_a1: "온라인 견적 요청", f_col3_a2: "자주 묻는 질문", f_col3_a3: "카탈로그 다운로드", f_col3_a4: "고객 센터",
        f_col4_h: "법적 고지", f_col4_a1: "개인정보처리방침", f_col4_a2: "이용약관", f_col5_h: "소셜 미디어"
    },
    vi: {
        nav_about: "GIỚI THIỆU", nav_collections: "BỘ SƯU TẬP", nav_tech: "CÔNG NGHỆ", nav_sust: "PHÁT TRIỂN BỀN VỮNG", nav_contact: "LIÊN HỆ",
        hero_title: "Công nghệ từ lòng tin,<br>Giá trị từ chất lượng<span>.</span>",
        hero_desc: "Chuyên môn kỹ thuật Hàn Quốc, nguồn cung ứng chiến lược và cơ sở hạ tầng sản xuất chính xác mang lại hiệu suất đáng tin cậy trên toàn cầu.",
        feat1_title: "CHẤT LƯỢNG TIN CẬY", feat1_desc: "Hiệu suất ổn định<br>để bạn an tâm lựa chọn",
        feat2_title: "GIẢI PHÁP KỸ THUẬT", feat2_desc: "Thiết kế chuyên dụng<br>cho mọi ngành nghề",
        feat3_title: "HỢP TÁC TOÀN CẦU", feat3_desc: "Được các đối tác<br>trên thế giới tin tưởng",
        feat4_title: "TƯƠNG LAI BỀN VỮNG", feat4_desc: "Hành động có trách nhiệm<br>vì một ngày mai tốt đẹp hơn",
        btn_view: "XEM BỘ SƯU TẬP", btn_story: "CÂU CHUYỆN THƯƠNG HIỆU",
        prem_title: "Hãy cùng nhau xây dựng<br>Chương trình đồng phục của bạn.",
        prem_desc: "Hãy trao đổi với các chuyên gia của chúng tôi về quần áo bảo hộ lao động tùy chỉnh, đồng phục học đường, đồng phục y tế và các giải pháp cung ứng công nghiệp.",
        btn_req: 'YÊU CẦU BÁO GIÁ <i class="fa-solid fa-arrow-right"></i>',
        btn_dl: 'TẢI CATALOGUE <i class="fa-solid fa-arrow-down"></i>',
        footer_moto: "Công nghệ từ lòng tin,<br>Giá trị từ chất lượng<span>.</span>",
        f_col1_h: "CÔNG TY", f_col1_a1: "Về chúng tôi", f_col1_a2: "Triết lý thương hiệu", f_col1_a3: "Phát triển bền vững", f_col1_a4: "Tin tức & Sự kiện", f_col1_a5: "Tuyển dụng",
        f_col2_h: "BỘ SƯU TẬP", f_col2_a1: "Đồ bảo hộ lao động", f_col2_a2: "Đồng phục văn phòng", f_col2_a3: "Trang phục phòng sạch & Chống tĩnh điện", f_col2_a4: "Đồng phục y tế", f_col2_a5: "Thiết bị an toàn & Bảo hộ cá nhân",
        f_col3_h: "HỖ TRỢ", f_col3_a1: "Yêu cầu báo giá", f_col3_a2: "Câu hỏi thường gặp", f_col3_a3: "TẢI CATALOGUE", f_col3_a4: "Liên hệ với chúng tôi",
        f_col4_h: "PHÁP LÝ", f_col4_a1: "Chính sách bảo mật", f_col4_a2: "Điều khoản sử dụng", f_col5_h: "THEO DÕI CHÚNG TÔI"
    },
    "zh-CN": {
        nav_about: "关于我们", nav_collections: "产品系列", nav_tech: "核心技术", nav_sust: "可持续发展", nav_contact: "联系我们",
        hero_title: "基于信任的技术，<br>由品质决定的价值<span>.</span>",
        hero_desc: "凭借韩国的工程专业知识、战略采购和精密制造基础设施，在全球范围内提供可靠的性能。",
        feat1_title: "值得 tree 赖的品质", feat1_desc: "您可以信赖的<br>稳定且卓越的性能",
        feat2_title: "工程技术解决方案", feat2_desc: "为各种专业环境<br>量身定制的设计",
        feat3_title: "全球合作伙伴", feat3_desc: "深受全球<br>合作伙伴的信赖",
        feat4_title: "可持续的未来", feat4_desc: "为更美好的明天<br>履行企业责任",
        btn_view: "查看系列产品", btn_story: "品牌故事",
        prem_title: "让我们携手打造<br>专属您的统一制服方案。",
        prem_desc: "与我们的专家探讨定制工作服、学校制服、医疗制服及工业供应解决方案。",
        btn_req: '请求报价 <i class="fa-solid fa-arrow-right"></i>',
        btn_dl: '下载产品目录 <i class="fa-solid fa-arrow-down"></i>',
        footer_moto: "基于信任的技术，<br>由品质决定的价值<span>.</span>",
        f_col1_h: "公司信息", f_col1_a1: "关于我们", f_col1_a2: "品牌理念", f_col1_a3: "可持续发展", f_col1_a4: "新闻动态", f_col1_a5: "人才招聘",
        f_col2_h: "产品系列", f_col2_a1: "工业工作服", f_col2_a2: "商务职业装", f_col2_a3: "防静电与无尘服", f_col2_a4: "医疗医护服", f_col2_a5: "安全防护与 PPE",
        f_col3_h: "客户支持", f_col3_a1: "请求实时报价", f_col3_a2: "常见问题", f_col3_a3: "下载产品目录", f_col3_a4: "联系我们",
        f_col4_h: "法律条款", f_col4_a1: "隐私政策", f_col4_a2: "使用条款", f_col5_h: "关注我们"
    }
};

const UI_LANG_NAME = { en: "English", ko: "한국어", vi: "Tiếng Việt", "zh-CN": "中文" };

function changeLanguage(lang) {
    localStorage.setItem("laifude_language", lang);

    // 1. UI 텍스트 상/하단 표시 인디케이터 즉시 변경
    const targetName = UI_LANG_NAME[lang] || "English";
    const curLangNode = document.getElementById("current-language");
    const footLangNode = document.getElementById("footer-language");
    if (curLangNode) curLangNode.textContent = targetName;
    if (footLangNode) footLangNode.textContent = targetName;

    // 2. 고속 순수 루프를 통한 이미지 src 일괄 강제 변경
    const imgKeys = Object.keys(IMAGE_MAP);
    for (let i = 0; i < imgKeys.length; i++) {
        const id = imgKeys[i];
        const img = document.getElementById(id);
        if (img) {
            img.src = lang === "en" ? `image/${IMAGE_MAP[id]}.png` : `image/${IMAGE_MAP[id]}${SUFFIX[lang]}.png`;
        }
    }

    // 3. 최적화된 DOM 탐색을 통한 텍스트 일괄 즉시 치환 (innerHTML 유지)
    const textNodes = document.querySelectorAll("[data-lang]");
    const dict = LANG_TEXTS[lang];
    if (dict) {
        for (let j = 0; j < textNodes.length; j++) {
            const node = textNodes[j];
            const key = node.getAttribute("data-lang");
            if (dict[key]) {
                node.innerHTML = dict[key];
            }
        }
    }
}

function refresh() {
    const lang = localStorage.getItem("laifude_language") || "en";
    changeLanguage(lang);
}

function init() {
    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", refresh);
    } else {
        refresh();
    }
}

// 전역 스코프 바인딩 처리
window.changeLanguage = changeLanguage;
window.LanguageImages = Object.freeze({ change: changeLanguage, refresh, init });

init();
})();
