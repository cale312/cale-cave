let count = 0;
setInterval(() => {
    count++;
    if (count == 1) {
        document.querySelector(".blinker").style.visibility = "hidden";
    } else {
        document.querySelector(".blinker").style.visibility = "";
        count = 0;
    }
}, 500);

type = (string, output) => {
    let word = "";
    let count = 0;
    setInterval( () => {
        if (string[count] !== undefined) {
            word += string[count];
            count++;
            output.innerHTML = word;
        } else {
            setTimeout( () => {
                word = "";
                count = 0;
                output.innerHTML = "";
            }, 1000);
        }
    }, 100);
}

type("_code", document.querySelector(".logo-name"));

(function ($) {
    $(function () {
        $('.button-collapse').sideNav();
    });
})(jQuery);
