game.PlayStage = me.Stage.extend({

    onResetEvent: function(levelNumber) {
        me.game.world.reset();
        console.log("starting level ", levelNumber);
        this.level = new game.Level(levelNumber);
        me.game.world.addChild(this.level);
        me.audio.stop("LD_1_minute");
        me.audio.play("LD_1_minute", true);
    },

    onDestroyEvent: function() {
        
    }

});
