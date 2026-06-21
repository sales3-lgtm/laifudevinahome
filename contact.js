emailjs.init({
publicKey:"wNdnlS0_Ej7btOYzo"
});

document
.getElementById("quotation-form")
.addEventListener("submit",(e)=>{

e.preventDefault();

const collections=[];

document
.querySelectorAll(".collection-group input:checked")
.forEach(item=>{

collections.push(item.value);

});

emailjs.send(
"service_jo8qcbe",
"template_n6oopef",
{

company_name:e.target.company_name.value,

contact_person:e.target.contact_person.value,

user_email:e.target.user_email.value,

phone:e.target.phone.value,

quantity:e.target.quantity.value,

collection:collections.join(", "),

customization:e.target.customization.value,

additional_notes:e.target.additional_notes.value,

preferred_contact:
document.querySelector('input[name="preferred_contact"]:checked').value

}

)

.then(()=>{

document.getElementById("success-message").innerHTML=

"✓ Your quotation request has been sent successfully.";

e.target.reset();

});

});