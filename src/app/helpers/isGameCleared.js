export default (gameTable) => {
    const result = gameTable.find(el => {
      return el.style.backgroundImage.includes('src/images/blank.png');
    });
    return !result;
};