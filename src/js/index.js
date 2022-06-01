
document.addEventListener("DOMContentLoaded", function() {
        //Animation main screen

    const board = document.querySelector('#home');
    const aside = document.querySelector('aside');
    const colors = ['#FFE4C4', '#F4A460', '#FDF5E6', '#EE82EE', '#EEE8AA'];

    const calcSqueres = () => {
        const styleBoard = window.getComputedStyle(board);
        const styleAside = window.getComputedStyle(aside);

        const squareOfBoard = parseInt(styleBoard.height) * parseInt(styleBoard.width);
        const squareOfAside = parseInt(styleAside.width) * parseInt(styleAside.height);

        const count = Math.floor(((squareOfBoard - squareOfAside) / 600));

        return count
    }

    let count = calcSqueres();

    for (let i = 0; i < count; i++) {
        const square = document.createElement('div');
        square.classList.add('square');

        square.addEventListener('mouseover', () => setColor(square))
        square.addEventListener('mouseleave', () => removeColor(square))

        board.append(square);
    }

    setInterval(createSquare, 1500);

    function getRandomSquare() {
        const squares = document.querySelectorAll('.square');
        const index = Math.floor(Math.random() * squares.length);
        setColor(squares[index])
        setTimeout(() => {
            removeColor(squares[index])
        }, 2500)
    }

    const lgScreen = setInterval(getRandomSquare, 200);

    function createSquare() {
        const square = document.createElement('div');
        square.classList.add('square');
    }

    function setColor(element) {
        const color = getRandomColor()
        element.style.backgroundColor = color;
        element.style.boxShadow = `1px 1px 3px ${color}, 0 0 10px ${color}`
    }

    function removeColor(element) {
        element.style.backgroundColor = '#1d1d1d';
        element.style.boxShadow = '0 0 2px #1d1d1d';
    }

    function getRandomColor() {
        const index = Math.floor(Math.random() * colors.length)
        return colors[index];
    }


    const mediaQueryMd = window.matchMedia('(max-width: 767px)');
    const mediaQuerySm = window.matchMedia('(max-width: 545px)');


    if (mediaQueryMd.matches) {
        clearInterval(lgScreen);
        setInterval(getRandomSquare, 400);
    }

    //Animation scroll

    const scrollBtn = document.getElementById('scroll');
    const navLinks = document.querySelectorAll('nav a');
    const reach = document.querySelector('.reach')

    function smoothScroll(e) {
        e.preventDefault();

        let href = this.getAttribute('href').substring(1);

        const scrollTarget = document.getElementById(href);

        const topOffset = 0;
        const elementPos = scrollTarget.getBoundingClientRect().top;
        const offsetPos = elementPos - topOffset;

        window.scrollBy({
            top: offsetPos,
            behavior: 'smooth'
        })
    }

    scrollBtn.addEventListener('click', smoothScroll);

    reach.addEventListener('click', smoothScroll);

    navLinks.forEach(link => {
        link.addEventListener('click', smoothScroll);
    })


    //Card Animation

    VanillaTilt.init(document.querySelectorAll('.card'), {
        max: 25, 
        speed: 500
    });

    //Map

    const center = [57.15201343049302, 65.55874661573105]

    const map = L.map('map').setView(center, 14);

    L.tileLayer(
        'https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png?api_key=759b7bbf-5050-468f-adea-7873c1592a07?base_domain=emiliaweb.ru', {
        maxZoom: 20
        }).addTo(map);

    L.marker(center).addTo(map);

    //Progressbar

    const progress = document.querySelector('.progressBar');
    const totalHeight = document.body.scrollHeight - window.innerHeight;

    window.addEventListener('scroll', () => {
        let progressHeight = (window.pageYOffset / totalHeight) * 100;

        progress.style.height = progressHeight + "%"
    }) 

    //Animation sidebar 

    const toggleBar = document.querySelector('.sidebar__toggleBtn');
    const sidebar = document.querySelector('.sidebar');
    const darkWindow = document.querySelector('.dark-window');


    toggleBar.addEventListener('click', (e) => {
        sidebar.classList.toggle('active');
        if (sidebar.classList.contains('active')) {
            darkWindow.style.display = 'block';
        } else {
            darkWindow.style.display = 'none';
        }
    }) 

    //Form

    const form = document.querySelector('form'),
          inputs = document.querySelectorAll('.form__input'),
          name = document.querySelector('.form__input_name'),
          phone = document.querySelector('.form__input_phone'),
          subject = document.querySelector('.form__input_subject'),
          message = document.querySelector('.form__input_message');

    function validateForms (form) {

        $(form).validate({
            rules: {
            name: "required",
            phone: {
                required: true,
                minlength: 11
            },
            message: "required",
            },
            messages: {
            name: "Пожалуйста, введите свое имя",
            phone: {
                required: "Пожалуйста, введите номер телефона",
                minlength: jQuery.validator.format("Введите {11} символов")
            },
            message: "Пожалуйста, введите сообщение"
            }
        })
    }

    inputs.forEach(input => {
        input.addEventListener('change', () => {
            validateForms(form)
        })
    })

    const confettiSettings = { target: 'my-canvas' };
    const boardConfetti = document.querySelector('#my-canvas');
    const confetti = new ConfettiGenerator(confettiSettings);
    const btnForm = document.querySelector('#text-me');



    form.addEventListener('submit', (e) => {
        e.preventDefault();

        Email.send({
            Host : "smtp.elasticemail.com",
            Username : "EmiliyaVolleyball@gmail.com",
            Password : "3B13F53333C386295B46B93C616DE8C7332B",
            To : 'EmiliyaVolleyball@gmail.com',
            From : 'EmiliyaVolleyball@gmail.com',
            Subject : subject.value,
            Body : `Hi, Emiliya! My name is ${name.value} <br> ${message.value}`
        }).then( () => {
            boardConfetti.style.display = 'block';
            confetti.render();
            btnForm.innerHTML = 'Done!'
        }).catch(
            err => alert(err)
        )
    })

    //input phone

    $.fn.setCursorPosition = function(pos) {
        if ($(this).get(0).setSelectionRange) {
          $(this).get(0).setSelectionRange(pos, pos);
        } else if ($(this).get(0).createTextRange) {
          var range = $(this).get(0).createTextRange();
          range.collapse(true);
          range.moveEnd('character', pos);
          range.moveStart('character', pos);
          range.select();
        }
    };

    $(phone).click(function(){
        $(this).setCursorPosition(3);
      }).mask("+7(999) 999-9999");
      $("#center_not_ok").mask("+7(999) 999-9999");

})