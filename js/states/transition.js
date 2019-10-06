game.TransitionStage = me.Stage.extend({
    onResetEvent: function(nextLevelNumber) {
        if (nextLevelNumber >= game.levels.length) {
            me.state.change(me.state.GAMEOVER, true);
        } else {
            var screenSprite = new me.Sprite(game.width / 2, game.height / 2, { image: game.levels[nextLevelNumber].targetOutfit + "_screen" });
            me.game.world.addChild(screenSprite);
            me.input.registerPointerEvent("pointerdown", me.game.viewport, function() {
                me.input.releasePointerEvent("pointerdown", me.game.viewport);
                me.state.change(me.state.PLAY, nextLevelNumber);
                return false;
            });
        }
    },

    onDestroyEvent: function() {

    },
});
