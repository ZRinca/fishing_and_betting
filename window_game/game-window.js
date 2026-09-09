class gameWindow extends Phaser.Scene {
    constructor() {
        super('gameWindow');
        this.isMoving = false;
        this.displayButtonFishing = false;
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
        // background for window
        this.load.image('background', 'assets/img/background/background.png');
        
        // player 
        this.load.image('stop', 'assets/img/player/1.png');
        this.load.image('run', 'assets/img/player/2.png');
        this.load.image('make', 'assets/img/player/3.png');

        // wheel
        this.load.image('wheel', 'assets/img/wheel/betting.png')

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

        const btnWidth = 240;
        const btnHeight = 70;
        const radius = 16;

        const centerX = this.cameras.main.width / 2;
        const centerY = this.cameras.main.height / 2;

        const graphics = this.make.graphics({});
        graphics.fillStyle(0xff6600, 1);
        graphics.fillRoundedRect(0, 0, btnWidth, btnHeight, radius);

        graphics.fillStyle(0xff8833, 0.5);
        graphics.fillRoundedRect(0, 0, btnWidth, btnHeight/2, radius);

        graphics.generateTexture('roundBtn', btnWidth, btnHeight);
        graphics.destroy();

        this.menu = this.add.sprite(centerX, 100, 'roundBtn').setInteractive({ useHandCursor: true });
        this.labelMenu = this.add.text(centerX, 100, 'В меню', this.styleLabel).setOrigin(0.5).setDepth(1);

        this.buttonStyles(this.menu, this.labelMenu);

        this.menu.on('pointerdown', () => {
            // fishing.setScale(0.95);
            this.scene.start('mainMenu')
        });

        this.inventory = this.add.sprite(centerX, 190, 'roundBtn').setInteractive({ useHandCursor: true });
        this.labelinventory = this.add.text(centerX, 190, 'Инвентарь', this.styleLabel).setOrigin(0.5).setDepth(1);

        this.buttonStyles(this.inventory, this.labelinventory);

        this.inventory.on('pointerdown', () => {
            // fishing.setScale(0.95);
            document.querySelector('.table-back').style.display = 'inline';
        });

        this.pay = this.add.sprite(1600, 400, 'roundBtn').setInteractive({ useHandCursor: true });
        this.labelPay = this.add.text(1600, 400, 'Продать', this.styleLabel).setOrigin(0.5).setDepth(1);

        this.buttonStyles(this.pay, this.labelPay);

        this.pay.on('pointerdown', () => {
            // fishing.setScale(0.95);
            // this.scene.start('settings')
        });

            
        this.betting = this.add.sprite(1600, 600, 'roundBtn').setInteractive({ useHandCursor: true });
        this.labelBetting = this.add.text(1600, 600, 'Залудоманить', this.styleLabel).setOrigin(0.5).setDepth(1);

        this.buttonStyles(this.betting, this.labelBetting);

        this.betting.on('pointerdown', () => {
            // fishing.setScale(0.95);
            // this.scene.start('settings')
            this.wheelTween.stop();
        });

        this.wheel = this.add.sprite(centerX, centerY, "wheel");
        this.wheel.setOrigin(0.5, 0.5);
        this.wheel.setScale(0.25);

        this.wheelTween = this.tweens.add({
            targets: this.wheel,
            angle: 360,
            duration: 200,
            repeat: -1,
            ease: 'Linear'
        });

        // this.wheel.play("wheelAnim");

        this.fishing = this.add.sprite(640, 450, 'roundBtn').setInteractive({ useHandCursor: true });
        this.labelfishing = this.add.text(640, 450, 'Ловля рыбы', this.styleLabel).setOrigin(0.5).setDepth(1);

        this.buttonStyles(this.fishing, this.labelfishing);

        this.fishing.on('pointerdown', () => {
            this.player.setTexture("make");
            // this.player.flipx(true);
            // fishing.setScale(0.95);
            // this.scene.start('settings')
        });


        // const button = this.add.sprite(400, 300, "buttonBackMainMenu").setInteractive({ useHandCursor: true });;
        // button.on("pointerover", ()=>{button.setScale(1.1)});
        // button.on("pointerdown", ()=>{console.log('Новое окно')});
    }

    update() {

        // buttons
        if (this.player.x > 1600 && this.player.x < 1800) {
            this.pay.setVisible(true);
            this.labelPay.setVisible(true);
            this.betting.setVisible(true);
            this.labelBetting.setVisible(true);
            this.wheel.setVisible(true);
        } else {
            this.pay.setVisible(false);
            this.labelPay.setVisible(false);
            this.betting.setVisible(false);
            this.labelBetting.setVisible(false);
            this.wheel.setVisible(false);
        };

        if (this.player.x > 500 && this.player.x < 750) {
            this.fishing.setVisible(true);
            this.labelfishing.setVisible(true);
        } else {
            this.fishing.setVisible(false);
            this.labelfishing.setVisible(false);
        };


        if (this.cursors.left.isDown) {
            if (this.player.x > 640) {this.player.x -= 5;}
            if (!this.isMoving) {
                this.player.play("walk");
                this.player.setFlip(true, false);
                this.isMoving = true;
            }
        } else if (this.cursors.right.isDown) {
            if (this.player.x < 1800){this.player.x += 5;}

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