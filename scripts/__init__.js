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

    const config = {
            type: Phaser.AUTO,
            scale: {
                mode: Phaser.Scale.EXACT_FIT,
                width: 800,
                height: 600,
                autoCenter: Phaser.Scale.CENTER_BOTH,
            },
            parent: 'game-container',
            scene: [mainMenu, gameWindow],
        };
    
    game = new Phaser.Game(config);
})();