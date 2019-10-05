game.OutfitDisplay = me.Container.extend({
    init: function(outfit) {
        this._super(me.Container, "init", [game.width - 50, game.height / 2, 50, 200]);
        this.hairSprite = new me.Sprite(0, 50, { image: this.outfit + "_hair" });
        this.addChild(this.hairSprite);
        this.jacketSprite = new me.Sprite(0, 50, { image: this.outfit + "_jacket" });
        this.addChild(this.jacketSprite);
        this.pantsSprite = new me.Sprite(0, 50, { image: this.outfit + "_pants" });
        this.addChild(this.pantsSprite);
    },

    updateOutfit: function(hairDone, jacketDone, pantsDone) {
        function tweenOut(sprite) {
            new me.Tween(sprite.pos)
                .to({x: 50})
                .easing(me.Tween.Easing.Quadratic.In)
                .start();
        }
        function tweenIn(sprite) {
            new me.Tween(sprite.pos)
                .to({x: 0})
                .easing(me.Tween.Easing.Quadratic.Out)
                .start();
        }
        if (hairDone) {
            tweenOut(this.hairSprite);
        } else {
            tweenIn(this.hairSprite);
        }
        if (jacketDone) {
            tweenOut(this.jacketSprite);
        } else {
            tweenIn(this.jacketSprite);
        }
        if (pantsDone) {
            tweenOut(this.pantsSprite);
        } else {
            tweenIn(this.pantsSprite);
        }
    }
});

game.TimeDisplay = me.Container.extend({
    init: function(time) {
        this._super(me.Container, "init", [0, game.height / 2]);
        this.totalTime = time;
        this.timePassed = 0;
    },

    updateTime: function(timePassed) {
        this._super(me.Container, "update", [dt]);
        this.timePassed = timePassed;
        if (this.timePassed >= this.totalTime) {
            this.done = true;
        }
        return true;
    }
})
