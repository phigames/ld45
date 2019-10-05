game.PlayStage = me.Stage.extend({

    onResetEvent: function() {
        me.game.world.reset();
        me.game.world.addChild(new me.ColorLayer("background", "#000000"), 0)
        game.level = new game.Level();
        me.game.world.addChild(game.level);
    },

    onDestroyEvent: function() {

    }

});
