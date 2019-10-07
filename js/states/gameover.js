game.GameOverStage = me.Stage.extend({
    onResetEvent: function(won) {
        me.game.world.reset();
        var overlaySprite = new me.Sprite(game.width / 2, game.height / 2, { image: won ? "victory" : "gameover" });
        me.game.world.addChild(overlaySprite);
        me.audio.stop("LD_minimal");
        me.audio.stop("LD_boss_level");
        if (won) {
            me.audio.play("won_the_whole_game");
            this.handler = me.event.subscribe(me.event.KEYDOWN, function (action, keyCode, edge) {
                if (action === "space") {
                    window.location = "https://ldjam.com/events/ludum-dare/45/underdressed";
                }
            });
        } else {
            me.audio.play("game_over");
            this.handler = me.event.subscribe(me.event.KEYDOWN, function (action, keyCode, edge) {
                if (action === "space") {
                    me.state.change(me.state.USER, 0, true);
                }
            });
        }
    },

    onDestroyEvent: function() {
        me.event.unsubscribe(this.handler);
    },
});
