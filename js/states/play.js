game.PlayStage = me.Stage.extend({

    onResetEvent: function() {
        this.currentLevelIndex = 0;
        me.game.world.reset();
        this.currentLevel = new game.Level(game.levels[this.currentLevelIndex]);
        me.game.world.addChild(this.currentLevel);
        // me.audio.play("test");
    },

    onDestroyEvent: function() {

    },

    nextLevel: function() {
        this.currentLevelIndex++;
        me.game.world.reset();
        this.currentLevel = new game.Level(game.levels[this.currentLevelIndex],
                                           this.currentLevel.player);
        me.game.world.addChild(new me.ColorLayer("background", "#000000"), 0)
        me.game.world.addChild(this.currentLevel);
    },

    gameOver: function() {
        // TODO: game over screen
    }

});
