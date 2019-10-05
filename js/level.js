game.Level = me.Container.extend({
    init: function(targetOutfit) {
        this._super(me.Container, "init", [0, 0]);
        this.targetOutfit = targetOutfit;
        this.anchorPoint = { x: 0, y: 0 };
        let player = new game.Player();
        this.addChild(player);
    }
})
