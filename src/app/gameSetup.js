import checkIfAvailable from './helpers/checkIfAvailable';
import isGameCleared from './helpers/isGameCleared';
import clearMatched from './helpers/clearMatched';
import gameOver from './gameOver';

function gameSetup(...images) {
    const imgTypesNum = images.length;
    const gameContainer = document.querySelector('.container');
    const width = parseInt(window.getComputedStyle(gameContainer).width);
  
    let gameContent = new Array(imgTypesNum * 2);
    gameContent.fill(null);
  
    const result = [];
    let storeElement;
    let score = 0;
    const handleLayout = [];
  
    images.forEach(img => {
      handleLayout.push({
        name: img,
        count: 0
      });
    });
  
    gameContent.map(() => {        
      checkIfAvailable(handleLayout,images, imgTypesNum, gameContent, result);
    });
  
    const domContent = result.map(imgUrl => {
      return `
        <div 
          style="
            background-image:
              url(src/images/blank.png),
              url(${imgUrl});
              width: ${width / 4}px;
              heigth: ${width / 4}px;
          " 
          class="game-el"></div>
          `
    }).join('');
  
    gameContainer.innerHTML = domContent;
    const gameEls = document.querySelectorAll('.game-el');
    const gameTable = [...gameEls]
  
    gameEls.forEach(element => {
      element.addEventListener('click', handleElements);
    });
  
    function handleElements(e) {
      if(!storeElement) {
        storeElement = e.target;
        storeElement.style.backgroundImage = storeElement.style.backgroundImage.toString().split(',').reverse().join(',');
      } else {
        e.target.style.backgroundImage = e.target.style.backgroundImage.toString().split(',').reverse().join(',');
                    
        if(
          window.getComputedStyle(storeElement).backgroundImage == window.getComputedStyle(e.target).backgroundImage &&
          (storeElement.offsetLeft != e.target.offsetLeft ||
          storeElement.offsetTop != e.target.offsetTop)
        ) {
          score++;
          document.querySelector('h3').innerText = `Score: ${score}`;
  
          setTimeout(() => {
            clearMatched(e, storeElement, handleElements);
  
            if(isGameCleared(gameTable)) { gameOver(gameContainer) }
          }, 499);
        } 
        setTimeout(() => {
          e.target.style.backgroundImage = e.target.style.backgroundImage.toString().split(',').reverse().join(',');
          storeElement.style.backgroundImage = storeElement.style.backgroundImage.toString().split(',').reverse().join(',');
          storeElement = null;
        }, 500);
      }
    }
};

export default gameSetup;

