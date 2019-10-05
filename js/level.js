game.Level = me.Container.extend({
    init: function(targetOutfit, oldPlayer) {
        this._super(me.Container, "init", [0, 0, game.width, game.height]);
        this.targetOutfit = targetOutfit;
        this.anchorPoint = { x: 0, y: 0 };

        this.addChild(new me.Sprite(0, 0, { image: "street" }));

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
        this.timePassed = 0;
        this.totalTime = 30 * 1000;
    },

    update: function(dt) {
        this._super(me.Container, "update", [dt]);
        this.pedestrianTime += dt;
        this.policemanTime += dt;

        // spawns
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

        // win condition
        if (this.player.hair === this.targetOutfit.hair &&
            this.player.jacket === this.targetOutfit.jacket &&
            this.player.pants === this.targetOutfit.pants) {
            me.state.current().nextLevel();
        }

        // lose condition
        this.timePassed += dt;
        if (this.timePassed >= this.totalTime) {
            me.state.current().gameOver();
        }

        this.sort();
        return true;
    },

    generatePedestrian: function() {
        // TODO: generate using probabilites
        let pedestrian = new game.Pedestrian("wizard", "wizard", "elvis");
        this.humans.push(pedestrian);
        this.addChild(pedestrian);
    },

    generatePoliceman: function() {
        let policeman = new game.Policeman();
        this.humans.push(policeman);
        this.addChild(policeman);
    }
})
