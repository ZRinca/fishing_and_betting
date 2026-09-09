function export buttonStyles(button, label) {
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