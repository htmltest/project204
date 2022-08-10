window.onload = function() {
    var html = document.documentElement;

    var fontsfile = document.createElement('link');
    fontsfile.href = pathTemplate + 'css/fonts.css';
    fontsfile.rel = 'stylesheet';
    document.head.appendChild(fontsfile);

    if (sessionStorage.fontsLoaded) {
        html.classList.add('fonts-loaded');
        window.setTimeout(function() { window.dispatchEvent(new Event('resize')); }, 500);
    } else {
        var script = document.createElement('script');
        script.src = pathTemplate + 'js/fontfaceobserver.js';
        script.async = true;

        script.onload = function () {
            var Roboto300 = new FontFaceObserver('Roboto', {
                weight: '300'
            });
            var Roboto400 = new FontFaceObserver('Roboto', {
                weight: 'normal'
            });
            var Roboto500 = new FontFaceObserver('Roboto', {
                weight: '500'
            });
            var Roboto700 = new FontFaceObserver('Roboto', {
                weight: 'bold'
            });

            Promise.all([
                Roboto300.load(),
                Roboto400.load(),
                Roboto500.load(),
                Roboto700.load()
            ]).then(function () {
                html.classList.add('fonts-loaded');
                sessionStorage.fontsLoaded = true;
                window.setTimeout(function() { window.dispatchEvent(new Event('resize')); }, 500);
            });
        };
        document.head.appendChild(script);
    }
}