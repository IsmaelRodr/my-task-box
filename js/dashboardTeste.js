document.addEventListener('DOMContentLoaded', () => {
    const tarefaExemplo = {
        titulo: "Estudar JS",
        data: "2025-06-01",
        hora: "14:00",
        prioridade: "alta",
        categoria: "Estudos",
        descricao: "Revisar funções, eventos e manipulação de DOM"
    };

    adicionarNaLista(tarefaExemplo);
    // inicializarEventos();
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

// === Função para enviar tarefa ao backend ===
/*async function enviarTarefa(dados) {
    const resposta = await fetch('/api/tarefas', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dados)
    });

    if (!resposta.ok) {
        throw new Error('Erro ao salvar tarefa no servidor.');
    }

    return await resposta.json(); // tarefa salva com sucesso
}*/

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
/* function inicializarEventos() {
    const botaoTarefa = document.querySelector('.modal .tarefa');
    const form = document.getElementById('formularioCadastro');

    if (botaoTarefa) {
        botaoTarefa.addEventListener('click', () => {
            fecharModal('modalSelecao');
            abrirModal('modalFormulario');
        });
    }

    if (form) {
        form.addEventListener('submit', async (event) => {
            event.preventDefault();
            const dados = obterDadosFormulario();

            try {
                const novaTarefa = await enviarTarefa(dados);
                adicionarNaLista(novaTarefa);
                form.reset();
                fecharModal('modalFormulario');
            } catch (erro) {
                console.error(erro);
                alert('Erro ao salvar tarefa. Tente novamente.');
            }
        });
    }

    // Cancelar botão
    const btnCancelar = document.querySelector('.btn-cancelar');
    if (btnCancelar) {
        btnCancelar.addEventListener('click', () => fecharModal('modalFormulario'));
    }

    // Eventos para fechar clicando fora
    fecharAoClicarFora('modalSelecao');
    fecharAoClicarFora('modalFormulario');
} */