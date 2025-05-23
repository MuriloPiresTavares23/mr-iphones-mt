function adicionarProduto() {
  const nome = document.getElementById('nome').value.trim();
  const descricao = document.getElementById('descricao').value.trim();
  const imagem = document.getElementById('imagem').files[0];
  const mensagem = document.getElementById('whatsapp').value.trim();

  if (!nome || !descricao || !imagem || !mensagem) {
    alert('Por favor, preencha todos os campos e selecione uma imagem.');
    return;
  }

  const leitor = new FileReader();
  leitor.onload = function (e) {
    const produto = {
      nome,
      descricao,
      imagem: e.target.result, // base64
      mensagem
    };

    let produtos = JSON.parse(localStorage.getItem('produtos')) || [];
    produtos.push(produto);
    localStorage.setItem('produtos', JSON.stringify(produtos));

    alert('Produto adicionado com sucesso!');
    window.location.reload();
  };

  leitor.readAsDataURL(imagem);
}
