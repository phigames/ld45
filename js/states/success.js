game.SuccessStage = me.Stage.extend({
    onResetEvent: function(levelNumber, background) {
        if (levelNumber >= game.levels.length - 1) {
            me.state.change(me.state.GAMEOVER, true);
        } else {
            if (background) {
                var backgroundSprite = new me.Sprite(0, 0, { image: "street", anchorPoint: { x: 0, y: 0 } });
                me.game.world.addChild(backgroundSprite);
            }
            var screenSprite = new me.Sprite(game.width / 2, game.height / 2, { image: "success" });
            me.game.world.addChild(screenSprite);
            this.handler = me.event.subscribe(me.event.KEYDOWN, function (action, keyCode, edge) {
                if (action === "space") {
                    me.state.change(me.state.USER, levelNumber + 1);
                }
            });
        }
    },

    onDestroyEvent: function() {
        if (this.handler) {
            me.event.unsubscribe(this.handler);
        }
    },
});
