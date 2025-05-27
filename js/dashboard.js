// Variável global para controlar o tipo atual (tarefa ou evento)
let tipoAtual = '';

// Elementos do DOM
const modalSelecao = document.getElementById('modalSelecao');
const modalFormulario = document.getElementById('modalFormulario');
const tituloFormulario = document.getElementById('tituloFormulario');
const btnSalvar = document.getElementById('btnSalvar');
const camposTarefa = document.getElementById('camposTarefa');
const camposEvento = document.getElementById('camposEvento');
const formularioCadastro = document.getElementById('formularioCadastro');
const listaItens = document.getElementById('listaItens');

function abrirModal() {
  modalSelecao.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function fecharModal() {
  modalSelecao.classList.remove('active');
  document.body.style.overflow = 'auto';
}

function abrirFormulario(tipo) {
  tipoAtual = tipo;
  fecharModal();

  if (tipo === 'tarefa') {
    tituloFormulario.textContent = 'Nova Tarefa';
    btnSalvar.textContent = 'Salvar Tarefa';
    camposTarefa.classList.remove('hidden');
    camposEvento.classList.add('hidden');
  } else {
    tituloFormulario.textContent = 'Novo Evento';
    btnSalvar.textContent = 'Salvar Evento';
    camposEvento.classList.remove('hidden');
    camposTarefa.classList.add('hidden');
  }

  setTimeout(() => {
    modalFormulario.classList.add('active');
    document.body.style.overflow = 'hidden';
    document.getElementById('titulo').focus();
  }, 100);
}

function fecharFormulario() {
  modalFormulario.classList.remove('active');
  document.body.style.overflow = 'auto';

  setTimeout(() => {
    formularioCadastro.reset();
    limparValidacao();
  }, 300);
}

function limparValidacao() {
  const inputs = document.querySelectorAll('.form-input');
  inputs.forEach(input => input.classList.remove('erro'));
}

function mostrarErro(id, mensagem) {
  const campo = document.getElementById(id);
  campo.classList.add('erro');
  campo.placeholder = mensagem;
}

function validarFormulario() {
  const titulo = document.getElementById('titulo').value.trim();
  const data = document.getElementById('data').value;
  const hora = document.getElementById('hora').value;

  limparValidacao();
  let isValid = true;

  if (!titulo) {
    mostrarErro('titulo', 'Título é obrigatório');
    isValid = false;
  }

  if (!data) {
    mostrarErro('data', 'Data é obrigatória');
    isValid = false;
  }

  if (!hora) {
    mostrarErro('hora', 'Hora é obrigatória');
    isValid = false;
  }

  if (data && hora) {
    const dataHora = new Date(data + 'T' + hora);
    const agora = new Date();
    if (dataHora < agora) {
      mostrarErro('data', 'Data e hora não podem estar no passado');
      isValid = false;
    }
  }

  return isValid;
}

function coletarDadosFormulario() {
  return {
    tipo: tipoAtual,
    titulo: document.getElementById('titulo').value.trim(),
    data: document.getElementById('data').value,
    hora: document.getElementById('hora').value,
    prioridade: document.getElementById('prioridade')?.value || '',
    local: document.getElementById('local')?.value || '',
    descricao: document.getElementById('descricao').value.trim(),
  };
}

/* =========== */

function adicionarItemNoHTML(dados) {
  const item = document.createElement('div');
  item.classList.add('item');

  let innerHTML = `
    <h3>${dados.titulo}</h3>
    <p><strong>Data:</strong> ${dados.data}</p>
    <p><strong>Hora:</strong> ${dados.hora}</p>
  `;

  if (dados.tipo === 'tarefa') {
    innerHTML += `<p><strong>Prioridade:</strong> ${dados.prioridade}</p>`;
  } else if (dados.tipo === 'evento') {
    innerHTML += `<p><strong>Local:</strong> ${dados.local}</p>`;
  }

  if(dados.descricao){
    innerHTML += `<p><strong>Descrição:</strong> ${dados.descricao}</p>`;
  }

  item.innerHTML = innerHTML;
  listaItens.appendChild(item);
}

formularioCadastro.addEventListener('submit', function (e) {
  e.preventDefault();

  if (!validarFormulario()) return;

  const dados = coletarDadosFormulario();

  // Aqui pode salvar no backend, se existir. Por enquanto só mostra e adiciona.
  alert(`${dados.tipo === 'tarefa' ? 'Tarefa' : 'Evento'} salvo com sucesso!`);

  adicionarItemNoHTML(dados);
  fecharFormulario();
});