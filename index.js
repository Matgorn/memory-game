function startGame(...images) {
    const imgTypesNum = images.length;
    const gameContainer = document.querySelector('.container');
    const width = parseInt(window.getComputedStyle(gameContainer).width);
    let gameContent = new Array(imgTypesNum * 2);
    gameContent.fill(null);
    const result = [];

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
                    background-image: url(${imgUrl});
                    width: ${width / 4}px;
                    heigth: ${width / 4}px;
                " 
                class="game-el"></div>
        `
    }).join('');

    const gameEls = document.querySelectorAll('.game-el');
    gameEls.forEach(element => {
        element.addEventListener('click', () => {
            
        });
    });

    gameContainer.innerHTML = domContent;
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
}

startGame(
    'images/cheeseburger.png',
    'images/fries.png',
    'images/hotdog.png',
    'images/ice-cream.png',
    'images/milkshake.png',
    'images/pizza.png'
);
