export default(e, storeElement, handleElements) => {
    e.target.style.backgroundImage = 'url(src/images/white.png)';
    storeElement.style.backgroundImage = 'url(src/images/white.png)';
  
    e.target.removeEventListener('click', handleElements);
    storeElement.removeEventListener('click', handleElements);
};