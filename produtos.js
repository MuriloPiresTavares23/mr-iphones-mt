
// produtos.js
window.onload = function () {
  const container = document.getElementById('catalogo');
  if (!container) return;
  const produtos = JSON.parse(localStorage.getItem('produtos') || '[]');

  produtos.forEach(produto => {
    const el = document.createElement('div');
    el.className = 'produto';
    el.innerHTML = `
      <img src="${produto.imagem}" alt="${produto.nome}">
      <h2>${produto.nome}</h2>
      <p>Preço: ${produto.preco}</p>
      <a class="whatsapp" href="${produto.link}" target="_blank">Falar no WhatsApp</a>
    `;
    container.appendChild(el);
  });
};
