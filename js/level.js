game.Level = me.Container.extend({
    init: function(targetOutfit, oldPlayer) {
        this._super(me.Container, "init", [0, 0, game.width, game.height]);
        this.targetOutfit = targetOutfit;
        this.targetOutfitProbability = 0.3;
        this.anchorPoint = { x: 0, y: 0 };

        let backgroundSprite = new me.Sprite(0, 0, { image: "street", anchorPoint: { x: 0, y: 0 } });
        this.addChild(backgroundSprite);

        if (oldPlayer === undefined) {
            this.player = new game.Player();
        } else {
            this.player = oldPlayer;
        }
        this.addChild(this.player);
        this.pedestrians = [];
        this.pedestrianNumber = 8;
        this.policemen = [];
        this.policemanNumber = 5;
        this.timePassed = 0;
        this.totalTime = 30 * 1000;
    },

    update: function(dt) {
        this._super(me.Container, "update", [dt]);

        // collisions, remove offscreen
        for (let i = 0; i < this.pedestrians.length; i++) {
            let pedestrian = this.pedestrians[i];
            if (pedestrian.isOffscreen()) {
                this.removeChild(pedestrian);
                this.pedestrians.splice(i, 1);
                i--;
                console.log("remove");
                continue;
            }
            if (this.player.distanceTo(pedestrian) <= game.parameters.collisionDistance) {
                pedestrian.onCollide(this.player);
            }
        }
        for (let i = 0; i < this.policemen.length; i++) {
            let policeman = this.policemen[i];
            if (policeman.isOffscreen()) {
                this.removeChild(policeman);
                this.policemen.splice(i, 1);
                i--;
                continue;
            }
            if (this.player.distanceTo(policeman) <= game.parameters.collisionDistance) {
                policeman.onCollide(this.player);
            }
        }

        // spawn
        while (this.pedestrians.length < this.pedestrianNumber) {
                            console.log("generate");
            this.generatePedestrian();
        }
        while (this.policemen.length < this.policemanNumber) {
            this.generatePoliceman();
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

    _randomOutfit: function() {
        if (Math.random() < this.targetOutfitProbability) {
            return this.targetOutfit;
        }
        let nontarget = [];
        for (outfit of pedestrianOutfits) {
            if (outfit != this.targetOutfit) {
                nontarget.push(outfit);
            }
        }
        let r = Math.floor(Math.random() * nontarget.length);
        return nontarget[r];
    },

    generatePedestrian: function() {
        let hair = this._randomOutfit();
        let jacket = this._randomOutfit();
        while (jacket == hair) jacket = this._randomOutfit();
        let pants = this._randomOutfit();
        while (pants == hair || pants == jacket) pants = this._randomOutfit();
        console.log(hair, jacket, pants);
        
        let pedestrian = new game.Pedestrian(hair, jacket, pants);
        this.pedestrians.push(pedestrian);
        this.addChild(pedestrian);
    },

    generatePoliceman: function() {
        let policeman = new game.Policeman();
        this.policemen.push(policeman);
        this.addChild(policeman);
    }
});
