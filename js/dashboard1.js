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

// === Função para enviar tarefa ao backend === POST tarefas
async function enviarTarefa(dadosTarefa) {
    try {
        const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4MzVlYzgxMzY5MGM0YjUzNmY5ZTM1NyIsImVtYWlsIjoiaXNtYWVsQGdtYWlsLmNvbSIsImlhdCI6MTc0ODM3OTkwNSwiZXhwIjoxNzQ4MzgzNTA1fQ.0nD44TeC0fxlP6hVuUt9wfLX63ql0YJbXRNJ2I-EQgg";

        const response = await fetch("http://localhost:3000/tasks", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                authorization: token
            },
            body: JSON.stringify(dadosTarefa)
        });

        if (!response.ok) {
            const errorText = await response.text();
            console.error("Erro ao salvar tarefa:", response.status, errorText);
            alert("Erro ao salvar tarefa. Verifique os dados e tente novamente.");
            return;
        }

        const tarefaSalva = await response.json();
        console.log("Tarefa salva com sucesso:", tarefaSalva);

        fecharModalNovaTarefa("modalFormularioTarefa");
        carregarTarefas(); // Atualiza a lista

    } catch (error) {
        console.error("Erro ao salvar tarefa:", error);
        alert("Erro inesperado ao salvar tarefa.");
    }
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

async function obterDadosFormularioTarefa() {
    const title = document.getElementById('titulo').value.trim();
    const description = document.getElementById('descricao').value.trim();
    const dueDateInput = document.getElementById('dueDate').value;
    const priority = document.getElementById('prioridade').value;
    const status = document.getElementById('status').value;

    const categoriaSelect = document.getElementById('categoria');
    const categoryId = categoriaSelect.value;
    const type = categoriaSelect.options[categoriaSelect.selectedIndex].text;

    const dueDate = new Date(dueDateInput).toISOString();

    return {
        title,
        description,
        dueDate,
        priority,
        status,
        type,
        categoryId
    };
}

async function buscarCategoriaIdPorNome(name) {
    const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4MzVlYzgxMzY5MGM0YjUzNmY5ZTM1NyIsImVtYWlsIjoiaXNtYWVsQGdtYWlsLmNvbSIsImlhdCI6MTc0ODM3OTkwNSwiZXhwIjoxNzQ4MzgzNTA1fQ.0nD44TeC0fxlP6hVuUt9wfLX63ql0YJbXRNJ2I-EQgg"; 
    const resposta = await fetch('http://localhost:3000/categories', {
        headers: {
            'Authorization': token
        }
    });

    if (!resposta.ok) {
        console.error('Erro ao buscar categorias');
        return null;
    }

    const categorias = await resposta.json();
    const categoria = categorias.find(cat => cat.name === name); // ← aqui é name, como no backend

    if (!categoria) {
        console.error(`Categoria "${name}" não encontrada`);
        return null;
    }

    return categoria._id;
}

function obterDadosFormularioCategoria() {
  return {
        nome: document.getElementById('nomeCategoria').value.trim(),
        cor: document.getElementById('corCategoria').value
    };
}

// POST categorias
async function enviarCategoria(dados) {
    const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4MzVlYzgxMzY5MGM0YjUzNmY5ZTM1NyIsImVtYWlsIjoiaXNtYWVsQGdtYWlsLmNvbSIsImlhdCI6MTc0ODM3OTkwNSwiZXhwIjoxNzQ4MzgzNTA1fQ.0nD44TeC0fxlP6hVuUt9wfLX63ql0YJbXRNJ2I-EQgg";
    const resposta = await fetch('http://localhost:3000/categories', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'authorization': token
        },
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
        const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4MzVlYzgxMzY5MGM0YjUzNmY5ZTM1NyIsImVtYWlsIjoiaXNtYWVsQGdtYWlsLmNvbSIsImlhdCI6MTc0ODM3OTkwNSwiZXhwIjoxNzQ4MzgzNTA1fQ.0nD44TeC0fxlP6hVuUt9wfLX63ql0YJbXRNJ2I-EQgg";
        const resposta = await fetch('http://localhost:3000/categories', {
            headers: {
                'authorization': token 
            }
        });

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
        option.value = categoria._id; // Corrigido
        option.textContent = categoria.name; // Corrigido
        option.style.backgroundColor = categoria.color; // Corrigido
        select.appendChild(option);
    });
}

document.getElementById('formularioTarefa').addEventListener('submit', async function (e) {
    e.preventDefault();

    try {
        const dadosTarefa = await obterDadosFormularioTarefa();
        await enviarTarefa(dadosTarefa);
        alert('Tarefa cadastrada com sucesso!');
        // Aqui você pode fechar o modal ou atualizar a lista de tarefas
    } catch (erro) {
        console.error(erro);
        alert('Erro ao cadastrar tarefa. Verifique os dados e tente novamente.');
    }
});
