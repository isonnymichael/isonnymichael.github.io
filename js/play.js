var ScenePlay = new Phaser.Class({
    Extends: Phaser.Scene,

    initialize:

    // Constructor
    function ScenePlay()
    {
        // Membuat Scene Baru
        Phaser.Scene.call(this,{key:'sceneplay'});
    },

    preload: function()
    {
        this.load.image('BG','assets/BG.png');
        this.load.image('FG','assets/FG.png');
        this.load.image('FG_Awal','assets/FG_Awal.png');
        this.load.image('Play','assets/Button_Play.png');

        this.load.image('Chara','assets/Chara.png');
        this.load.image('Peluru','assets/Peluru.png');

        this.load.image('PanelNilai','assets/Panel_Nilai.png');

        this.load.image('particle_blue','assets/particle_blue.png');

        this.score = 0;

        this.isGameRunning = false;
        this.backgrounds = [];

        this.timer_halangan = 0;
        this.halangan = [];

        this.highscore = localStorage["highscore"] || 0;

    },

    startGame: function()
    {
        this.tweens.add({
            targets: this.FG_Awal,
            ease: "Power1",
            duration: 200,
            alpha: 0
        });

        this.tweens.add({
            targets: this.BPlay,
            ease:'Back.easeIn',
            duration: 125,
            scaleX:0,
            scaleY:0
        });

        this.isGameRunning = true;

        this.chara.setPosition(130, 768/2);
        this.chara.setVisible(true);
        this.chara.setScale(1);

        this.trail.setVisible(true);

        this.score = 0;
        this.label_score.setText(this.score);
    },

    finishGame:function()
    {
        this.tweens.add({
            targets: this.FG_Awal,
            ease: "Power1",
            duration: 200,
            alpha: 1
        });

        this.tweens.add({
            targets: this.BPlay,
            ease:'Back',
            duration:1000,
            scaleX:1,
            scaleY:1
        });

        this.chara.setVisible(false);

        this.trail.setVisible(false);

        for (let i = 0; i < this.halangan.length; i++) {
           this.halangan[i].destroy();
        }

        this.halangan.splice(0, this.halangan.length);

        if(this.score > this.highscore)
        {
            // Simpan ke local storage
            this.highscore = this.score;
            localStorage["highscore"] = this.highscore;
        }

        this.label_score.setText("Highscore : "+this.highscore);
        
    },

    onObjectClick: function(pointer, gameObject)
    {
        console.log('Object Click');
    },

    onObjectOver: function(pointer, gameObject)
    {
        console.log('Object Over');
    },

    onObjectOut: function(pointer, gameObject)
    {
        console.log('Object Out');
    },
    
    onObjectClickEnd: function(pointer, gameObject)
    {
        console.log('Object End Click');

        if(!this.isGameRunning && gameObject == this.BPlay)
        {
            this.startGame();
        }
    },

    onPointerUp: function(pointer, currentlyOver)
    {
        console.log('Mouse Up');
        // fungsi di startGame jangan lupa di set dulu
        // supaya animasi char terpanggil
        if(!this.isGameRunning) return;

        this.charaTweens = this.tweens.add({
            targets: this.chara,
            ease: 'Power1',
            duration: 750,
            y: this.chara.y + 200
        })
    },

    startInputEvents: function()
    {
        this.input.on('pointerup', this.onPointerUp, this);

        this.input.on('gameobjectdown', this.onObjectClick, this);
        this.input.on('gameobjectup', this.onObjectClickEnd, this);
        this.input.on('gameobjectover', this.onObjectOver, this);
        this.input.on('gameobjectout', this.onObjectOut, this);
        
    },

    create:function()
    {
        this.time.delayedCall(0,this.startInputEvents,[],this);

        this.panel_score = this.add.image(1166, 60, 'PanelNilai');
        this.panel_score.setOrigin(0.5);    
        this.panel_score.setDepth(11);
        this.panel_score.setAlpha(0.8);

        this.label_score = this.add.text(this.panel_score.x + 25, this.panel_score.y, this.score);
        this.label_score.setOrigin(0.5);
        this.label_score.setDepth(11);
        this.label_score.setFontSize(30);
        this.label_score.setTint(0xff732e);

        this.label_score.setText("Highscore : "+this.highscore);
        
        var bg_x = 1366/2;

        for (let i = 0; i < 2; i++) {
            var bg_awal = [];
            
            // Membuat Background dan Foreground
            var BG = this.add.image(bg_x, 768/2,'BG');
            var FG = this.add.image(bg_x, 768/2,'FG');

            // Menambahkan Custom Data
            BG.setData('kecepatan',2);
            FG.setData('kecepatan',2);
            FG.setDepth(2);

            // Memasukan Background dan Foreground ke dalam Array baru
            bg_awal.push(BG);
            bg_awal.push(FG);

            this.backgrounds.push(bg_awal);

            bg_x += 1366;
        }

        this.FG_Awal = this.add.image(1366/2,768/2,'FG_Awal');
        this.FG_Awal.setDepth(10);

        this.BPlay = this.add.image(1366/2,768/2 + 75,'Play');
        this.BPlay.setDepth(10);

        this.BPlay.setScale(0);

        this.tweens.add({
            targets: this.BPlay,
            ease: 'Back',
            duration: 1000,
            scaleX: 1,
            scaleY: 1
        });

        this.BPlay.setInteractive();

        this.chara = this.add.image(130, 768/2,'Chara');
        this.chara.setDepth(3);

        this.trail = this.add.particles('particle_blue');

        this.trailEmitter = this.trail.createEmitter({
            x : -20,
            y : 100,
            angle : {min : 0, max : 360},
            scale : {start : 1, end : 0},
            blendMode: 'SCREEN',
            lifespan : 400,
            speed : 100,
            on: true,
            follow: this.chara,
            tint: 0xff1d00
        });

        this.trailEmitter.emitParticle(16);
        this.trail.setDepth(4);

        this.trail.setVisible(false);

        this.chara.setVisible(false);
    },

    update: function(time, delta)
    {
        if(this.isGameRunning)
        {
            this.chara.y -= 5;

            if(this.chara.y > 690)
            {
                this.chara.y = 690;
            }

            // Backgrounds
            for (let i = 0; i < this.backgrounds.length; i++) {
                
                // Mengakses Array di dalam array
                for (let j = 0; j < this.backgrounds[i].length; j++) {

                    // Mengambil data kecepatan, kemudian mengurangi nilai x sebanyak kecepatan tsb.
                    this.backgrounds[i][j].x -= this.backgrounds[i][j].getData('kecepatan');

                    if(this.backgrounds[i][j].x <= -(1366/2))
                    {
                        // Selisih posisi background dengan posisi tengah
                        var diff = this.backgrounds[i][j].x + (1366/2);

                        // Atur ulang posisi ke sebelah kanan canvas di tambah selisih
                        this.backgrounds[i][j].x = 1366 + 1366 /2 + diff;
                    }
                    
                }                

            }

            // Create Obstacles
            if(this.timer_halangan == 0)
            {
                var acak_y = Math.floor((Math.random() * 680) + 60);

                // Membuat peluru
                var peluru = this.add.image(1500, acak_y, 'Peluru');

                // Mengubah titik posisi di sebelah kiri
                peluru.setOrigin(0.0);
                peluru.setData("status_aktif", true);
                peluru.setData("kecepatan",Math.floor((Math.random() * 15)+10));
                peluru.setDepth(5);

                this.halangan.push(peluru);

                this.timer_halangan = Math.floor((Math.random()*50)+10);
            }

            // Move Obsctacle
            for (let i = this.halangan.length -1; i >= 0 ; i--) {
                this.halangan[i].x -= this.halangan[i].getData("kecepatan");

                if(this.halangan[i].x < -200)
                {
                    this.halangan[i].destroy();
                    this.halangan.splice(i,1);
                }
                
            }

            // Score
            for (let i = this.halangan.length -1; i >= 0 ; i--) {
                
                if(this.chara.x > this.halangan[i].x + 50 && this.halangan[i].getData("status_aktif") == true)
                {
                    this.halangan[i].setData('status_aktif',false);

                    this.score++;

                    this.label_score.setText(this.score);
                }
                
            }

            // Collisions
            for (let i = this.halangan.length -1; i >= 0 ; i--) {
                
                if(this.chara.getBounds().contains(this.halangan[i].x,this.halangan[i].y))
                {
                    this.halangan[i].setData("status_aktif",false);

                    this.charaTweens.stop();

                    this.isGameRunning = false;

                    var myScene = this;

                    this.charaTweens = this.tweens.add({
                        targets: this.chara,
                        ease:'Power1',
                        duration: 2000,
                        scaleX: 3,
                        scaleY: 0,
                        onCompleteParams: [myScene],
                        onComplete: function(){myScene.finishGame();}
                    });
                }
                
            }

            if(this.chara.y < -50)
            {
                this.isGameRunning = false;

                var myScene = this;

                this.charaTweens = this.tweens.add({
                    targets: this.chara,
                    ease:'Power1',
                    duration: 2000,
                    scaleX: 3,
                    scaleY: 0,
                    onCompleteParams: [myScene],
                    onComplete: function(){myScene.finishGame();}
                });
            }

            this.timer_halangan--;
        }
    }
});



var config = {
    type: Phaser.AUTO,
    parent: 'game',
    width: 1366,
    height:768,
	audio: {
        disableWebAudio: true
    },
    scene:[ScenePlay],
    callbacks:{
        postBoot: function(game){
            game.canvas.style.width = '100%';
            game.canvas.style.height = '100%';
        }
    }
};

var game = new Phaser.Game(config);