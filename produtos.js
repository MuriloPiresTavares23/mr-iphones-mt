
// Inicialização dos produtos
const produtos = JSON.parse(localStorage.getItem('produtos')) || [];

// Se estiver no painel administrativo
if (document.getElementById('formProduto')) {
  document.getElementById('formProduto').addEventListener('submit', function (e) {
    e.preventDefault();
    const nome = document.getElementById('nome').value;
    const preco = document.getElementById('preco').value;
    const imagem = document.getElementById('imagem').value;
    const whatsapp = document.getElementById('whatsapp').value;

    produtos.push({ nome, preco, imagem, whatsapp });
    localStorage.setItem('produtos', JSON.stringify(produtos));
    alert('Produto adicionado!');
    e.target.reset();
  });
}

// Se estiver na página de catálogo
const divProdutos = document.getElementById('produtos');
if (divProdutos) {
  produtos.forEach(prod => {
    const div = document.createElement('div');
    div.innerHTML = \`
      <h2>\${prod.nome}</h2>
      <img src="\${prod.imagem}" alt="\${prod.nome}" width="150"/>
      <p>Preço: \${prod.preco}</p>
      <a href="\${prod.whatsapp}" target="_blank">Comprar</a>
      <hr />
    \`;
    divProdutos.appendChild(div);
  });
}
