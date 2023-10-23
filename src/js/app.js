import * as flsFunction from "./modules/function.js";
import smoothscroll from 'smoothscroll-polyfill';
import noUiSlider from 'nouislider';

flsFunction.isWebp();
flsFunction.calcWidthScroll();
flsFunction.mask();
flsFunction.scrollLinks();


smoothscroll.polyfill();


if (document.querySelectorAll('.swiper-black')) {
    const swipers = document.querySelectorAll('.swiper-black');
    const nextButtons = document.querySelectorAll('.swiper-button-next')
    const prevButtons = document.querySelectorAll('.swiper-button-prev')
    swipers.forEach((slider, index) => {
        slider.classList.add(`swiper-black-${index}`);
        nextButtons[index].classList.add(`swiper-button-next-${index}`);
        prevButtons[index].classList.add(`swiper-button-prev-${index}`);
        const blackSwiper = new Swiper(`.swiper-black-${index}`, {
            navigation: {
                nextEl: `.swiper-button-next-${index}`,
                prevEl: `.swiper-button-prev-${index}`,
            },
            allowTouchMove: true,
            slidesPerView: 1,
            spaceBetween: 30,
        });
    })
}

if (document.querySelector('#slider')) {
    var slider = document.getElementById('slider');

    noUiSlider.create(slider, {
        start: [500],
        connect: [true, false],
        range: {
            'min': [500, 500],
            '10%': [1000, 1000],
            'max': 10000
        }
    });
    slider.noUiSlider.on('update', function (values, handle) {
        document.querySelector('.range__base-price_auto').textContent = `${Math.round(+values[handle])}$`
    });
    
    const calcBody = {
        select1: '',
        select2: ''
    }
    const select1 = document.querySelector('select[data-calc="select1"]');
    const select2 = document.querySelector('select[data-calc="select2"]');
    const select2Wrapper = document.querySelector('fieldset[data-calc="select2-wrapper"]');
    const calcScreen1 = document.querySelector('.range__base');
    const calcScreen2 = document.querySelector('.range__true');
    select1.addEventListener('change', (e) => {
        calcBody.select1 = e.target.value;
        if (calcBody.select1 !== '') {
            select2Wrapper.classList.add('active');
        }
    })
    select2.addEventListener('change', (e) => {
        calcBody.select2 = e.target.value;
        if (calcBody.select2 !== '') {
            if (calcScreen1.classList.contains('active')) {
                calcScreen1.classList.remove('active');
            }
            calcScreen2.classList.add('active');
        }
    })
}

if (document.querySelectorAll('.faq__accordion-value')) {
    const accordions = document.querySelectorAll('.faq__accordion-value');
    const hiddenContents = document.querySelectorAll('.faq__accordion-hidden');
    accordions.forEach((accordion, index) => {
        accordion.addEventListener('click', () => {
            accordion.classList.toggle('active');
            hiddenContents[index].classList.toggle('active');
        })
    })
}

if (document.querySelector('.apply')) {
    const zipInput = document.querySelector('.apply__search-input');
    const zipBtn = document.querySelector('.apply__search-link');
    const applyTitle = document.querySelector('.apply__title');
    const searchZipBlock = document.querySelector('.apply__search');
    const changeZipBtn = document.querySelector('.apply__change-zip');
    const form = document.querySelector('.apply__form');
    const sendBtn = form.querySelector('button');
    const inputsInput = document.querySelectorAll('input[data-input="input"]');
    const inputsRadio = document.querySelectorAll('input[data-input="radio"]');
    const formBody = {
        type_phone: 'Cell',
        language: 'English',
        date_phone: 'Less than 6 months'
    };

    inputsInput.forEach(input => {
        input.addEventListener('input', (e) => {
            formBody[e.target.getAttribute('name')] = e.target.value;
            const checkInputs = [...document.querySelectorAll('input[data-inp="requried"]')].every(inp => inp.value !== '')
            if (checkInputs) {
                sendBtn.classList.add('active');
            } else {
                if (sendBtn.classList.contains('active')) {
                    sendBtn.classList.remove('active');
                }
            }
        })
        input.addEventListener('focus', (e) => {
            if (e.target.classList.contains('error')) {
                e.target.classList.remove('error')
            }
        })
    })
    inputsRadio.forEach(input => {
        input.addEventListener('change', (e) => {
            formBody[e.target.getAttribute('name')] = e.target.value;
        })
    })
    zipInput.addEventListener('input', (e) => {
        if (e.target.value !== '') {
            zipBtn.classList.add('active');
        } else {
            if (zipBtn.classList.contains('active')) {
                zipBtn.classList.remove('active');
            }
        }
    })
    zipBtn.addEventListener('click', (e) => {
        e.preventDefault();
        if (zipInput.value !== '') {
            applyTitle.textContent = 'Yay, we serve your area!';
            if (searchZipBlock.classList.contains('active')) {
                searchZipBlock.classList.remove('active');
            }
            changeZipBtn.classList.add('active');
            form.classList.add('active');
        }
    })
    changeZipBtn.addEventListener('click', (e) => {
        e.preventDefault();
        zipInput.value = '';
        if (zipBtn.classList.contains('active')) {
            zipBtn.classList.remove('active');
        }
        searchZipBlock.classList.add('active');
        if (changeZipBtn.classList.contains('active')) {
            changeZipBtn.classList.remove('active');
        }
        if (form.classList.contains('active')) {
            form.classList.remove('active');
        }
        applyTitle.textContent = "Let's find out if we serve your area";
    })
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        document.querySelectorAll('input[data-inp="requried"]').forEach(input => {
            if (input.value === '') {
                input.classList.add('error');
            }
        })
        const checkInputs = [...document.querySelectorAll('input[data-inp="requried"]')].every(inp => inp.value !== '');
        if (checkInputs) {
            try {
                const formData = new FormData();
                for (const key in formBody) {
                    formData.append(key, `${formBody[key]}`);
                }
                const response = await fetch('/send.php', {
                    method: 'POST',
                    body: formData
                })
                const json = await response.json();
                if (json.result === "success") {
                    window.location = `success.html`;
                } else {
                    console.log(json.desc);
                    throw (json.info);
                }
            } catch (e) {
                console.log(e);
            }
        }
    })

    let im = new Inputmask({
        mask: '+1 (999) 999-99-99',
        showMaskOnHover: false,
        showMaskOnFocus: false,
        jitMasking: true,
        inputmode: 'tel'
    });
    
    im.mask(document.querySelector('#phone'));
}
if (document.querySelector('.menu')) {
    const burgerBtn = document.querySelector('.header__burger');
    const closeBtn = document.querySelector('a.close');
    burgerBtn.addEventListener('click', (e) => {
        e.preventDefault();
        document.querySelector('.menu').classList.add('active');
    })
    closeBtn.addEventListener('click', (e) => {
        e.preventDefault();
        if (document.querySelector('.menu').classList.contains('active')) {
            document.querySelector('.menu').classList.remove('active')
        }
    })
}