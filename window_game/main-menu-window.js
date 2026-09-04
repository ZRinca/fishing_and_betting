class mainMenu extends Phaser.Scene {
    constructor () {
        super('mainMenu');
    }

    create() {
        const button = this.add.sprite(400, 300, 'playBtn').setInteractive({ useHandCursor: true });

        // Приятные эффекты
        button.on('pointerover', () => {button.setScale(1.1)});
        button.on('pointerout', () => {button.setScale(1)});
        button.on('pointerdown', () => {
            this.scene.start("gameWindow");
        });
    }

}