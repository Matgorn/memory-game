import startGame from './startGame';

export default (gameContainer) => {
    gameContainer.innerHTML = '';
    document.querySelector('h3').innerText = `Score: 0`;
  
    startGame();
};