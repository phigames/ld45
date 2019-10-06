game.TransitionStage = me.Stage.extend({
    onResetEvent: function(nextLevelNumber) {
        // me.game.world.reset();
        // let backgroundSprite = new me.Sprite(0, 0, { image: "street", anchorPoint: { x: 0, y: 0 } });
        // me.game.world.addChild(backgroundSprite);
        console.log("transition to level ", nextLevelNumber);
        delay(500, function() {
            if (nextLevelNumber >= game.levels.length) {
                me.state.change(me.state.GAMEOVER, true);
            } else {
                me.state.change(me.state.PLAY, nextLevelNumber);
            }
        });
    },

    onDestroyEvent: function() {
    },
});
