game.GameOverStage = me.Stage.extend({
    onResetEvent: function(won) {
        me.game.world.reset();
        var overlaySprite = new me.Sprite(game.width / 2, game.height / 2, { image: won ? "victory" : "gameover" });
        me.game.world.addChild(overlaySprite);
        if (won) {
            me.input.registerPointerEvent("pointerdown", me.game.viewport, function() {
                me.input.releasePointerEvent("pointerdown", me.game.viewport);
                window.location = "https://ldjam.com/events/ludum-dare/45/$170508";
                return false;
            });
        } else {
            me.input.registerPointerEvent("pointerdown", me.game.viewport, function() {
                me.input.releasePointerEvent("pointerdown", me.game.viewport);
                me.state.change(me.state.PLAY, 0);
                return false;
            });
        }
    },

    onDestroyEvent: function() {

    },
});
