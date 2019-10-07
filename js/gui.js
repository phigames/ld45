game.OutfitDisplay = me.Container.extend({
    init: function(outfit) {
        this._super(me.Container, "init", [25, game.height / 2, 50, 120]);
        this.anchorPoint = {x: 0, y: 0};
        this.addChild(new me.Sprite(0, 0, { image: "sider" }));

        this.hairContainer = new me.Container(0, -30);
        this.hairContainer.addChild(new me.Sprite(6, 0, { image: outfit + "_hair" }));
        this.hairContainer.addChild(new me.Sprite(-22, 0, { image: "shoe" }));
        this.addChild(this.hairContainer);

        this.jacketContainer = new me.Container(0, 0);
        this.jacketContainer.addChild(new me.Sprite(6, 0, { image: outfit + "_jacket" }));
        this.jacketContainer.addChild(new me.Sprite(-22, 0, { image: "shoe" }));
        this.addChild(this.jacketContainer);

        this.pantsContainer = new me.Container(0, 30);
        this.pantsContainer.addChild(new me.Sprite(6, 0, { image: outfit + "_pants" }));
        this.pantsContainer.addChild(new me.Sprite(-22, 0, { image: "shoe" }));
        this.addChild(this.pantsContainer);
    },

    updateOutfit: function(hairDone, jacketDone, pantsDone) {
        function tweenOut(obj) {
            new me.Tween(obj.pos)
                .to({x: -50}, 200)
                .easing(me.Tween.Easing.Quadratic.In)
                .start();
        }
        function tweenIn(obj) {
            new me.Tween(obj.pos)
                .to({x: 0}, 200)
                .easing(me.Tween.Easing.Quadratic.Out)
                .start();
        }
        if (hairDone) {
            tweenOut(this.hairContainer);
        } else {
            tweenIn(this.hairContainer);
        }
        if (jacketDone) {
            tweenOut(this.jacketContainer);
        } else {
            tweenIn(this.jacketContainer);
        }
        if (pantsDone) {
            tweenOut(this.pantsContainer);
        } else {
            tweenIn(this.pantsContainer);
        }
    }
});


game.TimeDisplay = me.Container.extend({
    init: function(time) {
        this._super(me.Container, "init", [game.width - 25, game.height / 2, 50, 120]);
        this.anchorPoint = {x: 0, y: 0};


        this.airY0 = -40;
        this.airY1 = -16;
        this.sandY0 = 29;
        this.sandY1 = 5;
        this.airSprite = new me.Sprite(1, this.airY0, { image: "spickel_air" });
        this.sandSprite = new me.Sprite(1, this.sandY0, { image: "spickel_sand" });
        this.addChild(new me.Sprite(0, 17, { image: "soundhour_background" }));
        this.addChild(this.sandSprite);
        this.addChild(new me.Sprite(0, -17, { image: "soundhour_background" }));
        this.addChild(this.airSprite);

        this.addChild(new me.Sprite(0, 0, { image: "sider_sandhour" }));
        this.totalTime = time;
        this.timePassed = 0;
    },

    updateTime: function(timePassed) {
        // TODO: accent when almost done
        this.timePassed = timePassed;
        if (this.timePassed >= this.totalTime) {
            this.done = true;
        }
        this.airSprite.pos.y = this.airY0 + (this.airY1 - this.airY0) * (this.timePassed / this.totalTime);
        this.sandSprite.pos.y = this.sandY0 + (this.sandY1 - this.sandY0) * (this.timePassed / this.totalTime);
    }
});


game.WantedDisplay = me.Container.extend({
    init: function(maxWanted) {
        this._super(me.Container, "init", [game.width - maxWanted * 20, 20, 100, 20]);
        this.anchorPoint = {x: 0, y: 0};
    },

    updateWanted: function(wanted) {
        this.reset();
        for (var i = 0; i < wanted; i++) {
            this.addChild(new me.Sprite(i * 20, 0, { image: "shoe" }));
        }
    }
});