class gameWindow extends Phaser.Scene {
    constructor() {
        super('gameWindow');
    }

    create() {
        const button = this.add.sprite(400, 300, "buttonBackMainMenu").setInteractive({ useHandCursor: true });;
        button.on("pointerover", ()=>{button.setScale(1.1)});
        button.on("pointerdown", ()=>{console.log('Новое окно')});
    }

}