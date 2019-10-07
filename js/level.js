game.Level = me.Container.extend({
    init: function(number) {
        this._super(me.Container, "init", [0, 0, game.width, game.height]);
        this.number = number;
        this.targetOutfit = game.levels[number].targetOutfit;
        this.targetOutfitProbability = game.levels[number].targetOutfitProbability;
        this.anchorPoint = { x: 0, y: 0 };

        var backgroundSprite = new me.Sprite(0, 0, { image: "street", anchorPoint: { x: 0, y: 0 } });
        this.addChild(backgroundSprite);

        this.player = new game.Player();
        this.addChild(this.player);
        this.pedestrians = [];
        this.pedestrianNumber = 8;
        this.policemen = [];
        this.policemanNumber = 1;
        this.policemanWaveSize = game.levels[number].policemanWaveSize;
        this.policeVelocity = game.levels[number].policeVelocity;

        // this.wanted = 0;
        this.timePassed = 0;
        this.totalTime = game.parameters.levelTime * 1000;

        this.outfitDisplay = new game.OutfitDisplay(this.targetOutfit);
        me.game.world.addChild(this.outfitDisplay, 9999);
        this.timeDisplay = new game.TimeDisplay(this.totalTime);
        me.game.world.addChild(this.timeDisplay, 9999);
        // this.wantedDisplay = new game.WantedDisplay(3);
        // me.game.world.addChild(this.wantedDisplay, 9999);
    },

    update: function(dt) {
        this._super(me.Container, "update", [dt]);

        // collisions, remove offscreen
        for (var i = 0; i < this.pedestrians.length; i++) {
            var pedestrian = this.pedestrians[i];
            if (pedestrian.isOffscreen()) {
                this.removeChild(pedestrian);
                this.pedestrians.splice(i, 1);
                i--;
                continue;
            }
            if (this.player.distanceTo(pedestrian) <= game.parameters.collisionDistance) {
                pedestrian.onCollide(this.player);
            }
        }
        if (!this.player.walkingToCenter) {
            for (var i = 0; i < this.policemen.length; i++) {
                var policeman = this.policemen[i];
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
        }

        // spawn
        while (this.pedestrians.length < this.pedestrianNumber && !this.player.walkingToCenter) {
            this.generatePedestrian();
        }
        while (this.policemen.length < this.policemanNumber && !this.player.walkingToCenter) {
            this.generatePoliceman();
        }

        this.policemanNumber -= 0.0005 * dt;
        if (this.policemanNumber < 1) {
            this.policemanNumber = 1;
        }

        // lose condition
        if (!this.player.walkingToCenter) {
            this.timePassed += dt;
            if (this.timePassed >= this.totalTime) {
                me.state.change(me.state.GAMEOVER, false);
            }
            this.timeDisplay.updateTime(this.timePassed);
        }

        this.sort();

        // win condition
        if (this.player.inCenter) {
            var allOffscreen = true;
            for (pedestrian in this.pedestrians) {
                if (!this.pedestrians[pedestrian].isOffscreen()) {
                    allOffscreen = false;
                    break;
                }
            }
            if (allOffscreen) {
                me.state.change(me.state.SCORE, this.number);
            }
        }
        return true;
    },

    _randomOutfit: function() {
        if (Math.random() < this.targetOutfitProbability) {
            return this.targetOutfit;
        }
        var nontarget = [];
        for (outfit in pedestrianOutfits) {
            if (pedestrianOutfits[outfit] != this.targetOutfit) {
                nontarget.push(pedestrianOutfits[outfit]);
            }
        }
        var r = Math.floor(Math.random() * nontarget.length);
        return nontarget[r];
    },

    generatePedestrian: function() {
        var firstPart = this._randomOutfit();
        var secondPart = this._randomOutfit();
        while (secondPart == firstPart) secondPart = this._randomOutfit();
        var thirdPart = this._randomOutfit();
        while (thirdPart == firstPart || thirdPart == secondPart) thirdPart = this._randomOutfit();

        if (Math.random() < 0.5) {
            var hair = firstPart;
            var jacket = secondPart;
            var pants = thirdPart;
        } else {
            var hair = thirdPart;
            var jacket = secondPart;
            var pants = firstPart;
        }
        
        var pedestrian = new game.Pedestrian(hair, jacket, pants);
        this.pedestrians.push(pedestrian);
        this.addChild(pedestrian);
    },

    generatePoliceman: function() {
        var policeman = null;
        // if (this.wanted == 0) {
            // don't aim at player
            // policeman = new game.Policeman(game.width / 4 + Math.random() * game.width / 2,
                                        //    game.height / 4 + Math.random() * game.height / 2);
        // } else {
            policeman = new game.Policeman(this.player.pos.x, this.player.pos.y, this.policeVelocity);
        // }
        this.policemen.push(policeman);
        this.addChild(policeman);
    },

    updateOutfit: function() {
        var hairDone = this.player.hair == this.targetOutfit;
        var jacketDone = this.player.jacket == this.targetOutfit;
        var pantsDone = this.player.pants == this.targetOutfit;
        this.outfitDisplay.updateOutfit(hairDone, jacketDone, pantsDone);

        // win condition
        if (hairDone && jacketDone && pantsDone) {
            this.player.walkToCenter();
            for (pedestrian in this.pedestrians) {
                this.pedestrians[pedestrian].walkOffscreen();
            }
            for (policeman in this.policemen) {
                this.policemen[policeman].walkOffscreen();
            }
            me.audio.stop("LD_1_minute");
            me.audio.play("won_a_level");
        }
    },

    policemanWave: function(size) {
        this.policemanNumber += size * this.policemanWaveSize;
    },

    resetPolicemanWave: function() {
        this.policemanNumber = 1;
    }
});
