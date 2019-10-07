game.PlayStage = me.Stage.extend({

    onResetEvent: function(levelNumber) {
        if (levelNumber == 0) {
        }
        me.game.world.reset();
        console.log("starting level ", levelNumber);
        this.level = new game.Level(levelNumber);
        me.game.world.addChild(this.level);
        if (levelNumber == game.levels.length - 1) {
            me.audio.stop("LD_minimal");
            me.audio.stop("LD_boss_level");
            me.audio.play("LD_boss_level", true);
        } else {
            me.audio.stop("LD_minimal");
            me.audio.stop("LD_boss_level");
            me.audio.play("LD_minimal", true);
        }
    },

    onDestroyEvent: function() {
        
    }

});
