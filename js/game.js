var game = {
    onload: function() {
        if (!me.video.init(game.width, game.height, {
            wrapper : "screen",
            // TODO check webgl compatibility
            renderer : me.video.CANVAS,
            scale : "auto",
            scaleMethod : "fit",
            doubleBuffering : true
        })) {
            alert("Your browser does not support HTML5 Canvas");
            return;
        }

        me.audio.init("ogg");
        me.loader.preload(game.resources, this.onloaded.bind(this))
    },

    onloaded: function() {
        me.state.set(me.state.PLAY, new game.PlayStage());
        me.state.set(me.state.USER, new game.TransitionStage());
        me.state.set(me.state.GAMEOVER, new game.GameOverStage());
        me.state.change(me.state.PLAY, 0);

        me.input.bindKey(me.input.KEY.LEFT, "left");
        me.input.bindKey(me.input.KEY.A, "left");
        me.input.bindKey(me.input.KEY.RIGHT, "right");
        me.input.bindKey(me.input.KEY.D, "right");
        me.input.bindKey(me.input.KEY.DOWN, "down");
        me.input.bindKey(me.input.KEY.S, "down");
        me.input.bindKey(me.input.KEY.UP, "up");
        me.input.bindKey(me.input.KEY.W, "up");
        me.input.bindKey(me.input.KEY.NUM1, "steal_hair", true);
        me.input.bindKey(me.input.KEY.NUM2, "steal_jacket", true);
        me.input.bindKey(me.input.KEY.NUM3, "steal_pants", true);
    },

    width: 420,
    height: 256,

    // TODO: level ordering
    levels: [
        {
            targetOutfit: "elvis",
            targetOutfitProbability: 0.3
        },
        {
            targetOutfit: "banquier",
            targetOutfitProbability: 0.2
        }
    ],

    parameters: {
        maxPlayerVelocity: 0.005,
        maxPedestrianVelocity: 0.002,
        policeVelocity: 0.05,
        collisionDistance: 20,
        levelTime: 60,
        policemanWaveSize: 4
    },

}

function delay(duration, then) {
    new me.Tween(me.game.world).delay(duration).onComplete(then).start();
}

function flicker(object, times) {
    if (times <= 0) {
        return;
    }
    object.alpha = 0;
    delay(100, function() {
        object.alpha = 1;
        delay(100, function() {
            flicker(object, times - 1);
        });
    });
}
