game.TitleStage = me.Stage.extend({
    onResetEvent: function() {
        me.game.world.reset();
        var titleSprite = new me.Sprite(0, 0, { image: "titlescreen", anchorPoint: { x: 0, y: 0 } });
        me.game.world.addChild(titleSprite);
        me.input.registerPointerEvent("pointerdown", me.game.viewport, function() {
            me.state.change(me.state.PLAY, 0);
            return false;
        });
    },

    onDestroyEvent: function() {

    },
});
