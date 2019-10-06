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

    changeOutfit: function(hair, jacket, pants, blush) {
        this.reset();
        this.hair = hair;
        this.jacket = jacket;
        this.pants = pants;
        if (blush) {
            this.character = new me.Sprite(0, 0, { image: "naked_blush", anchorPoint: {x: 0, y: 0} });
        } else {
            this.character = new me.Sprite(0, 0, { image: "naked_RAW", anchorPoint: {x: 0, y: 0} });
        }
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
        this.walkingAnimationInterval = 150;
    },

    onCollide: function(player) {
        
    }
});


var policemanSpawnPoints = [
    {posX: -30, posY: 190},
    {posX: 50, posY: -30},
    {posX: 250, posY: -30},
    {posX: 200, posY: 240},
    {posX: 390, posY: 240},
    {posX: 160, posY: 240},
    {posX: 340, posY: -30},
    {posX: -30, posY: -20},
    {posX: -30, posY: -20}
]

game.Policeman = game.Human.extend({
    init: function(playerX, playerY) {
        this._super(game.Human, "init", [ "cop", "cop", "cop" ]);
        let rand = policemanSpawnPoints[Math.floor(Math.random() * policemanSpawnPoints.length)];
        this.pos.x = rand.posX;
        this.pos.y = rand.posY;
        this.velocity = new me.Vector2d(playerX - this.pos.x, playerY - this.pos.y).normalize().scale(game.parameters.policeVelocity);
        this.jobdone = false
    },

    update: function(dt) {
        this._super(game.Human, "update", [dt]);
        return true;
    },

    onCollide: function(player) {
        if (this.jobdone != true && !(player.hair == null && player.jacket == null && player.pants== null)) {
            player.changeOutfit(null, null, null)
            this.jobdone = true
            player.character.flicker(2000)
        }
    }
});


var pedestrianOutfits = [
    "elvis",
    "banquier",
    "wizard", 
    "barca"
];

var pedestrianSpawnPoints = [
    {posX: -30, posY: 168, angle: -Math.PI/8, direction: 0.7},
    {posX: -30, posY: -60, angle: Math.PI/6, direction: 0.5},
    {posX: 300, posY: -60, angle: Math.PI, direction: -1},
    {posX: 150, posY: 240, angle: -Math.PI/2, direction: 0.5},
    {posX: 400, posY: 240, angle: 1.25*Math.PI, direction: 0.5},
    {posX: 400, posY: 20, angle: 0.75*Math.PI, direction: 0.5}   
]

game.Pedestrian = game.Human.extend({
    init: function(hair, jacket, pants) {
        this._super(game.Human, "init", [ hair, jacket, pants ]);
        // TODO: place randomly around border of map
        let rand = pedestrianSpawnPoints[Math.floor(Math.random() * pedestrianSpawnPoints.length)];
        this.pos.x = rand.posX
        this.pos.y = rand.posY
        this.angle = rand.angle
        this.direction = rand.direction;
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
        },

    onCollide: function(player) {
        let stolen = false;
        if (me.input.isKeyPressed("steal_hair") && this.hair != null) {
            player.changeOutfit(this.hair, player.jacket, player.pants);
            this.changeOutfit(null, this.jacket, this.pants, true);
            this.walkOffscreen();
            stolen = true;
        }
        if (me.input.isKeyPressed("steal_jacket") && this.jacket != null) {
            player.changeOutfit(player.hair, this.jacket, player.pants);
            this.changeOutfit(this.hair, null, this.pants, true);
            this.walkOffscreen();
            stolen = true;
        }
        if (me.input.isKeyPressed("steal_pants") && this.pants != null) {
            player.changeOutfit(player.hair, player.jacket, this.pants)
            this.changeOutfit(this.hair, this.jacket, null, true);
            this.walkOffscreen();
            stolen = true;
        }
        if (stolen > 0) {
            me.state.current().currentLevel.updateOutfit();
            me.state.current().currentLevel.addWanted(1);
        }
    }
});


game.Player = game.Human.extend({
    init: function() {
        this._super(game.Human, "init", [null, null, null])
        this.pos.x = 194
        this.pos.y = 96
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
    },
    barca: {
        hair: {x: 9,y: -2,},
        jacket: {x: 1,y: 16,},
        pants: {x: 7,y: 41,},
    }
}
