game.TransitionStage = me.Stage.extend({
    onResetEvent: function(nextlevelNumber) {
        me.game.world.reset();
        let backgroundSprite = new me.Sprite(0, 0, { image: "street", anchorPoint: { x: 0, y: 0 } });
        me.game.world.addChild(backgroundSprite);
        console.log("reset transition stage");
        
        delay(500, function() {
            me.state.change(me.state.PLAY, nextlevelNumber);
        });
    },

    onDestroyEvent: function() {

        console.log("destroy transition stage");
    },
});
