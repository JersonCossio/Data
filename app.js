const input = document.getElementById('buscador');
const resultados = document.getElementById('resultados');

let formadores = [];

const URL_CSV = 'https://raw.githubusercontent.com/JersonCossio/Data/main/formadores.csv'; // Usa tu CSV final

fetch(URL_CSV)
  .then(res => res.text())
  .then(csv => {
    formadores = parseCSV(csv);
  });

input.addEventListener('input', () => {
  const texto = input.value.toLowerCase();
  const encontrados = formadores.filter(f =>
    f.Nombre.toLowerCase().includes(texto)
  );
  mostrarResultados(encontrados);
});

function mostrarResultados(lista) {
  resultados.innerHTML = '';
  if (lista.length === 0) {
    resultados.innerHTML = '<p>No se encontraron coincidencias.</p>';
    return;
  }

  lista.forEach(f => {
    const div = document.createElement('div');
    div.innerHTML = `
      <h3>${f.Nombre}</h3>
      <p><strong>OS:</strong> ${f.OS}</p>
      <p><strong>DNI:</strong> ${f.DNI}</p>
      <p><strong>Coordinador:</strong> ${f.COORDINADOR}</p>
      <p><strong>Iniciales:</strong> ${f.INICIALES}</p>
      <p><strong>Dirección:</strong> ${f.DIRECCIÓN}</p>
      ${f.FOTO ? `<img src="https://raw.githubusercontent.com/JersonCossio/Data/main/${f.FOTO}" alt="Foto de ${f.Nombre}" width="150">` : ''}
    `;
    resultados.appendChild(div);
  });
}

function parseCSV(text) {
  const filas = text.trim().split('\n');
  const cabeceras = filas.shift().split(',');

  return filas.map(linea => {
    const valores = linea.split(',');
    const obj = {};
    cabeceras.forEach((cabecera, i) => {
      obj[cabecera.trim()] = valores[i]?.trim() || '';
    });
    return obj;
  });
}
