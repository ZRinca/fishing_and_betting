class gameWindow extends Phaser.Scene {
    constructor() {
        super('gameWindow');
        this.isMoving = false;
    }

    preload() {
        // background for window
        this.load.image('background', 'assets/img/background/background.png');
        
        // player 
        this.load.image('stop', 'assets/img/player/1.png');
        this.load.image('run', 'assets/img/player/2.png');
        this.load.image('make', 'assets/img/player/3.png');

        // comtroller
        this.cursors = this.input.keyboard.createCursorKeys();

    };

    create() {
        this.add.image(0, 0, 'background').setOrigin(0, 0);

        this.anims.create({
            key: "walk",
            frames: [
                { key:  'stop'},
                { key: 'run' }
            ],
            frameRate: 10,
            repeat: -1
        })

        this.player = this.add.sprite(900, 600, "run");
        this.player.setScale(2);

        // const button = this.add.sprite(400, 300, "buttonBackMainMenu").setInteractive({ useHandCursor: true });;
        // button.on("pointerover", ()=>{button.setScale(1.1)});
        // button.on("pointerdown", ()=>{console.log('Новое окно')});
    }

    update() {
        if (this.cursors.left.isDown) {
            this.player.x -= 5;
            if (!this.isMoving) {
                this.player.play("walk");
                this.player.setFlip(true, false);
                this.isMoving = true;
            }
        } else if (this.cursors.right.isDown) {
            this.player.x += 5;
            if (!this.isMoving) {
                this.player.play("walk");
                this.player.setFlip(false, false);
                this.isMoving = true;
            }
        } else {
            // this.player.stop()
            if (this.isMoving) {
                this.player.stop();
                this.isMoving = false;
                this.player.setTexture("run");
            }
        }
    }
}