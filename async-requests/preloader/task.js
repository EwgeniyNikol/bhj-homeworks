document.addEventListener('DOMContentLoaded', function() {
  const loader = document.getElementById('loader');
  const itemsContainer = document.getElementById('items');
  
  function displayCurrencies(valutes) {
    itemsContainer.innerHTML = '';
    
    for (const key in valutes) {
      const item = document.createElement('div');
      item.className = 'item';
      
      item.innerHTML = `
        <div class="item__code">${valutes[key].CharCode}</div>
        <div class="item__value">${valutes[key].Value.toFixed(4)}</div>
        <div class="item__currency">руб.</div>
      `;
      
      itemsContainer.appendChild(item);
    }
  }
  
  loader.classList.add('loader_active');
  
  const cachedData = localStorage.getItem('currencyData');
  if (cachedData) {
    const data = JSON.parse(cachedData);
    displayCurrencies(data.response.Valute);
    loader.classList.remove('loader_active');
  }
  
  const xhr = new XMLHttpRequest();
  xhr.open('GET', 'https://students.netoservices.ru/nestjs-backend/slow-get-courses');
  
  xhr.onload = function() {
    if (xhr.status === 200) {
      const data = JSON.parse(xhr.responseText);
      
      localStorage.setItem('currencyData', JSON.stringify(data));
      displayCurrencies(data.response.Valute);
    }
    
    loader.classList.remove('loader_active');
  };
  
  xhr.send();
});