import restartGame from './restartGame';

export default(gameContainer) => {
    gameContainer.innerHTML = `
      <h1>You win!</h1>
      <button>Start Again</button>
    `;
    document.querySelector('button').addEventListener('click', restartGame);
};