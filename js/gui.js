game.OutfitDisplay = me.Container.extend({
    init: function(outfit) {
        this._super(me.Container, "init", [game.width - 50, game.height / 2]);
        this.outfit = outfit;
    }
});

game.TimeDisplay = me.Container.extend({
    init: function(time) {
        this._super(me.Container, "init", [0, game.height / 2]);
        this.totalTime = time;
        this.timePassed = 0;
    },

    update: function(dt) {
        this._super(me.Container, "update", [dt]);
        return true;
    }
})
