import './index.html';
import './sass/style.scss';
import '@fortawesome/fontawesome-free/js/all.js';
import 'animate.css';
import {WOW} from 'wowjs';
import $ from 'jquery';
import './slider';

global.jQuery = $;
global.$ = $;
new WOW().init();

let hamburger = document.querySelector('.hamburger');
let navList = document.querySelector('.nav-list');
let navListLinks = document.querySelectorAll('.nav-list__link');
hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('is-active');
    navList.classList.toggle('nav-list_active');
})
navListLinks.forEach(item => {
    item.addEventListener('click', () => {
        hamburger.classList.toggle('is-active');
        navList.classList.toggle('nav-list_active');
    })
})

$(document).ready(function(){
    $(window).scroll(function(){
        if($(this).scrollTop()>140){
            $('.header').addClass('header_fixed');
        }
        else if ($(this).scrollTop()<140){
            $('.header').removeClass('header_fixed');
        }
    });
});

//SEND DATA
const sendData = async (values) => {
    const data = {...values}
    try{
        let response = await fetch('/send.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(data)
        });
        let result = await response.text()
        alert(result)
    }catch(e){
        alert(e.message)
    }
    
}
// FORM VALIDATION
const validateForm = () => {
    let inputName = document.getElementById('name'),
    inputEmail = document.getElementById('email'),
    inputPhone = document.getElementById('phone'),
    inputText = document.getElementById('message'),
    submitBtn = document.getElementById('send-form-button'),
    isEmail = false, isName = false, isPhone = true;
    
    let toggleSubmit = () => {
        if(isEmail && isName && isPhone) {
            submitBtn.removeAttribute('disabled');
        }
        else{
            submitBtn.setAttribute('disabled', true);
        } 
    }
    
    let phoneReg = /(?:\+|\d)[\d\-\(\) ]{9,}\d/g,
    emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/,
    textReg = /^[a-zA-Zа-яА-Я'][a-zA-Zа-яА-Я-' ]+[a-zA-Zа-яА-Я']?$/u;
    submitBtn.setAttribute('disabled', true);
    let checkInput = (element, reg) => {
        if(!reg.test(element.value)){
            element.classList.add('send-form_validate')
            return false
        }else{
            element.classList.remove('send-form_validate')
            return true
            
        }
    }
    inputEmail.addEventListener('keyup', ()=>{
        isEmail = checkInput(inputEmail, emailReg);
        toggleSubmit()
    })
    inputName.addEventListener('keyup', ()=>{
        isName = checkInput(inputName, textReg);
        toggleSubmit()
    })
    inputPhone.addEventListener('keyup', ()=>{
        if(inputPhone.value.length>0){
           isPhone = checkInput(inputPhone, phoneReg);
        }else{
            isPhone = true
            inputPhone.classList.remove('contact-from_validate')
        }
    })
    submitBtn.addEventListener('click', (e) => {
        e.preventDefault()
        if(isEmail && isName && isPhone){
            sendData({email: inputEmail.value, name:inputName.value, phone: inputPhone.value,  message: inputText.value})
        }else{
            alert('Не удалось отправить Ваш вопрос. Свяжитесь со мной через контакты')
        }
    })
}
validateForm()

