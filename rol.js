document.addEventListener('DOMContentLoaded', function () {
    const inputNum = document.querySelector('.num'),
        btnAdd = document.querySelector('.add-num'),
        exibeAdd = document.querySelector('.numeros-add'),
        gerarRol = document.querySelector('.btn-submit'),
        exibeRol = document.querySelector('.tabela-rol'),
        listaNum = [];

    // Função para adicionar número à lista
    function addNum() {
        btnAdd.addEventListener('click', function () {
            const numValue = inputNum.value.trim(); // Verifica espaços em branco
            if (numValue !== '' && !isNaN(numValue)) {
                const num = Number(numValue); // Converte para número
                listaNum.push(num); // Adiciona à lista
                exibeAdd.innerHTML += `${num}, `; // Exibe o número com vírgula e espaço
                inputNum.value = ''; // Limpa o input
            } else {
                alert('Por favor, insira um número válido.');
            }
        });
    }

    // Função para gerar o ROL (lista ordenada)
    function gerarRolTabela() {
        gerarRol.addEventListener('click', function () {
            if (listaNum.length > 0) {
                const listaRol = listaNum.slice().sort((a, b) => a - b); // Ordena a lista
                exibeRol.innerHTML = ''; // Limpa a tabela anterior
                const maxLinhas = 20;
                const numColunas = Math.ceil(listaRol.length / maxLinhas); // Calcula o número de colunas

                // Gera as colunas da tabela
                let tabelaHTML = '<tr>'; // Começa a linha da tabela
                for (let i = 0; i < numColunas; i++) {
                    tabelaHTML += '<td><table>'; // Começa uma nova coluna

                    // Adiciona até 20 números por coluna
                    for (let j = 0; j < maxLinhas; j++) {
                        const index = i * maxLinhas + j;
                        if (index < listaRol.length) {
                            tabelaHTML += `<tr><td>${listaRol[index]}</td></tr>`;
                        } else {
                            break; // Para se não houver mais números
                        }
                    }

                    tabelaHTML += '</table></td>'; // Fecha a coluna
                }
                tabelaHTML += '</tr>'; // Fecha a linha da tabela principal
                exibeRol.innerHTML = tabelaHTML; // Insere a tabela no HTML
            } else {
                alert('Nenhum número foi adicionado.');
            }
        });
    }

    // Chama as funções
    addNum();
    gerarRolTabela();
});
