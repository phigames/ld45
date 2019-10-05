game.Human = me.Container.extend({
    init: function(hair, jacket, pants) {
        this._super(me.Container, "init", [0, 0, 32, 64]);
        this.anchorPoint = { x: 0, y: 0 };
        this.changeOutfit(hair, jacket, pants)
        this.velocity = new me.Vector2d(0, 0);
    },

    update: function(dt) {
        this._super(me.Container, "update", [dt]);
        this.pos.add(new me.Vector2d(this.velocity.x * dt, this.velocity.y * dt));
        return true;
    },

    changeOutfit: function(hair, jacket, pants) {
        this.clear
        this.hair = hair;
        this.jacket = jacket;
        this.pants = pants;
        let character = new me.Sprite(0, 0, { image: "naked_RAW", anchorpoint: {x: 0, y: 0} });
        // character.pos.x = character.width/2
        // character.pos.y = character.height/2
        this.addChild(character)
        this.addChild(new me.Sprite(0, 0, { image: "shoe", anchorpoint: {x: 0, y: 0} }));
        console.log(hair+"_hair");
        if (this.hair != null) {
            let coords = outfitCoords[hair].hair;
            console.log(coords);
            
            this.addChild(new me.Sprite(coords.x, coords.y, { image: hair+"_hair", anchorpoint: {x: 0, y: 0}}))
        }
        console.log(this.jacket+"_jacket");
        if (this.jacket != null) {
            let coords = outfitCoords[jacket].jacket;
            this.addChild( new me.Sprite(coords.x, coords.y, { image: jacket+"_jacket", anchorpoint: {x: 0, y: 0}}))
        }
        console.log(this.pants+"_pants");
        if (this.pants != null) {
            let coords = outfitCoords[pants].pants;
            this.addChild( new me.Sprite(coords.x, coords.y, { image: pants+"_pants", anchorpoint: {x: 0, y: 0}}))
        }


    }
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
        
        if (this.pos.x < 0) {
            this.pos.x = 0
        }
        if (this.pos.x > game.width) {
            this.pos.x = game.width-1
        }
        if (this.pos.y < 0) {
            this.pos.y = 0
        }
        if (this.pos.y > game.height) {
            this.pos.y = game.height-1
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
