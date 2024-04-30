(function () {
  var UIContainer = document.querySelector('#space-shooter-ui');
  var scoreContainer = document.querySelector('#space-shooter-score');
  var lifeContainer = document.querySelector('#space-shooter-life');
  var gameOverScoreContainer = document.querySelector('#game-over-score');

  var score = 0;
  var autoIncrementeScoreTimeout;
  function autoIncrementScore() {
    score += 1;
    scoreContainer.textContent = score.toString().split('').join(' ');
    autoIncrementeScoreTimeout = setTimeout(autoIncrementScore, 100);
  }

  window.addEventListener('game:space-shooter:change-life', function (e) {
    const value = e.detail.life
    var life = [];
    for (var i=0; i<value; i++) {
      life.push('♥');
    }
    lifeContainer.textContent = life.join(' ');
  });

  window.addEventListener('game:start', function () {
    clearTimeout(autoIncrementeScoreTimeout);
    score = 0;
  })

  window.addEventListener('game:end', function () {
    gameOverScoreContainer.textContent = score.toString();
    UIContainer.classList.add('hidden');
    clearTimeout(autoIncrementeScoreTimeout);
  })

  window.addEventListener('game:space-shooter:controls-enable', function () {
    clearTimeout(autoIncrementeScoreTimeout);
    UIContainer.classList.remove('hidden');
    autoIncrementScore()
  })
})();
