var juego= new Phaser.Game(370,550,Phaser.CANVAS,'area_juego');

var fondoJuego;
var nave;
var balas;
var tiempoBala=0;
var botonDisparo;
var cursores;
var puntos;
var txtPuntos;
var enemigos;
var sonido;
var explosion;
var estadoPrincipal={

	
	preload: function(){
		juego.load.image('fondo','img/space.png');
		juego.load.image('personaje','img/nave2.png');
		juego.load.image('laser','img/laser.png');
		juego.load.image('enemigo','img/robot.png');

	
              this.load.audio('sonido','musica/musica.mp3');
        this.load.audio('explosion','alien_9.wav');

	},

	create : function(){
		fondoJuego=juego.add.tileSprite(0,0,370,550,'fondo');
		
		
		nave=juego.add.sprite(juego.width/2,500,'personaje');
		juego.add.text(180,530,"Marlon Brian Ramírez Rueda",{font:"14px Arial", fill:"#AAF"});
		nave.anchor.setTo(0.5);

		cursores=juego.input.keyboard.createCursorKeys();
		botonDisparo=juego.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);

          puntos=0;

         	juego.add.text(20,9,"Puntos",{font:"14px Arial", fill:"#FF0"});
         	txtPuntos=juego.add.text(80,9,"0",{font:"14px Arial", fill:"#FF0"});


         	juego.physics.startSystem(Phaser.Physics.ARCADE);
    juego.physics.arcade.enable(nave);
     nave.body.collideWorldBounds=true;

		balas=juego.add.group();
		balas.enableBody=true;
		balas.physicsBodyType=Phaser.Physics.ARCADE;
		balas.createMultiple(300,'laser');
		balas.setAll('anchor.x',0.5);
		balas.setAll('anchor.y',1);
		balas.setAll('outOfBoundsKill',true);
		balas.setAll('checkWorlBounds',true);
		
            
		enemigos=juego.add.group();
		enemigos.enableBody=true;
		enemigos.physicsBodyType=Phaser.Physics.ARCADE;


		for(var y=0;y<6;y++){
          for(var x =0;x<7;x++){
          	var enemigo=enemigos.create(x*40,y*20,'enemigo');
          	enemigo.anchor.setTo(0.5);
          }

		}
	enemigos.x=50;
	enemigos.y=30;
	var animacion =juego.add.tween(enemigos).to({x:100},1000,Phaser.Easing.Linear.None,true,0,1000,true);

  



	},

	update : function(){
		fondoJuego.tilePosition.y+=1;

       if(cursores.right.isDown){
             nave.position.x+=3;
       } 
       else if (cursores.left.isDown){


       	nave.position.x-=3;
       }
  if(cursores.up.isDown){
            nave.position.y-=3;
        }

        if(cursores.down.isDown){
            nave.position.y+=3;
        }
     var bala;

     if(botonDisparo.isDown){

explosion = new Audio('alien_9.wav');
   explosion.currentTime = 0.2;
    explosion.playbackRate = 2.8;
    explosion.play();

     	
     	if (juego.time.now>tiempoBala) {
             bala=balas.getFirstExists(false);

     	}
     	if(bala){
     		bala.reset(nave.x,nave.y);
     		bala.body.velocity.y=-300;
     		tiempoBala=juego.time.now +100;

     	}
     }
     juego.physics.arcade.overlap(balas,enemigos,colision,null,this);

   }
};
function colision(bala,enemigo){
	var audio = new Audio('musica/musica.mp3');
    audio.currentTime = 0.2;
    audio.playbackRate = 2.8;
    audio.play();
	bala.kill();
	enemigo.kill();
	puntos++;
	txtPuntos.text=puntos;
	 
}



juego .state.add('principal',estadoPrincipal);
juego.state.start('principal');