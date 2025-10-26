const API_URL = 'http://localhost:8001/src/api.php'; 
const tabButtons = document.querySelectorAll('.tab-button');
const tabContents = document.querySelectorAll('.tab-content');
const feedbackDiv = document.getElementById('feedback');

// Formulários e Elementos de Configuração
const configForm = document.getElementById('configForm');
const bancoSelect = document.getElementById('banco_id');

// Formulários e Elementos de Emissão
const boletoForm = document.getElementById('boletoForm');
const boletoResultArea = document.getElementById('boletoResultArea');
const boletoHtmlContainer = document.getElementById('boleto-html-container');
const generatePdfBtn = document.getElementById('generatePdfBtn');

// --- Funções de UX e Feedback ---

function displayFeedback(message, type = 'info') {
    feedbackDiv.textContent = message;
    feedbackDiv.classList.remove('hidden', 'bg-red-100', 'bg-green-100', 'text-red-700', 'text-green-700', 'bg-blue-100', 'text-blue-700');
    
    if (type === 'error') {
        feedbackDiv.classList.add('bg-red-100', 'text-red-700');
    } else if (type === 'success') {
        feedbackDiv.classList.add('bg-green-100', 'text-green-700');
    } else {
         feedbackDiv.classList.add('bg-blue-100', 'text-blue-700');
    }
    feedbackDiv.classList.remove('hidden');

    setTimeout(() => {
        feedbackDiv.classList.add('hidden');
    }, 4000);
}

// --- Funções de API (Configuração) ---

async function loadConfig() {
    try {
        const response = await fetch(API_URL + '?action=config');
        const result = await response.json();
        
        if (result.success) {
            fillConfigForm(result.data);
            fillBankOptions(result.data.bancos_disponiveis);
            displayFeedback('Configuração do Emitente carregada.', 'info');
        } else {
            displayFeedback(`Erro ao carregar config: ${result.error}`, 'error');
        }
    } catch (error) {
        // Assume que o arquivo não existe e cria a estrutura mínima
        fillBankOptions({'BancoDoBrasil': 'Banco do Brasil', 'Bradesco': 'Bradesco'});
        displayFeedback('Nenhuma configuração encontrada. Preencha e salve.', 'info');
    }
}

function fillBankOptions(banks) {
    bancoSelect.innerHTML = '<option value="" disabled selected>Selecione um Banco</option>';
    for (const [key, value] of Object.entries(banks)) {
        const option = document.createElement('option');
        option.value = key;
        option.textContent = value;
        bancoSelect.appendChild(option);
    }
}

function fillConfigForm(data) {
    document.getElementById('cedente_nome').value = data.cedente_nome || '';
    document.getElementById('cedente_cpfcnpj').value = data.cedente_cpfcnpj || '';
    document.getElementById('agencia').value = data.agencia || '';
    document.getElementById('conta').value = data.conta || '';
    document.getElementById('carteira').value = data.carteira || '';
    
    if (data.banco_id) {
        bancoSelect.value = data.banco_id;
    }
}

async function saveConfig(formData) {
    try {
        const response = await fetch(API_URL + '?action=config', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(Object.fromEntries(formData.entries()))
        });

        const result = await response.json();

        if (result.success) {
            displayFeedback(result.data.message, 'success');
        } else {
            displayFeedback(`Erro ao salvar: ${result.error}`, 'error');
        }
    } catch (error) {
        displayFeedback('Erro de comunicação com o servidor.', 'error');
        console.error("Save Config Error:", error);
    }
}

// --- Funções de API (Emissão) ---

async function generateBoleto(formData) {
    // Basic fix for value formatting (R$ 100.00 -> 100.00)
    let data = Object.fromEntries(formData.entries());
    data.valor = parseFloat(data.valor);

    try {
        const response = await fetch(API_URL + '?action=generate', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });

        const result = await response.json();

        if (result.success) {
            // Exibir o HTML do boleto
            boletoHtmlContainer.innerHTML = result.data.html;
            boletoResultArea.classList.remove('hidden');
            displayFeedback('Boleto gerado em HTML. Agora você pode gerar o PDF.', 'success');
        } else {
            boletoHtmlContainer.innerHTML = '';
            boletoResultArea.classList.add('hidden');
            displayFeedback(`Erro na emissão: ${result.error}`, 'error');
        }
    } catch (error) {
        displayFeedback('Erro de comunicação com o servidor.', 'error');
        console.error("Generate Boleto Error:", error);
    }
}

// --- Funções de Geração de PDF ---

function generatePdf() {
    // Utiliza a biblioteca html2pdf.js para converter o conteúdo HTML em PDF
    const element = document.getElementById('boleto-html-container');
    
    // Configurações para o PDF
    const opt = {
        margin: [10, 10, 10, 10], // Margem em mm
        filename: 'boleto_' + Date.now() + '.pdf',
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
    };

    // Gera e salva o PDF
    html2pdf().set(opt).from(element).save();
    displayFeedback('Gerando e baixando o PDF...', 'info');
}

// --- Event Listeners ---

// Navegação por Abas
tabButtons.forEach(button => {
    button.addEventListener('click', () => {
        const targetTab = button.dataset.tab;
        
        tabButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
        
        tabContents.forEach(content => {
            if (content.id === `${targetTab}-content`) {
                content.classList.remove('hidden');
            } else {
                content.classList.add('hidden');
            }
        });
    });
});

// Envio do Formulário de Configuração
configForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const formData = new FormData(configForm);
    saveConfig(formData);
});

// Envio do Formulário de Emissão
boletoForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const formData = new FormData(boletoForm);
    generateBoleto(formData);
});

// Geração de PDF
generatePdfBtn.addEventListener('click', generatePdf);


// --- Inicialização ---
document.addEventListener('DOMContentLoaded', loadConfig);
