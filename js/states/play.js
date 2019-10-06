game.PlayStage = me.Stage.extend({

    onResetEvent: function(levelNumber) {
        me.game.world.reset();
        this.level = new game.Level(levelNumber);
        me.game.world.addChild(this.level);
        // me.audio.play("test");
        console.log("reset");
    },

    onDestroyEvent: function() {
        console.log("destroy");
    },

    // nextLevel: function() {
    //     this.currentLevelIndex++;
    //     this.currentLevel = new game.Level(game.levels[this.currentLevelIndex],
    //                                        this.currentLevel.player);
    //     me.game.world.reset();
        
    //     me.game.world.addChild(this.currentLevel);
    // },

    gameOver: function() {
        // TODO: game over screen
    }

});
