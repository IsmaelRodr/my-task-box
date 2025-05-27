document.addEventListener('DOMContentLoaded', () => {
    inicializarEventos();
    carregarCategorias();
});

// === Funções de manipulação de modais ===
function abrirModal(id) {
    const modal = document.getElementById(id);
    if (modal) modal.style.display = 'flex';
}

function fecharModal(id) {
    const modal = document.getElementById(id);
    if (modal) modal.style.display = 'none';
}

function fecharAoClicarFora(modalId) {
    const modal = document.getElementById(modalId);
    window.addEventListener('click', function (event) {
        if (event.target === modal) {
            fecharModal(modalId);
        }
    });
}

// === Função para coletar dados do formulário ===
function obterDadosFormulario() {
    return {
        titulo: document.getElementById('titulo').value.trim(),
        data: document.getElementById('data').value,
        hora: document.getElementById('hora').value,
        prioridade: document.getElementById('prioridade').value,
        categoria: document.getElementById('categoria').value,
        descricao: document.getElementById('descricao').value.trim()
    };
}

// === Função para enviar tarefa ao backend === POST tarefas
async function enviarTarefa(dados) {
    const resposta = await fetch('/api/tarefas', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dados)
    });

    if (!resposta.ok) {
        throw new Error('Erro ao salvar tarefa no servidor.');
    }

    return await resposta.json(); // tarefa salva com sucesso
}

// === Função para adicionar item visualmente na interface ===
function adicionarNaLista(tarefa) {
    const listaItens = document.getElementById('listaItens');
    const item = document.createElement('div');
    item.classList.add('item-tarefa');
    item.innerHTML = `
        <h3>${tarefa.titulo}</h3>
        <p><strong>Data:</strong> ${tarefa.data}</p>
        <p><strong>Hora:</strong> ${tarefa.hora}</p>
        <p><strong>Prioridade:</strong> ${tarefa.prioridade}</p>
        <p><strong>Categoria:</strong> ${tarefa.categoria}</p>
        <p><strong>Descrição:</strong> ${tarefa.descricao || 'Sem descrição'}</p>
    `;
    listaItens.appendChild(item); // ou prepend() se quiser no topo
}

// === Função para inicializar os eventos ===
function inicializarEventos() {
    const botaoTarefa = document.querySelector('.modal .tarefa');
    const botaoCategoria = document.querySelector('.modal .categoria');

    if (botaoTarefa) {
    botaoTarefa.addEventListener('click', () => {
        fecharModal('modalSelecao');
        abrirModal('modalFormularioTarefa');
    });
    }

    if (botaoCategoria) {
    botaoCategoria.addEventListener('click', () => {
        fecharModal('modalSelecao');
        abrirModal('modalFormularioCategoria');
    });
    }

    // Formulário de tarefa
    const formTarefa = document.getElementById('formularioTarefa');
    if (formTarefa) {
        formTarefa.addEventListener('submit', async (e) => {
            e.preventDefault();
            const dados = obterDadosFormularioTarefa();
            try {
                const novaTarefa = await enviarTarefa(dados);
                adicionarNaLista(novaTarefa);
                formTarefa.reset();
                fecharModal('modalFormularioTarefa');
            } catch (erro) {
                alert('Erro ao salvar tarefa.');
            }
        });
    }

    // Formulário de categoria
    const formCategoria = document.getElementById('formularioCategoria');
    if (formCategoria) {
        formCategoria.addEventListener('submit', async (e) => {
            e.preventDefault();
            const dados = obterDadosFormularioCategoria();
            try {
                await enviarCategoria(dados);
                formCategoria.reset();
                fecharModal('modalFormularioCategoria');
                carregarCategorias(); // ← aqui atualiza o <select>
                alert('Categoria adicionada com sucesso!');
            } catch (erro) {
                alert('Erro ao salvar categoria.');
            }
        });
    }

    // Cancelar
    document.querySelectorAll('.btn-cancelar').forEach(btn => {
        btn.addEventListener('click', () => {
            fecharModal('modalFormularioTarefa');
            fecharModal('modalFormularioCategoria');
        });
    });

    fecharAoClicarFora('modalSelecao');
    fecharAoClicarFora('modalFormularioTarefa');
    fecharAoClicarFora('modalFormularioCategoria');
}

function obterDadosFormularioTarefa() {
    return {
        titulo: document.getElementById('titulo').value.trim(),
        data: document.getElementById('data').value,
        hora: document.getElementById('hora').value,
        prioridade: document.getElementById('prioridade').value,
        categoria: document.getElementById('categoria').value,
        descricao: document.getElementById('descricao').value.trim()
    };
}

function obterDadosFormularioCategoria() {
  return {
        nome: document.getElementById('nomeCategoria').value.trim(),
        cor: document.getElementById('corCategoria').value
    };
}

// POST categorias
async function enviarCategoria(dados) {
    const resposta = await fetch('/api/categorias', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dados)
    });

    if (!resposta.ok) {
        throw new Error('Erro ao salvar categoria');
    }

    return await resposta.json();
}


// GET categorias
async function carregarCategorias() {
    try {
        const resposta = await fetch('/api/categorias');
        if (!resposta.ok) throw new Error('Erro ao buscar categorias');

        const categorias = await resposta.json();
        popularSelectCategorias(categorias);
    } catch (erro) {
        console.error(erro);
        alert('Erro ao carregar categorias.');
    }
}

function popularSelectCategorias(categorias) {
    const select = document.getElementById('categoria');
    select.innerHTML = ''; // limpa antes de adicionar

    categorias.forEach(categoria => {
        const option = document.createElement('option');
        option.value = categoria.id;
        option.textContent = categoria.nome;
        option.style.backgroundColor = categoria.cor; // opcional
        select.appendChild(option);
    });
}

