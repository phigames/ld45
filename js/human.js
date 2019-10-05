game.Human = me.Container.extend({
    init: function(hat, shirt, pants) {
        this._super(me.Container, "init", [0, 0]);
        this.anchorPoint = { x: 0, y: 0 };
        this.hat = hat;
        this.shirt = shirt;
        this.pants = pants;
        this.velocity = new me.Vector2d(0, 0);
        this.addChild(new me.Sprite(0, 0, { image: "naked_RAW", anchorPoint: { x: 0, y: 0 }}));
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
    },
    
    update: function(dt) {
        this._super(game.Human, "update", [dt]);
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
