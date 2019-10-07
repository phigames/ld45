var game = {
    onload: function() {
        if (!me.video.init(game.width, game.height, {
            wrapper : "screen",
            // TODO check webgl compatibility
            renderer : me.video.CANVAS,
            scale : "auto",
            scaleMethod : "fit",
            doubleBuffering : true
        })) {
            alert("Your browser does not support HTML5 Canvas");
            return;
        }

        me.audio.init("ogg");
        me.loader.preload(game.resources, this.onloaded.bind(this))
    },

    onloaded: function() {
        me.state.set(me.state.MENU, new game.TitleStage());
        me.state.set(me.state.PLAY, new game.PlayStage());
        me.state.set(me.state.USER, new game.TransitionStage());
        me.state.set(me.state.GAMEOVER, new game.GameOverStage());
        me.state.change(me.state.MENU);

        me.input.bindKey(me.input.KEY.LEFT, "left");
        me.input.bindKey(me.input.KEY.A, "left");
        me.input.bindKey(me.input.KEY.RIGHT, "right");
        me.input.bindKey(me.input.KEY.D, "right");
        me.input.bindKey(me.input.KEY.DOWN, "down");
        me.input.bindKey(me.input.KEY.S, "down");
        me.input.bindKey(me.input.KEY.UP, "up");
        me.input.bindKey(me.input.KEY.W, "up");
        me.input.bindKey(me.input.KEY.NUM1, "steal_hair", true);
        me.input.bindKey(me.input.KEY.NUM2, "steal_jacket", true);
        me.input.bindKey(me.input.KEY.NUM3, "steal_pants", true);
    },

    width: 420,
    height: 256,

    levels: [
        {
            targetOutfit: "banquier",
            targetOutfitProbability: 0.5,
            policemanWaveSize: 2,
            policeVelocity: 0.04,
        },
        {
            targetOutfit: "elvis",
            targetOutfitProbability: 0.4,
            policemanWaveSize: 2,
            policeVelocity: 0.05,
        },
        {
            targetOutfit: "skater",
            targetOutfitProbability: 0.4,
            policemanWaveSize: 3,
            policeVelocity: 0.06,
        },
        {
            targetOutfit: "cowboy",
            targetOutfitProbability: 0.3,
            policemanWaveSize: 4,
            policeVelocity: 0.06,
        },
        {
            targetOutfit: "barca",
            targetOutfitProbability: 0.3,
            policemanWaveSize: 5,
            policeVelocity: 0.06,
        },
        {
            targetOutfit: "swimmer",
            targetOutfitProbability: 0.3,
            policemanWaveSize: 5,
            policeVelocity: 0.07,
        },
        {
            targetOutfit: "wizard",
            targetOutfitProbability: 0.2,
            policemanWaveSize: 6,
            policeVelocity: 0.08,
        },
    ],

    parameters: {
        maxPlayerVelocity: 0.005,
        maxPedestrianVelocity: 0.002,
        collisionDistance: 20,
        levelTime: 60,
    },

}

function delay(duration, then) {
    new me.Tween(me.game.world).delay(duration).onComplete(then).start();
}

function flicker(object, times) {
    if (times <= 0) {
        return;
    }
    object.alpha = 0;
    delay(100, function() {
        object.alpha = 1;
        delay(100, function() {
            flicker(object, times - 1);
        });
    });
}
