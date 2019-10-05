game.Level = me.Container.extend({
    init: function(targetOutfit, oldPlayer) {
        this._super(me.Container, "init", [0, 0]);
        this.targetOutfit = targetOutfit;
        this.anchorPoint = { x: 0, y: 0 };

        if (oldPlayer === undefined) {
            this.player = new game.Player();
        } else {
            this.player = oldPlayer;
        }
        this.addChild(this.player);
        this.humans = [];
        this.pedestrianInterval = 2000;
        this.pedestrianTime = 0;
        this.policemanInterval = 4000;
        this.policemanTime = 0;
    },

    update: function(dt) {
        this._super(me.Container, "update", [dt]);
        this.pedestrianTime += dt;
        this.policemanTime += dt;
        if (this.pedestrianTime >= this.pedestrianInterval) {
            this.pedestrianTime -= this.pedestrianInterval;
            this.generatePedestrian();
        }
        if (this.policemanTime >= this.policemanInterval) {
            this.policemanTime -= this.policemanInterval;
            this.generatePoliceman();
        }

        // collisions
        for (let human of this.humans) {
            if (this.player.distanceTo(human) <= game.parameters.collisionDistance) {
                human.onCollide(this.player);
            }
        }

        // winning condition
        if (this.player.hat === this.targetOutfit.hat &&
            this.player.shirt === this.targetOutfit.shirt &&
            this.player.pants === this.targetOutfit.pants) {
            me.state.current().nextLevel();
        }
        return true;
    },

    generatePedestrian: function() {
        let pedestrian = new game.Pedestrian();
        this.humans.push(pedestrian);
        this.addChild(pedestrian);
    },

    generatePoliceman: function() {
        let policeman = new game.Policeman();
        this.humans.push(policeman);
        this.addChild(policeman);
    }
})
