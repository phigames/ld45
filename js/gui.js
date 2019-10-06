game.OutfitDisplay = me.Container.extend({
    init: function(outfit) {
        this._super(me.Container, "init", [25, game.height / 2, 50, 120]);
        this.anchorPoint = {x: 0, y: 0};
        this.addChild(new me.Sprite(0, 0, { image: "sider" }));
        this.hairSprite = new me.Sprite(0, -30, { image: outfit + "_hair" });
        this.addChild(this.hairSprite);
        this.jacketSprite = new me.Sprite(0, 0, { image: outfit + "_jacket" });
        this.addChild(this.jacketSprite);
        this.pantsSprite = new me.Sprite(0, 30, { image: outfit + "_pants" });
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
        this._super(me.Container, "init", [game.width - 25, game.height / 2, 50, 120]);
        this.anchorPoint = {x: 0, y: 0};

        this.addChild(new me.Sprite(0, 0, { image: "soundhour_background" }));

        this.airY0 = -39;
        this.airY1 = -15;
        this.sandY0 = 29;
        this.sandY1 = 5;
        this.airSprite = new me.Sprite(1, this.airY0, { image: "spickel_air" });
        this.sandSprite = new me.Sprite(1, this.sandY0, { image: "spickel_sand" });
        this.addChild(this.sandSprite);
        this.addChild(this.airSprite);

        this.addChild(new me.Sprite(0, 0, { image: "sider_sandhour" }));
        this.totalTime = time;
        this.timePassed = 0;
    },

    updateTime: function(timePassed) {
        this.timePassed = timePassed;
        if (this.timePassed >= this.totalTime) {
            this.done = true;
        }
        this.airSprite.pos.y = this.airY0 + (this.airY1 - this.airY0) * (this.timePassed / this.totalTime);
        this.sandSprite.pos.y = this.sandY0 + (this.sandY1 - this.sandY0) * (this.timePassed / this.totalTime);
        return true;
    }
})
