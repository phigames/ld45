game.outfit = {
    business: 1,
    cowboy: 2,
    police: 3
}

game.Human = me.Container.extend({
    init: function(hat, shirt, pants) {
        let character = new me.Sprite(0, 0, { image: "naked_RAW" });
        character.pos.x = character.width/2
        character.pos.y = character.height/2
        this._super(me.Container, "init", [0, 0, character.width, character.height]);
        //this.anchorPoint = { x: 0, y: 0 };
        this.hat = hat;
        this.shirt = shirt;
        this.pants = pants;
        this.velocity = new me.Vector2d(0, 0);
        this.addChild(character)

    },

    update: function(dt) {
        this._super(me.Container, "update", [dt]);
        this.pos.add(new me.Vector2d(this.velocity.x * dt, this.velocity.y * dt));
        return true;
    }
});


game.Policeman = game.Human.extend({
    init: function() {
        this._super(game.Human, "init", [game.outfit.police, 
                                        game.outfit.police, 
                                        game.outfit.police]);
    },

    update: function(dt) {
        this._super(game.Human, "update", [dt]);
        return true;
    }
});


game.Pedestrian = game.Human.extend({
    init: function() {
        this._super(game.Human, "init", [game.outfit.cowboy,
                                        game.outfit.business,
                                        game.outfit.cowboy])
                                        console.log(Math.random())
        this.velocity = new me.Vector2d(Math.random(), Math.random()).scale(game.parameters.maxVelocity)
        this.angle = Math.PI/6
    },
    
    
    update: function(dt) {
        let randomX = Math.random();
        let randomY = Math.random();
        this.angle += 0.01
        
        let change_direction = Math.random();
        this._super(game.Human, "update", [dt]);
        if (change_direction <= 0.03) {
            this.angle = this.angle - Math.PI/8
            //this.angle = -Math.PI * Math.random()
            //this.velocity = new me.Vector2d(randomX, randomY).normalize().scale(game.parameters.maxVelocity)
        }
       // else if (change_direction >= 0.97) {
       //     this.angle = Math.PI * Math.random()
       // }
        this.velocity = new me.Vector2d(Math.cos(this.angle), Math.sin(this.angle)).normalize().scale(game.parameters.maxVelocity)
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
        this.velocity = new me.Vector2d(velX, velY).normalize().scale(game.parameters.maxVelocity);
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
