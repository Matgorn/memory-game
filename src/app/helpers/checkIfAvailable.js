const checkIfAvailable = (handleLayout, images, imgTypesNum, gameContent, result) => {
    const rand = Math.floor(Math.random() * imgTypesNum);
  
    let setGame = handleLayout.find(el => el.name == images[rand]);
    if(setGame.count < 2) {
      setGame.count++;
      result.push(setGame.name);
    } else {
      checkIfAvailable(handleLayout, images, imgTypesNum, gameContent, result);
    }
};

export default checkIfAvailable;