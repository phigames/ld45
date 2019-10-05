game.Human = me.Container.extend({
    init: function(hair, jacket, pants) {
        this._super(me.Container, "init", [0, 0, 32, 64]);
        this.anchorPoint = {x: 0,y: 0};
        this.changeOutfit(hair, jacket, pants)
        this.velocity = new me.Vector2d(0, 0);
    },

    update: function(dt) {
        this._super(me.Container, "update", [dt]);
        this.pos.add(new me.Vector2d(this.velocity.x * dt, this.velocity.y * dt));
        if (this.velocity.x < 0) {
            this.flipX(true);
        } else if (this.velocity.x > 0) {
            this.flipX(false);
        }
        this.pos.z = this.pos.y + 100;
        return true;
    },

    changeOutfit: function(hair, jacket, pants) {
        this.reset();
        this.hair = hair;
        this.jacket = jacket;
        this.pants = pants;
        this.character = new me.Sprite(0, 0, { image: "naked_RAW", anchorPoint: {x: 0, y: 0} });
        this.addChild(this.character)
        if (this.hair != null) {
            let coords = outfitCoords[hair].hair;
            // this.hairSprite = new me.Sprite(coords.x, coords.y, { image: hair+"_hair", anchorPoint: {x: 0, y: 0}});
            this.addChild(new me.Sprite(coords.x, coords.y, { image: hair+"_hair", anchorPoint: {x: 0, y: 0}}))
        } else { this.hairSprite = null; }
        if (this.jacket != null) {
            let coords = outfitCoords[jacket].jacket;
            // this.jacketImage = me.loader.getImage(jacket + "_jacket");
            // this.jacketCoords = coords;
            this.addChild(new me.Sprite(coords.x, coords.y, { image: jacket+"_jacket", anchorPoint: {x: 0, y: 0}}))
        } else { this.jacketImage = null; }
        if (this.pants != null) {
            let coords = outfitCoords[pants].pants;
            // this.pantsSprite = new me.Sprite(coords.x, coords.y, { image: pants+"_pants", anchorPoint: {x: 0, y: 0}});
            this.addChild(new me.Sprite(coords.x, coords.y, { image: pants+"_pants", anchorPoint: {x: 0, y: 0}}));
        } else { this.pantsSprite = null; }
    },

    onCollide: function(player) {

    },

    // draw: function(renderer) {
    //     this._super(me.Container, "draw", [renderer]);
    //     if (this.jacketImage !== null) {
    //         renderer.drawImage(this.jacketImage, this.jacketCoords.x, this.jacketCoords.y);
    //     }
    // }
});


game.Policeman = game.Human.extend({
    init: function() {
        this._super(game.Human, "init", [ "cop", "cop", "cop" ]);
    },

    update: function(dt) {
        this._super(game.Human, "update", [dt]);
        return true;
    },

    onCollide: function(player) {
        // TODO: remove clothes from player
    }
});


var pedestrianOutfits = [
    "elvis",
    "banquier",
    "wizard"
];

game.Pedestrian = game.Human.extend({
    init: function(hair, jacket, pants) {
        this._super(game.Human, "init", [ hair, jacket, pants ]);
        // TODO: place randomly around border of map
        this.angle = Math.PI/6
        this.direction = 1;
    },

    update: function(dt) {
        let randomX = Math.random();
        let randomY = Math.random();
        this.angle += 0.001 * this.direction * dt;
        
        let change_direction = Math.random();
        this._super(game.Human, "update", [dt]);
        if (change_direction <= 0.03) {
            this.direction = -this.direction;
            // this.angle = this.angle - Math.PI/8
            //this.angle = -Math.PI * Math.random()
            //this.velocity = new me.Vector2d(randomX, randomY).normalize().scale(game.parameters.maxVelocity)
        }
       // else if (change_direction >= 0.97) {
       //     this.angle = Math.PI * Math.random()
       // }
        this.velocity = new me.Vector2d(Math.cos(this.angle), Math.sin(this.angle)).normalize().scale(game.parameters.maxPedestrianVelocity * dt)
        return true;
        }
    });


game.Player = game.Human.extend({
    init: function() {
        this._super(game.Human, "init", [null, null, null])
    },

    update: function(dt) {
        let velX = 0
        let velY = 0
        if (me.input.isKeyPressed("left")) {
            velX -= 1
        }
        if (me.input.isKeyPressed("right")) {
            velX += 1
        }
        if (me.input.isKeyPressed("up")) {
            velY -= 1
        }
        if (me.input.isKeyPressed("down")) {
            velY += 1
        }
        this.velocity = new me.Vector2d(velX, velY).normalize().scale(game.parameters.maxPlayerVelocity * dt);
        this._super(game.Human, "update", [dt])
        
        if (this.pos.x < -16) {
            this.pos.x = -16
        }
        if (this.pos.x >= game.width - 16) {
            this.pos.x = game.width-17
        }
        if (this.pos.y < -32) {
            this.pos.y = -32
        }
        if (this.pos.y > game.height - 32) {
            this.pos.y = game.height-33
        }
        return true;
    }

            
    //         this.renderable.flipX(true);
    //         // update the default force
    //         this.body.force.x = -this.body.maxVel.x;
    //         // change to the walking animation
    //         if (!this.renderable.isCurrentAnimation("walk")) {
    //             this.renderable.setCurrentAnimation("walk");
    //         }
    //     }
    // }

});

var outfitCoords = {
    elvis: {
        hair: {
            x: 7,
            y: -3,
        },
        jacket: {
            x: 0,
            y: 16,
        },
        pants: {
            x: 4,
            y: 38,
        }
    },
    banquier: {
        hair: {
            x: 8,
            y: -1,
        },
        jacket: {
            x: 0,
            y: 16,
        },
        pants: {
            x: 7,
            y: 38,
        }
    },
    wizard: {
        hair: {
            x: 5,
            y: -10,
        },
        jacket: {
            x: -2,
            y: 12,
        },
        pants: {
            x: 7,
            y: 38,
        }
    },
    cop: {
        hair: {
            x: 8,
            y: -4,
        },
        jacket: {
            x: 0,
            y: 16,
        },
        pants: {
            x: 7,
            y: 37,
        }
    }
}
