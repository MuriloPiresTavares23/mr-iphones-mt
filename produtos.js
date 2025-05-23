const produtos = [
  { nome: "iPhone 14 - Preto", whatsapp: "https://wa.me/5565998032449?text=Ol%C3%A1%2C%20tenho%20interesse%20no%20iPhone%2014%20Preto.%20Poderia%20me%20passar%20mais%20informa%C3%A7%C3%B5es%3F" },
  // Adicione mais produtos aqui no mesmo formato
];

const container = document.getElementById("catalogo-container");

produtos.forEach(produto => {
  const card = document.createElement("div");
  card.className = "card";
  card.innerHTML = `
    <h3>${produto.nome}</h3>
    <a class="btn" href="${produto.whatsapp}" target="_blank">Chamar no WhatsApp</a>
  `;
  container.appendChild(card);
});
