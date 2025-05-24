// Firebase Configuração
const firebaseConfig = {
  apiKey: "SUA_API_KEY",
  authDomain: "SEU_DOMINIO.firebaseapp.com",
  projectId: "SEU_PROJECT_ID",
  storageBucket: "SEU_BUCKET.appspot.com",
  messagingSenderId: "SEU_ID",
  appId: "SUA_APP_ID"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
const storage = firebase.storage();

// Adicionar Produto
function adicionarProduto() {
  const nome = document.getElementById('nome').value.trim();
  const descricao = document.getElementById('descricao').value.trim();
  const imagemInput = document.getElementById('imagem');
  const mensagem = document.getElementById('mensagem').value.trim();
  const categoria = document.getElementById('categoria').value;

  if (!nome || !descricao || !imagemInput.files[0] || !mensagem || !categoria) {
    alert("Preencha todos os campos.");
    return;
  }

  const imagemFile = imagemInput.files[0];
  const storageRef = storage.ref(`produtos/${Date.now()}_${imagemFile.name}`);
  const uploadTask = storageRef.put(imagemFile);

  uploadTask.then(snapshot => snapshot.ref.getDownloadURL())
    .then(url => {
      return db.collection("produtos").add({
        nome,
        descricao,
        imagem: url,
        mensagem,
        categoria
      });
    })
    .then(() => {
      alert("Produto adicionado com sucesso!");
      limparFormulario();
    })
    .catch(error => {
      console.error("Erro ao adicionar produto: ", error);
      alert("Erro ao adicionar produto.");
    });
}

function carregarProdutos(categoria = null, containerId = 'produtos-container') {
  const container = document.getElementById(containerId);
  container.innerHTML = "<p>Carregando produtos...</p>";

  let query = db.collection("produtos");
  if (categoria) query = query.where("categoria", "==", categoria);

  query.get().then(snapshot => {
    container.innerHTML = "";
    if (snapshot.empty) {
      container.innerHTML = "<p>Nenhum produto disponível.</p>";
      return;
    }

    snapshot.forEach(doc => {
      const p = doc.data();
      const div = document.createElement('div');
      div.className = 'product';
      div.innerHTML = `
        <img src="${p.imagem}" alt="${p.nome}">
        <h2>${p.nome}</h2>
        <p>${p.descricao}</p>
        <a class="whatsapp-btn" href="https://wa.me/5565998032449?text=${encodeURIComponent(p.mensagem)}" target="_blank">
          Falar no WhatsApp
        </a>
      `;
      container.appendChild(div);
    });
  });
}

function limparFormulario() {
  document.getElementById('nome').value = '';
  document.getElementById('descricao').value = '';
  document.getElementById('imagem').value = '';
  document.getElementById('mensagem').value = '';
  document.getElementById('categoria').value = 'iPhone';
  document.getElementById('preview').style.display = 'none';
}

function listarProdutos() {
  // Essa função pode ser implementada depois se você quiser gerenciar os produtos
}

