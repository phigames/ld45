game.TitleStage = me.Stage.extend({
    onResetEvent: function() {
        me.game.world.reset();
        var titleSprite = new me.Sprite(0, 0, { image: "titlescreen", anchorPoint: { x: 0, y: 0 } });
        me.game.world.addChild(titleSprite);
        this.handler = me.event.subscribe(me.event.KEYDOWN, function (action, keyCode, edge) {
            if (action === "space") {
                me.state.change(me.state.USER, 0, true);
            }
        });
    },

    onDestroyEvent: function() {
        me.event.unsubscribe(this.handler);
    },
});
