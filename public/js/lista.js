import { mostrarErro, mostrarSucesso } from './alerts.js'; 
         //enviar os valores pro sevidor da lista
        //query selector permite pegar um elemento da página para poder manipulá-lo (mudar texto, cor, esconder, etc.). 
        const formTarefa = document.querySelector('#form-tarefa');

        formTarefa.onsubmit = async (e) => {//define o que acontece ao enviar o formulário
            e.preventDefault();
            //seleciona o valor do input que vai ser a descriçãoda tarefa
            const descricao = document.querySelector('#input-tarefa').value;
            
            //envia os dados para o servidor atravez do fetch(requisição)
            const response = await fetch ('/api/criartarefas', {
                //configura a requisição
                method:'POST',//metodo de enviar
                headers:{'Content-Type': 'application/json'},//diz que vai enviar em json
                body:JSON.stringify({descricao:descricao})//converte o obj em json
            });
            if(response.ok){// se deu tudo certo faz...
                document.querySelector('#input-tarefa').value='';// limpa o campo
                mostrarSucesso('tarefa Criada com sucesso!');
                loadTasks();//recarega alista para mostrar a nova tarefa
            }
        };

        // Função que busca as tarefas no servidor
        async function loadTasks() {
            const response = await fetch('/api/tarefas');
            const tasks = await response.json();
            console.log("Tarefas vindas do banco:", tasks); 

        const listElement = document.getElementById('task-list');
        listElement.innerHTML = ''; // Limpa a lista antes de carregar

             //forEach() serve pra percorrer uma lista.
            tasks.forEach(tarefas => {
                const li = document.createElement('li');
                const span = document.createElement('span');
                span.textContent = `${tarefas.descricao_tarefa}`;

                    if(tarefas.status === 'concluido'){
                        span.style.textDecoration = 'line-through';
                        span.style.opacity = '0.6';
                    }
                    const btnConcluir = document.createElement('button');

                    btnConcluir.textContent =
                        tarefas.status === 'concluido'
                        ? 'Desmarcar'
                        : 'Concluir';

                    btnConcluir.classList.add('btn-check');

                    btnConcluir.onclick = async () => {

                    const novoStatus =
                        tarefas.status === 'pendente'
                        ? 'concluido'
                        : 'pendente';

                    await fetch(`/api/concluirTarefa/${tarefas.id}`,{
                        method:'PUT',
                        headers:{
                            'Content-Type':'application/json'
                        },
                        body:JSON.stringify({
                            status: novoStatus
                        })
                    });

                    loadTasks();
                };

               

                const btnContainer = document.createElement('div');

                //BOTÃO ALTERAR
                const btnAlterar = document.createElement('button');
                btnAlterar.textContent = 'Alterar';
                btnAlterar.classList.add('btn-edit');

                btnAlterar.onclick = async ()=>{
                    const novaDescricao = prompt('Editar tarefa:', tarefas.descricao_tarefa);

                    if (novaDescricao  && novaDescricao.trim() !== "") {
                        atualizarTarefa(tarefas.id, novaDescricao);
                        mostrarSucesso('tarefa alterada com sucesso!');
                    }else{
                        mostrarErro('Não foi possivel alterar!');
                    }
                };
                //BOTÃO DELETE
                const btnDelete = document.createElement('button');
                btnDelete.textContent = 'Excluir';
                btnDelete.classList.add('btn-delete');
                
                btnDelete.onclick = async ()=>{
                    await fetch(`/api/deletarTarefas/${tarefas.id}`,{method:'DELETE'});
                    mostrarSucesso('tarefa excluida com sucesso!');
                     loadTasks(); // recarrega a lista
                };
            btnContainer.appendChild(btnConcluir);
            btnContainer.appendChild(btnDelete);
            btnContainer.appendChild(btnAlterar);
            li.appendChild(span);
            li.appendChild(btnContainer);
            listElement.appendChild(li);
            });
        }

        // Chama a função ao carregar a página
        window.onload = loadTasks;

//Função atualiza dados
async function atualizarTarefa(id, novaDescricao) {
    const response = await fetch(`/api/alterarTarefas/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            descricao: novaDescricao
        })
    });

    if (response.ok) {
        loadTasks();
    } else {
        alert('Erro ao atualizar');
    }
}

