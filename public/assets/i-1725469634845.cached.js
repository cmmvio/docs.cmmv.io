
    hljs.highlightAll();

    document.querySelectorAll('a[href^="#"]').forEach(link => {
        link.addEventListener('click', function(event) {
            event.preventDefault();
            const href = this.getAttribute('href');
            document.querySelectorAll('.current').forEach(el => el.classList.remove('current'));
            this.parentElement.classList.add('current');

            window.scrollTo({
                top: document.querySelector(href).offsetTop,
                behavior: 'smooth'
            });

            window.location.hash = href;
        });
    });

    window.addEventListener('scroll', function () {
        const scrollPosition = window.scrollY;
        document.querySelectorAll('.current').forEach(el => el.classList.remove('current'));

        let repoint = false;
        document.querySelectorAll('#anchors > li').forEach(item => {
            const target = document.querySelector(item.querySelector('a').getAttribute('href'));
            if (target.offsetTop >= scrollPosition && !repoint) {
                repoint = true;
                item.classList.add('current');
            }
        });
    });

    document.querySelectorAll("#anchors > li")[0]?.classList.add("current");
