/* ==========================================
   🌐 [LAIFUDE VINA] EMAILJS FORM TRANSMISSION (VERIFIED)
   ========================================== */
// 1. 발급받으신 실제 Public Key로 올바르게 초기화되었습니다.
emailjs.init({
    publicKey: "wNdnlS0_Ej7btOYzo"
});

document.getElementById("quotation-form").addEventListener("submit", (e) => {
    e.preventDefault();

    // [보안 보강] 제출 버튼을 찾아서 로딩 상태로 변경 (중복 클릭으로 인한 메일 여러 번 발송 차단)
    const submitBtn = document.getElementById("submit-btn");
    const originalBtnText = submitBtn.innerHTML;
    submitBtn.disabled = true;
    submitBtn.innerHTML = `SENDING... <i class="fa-solid fa-spinner fa-spin"></i>`;

    const collections = [];
    document.querySelectorAll(".collection-group input:checked").forEach(item => {
        collections.push(item.value);
    });

    // 2. EmailJS API 전송 실행 (발급받으신 서비스ID 및 템플릿ID 그대로 탑재)
    emailjs.send(
        "service_jo8qcbe",
        "template_n6oopef",
        {
            company_name: e.target.company_name.value,
            contact_person: e.target.contact_person.value,
            user_email: e.target.user_email.value,
            phone: e.target.phone.value || "Not Provided", // 빈 값일 경우 대체 텍스트 처리
            quantity: e.target.quantity.value || "Not Provided",
            
            // 🚨 [버그 수정] 대시보드 템플릿 매칭률을 높이기 위해 key 명칭을 primary_collection으로 교정
            primary_collection: collections.join(", ") || "None Selected",
            
            customization: e.target.customization.value || "None Selected",
            additional_notes: e.target.additional_notes.value || "None Selected",
            preferred_contact: document.querySelector('input[name="preferred_contact"]:checked').value
        }
    )
    .then(() => {
        // 3. 전송 성공 시 UI 알림 스타일 고정 및 폼 리셋
        const successZone = document.getElementById("success-message");
        successZone.style.color = "#0F9D58";
        successZone.style.fontWeight = "700";
        successZone.style.marginTop = "25px";
        successZone.style.display = "block";
        successZone.innerHTML = "✓ Your quotation request has been sent successfully.";

        e.target.reset();
        
        // 버튼 상태 원상복구
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalBtnText;

        // 5초 뒤 성공 메시지 부드럽게 초기화
        setTimeout(() => {
            successZone.innerHTML = "";
        }, 5000);
    })
    .catch((error) => {
        // 4. [예외 처리 추가] 네트워크 에러 등으로 실패했을 때 바이어가 인지할 수 있도록 에러 알림 처리
        console.error("EmailJS Error:", error);
        const successZone = document.getElementById("success-message");
        successZone.style.color = "#dc3545"; // 위험 알림용 레드 컬러
        successZone.style.fontWeight = "700";
        successZone.style.marginTop = "25px";
        successZone.style.display = "block";
        successZone.innerHTML = "✕ Transmission failed. Please contact us directly via email (laifudevina@gmail.com).";
        
        // 버튼 상태 원상복구
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalBtnText;
    });
});
