game.Human = me.Container.extend({
    init: function(hair, jacket, pants) {
        this._super(me.Container, "init", [0, 0, 32, 64]);
        this.anchorPoint = {x: 0, y: 0};

        this.velocity = new me.Vector2d(0, 0);
        this.walkingAnimationInterval = 200;
        this.walkingAnimationTime = 0;
        this.walkingAnimationLeftUp = false;

        this.walkingOffscreen = false;

        this.changeOutfit(hair, jacket, pants)
        this.alwaysUpdate = true;
    },

    update: function(dt) {
        this._super(me.Container, "update", [dt]);
        if (this.walkingOffscreen) {
            this.pos.add(new me.Vector2d(this.velocity.x * dt * 3, this.velocity.y * dt * 3));
        } else {
            this.pos.add(new me.Vector2d(this.velocity.x * dt, this.velocity.y * dt));
        }
        if (this.velocity.x < 0) {
            this.flipX(true);
        } else if (this.velocity.x > 0) {
            this.flipX(false);
        }

        if (this.velocity.x != 0 || this.velocity.y != 0) {
            this.walkingAnimationTime += dt;
            if (this.walkingAnimationTime >= this.walkingAnimationInterval) {
                this.walkingAnimationTime -= this.walkingAnimationInterval;
                this.walkingAnimationLeftUp = !this.walkingAnimationLeftUp;
                if (this.walkingAnimationLeftUp) {
                    this.leftShoeSprite.pos.y = outfitCoords.shoes.left.y - 5;
                    this.rightShoeSprite.pos.y = outfitCoords.shoes.right.y;
                } else {
                    this.leftShoeSprite.pos.y = outfitCoords.shoes.left.y;
                    this.rightShoeSprite.pos.y = outfitCoords.shoes.right.y - 5;
                }
            }
        } else {
            this.walkingAnimationTime = this.walkingAnimationInterval;
            this.leftShoeSprite.pos.y = outfitCoords.shoes.left.y;
            this.rightShoeSprite.pos.y = outfitCoords.shoes.right.y;
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
            this.addChild(new me.Sprite(coords.x, coords.y, { image: hair+"_hair", anchorPoint: {x: 0, y: 0}}))
        }
        if (this.jacket != null) {
            let coords = outfitCoords[jacket].jacket;
            this.addChild(new me.Sprite(coords.x, coords.y, { image: jacket+"_jacket", anchorPoint: {x: 0, y: 0}}))
        }
        if (this.pants != null) {
            let coords = outfitCoords[pants].pants;
            this.addChild(new me.Sprite(coords.x, coords.y, { image: pants+"_pants", anchorPoint: {x: 0, y: 0}}));
        }

        this.leftShoeSprite = new me.Sprite(outfitCoords.shoes.left.x, outfitCoords.shoes.left.y, { image: "shoe", anchorPoint: {x: 0, y: 0}});
        this.rightShoeSprite = new me.Sprite(outfitCoords.shoes.right.x, outfitCoords.shoes.right.y, { image: "shoe", anchorPoint: {x: 0, y: 0}});
        this.addChild(this.rightShoeSprite);
        this.addChild(this.leftShoeSprite);
    },

    isOffscreen: function() {
        return (
            this.pos.x <= -32 || this.pos.x >= game.width ||
            this.pos.y <= -64 || this.pos.y >= game.height
        );
    },

    walkOffscreen: function() {
        this.walkingOffscreen = true;
    },

    onCollide: function(player) {

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
        
        let change_direction = this.walkingOffscreen ? 0 : Math.random();
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
            this.pos.x = game.width - 17
        }
        if (this.pos.y < -32) {
            this.pos.y = -32
        }
        if (this.pos.y > game.height - 32) {
            this.pos.y = game.height - 33
        }
        return true;
    }

});

var outfitCoords = {
    shoes: {
        left: { x: 7, y: 58 },
        right: { x: 17, y: 58 }
    },
    elvis: {
        hair: { x: 7, y: -3 },
        jacket: { x: 0, y: 16 },
        pants: { x: 4, y: 38 }
    },
    banquier: {
        hair: { x: 8, y: -1 },
        jacket: { x: 0, y: 16 },
        pants: { x: 7, y: 38 }
    },
    wizard: {
        hair: { x: 5, y: -10 },
        jacket: { x: -2, y: 7 },
        pants: { x: 7, y: 38 }
    },
    cop: {
        hair: { x: 8, y: -4 },
        jacket: { x: 0, y: 16 },
        pants: { x: 7, y: 37 }
    }
}
