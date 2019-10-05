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
        me.state.change(me.state.PLAY);

        me.input.bindKey(me.input.KEY.LEFT, "left");
        me.input.bindKey(me.input.KEY.A, "left");
        me.input.bindKey(me.input.KEY.RIGHT, "right");
        me.input.bindKey(me.input.KEY.D, "right");
        me.input.bindKey(me.input.KEY.DOWN, "down");
        me.input.bindKey(me.input.KEY.S, "down");
        me.input.bindKey(me.input.KEY.UP, "up");
        me.input.bindKey(me.input.KEY.W, "up");
    },

    width: 420,
    height: 264,

    levels: [
        {
            targetOutfit: game.outfit.business
        },
        {
            targetOutfit: game.outfit.cowboy
        }
    ],

    parameters: {
        maxVelocity: 0.1,
        collisionDistance: 10
    }
}
