async function loadCatFact() {
    try {
      const response = await fetch('https://catfact.ninja/fact');
      const data = await response.json();
      document.getElementById('catFact').textContent = data.fact;
    } catch (error) {
      document.getElementById('catFact').textContent = "Faktu nevarēja ielādēt. Mēģini vēlreiz!";
    }
  }

  document.getElementById('quizForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const answers = {
      q1: "1991-1997",
      q2: "25",
      q3: "Golf VII",
      q4: "Japānā",
      q5: "Volkswagen",
      q6: "4,3 sekundes",
      q7: "400 zirgspēki"
    };
    const userAnswers = {};
    for (let key in answers) {
      const selected = document.querySelector('input[name="'+key+'"]:checked');
      userAnswers[key] = selected ? selected.value : "";
    }
    let score = 0;
    for (let key in answers) {
      if(userAnswers[key].toLowerCase() === answers[key].toLowerCase()){
        score++;
      }
    }
    const username = document.getElementById('username').value.trim();
    document.getElementById('quizResult').textContent =
      username + ", Tu atbildēji pareizi uz " + score + " no 7 jautājumiem.";
    const quizResult = { name: username, score: score };
    localStorage.setItem('quizResult', JSON.stringify(quizResult));
  });
  
  let currentSlide = 0;
  const slides = document.querySelectorAll('.slider .slide');
  
  function showSlide(index) {
    if (index < 0) {
      index = slides.length - 1;
    } else if (index >= slides.length) {
      index = 0;
    }
    slides.forEach((slide, i) => {
      slide.classList.toggle('active', i === index);
    });
    currentSlide = index;
  }
  
  document.querySelector('.slider .prev').addEventListener('click', function() {
    showSlide(currentSlide - 1);
  });
  document.querySelector('.slider .next').addEventListener('click', function() {
    showSlide(currentSlide + 1);
  });
  
  document.addEventListener('keydown', function(e) {
    if (e.key === 'ArrowRight') {
      showSlide(currentSlide + 1);
    } else if (e.key === 'ArrowLeft') {
      showSlide(currentSlide - 1);
    }
  });
  
  window.addEventListener('load', function() {
    loadCatFact();
  });