class settings extends Phaser.Scene {
    constructor () {
        super("settings");
        this.styleLabel = {
            fontSize: '32px',
            fontFamily: 'Arial, sans-serif',
            fontStyle: 'bold',
            fill: '#ffffff',
            stroke: '#000000',
            strokeThickness: 3,
            shadow: {
                offsetX: 2,
                offsetY: 2,
                color: '#000000',
                blur: 4,
                fill: true
            }
        };
    }

    buttonStyles(button, label) {
        button.on('pointerover', () => {
            button.setScale(1.05);
            label.setScale(1.05);
        });
        button.on('pointerout', () => {
            button.setScale(1);
            label.setScale(1);
        });
        button.on('pointerup', () => {
            button.setScale(1);
        });
    }

    preload() {
        this.load.image('background', 'assets/img/background/background.png');
    }

    create() {
        this.add.image(0, 0, 'background').setOrigin(0, 0);

        const centerX = this.cameras.main.width / 2;
        const centerY = this.cameras.main.height / 2;

        const btnWidth = 240;
        const btnHeight = 70;
        const radius = 16;

        const graphics = this.make.graphics({});
        graphics.fillStyle(0xff6600, 1);
        graphics.fillRoundedRect(0, 0, btnWidth, btnHeight, radius);

        graphics.fillStyle(0xff8833, 0.5);
        graphics.fillRoundedRect(0, 0, btnWidth, btnHeight/2, radius);

        graphics.generateTexture('roundBtn', btnWidth, btnHeight);
        graphics.destroy();

        const buttonGame = this.add.sprite(centerX, centerY, 'roundBtn').setInteractive({ useHandCursor: true });
        const labelGame = this.add.text(centerX, centerY, 'Выключить звук', this.styleLabel).setOrigin(0.5).setDepth(1);

        this.buttonStyles(buttonGame, labelGame);

        buttonGame.on('pointerdown', () => {
            buttonGame.setScale(0.95);
            this.scene.start('gameWindow');
        });

        this.menu = this.add.sprite(centerX, 100, 'roundBtn').setInteractive({ useHandCursor: true });
        this.labelMenu = this.add.text(centerX, 100, 'В меню', this.styleLabel).setOrigin(0.5).setDepth(1);

        this.buttonStyles(this.menu, this.labelMenu);

        this.menu.on('pointerdown', () => {
            // fishing.setScale(0.95);
            this.scene.start('mainMenu');

        });

    }
}