const init = () => {
  const loaderEl = document.getElementById('loader');
  const itemsEl = document.getElementById('items');

  loadAndRender({
    url: 'https://students.netoservices.ru/nestjs-backend/slow-get-courses',
    loaderEl,
    itemsEl,
  });
};

const loadAndRender = ({ url, loaderEl, itemsEl }) => {
  loaderEl.classList.add('loader_active');
  
  const cachedData = getCachedData();
  if (cachedData) {
    renderCurrenciesMarkup(itemsEl, cachedData);
  }
  
  fetchCurrencies(url).then(data => {
    const currencies = extractCurrenciesData(data);
    cacheData(data);
    renderCurrenciesMarkup(itemsEl, currencies);
    loaderEl.classList.remove('loader_active');
  });
};

const getCachedData = () => {
  const cache = localStorage.getItem('currencyData');
  if (!cache) return null;
  
  try {
    const data = JSON.parse(cache);
    return extractCurrenciesData(data);
  } catch {
    return null;
  }
};

const cacheData = (data) => {
  localStorage.setItem('currencyData', JSON.stringify(data));
};

const fetchCurrencies = (url) => {
  return new Promise((resolve) => {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', url);
    xhr.onload = () => {
      resolve(JSON.parse(xhr.responseText));
    };
    xhr.send();
  });
};

const extractCurrenciesData = (data) => {
  return data.response.Valute;
};

const renderCurrenciesMarkup = (container, currencies) => {
  container.innerHTML = '';
  
  for (const key in currencies) {
    const currency = currencies[key];
    const item = document.createElement('div');
    item.className = 'item';
    item.innerHTML = `
      <div class="item__code">${currency.CharCode}</div>
      <div class="item__value">${currency.Value.toFixed(4)}</div>
      <div class="item__currency">руб.</div>
    `;
    container.appendChild(item);
  }
};

document.addEventListener('DOMContentLoaded', init);