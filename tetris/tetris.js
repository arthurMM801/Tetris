const I = [
	[
		[0, 0, 0, 0],
		[1, 1, 1, 1],
		[0, 0, 0, 0],
		[0, 0, 0, 0],
	],
	[
		[0, 0, 1, 0],
		[0, 0, 1, 0],
		[0, 0, 1, 0],
		[0, 0, 1, 0],
	],
	[
		[0, 0, 0, 0],
		[0, 0, 0, 0],
		[1, 1, 1, 1],
		[0, 0, 0, 0],
	],
	[
		[0, 1, 0, 0],
		[0, 1, 0, 0],
		[0, 1, 0, 0],
		[0, 1, 0, 0],
	]
];

const J = [
	[
		[1, 0, 0],
		[1, 1, 1],
		[0, 0, 0]
	],
	[
		[0, 1, 1],
		[0, 1, 0],
		[0, 1, 0]
	],
	[
		[0, 0, 0],
		[1, 1, 1],
		[0, 0, 1]
	],
	[
		[0, 1, 0],
		[0, 1, 0],
		[1, 1, 0]
	]
];

const L = [
	[
		[0, 0, 1],
		[1, 1, 1],
		[0, 0, 0]
	],
	[
		[0, 1, 0],
		[0, 1, 0],
		[0, 1, 1]
	],
	[
		[0, 0, 0],
		[1, 1, 1],
		[1, 0, 0]
	],
	[
		[1, 1, 0],
		[0, 1, 0],
		[0, 1, 0]
	]
];

const O = [
	[
		[0, 0, 0, 0],
		[0, 1, 1, 0],
		[0, 1, 1, 0],
		[0, 0, 0, 0],
	]
];

const S = [
	[
		[0, 1, 1],
		[1, 1, 0],
		[0, 0, 0]
	],
	[
		[0, 1, 0],
		[0, 1, 1],
		[0, 0, 1]
	],
	[
		[0, 0, 0],
		[0, 1, 1],
		[1, 1, 0]
	],
	[
		[1, 0, 0],
		[1, 1, 0],
		[0, 1, 0]
	]
];

const T = [
	[
		[0, 1, 0],
		[1, 1, 1],
		[0, 0, 0]
	],
	[
		[0, 1, 0],
		[0, 1, 1],
		[0, 1, 0]
	],
	[
		[0, 0, 0],
		[1, 1, 1],
		[0, 1, 0]
	],
	[
		[0, 1, 0],
		[1, 1, 0],
		[0, 1, 0]
	]
];

const Z = [
	[
		[1, 1, 0],
		[0, 1, 1],
		[0, 0, 0]
	],
	[
		[0, 0, 1],
		[0, 1, 1],
		[0, 1, 0]
	],
	[
		[0, 0, 0],
		[1, 1, 0],
		[0, 1, 1]
	],
	[
		[0, 1, 0],
		[1, 1, 0],
		[1, 0, 0]
	]
];
// cor das pecas em RGB
const PECAS = [
    [I, "rgb(58, 58, 221)",0],
    [J, "rgb(87, 87, 207)",0],
    [L, "rgb(173, 173, 51)",0],
    [O, "rgb(255, 255, 0)",0],
    [S, "rgb(42, 190, 42)",0],
    [T, "rgb(122, 20, 122)",0],
    [Z, "rgb(0, 255, 0)",0]
];



const LINHA = 20;
const COLUNA = 10;
const TAMANHO = 20;
const VAGO = "black";

var peca;
//peca.F vai armazenar os valores que indicam a proxima peca
var pecaF = [];
var tabuleiro = [];
var tabuleiroProx = [];

var inicioDescida;
var indice;


var tela = document.getElementById("tela");
var c = tela.getContext("2d");

var telaP = document.getElementById("proximasPecas");
var d = telaP.getContext("2d");

var line = document.getElementById("linhas");
var niv = document.getElementById("nivel");
var pont = document.getElementById("pontuacao");
var trocar = document.getElementById("trocar");

var rank = [];
var nivel = 1;
var linhas = 0;
var pontos = 0;
var speed = 1000;
var i = 0;
var aux = 0;

onkeydown = controlarPeca;

c.fillStyle="black";
c.fillText("click para comecar",50, 200, 100);


function comecar(){
	fimDeJogo = false
	
	linhas = 0;
	pontos = 0;
	nivel = 1;
	speed = 1000;
	aux = linhas;

	line.innerHTML = "linhas : " + linhas;
	niv.innerHTML = "nivel : " + nivel;
	pont.innerHTML = "pontos : " + pontos;
	

	c.clearRect(0, 0, 200, 400);
	d.clearRect(0, 0, 70, 140);

	iniciarTabuleiro();

	desenharTabuleiro();

	gerarPeca();
	gerarPeca();
	
	gerarPeca();
	
	gerarPeca();

	desenharProximaPeca();

    inicioDescida = Date.now();	

    descerPeca();
	
}
	

// Sub-rotinas (funções)

//usei o switch para as linhas completadas
function levelUP(){
	
	switch(linhas - aux){
		case 0:
			break;
		case 1:
			pontos += 100*nivel;
			break;
		case 2:
			pontos += 300*nivel;
			break;
		case 3:
			pontos += 500*nivel;
			break;
		case 4:
			pontos += 800*nivel;
			break;
	}

	if(linhas % 10 == 0 && aux != linhas){
		nivel++;
		speed -= 50;
	}
	aux = linhas
	line.innerHTML = "linhas : " + linhas;
	niv.innerHTML = "nivel : " + nivel;
	pont.innerHTML = "pontos : " + pontos;
}






function iniciarTabuleiro() {
	
	//tabuleiro das proximas pecas
	for (var i = 0; i < 14; i++) {
		
		tabuleiroProx[i] = [];
		
		for (var j = 0; j < 7; j++) {
			tabuleiroProx[i][j] = VAGO;
		}
	}	
	
	//tabuleiro real
	for (var i = 0; i < LINHA; i++) {
		
		tabuleiro[i] = [];
		
		for (var j = 0; j < COLUNA; j++) {
			tabuleiro[i][j] = VAGO;
		}
	}	

	//paredes do jogo
	/*
	for (var i = 0; i < LINHA; i++){
		for(var j = 0;j == 0 || j == 11; j += 11){
			tabuleiro[i][j] = OCUPADO;
		}
	}

	for(var i = 0; i == 0 || i == 21; i += 21){
		for (var j = 0; j < COLUNA;j++){
			tabuleiro[i][j] = OCUPADO;
		}
	}

	for (var i = 0; i < 16; i++){
		for(var j = 0;j == 0 || j == 8; j += 8){
			tabuleiroProx[i][j] = OCUPADO;
		}
	}

	for(var i = 0; i == 0 || i == 15; i += 15){
		for (var j = 0; j < 9;j++){
			tabuleiroProx[i][j] = OCUPADO;
		}
	}
	
	*/

}

function desenharTabuleiro(){
    for (var i = 0; i < LINHA; i++) {
        for (var j = 0; j < COLUNA; j++) {
            desenharQuadrado(j, i, tabuleiro[i][j], TAMANHO, c);
        }
    }
	//desenhar o tabuleiro de mostrar p  roximas pecas
	for (var i = 0; i < 14; i++) {
        for (var j = 0; j < 7; j++) {
            desenharQuadrado(j, i, tabuleiroProx[i][j], 10, d);
        }
    }
}

//parametro opção serve pra indicar em qual canvas o quadrado vai ser desenhado
function desenharQuadrado(x, y, cor, TAMANHO, opcao){
    opcao.fillStyle = cor;
    opcao.fillRect(x*TAMANHO, y*TAMANHO, TAMANHO, TAMANHO);

    opcao.strokeStyle = "gray";
    opcao.strokeRect(x*TAMANHO, y*TAMANHO, TAMANHO, TAMANHO);
}


function gerarPeca(){
    var r = Math.floor(Math.random() * PECAS.length);
	//armazenar em pecaF as 3 proximas pecas
	if(i < 4){
		pecaF[i] = r;
		i++;
		
	}else {
		PECAS[pecaF[0]][2]++;
		pecaF[0] = pecaF[1];
		pecaF[1] = pecaF[2];
		pecaF[2] = pecaF[3];
		pecaF[3] = r;
	}
		

	peca = {
			tetramino : PECAS[pecaF[0]][0],
			cor : PECAS[pecaF[0]][1],
			tetraminoN : 0,
			tetraminoAtivo : [[]],
			x : 3,
			y : -2
	}

	//parte da gambiarra de mostrar proximas peças
	proximaPeca = {
		tetramino : PECAS[pecaF[0]][0],
		cor : PECAS[pecaF[0]][1],
		tetraminoN : 0,
		tetraminoAtivo : [[]],
		x : 2,
		y : 2
	}


	peca.tetraminoAtivo = peca.tetramino[peca.tetraminoN];

}

//gambiarra para mostrar as proximas peças
function desenharProximaPeca() {
	
	for(var l = 1, p = 2; l < 4; l++,p += 4){

		proximaPeca.y = p;
		proximaPeca.tetramino = PECAS[pecaF[l]][0];
		proximaPeca.cor = PECAS[pecaF[l]][1];
		proximaPeca.tetraminoAtivo = proximaPeca.tetramino[proximaPeca.tetraminoN];
		
		for (var i = 0; i < proximaPeca.tetraminoAtivo.length; i++) {
			for (var j = 0; j < proximaPeca.tetraminoAtivo.length; j++) {
				if (proximaPeca.tetraminoAtivo[i][j]) {
					desenharQuadrado(proximaPeca.x + j, proximaPeca.y + i, proximaPeca.cor, 10, d);
				}
			}
		}
	}
}

function descerPeca(){
	document.getElementById("musica").play();
	var agora = Date.now();
	
	var delta = agora - inicioDescida;
	
	if (delta >= speed) {

		moverAbaixo();
		inicioDescida = Date.now();
		
	}		

	requestAnimationFrame(descerPeca);
}	
	


function moverAbaixo(){
    if (!colisao(0, 1, peca.tetraminoAtivo) ) {
		pont.innerHTML = "pontos : " + pontos;

        apagarPeca();
		desenharTabuleiro();
        peca.y++;
        desenharPeca();
		desenharProximaPeca();
    } else {
        travarPeca();		
        gerarPeca();
    }
    
}

function moverDireita(){
	
	if(peca.tetraminoAtivo != VAGO){
		if (!colisao(1, 0, peca.tetraminoAtivo)) {
			apagarPeca();
			peca.x++;
			desenharPeca();
		}
	}
}

function moverEsquerda(){
	if(peca.tetraminoAtivo != VAGO){
		if (!colisao(-1, 0, peca.tetraminoAtivo)) {
			apagarPeca();
			peca.x--;
			desenharPeca();
		}
	}
}


function colisao(x, y, p){
    for (var i = 0; i < p.length; i++) {
        for (var j = 0; j < p.length; j++) {
            if (!p[i][j]) {
                continue;
            }
			
            var novoX = peca.x + j + x;
            var novoY = peca.y + i + y;
			
            if (novoX < 0 || novoX >= COLUNA || novoY >= LINHA ) {
                return true;
            }
			
            if (novoY <= 0) {
                continue;
            }
			
            if (tabuleiro[novoY][novoX] != VAGO) {
                return true;
            }
        }
    }
	
    return false;
}

function apagarPeca(){
    preencherPeca(VAGO);
}

function desenharPeca(){
    preencherPeca(peca.cor);
}

function preencherPeca(cor) {
    for (var i = 0; i < peca.tetraminoAtivo.length; i++) {
        for (var j = 0; j < peca.tetraminoAtivo.length; j++) {
            if (peca.tetraminoAtivo[i][j]) {
                desenharQuadrado(peca.x + j, peca.y + i, cor, TAMANHO, c);
            }
        }
    }
}



var k = 0;
function travarPeca(){
	for (var i = 0; i < peca.tetraminoAtivo.length; i++) {
		for (var j = 0; j < peca.tetraminoAtivo.length; j++) {
			if (!peca.tetraminoAtivo[i][j]) {
				continue;
			}

			if (peca.y + i < 1) {
			
				fimDeJogo = true;

				var v = JSON.parse(localStorage.getItem("ranking"));
				rank = v;

				if(rank[4] != undefined){
					if(pontos > rank[4].pontuaçao){
						rank[4] = {
							nome: prompt("Nome:"),
							pontuaçao: pontos
						}
					}
				}else{
					for(let p = 0; p < 5; p++)
						if(rank[k] == undefined){
							rank[k] = {
								nome: prompt("Nome:"),
								pontuaçao: pontos
							}
							k++;
							break;
						}else{
							k++
					}
				}

				for(let i =1; i < rank.length;i++ ){
					for(let j = i;j > 0;j--)
						if(rank[j-1].pontuaçao < rank[j].pontuaçao){
							let temp = rank[j-1];
							rank[j-1] = rank[j];
							rank[j] = temp
						}
				}
			
				localStorage.setItem("ranking", JSON.stringify(rank));				

				estatisticas(0);

				v = JSON.parse(localStorage.getItem("ranking"));
				rank = v;

				for(let i = 0,p = 1 ; i < rank.length; i++, p+=2){
					
					d.fillStyle = "black";
					d.fillText(rank[i].nome +" = "+ rank[i].pontuaçao, 5, 10*p, 100);

				}

				break;
			}
			
			tabuleiro[peca.y+i][peca.x+j] = peca.cor;
		}
	}

	for (var i = 0; i < LINHA; i++) {
		var linhaCheia = true;
		
		for (var j = 0; j < COLUNA; j++) {
			linhaCheia = linhaCheia && (tabuleiro[i][j] != VAGO);
		}
		
		if (linhaCheia) {			
			linhas++;
			document.getElementById("line").play();
			for (var y = i; y > 0; y--) {
				for (var j = 0; j < COLUNA; j++) {
					tabuleiro[y][j] = tabuleiro[y-1][j];
				}
			}
			
			for (var j = 1; j < COLUNA; j++) {
				tabuleiro[0][j] = VAGO;
			}
			
		}
		
	}
	if(!fimDeJogo){
		levelUP();			
	}
}

//parecido com a função de preencherpeca
function estatisticas(p){
	c.clearRect(0, 0, 240, 560);
	d.clearRect(0, 0, 90, 160)
	

	for(var l = 0; l < 7; l++,p += 4){
		peca.y = p;
		peca.x = 2;
		peca.tetramino = PECAS[l][0];
		peca.cor = PECAS[l][1];
		peca.tetraminoAtivo = peca.tetramino[peca.tetraminoN];

		for (var i = 0; i < peca.tetraminoAtivo.length; i++) {
			for (var j = 0; j < peca.tetraminoAtivo.length; j++) {
				if (peca.tetraminoAtivo[i][j]) {
					desenharQuadrado(peca.x + j, peca.y + i, peca.cor, TAMANHO, c);
					c.fillStyle = "black";
					c.fillText(" =  " + PECAS[l][2] ,150 , 20*p+30);
				}
			}
		}
	}
}

//parametro d indica se vai pra esquerda ou direita

function rodarPeca(d){
    var proximoPadrao = peca.tetramino[(peca.tetraminoN + d) % peca.tetramino.length];
    var recuo = 0;
    
    if (colisao(0, 0, proximoPadrao)) {
        if (peca.x > COLUNA/2) {
            recuo = -1;
        } else {
            recuo = 1;
        }
    }
    
    if (!colisao(recuo, 0, proximoPadrao)) {
        apagarPeca();
        peca.x += recuo;
        peca.tetraminoN = (peca.tetraminoN + d) % peca.tetramino.length;
        peca.tetraminoAtivo = peca.tetramino[peca.tetraminoN];
        desenharPeca();
    }
}

function controlarPeca(evento){	
	
	if(!fimDeJogo){
		var tecla = evento.keyCode;		
	
		if (tecla == 37 || tecla == 65) {
			moverEsquerda();
			document.getElementById("selection").play();		
			inicioDescida = Date.now();
		} else if (tecla == 39 || tecla == 68) {
			moverDireita();
			document.getElementById("selection").play();	
			inicioDescida = Date.now();
		} else if (tecla == 40 || tecla == 83) {
			moverAbaixo();
			pontos ++
		}else if(tecla == 32){			
			document.getElementById("fall").play();
			
			while(!colisao(0, 1, peca.tetraminoAtivo)){
				moverAbaixo();
				pontos += 2
			}	
		}else if (tecla == 38 || tecla == 87) {
			rodarPeca(1);
				
			inicioDescida = Date.now();
		}
		else if(tecla == 90){
			rodarPeca(3);
				
			inicioDescida = Date.now();
		}
	}
}