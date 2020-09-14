const canvas = document.getElementById("canvas");    // pegar o elemento "canvas" criado no html
const context = canvas.getContext("2d");   // definir o contexto (se é 2d ou 3d)
const size = 700;  // tamanho
const scale = 7;  // proporção
const resol = size / scale;  // resolução da tela

let cel; // definição da variável cel (celulas)

jogo();  // execução da função que faz a tela e o code "rodar"
rand_cel();  // execução da função p que as células nascam em lugares aleatórios
celulas();  // execução da função p desenhar as células

setInterval(regra, 50);anv  // taxa de atualização da tela e execução da função "regra"

function jogo() {     // função que faz a tela e o code "rodar"   
  canvas.width = size;  // comprimento da tela
  canvas.height = size;  // altura da tela
  context.scale(scale, scale);  // proporção da tela 
  context.fillStyle = "black";  // cor do preenchimento das células
  cel = cria_cel();  // definição do valor da variavel cel
}

function cria_cel() {  // função p criar células
  let arr = new Array(resol);  // criar uma matriz para a posição das células
  for (let x = 0; x < resol; x++) {  // percorrer a matriz pelas linhas
    let cols = new Array(resol);  //  criar as colunas
    for (let y = 0; y < resol; y++) { // percorrer a matriz pelas colunas
      cols[y] = false; // células são automaticamente definidas como "mortas"
    }
    arr[x] = cols;
  }
  return arr; // retorna toda a matriz com valores falsos
}

function rand_cel() {  // função p que as células nascam em lugares aleatórios
  for (let y = 0; y < resol; y++) {  //
    for (let x = 0; x < resol; x++) {  // percorrer a matriz
      if (Math.random() < 0.5) cel[x][y] = true;  // definir se a celula esta viva ou não
    }
  }
}

function celulas() {  // função p desenhar as células
  context.fillStyle = "#F13D3D"; // preenchimento do background 
  context.fillRect(0, 0, resol, resol); // preenchimento das celulas, uma por uma
  context.fillStyle = "black"; // cor das células
  for (let y = 0; y < resol; y++) {  // percorrer a matriz
    for (let x = 0; x < resol; x++) {  // 
      if (cel[x][y]) context.fillRect(x, y, 1, 1);  // preenchimento da celula[x][y], se viva, da cor especificada 
    }
  }
}

function regra() {  // função que determina quem vive ou morre :o
  let novacel = cria_cel();  // definição da variavel que determina se na prox geração ela estara viva
  for (let y = 0; y < resol; y++) {  // 
    for (let x = 0; x < resol; x++) {  // percorrer a matrix
      const vizi = conta_vizi(x, y); // definição da constante vizinhos 
      if (cel[x][y] && vizi >= 2 && vizi <= 3) novacel[x][y] = true; // se os vizinhos forem 2 ou 3, ela continua viva
      else if (!cel[x][y] && vizi === 3) novacel[x][y] = true;  // se a célula esta morta e tem 3 vizinhos, ela "revive"
    }
  }
  cel = novacel;
  celulas(); // desenhar as celulas da proxima geração
}

function conta_vizi(x, y) {  // contar os vizinhos
  let count = 0;  // variavel p definir quantos vizinhos a celula tem
  for (let yy = -1; yy < 2; yy++) {  // percorrer a matriz em um raio de 3x3
    for (let xx = -1; xx < 2; xx++) {  // 
      if (xx === 0 && yy === 0) continue;  // se a contagem esta na celula do meio, nao fazer nada 
      if (x + xx < 0 || x + xx > resol - 1) continue;  // se a contagem central esta na borda (ultima casa da matrix), nao fazer nada
      if (y + yy < 0 || y + yy > resol - 1) continue;  // 
      if (cel[x + xx][y + yy]) count++; // contar se a celula em x, y estiver viva e for vizinha 
    }
  }
  return count; // retornar o numero de vizinhos da celula
}