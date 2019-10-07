game.TransitionStage = me.Stage.extend({
    onResetEvent: function(nextLevelNumber, background) {
        if (background) {
            var backgroundSprite = new me.Sprite(0, 0, { image: "street", anchorPoint: { x: 0, y: 0 } });
            me.game.world.addChild(backgroundSprite);
        }
        var screenSprite = new me.Sprite(game.width / 2, game.height / 2, { image: game.levels[nextLevelNumber].targetOutfit + "_screen" });
        me.game.world.addChild(screenSprite);
        this.handler = me.event.subscribe(me.event.KEYDOWN, function (action, keyCode, edge) {
            if (action === "space") {
                me.state.change(me.state.PLAY, nextLevelNumber);
            }
        });
    },

    onDestroyEvent: function() {
        me.event.unsubscribe(this.handler);
    },
});
