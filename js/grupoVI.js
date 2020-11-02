(function(){
    //array que armazenará os objetos com src e id de 1 a 8
    var images = [];
	
    //imagem a ser exibida em caso de acerto
    var matchSign = document.querySelector("#match");
	
    //imagem de fim do jogo
    var modal = document.querySelector("#gameOver");
	
    //array que armazena as cartas viradas
    var flippedCards = [];
	
    //variável contadora de acertos. ao chegar em 8 o jogo termina
    var matches = 0;
	
    //estrutura de atribiução das imagens aos card
    for(var i = 0; i < 16; i++){
        //cria um objeto img com um src e um id
        var img = {
            src: "img/grupoVI/" + i + ".jpg",
            id: i%8
        };
		
        //inserir o objeto criado no array
        images.push(img);
    }
	
    //chama a função de inicialização do jogo
    startGame();
	
    //função de inicialização do jogo
    function startGame(){
        //zera o array de cartas viradas
        flippedCards = [];
		
        //zera o contador de acertos
        matches = 0;
		
        //embaralhamento do array de imagens
        images = randomSort(images);
		
        //lista de elementos div com as classes back e front
        var backFaces = document.getElementsByClassName("back");
        var frontFaces = document.getElementsByClassName("front");
		
        //posicionamento das cartas e adição do evento click
        for(var i = 0; i < 16; i++){
            //limpa as cartas marcadas
            backFaces[i].classList.remove("match","flipped");
            frontFaces[i].classList.remove("match","flipped");
			
            //posiciona as cartas no tabuleiro
            var card = document.querySelector("#card" + i);

            card.style.left = (i < 4) === 0 ? 0.3125 + "em" : 0.3125 + ((i % 8) * 10.4) + "em";
            card.style.left = (i >= 4 && i < 8 ) === 0 ? 0.3125 + "em" : 0.3125 + ((i % 4) * 10.4) + "em";
            card.style.left = (i >= 8 && i < 12 ) === 0 ? 0.3125 + "em" : 5 + ((i % 4) * 10.4) + "em";
            card.style.left = (i >= 12 && i < 16 ) === 0 ? 0.3125 + "em" : 0.3125 + ((i % 4) * 10.4) + "em";

            if(i/4 < 1) {
                card.style.top = 0.3125 + "em";
            }
            else if(i/4 >= 1 && i/4 < 2) {
                card.style.top = 15.625 + "em";
            }
            else if (i/4 >= 2 && i/4 < 3) {
                card.style.top = 31.25 + "em";
            }
            else {
                card.style.top = 46.875 + "em";
            }
            
			
            //adiciona às cartas o evento click chamando a função que vira as cartas
            card.addEventListener("click",flipCard,false);
			
            //adiciona as imagens às cartas
            frontFaces[i].style.background = "url('" + images[i].src + "')";
            frontFaces[i].style.backgroundSize = "100% 100%";
            frontFaces[i].setAttribute("id",images[i].id);
        }
		
        //joga a imagem de game over para o plano de fundo
        modal.style.zIndex = "-2";
		
        //remove o evento click da imagem de game over
        modal.removeEventListener('click',function(){
            startGame();
        },false);
    }//fim da função de inicialização do jogo
	
	
    //função que vira as cartas
    function flipCard(){
        //verifica se o número de cartas viradas é menor que 2
        if(flippedCards.length < 2){
            //pega as faces da carta clicada
            var faces = this.getElementsByClassName("face");
			
            //confere se a carta já está virada, impedindo que a mesma carta seja virada duas vezes
            if(faces[0].classList[2]){
                return;
            }
			
            //adiciona a classe fliped às faces da carta para que sejam viradas
            faces[0].classList.toggle("flipped");
            faces[1].classList.toggle("flipped");
			
            //adiciona a carta clicada ao array de cartas viradas
            flippedCards.push(this);
			
            //verifica se o número de cartas no array de cartas viradas é igual a 2
            if(flippedCards.length === 2){
                //compara o id das cartas viradas para ver se houve um acerto
                if(flippedCards[0].childNodes[3].id === flippedCards[1].childNodes[3].id){
                    //em caso de acerto adiciona a classe match a todas as faces das duas cartas presentes no array de cartas viradas
                    flippedCards[0].childNodes[1].classList.toggle("match");
                    flippedCards[0].childNodes[3].classList.toggle("match");
                    flippedCards[1].childNodes[1].classList.toggle("match");
                    flippedCards[1].childNodes[3].classList.toggle("match");
					
                    //chama a função que exibe a mensagem MATCH
                    matchCardsSign();
					
                    //limpa o array de cartas viradas
                    flippedCards = [];
					
                    //soma um ao contador de acertos
                    matches++;
					
                    //verifica se o contador de acertos chegou a 8
                    if(matches >= 8){
                        //caso haja 8 acertos, chama a função que finaliza o jogo
                        gameOver();
                    }
                } 
            } 
        } else {
            //em caso haver duas cartas no array de cartas viradas (terceiro click) remove a classe flipped das cartas no array de cartas viradas
            flippedCards[0].childNodes[1].classList.toggle("flipped");
            flippedCards[0].childNodes[3].classList.toggle("flipped");
            flippedCards[1].childNodes[1].classList.toggle("flipped");
            flippedCards[1].childNodes[3].classList.toggle("flipped");
			
            //limpa o array de cartas viradas
            flippedCards = [];
        }
    }
	
	
    //função que embaralha as cartas recebendo um array de cartas por parâmetro
    function randomSort(array){
        //cria um array vazio
        var newArray = [];
		
        //executa a estrutura enquanto o novo array não atingir o mesmo número de elementos do arrau passado por parâmetro
        while(newArray.length !== array.length){
            //cria uma variável i recebendo um número aleatório entre 0 e o número de elementos no array -1
            var i = Math.floor(Math.random()*array.length);
			
            //verifica se o elemento indicado pelo índice i já existe no array novo
            if(newArray.indexOf(array[i]) < 0){
                //caso não exista é inserido
                newArray.push(array[i]);
            }
        }
		
        //retorna o array novo, que possui os elementos do array passado por parâmetro embaralhados
        return newArray;
    }//fim da função que embaralha as cartas
	
	
    //função que gera o sinal de MATCH
    function matchCardsSign(){
        //joga a mensagem de MATCH para o primeiro plano
        matchSign.style.zIndex = "1";
		
        //deixa a mensagem transparente
        matchSign.style.opacity = "0";
		
        //move a mensagem para cima
        matchSign.style.top = "150px";
		
        //função executada após 1.5 segundo
        setTimeout(function(){
            //joga a mensagem de MATCH para o plano de fundo
            matchSign.style.zIndex = "-1";
			
            //remove a transparência da mansagem
            matchSign.style.opacity = "1";
			
            //move a mensagem para o centro da tela
            matchSign.style.top = "250px";
        },1500);
    }//fim da função que exibe mensagem de MATCH
	
    //função de fim do jogo
    function gameOver(){
        //joga a mensagem de fim do jogo para o plano da frente
        modal.style.zIndex = "99";
		
        //adiciona o evento click à imagem de game over
        modal.addEventListener('click',function(){
            //chama a função que reinicia o jogo
            startGame();
        },false);
    }
}());

//reiniciar

function GameControl (){

}

GameControl.createGame = function(){
    var builderCardGame =  new BuilderCardGame();
    cardGame = builderCardGame.doCardGame();
    cardGame.show();
}

// Função do accordion

var acc = document.getElementsByClassName("accordion");
var i;

for (i = 0; i < acc.length; i++) {
acc[i].addEventListener("click", function() {
    this.classList.toggle("active");
    var panel = this.nextElementSibling;
    if (panel.style.maxHeight) {
    panel.style.maxHeight = null;
    } else {
    panel.style.maxHeight = panel.scrollHeight + "px";
    } 
});
}