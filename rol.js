document.addEventListener('DOMContentLoaded', function () {
    const inputNum = document.querySelector('.num'),
        btnAdd = document.querySelector('.add-num'),
        exibeAdd = document.querySelector('.numeros-add'),
        gerarRol = document.querySelector('.btn-table'),
        exibeinfo = document.querySelector('.output-form'),
        listaNum = [],
        grafico = document.querySelector('.grafico'),
        btnGraf = document.querySelector('.btn-graf'),
        btnClose = document.querySelector('.btn-close');

    let numeros = [];
    let frequencias = [];
    let chartInstance; // Para guardar a instância do gráfico e destruí-lo depois

    // Função para adicionar número à lista
    function addNum() {
        btnAdd.addEventListener('click', function () {
            const numValue = inputNum.value.trim(); // Verifica espaços em branco
            if (numValue !== '' && !isNaN(numValue)) {
                const num = Number(numValue); // Converte para número
                listaNum.push(num); // Adiciona à lista
                listaNum.sort((a, b) => a - b); // Ordena a lista automaticamente
                exibeAdd.innerHTML = `Números adicionados: ${listaNum.join(', ')}`; // Exibe a lista ordenada
                inputNum.value = ''; // Limpa o input
            } else {
                alert('Por favor, insira um número válido.');
            }
        });
    }

    // Função para gerar a tabela de frequência
    function geraTabelaFrequencia() {
        gerarRol.addEventListener('click', function () {
            if (listaNum.length > 0) {
                const frequencia = {}; // Objeto para armazenar frequência dos números

                // Conta a frequência de cada número
                listaNum.forEach(function (num) {
                    frequencia[num] = (frequencia[num] || 0) + 1;
                });

                // Exibe a tabela de frequência
                exibeinfo.innerHTML = ''; // Limpa qualquer informação anterior
                let tabelaHTML = '<table class="tabela-info"><tr><th>Número</th><th>Frequência</th></tr>';

                // Limpa os arrays para o gráfico
                numeros = [];
                frequencias = [];

                // Adiciona as linhas da tabela
                for (const num in frequencia) {
                    tabelaHTML += `<tr><td>${num}</td><td>${frequencia[num]}</td></tr>`;
                    numeros.push(num); // Prepara o dado para o gráfico
                    frequencias.push(frequencia[num]); // Prepara a frequência para o gráfico
                }

                tabelaHTML += '</table>';
                exibeinfo.innerHTML = tabelaHTML; // Insere a tabela no HTML
            } else {
                alert('Nenhum número foi adicionado.');
            }
        });
    }

    // Função para gerar o gráfico de barras com Chart.js
    function geraGrafico(numeros, frequencias) {
        const ctx = document.getElementById("frequenciaGrafico").getContext('2d');

        // Se já existir um gráfico, destrua antes de criar um novo
        if (chartInstance) {
            chartInstance.destroy();
        }

        chartInstance = new Chart(ctx, {
            type: 'bar', // Tipo de gráfico: barras
            data: {
                labels: numeros, // Números únicos
                datasets: [{
                    label: 'Frequência',
                    data: frequencias, // Frequência de cada número
                    backgroundColor: 'rgba(0, 123, 255, 0.6)',
                    borderColor: 'rgba(0, 123, 255, 1)',
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true // Eixo Y começa em zero
                    }
                }
            }
        });
    }

    // Mostra o gráfico quando o botão "Gerar Gráfico" é clicado
    btnGraf.addEventListener('click', function () {
        if (numeros.length > 0 && frequencias.length > 0) {
            grafico.showModal();
            geraGrafico(numeros, frequencias); // Gera o gráfico
        } else {
            alert('Nenhum dado disponível para gerar o gráfico. Gere a tabela primeiro.');
        }
    });

    // Fecha o gráfico quando o botão "Fechar" for clicado
    btnClose.addEventListener('click', function () {
        grafico.close();
    });

    // Chama as funções
    addNum();
    geraTabelaFrequencia();
});
