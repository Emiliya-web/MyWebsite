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

    const form = document.querySelector('form');

    // form.addEventListener('submit', (e) => {
    //     e.preventDefault();

    //     const target = e.target;

    //     target.ajax({
    //         type: 'POST',
    //         url: './mailer/smart.php',
    //         data: target.serialize()
    //     }).done(function() {
    //         target.find('input').val('');

    //         form.trigger('reset');
    //     })
    //     return false;
    // })

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        let error = formValidate(form);

        let formData = new FormData(form);
        
        form.classList.add('_sending');
        let response = await fetch('sendmail.php', {
            method: 'POST',
            body: formData
        });
        if(response.ok) {
            let result = await response.json();
            alert(result.message);
            form.reset();
            form.classList.remove('_sending');
        } else {
            alert ('Ошибка');
            form.classList.remove('_sending');
        }
    })

    function formValidate (form) {
        let error = 0;

        let formReq = document.querySelectorAll('._req');

        for (let i = 0; i < formReq.length; i++) {
            const input = formReq[i];

            if (input.getAttribute('name') == 'name') {
                if(input.value === '') {
                    formAddError(input);
                    error++;
                } else {
                    formRemoveError(input);
                    error--;
                }
            }


            if (input.getAttribute('name') == 'email') {
                if(input.value === '') {
                    formAddError(input);
                    error++;
                } else {
                    formRemoveError(input);
                    error--;
                }
            }

            if (input.getAttribute('name') == 'message') {
                if(input.value === '' || input.value.length < 10) {
                    formAddError(input);
                    error++;
                } else {
                    formRemoveError(input);
                    error--;
                }
            }
        }
    }

    function formAddError(input) {
        input.parentElement.classList.add('_err');
        input.classList.add('_err')
    }

    function formRemoveError(input) {
        input.parentElement.classList.remove('_err');
        input.classList.remove('_err')
    }

    // function emailTest(input) {
    //     const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    //     console.log(re.test(input.value))
    //     return re.test(input.value)
    // }

})