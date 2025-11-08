async function loadData() {
  try {
    const response = await fetch('data.json');
    const data = await response.json();
    displayCards(data.sources);
  } catch (error) {
    console.error("Erreur de chargement du JSON :", error);
  }
}

function displayCards(sources) {
  const container = document.getElementById('cards');
  container.innerHTML = '';

  sources.forEach(source => {
    const sourceEl = document.createElement('div');
    sourceEl.classList.add('card');

    const sourceTitle = document.createElement('h2');
    sourceTitle.textContent = source.name;
    sourceEl.appendChild(sourceTitle);

    const sourceDesc = document.createElement('p');
    sourceDesc.textContent = source.desc;
    sourceEl.appendChild(sourceDesc);

    // tags
    const tagContainer = document.createElement('div');
    source.tags.forEach(tag => {
      const span = document.createElement('span');
      span.classList.add('tag');
      span.textContent = tag;
      tagContainer.appendChild(span);
    });
    sourceEl.appendChild(tagContainer);

    // liens + appels à projets
    const list = document.createElement('ul');
    source.calls.forEach(call => {
      const item = document.createElement('li');
      item.innerHTML = `
        <p><strong>${call.title}</strong><br>
        <small>📅 Date limite : ${call.deadline}</small><br>
        <a href="${call.url}" target="_blank">Lien</a></p>
        <p>${call.note}</p>
      `;
      list.appendChild(item);
    });
    sourceEl.appendChild(list);

    container.appendChild(sourceEl);
  });
}

loadData();
