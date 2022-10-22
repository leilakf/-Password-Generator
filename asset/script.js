// برای کیلیک شدن روی دکمه ی کپی
const $length = document.getElementById('length1');
const clipboard = document.getElementById('clipboard');
$length.innerText = clipboard.addEventListener('click', () => {

    const textarea = document.createElement('textarea');
    // اسپن مورد نظر
    const password = document.querySelector('.txt').innerText;

    if (! password) {
        return;
    }

    textarea.value = password;
    document.body.append(textarea);
    textarea.select();
    document.execCommand('copy');
    textarea.remove();
    alert(' Your password copied to clipboard');
})
// //////////////////////////////////////////////////////////
// تغییر مقدار طول کار در قسمت تایتل  لنس از 0 تا 20
const sliderProps = {
    fill: "#0B1EDF",
    background: "rgba(255, 255, 255, 0.214)"
}


const slider = document.querySelector(".rangeSlider");

const sliderValue = document.querySelector(".lengthTitle");

slider.querySelector("input").addEventListener("input", event => {
    sliderValue.setAttribute("data-length", event.target.value);
    applyFill(event.target);
});

applyFill(slider.querySelector("input"));

function applyFill(slider) {
    const percentage = (100 * (slider.value - slider.min)) / (slider.max - slider.min);
    const bg = `linear-gradient(90deg, ${
        sliderProps.fill
    } ${percentage}%, ${
        sliderProps.background
    } ${
        percentage + 0.1
    }%)`;
    slider.style.background = bg;
    sliderValue.setAttribute("data-length", slider.value);
}
// ///////////////////////////////////////////////////////////////////////
// گرفتن ابجکت از تمام اینپوت های لازم برای تشکیل پسورد تصادفی
const RandomFunc = {
    upper: getrandomuppercase,
    lower: getrandomlowercase,
    number: getrandomnumber,
    Symbol: getrandomsymbols
}


// چک کردن تمامی اینپوت ها
const $generate = document.getElementById('generate');
const $uppercase = document.getElementById('uppercase');
const $lowercase = document.getElementById('lowercase');
const $number = document.getElementById('numbers');
const $Symbols = document.getElementById('symbols');
const $result = document.getElementById('result');

$generate.addEventListener('click', function () {

    const length = + $length.value;
    const hasuppercase = $uppercase.checked;
    const haslowercase = $lowercase.checked;
    const hasnumber = $number.checked;
    const hassymbol = $Symbols.checked;

    $result.innerText = generatepassword(hasuppercase, haslowercase, hasnumber, hassymbol, length)
})


function generatepassword(upper, lower, number, Symbol, length) {
    let generatepassword = '';
    const typeconut = upper + lower + number + Symbol;

    const typearr = [{
            upper
        }, {
            lower
        }, {
            number
        }, {
            Symbol
        }].filter(item => Object.values(item)[0])

    if (typeconut === 0) {
        return '';
    }


    for (let i = 0; i < length; i += typeconut) {
        typearr.forEach(type => {
            const funcname = Object.keys(type)[0];
            generatepassword += RandomFunc[funcname]();
        })
    }

    const Finalpass = generatepassword.slice(0, length)

    return generatepassword;
}
// //////////////////////////////////////////////////////////////////////
// فانکشن های لازم برای تمامی ویژگی های داده شده به پسورد ها
function getrandomuppercase() {
    return String.fromCharCode(Math.floor(Math.random() * 26) + 65)
}

function getrandomlowercase() {
    return String.fromCharCode(Math.floor(Math.random() * 26) + 97)
}

function getrandomnumber() {
    return String.fromCharCode(Math.floor(Math.random() * 10) + 48)
}

function getrandomsymbols() {
    const Symbols = '!@#$%^&*(){}[]=<>/,.';
    return Symbols[Math.floor(Math.random() * Symbols.length)]
}
