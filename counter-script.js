
let startCount = function (observerEntries, observer) { //callback для наблюдателя
  observerEntries.forEach((blockOn) => {
    if (blockOn.isIntersecting) {
      let maxCountValue = blockOn.target.innerHTML;
      blockOn.target.innerHTML = 0;
      blockOn.target.style.color = 'rgba(0, 0, 0, 1)';
      let delay = 0;
      let tick = 1;
      if (maxCountValue > 350) {
        tick = Math.trunc(maxCountValue / 360);
      } else {
        tick = 1;
        delay = 1750 / maxCountValue;
      }

      let intId = setInterval(function () {
        blockOn.target.innerHTML = +blockOn.target.innerHTML + tick;
      }, delay);

      setTimeout(function () {
        clearInterval(intId);
      }, 1500);

      for (let i = 4; i >= 0; i--) {
        setTimeout(function () {
          blockOn.target.innerHTML = maxCountValue - i;
        }, 1500 + 200 * (5 - i) + (4 - i) * 50);
      }

      observer.unobserve(blockOn.target); // выключаем наблюдателя для блока, закончившего счет

    }
  });
}

  let options = { //свойства наблюдателя
    threshold: 0.5,
  };

  let counterObserver = new IntersectionObserver(startCount, options); //создаем наблюдателя

  let counterBlocks = document.querySelectorAll('.block__up-text');

  counterBlocks.forEach((item) => {
    counterObserver.observe(item);   //подключаем наблюдателя
  });
