let isAdShowing = false;
let developMode = true;
let lang = 'ru';
let ysdk = null;


// init sdk and game
(async function () {

    if (!developMode) {
        ysdk = await YaGames.init();
        lang = ysdk.environment.i18n.lang;   
    }

    replacedText(lang);
})();