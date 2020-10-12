function startGame(...images) {
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
            url(images/blank.png),
            url(${imgUrl});
            width: ${width / 4}px;
            heigth: ${width / 4}px;
        " 
        class="game-el"></div>
        `
  }).join('');

  gameContainer.innerHTML = domContent;
    const gameEls = document.querySelectorAll('.game-el');
    const h = [...gameEls]

      gameEls.forEach(element => {
        element.addEventListener('click', function handleElements(e){
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
                e.target.style.backgroundImage = 'url(images/white.png)';
                storeElement.style.backgroundImage = 'url(images/white.png)';
                e.target.removeEventListener('click', handleElements);
                storeElement.removeEventListener('click', handleElements);

                if(!h.find(el => {
                  return el.style.backgroundImage.includes('blank.png');
                })) {
                  gameContainer.innerHTML = `
                    <h1>You win!</h1>
                    <button>Start Again</button>
                  `;
                  document.querySelector('button').addEventListener('click', () => {
                  gameContainer.innerHTML = '';
                  document.querySelector('h3').innerText = `Score: 0`;
                  startGame(
                    'images/cheeseburger.png',
                    'images/fries.png',
                    'images/hotdog.png',
                    'images/ice-cream.png',
                    'images/milkshake.png',
                    'images/pizza.png'
                  );  
                  });
                }
              }, 499);
            } 
            setTimeout(() => {

              e.target.style.backgroundImage = e.target.style.backgroundImage.toString().split(',').reverse().join(',');
              storeElement.style.backgroundImage = storeElement.style.backgroundImage.toString().split(',').reverse().join(',');
              storeElement = null;
            }, 500);
          }
        });
      });
}

function checkIfAvailable(handleLayout, images, imgTypesNum, gameContent, result) {
  const rand = Math.floor(Math.random() * imgTypesNum);

  let setGame = handleLayout.find(el => el.name == images[rand]);
  if(setGame.count < 2) {
    setGame.count++;
    result.push(setGame.name);
  } else {
    checkIfAvailable(handleLayout, images, imgTypesNum, gameContent, result);
  }
};

startGame(
    'images/cheeseburger.png',
    'images/fries.png',
    'images/hotdog.png',
    'images/ice-cream.png',
    'images/milkshake.png',
    'images/pizza.png'
);
