game.GameOverStage = me.Stage.extend({
    onResetEvent: function(won) {
        me.game.world.reset();
        var overlaySprite = new me.Sprite(game.width / 2, game.height / 2, { image: won ? "victory" : "gameover" });
        me.game.world.addChild(overlaySprite);
        if (!won) {
            me.input.registerPointerEvent("pointerdown", me.game.viewport, function() {
                me.state.change(me.state.PLAY, 0);
                return false;
            });
        }
    },

    onDestroyEvent: function() {

    },
});
