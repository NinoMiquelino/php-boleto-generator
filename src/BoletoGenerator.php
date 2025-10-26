<?php

// IMPORTANTE: Em um ambiente real, você faria um 'require_once __DIR__ . "/vendor/autoload.php";'
// E as classes do OpenBoleto seriam importadas aqui.
// Para este projeto de aprendizado, estamos simulando a chamada da biblioteca.

class BoletoGenerator {
    private const CONFIG_FILE = __DIR__ . '/Config.json';
    private const DEFAULT_BANK = 'BancoDoBrasil'; // Banco de exemplo

    // --- Gerenciamento de Configuração ---

    private function loadConfig(): array {
        if (!file_exists(self::CONFIG_FILE)) {
            return [];
        }
        $content = file_get_contents(self::CONFIG_FILE);
        return json_decode($content, true) ?? [];
    }

    public function saveConfig(array $configData): bool {
        // Simples validação de campos obrigatórios
        if (empty($configData['cedente_nome']) || empty($configData['banco_id']) || empty($configData['agencia']) || empty($configData['conta'])) {
            throw new Exception("Campos de configuração do emitente/banco são obrigatórios.", 400);
        }
        
        $json = json_encode($configData, JSON_PRETTY_PRINT);
        return file_put_contents(self::CONFIG_FILE, $json) !== false;
    }

    public function getConfig(): array {
        $config = $this->loadConfig();
        // Adiciona dados fixos para demonstração
        $config['bancos_disponiveis'] = ['BancoDoBrasil' => 'Banco do Brasil', 'Bradesco' => 'Bradesco'];
        return $config;
    }

    // --- Geração de Boleto ---

    public function generateBoletoHtml(array $boletoData): string {
        $config = $this->loadConfig();

        if (empty($config)) {
            throw new Exception("Configure os dados do Emitente e Banco antes de emitir o boleto.", 400);
        }

        // 1. Simulação da Validação
        if (empty($boletoData['sacado_nome']) || empty($boletoData['valor']) || empty($boletoData['vencimento'])) {
            throw new Exception("Dados do Sacado (Nome, Valor, Vencimento) são obrigatórios.", 400);
        }
        
        // 2. Simulação da Inicialização da Biblioteca (OpenBoleto)
        $bankClass = 'OpenBoleto\\Banco\\' . self::DEFAULT_BANK;
        
        // CUIDADO: Este é o ponto onde o código real da biblioteca seria invocado.
        // Como não podemos incluir a biblioteca aqui, retornamos um HTML com placeholders.

        $html = "
            <h2>Boleto Bancário (Simulação)</h2>
            <div style='border: 1px solid #000; padding: 15px; max-width: 600px;'>
                <p><strong>Cedente:</strong> {$config['cedente_nome']}</p>
                <p><strong>Banco:</strong> {$config['banco_id']}</p>
                <p><strong>Agência/Conta:</strong> {$config['agencia']} / {$config['conta']}</p>
                <hr>
                <p><strong>Sacado:</strong> {$boletoData['sacado_nome']}</p>
                <p><strong>Valor:</strong> R$ " . number_format($boletoData['valor'], 2, ',', '.') . "</p>
                <p><strong>Vencimento:</strong> {$boletoData['vencimento']}</p>
                <p style='font-size: 10px; margin-top: 10px;'>
                    [Aqui entraria o Código de Barras e a Linha Digitável gerados pela biblioteca OpenBoleto]
                </p>
                <div style='background-color: #ccc; height: 50px; text-align: center; line-height: 50px;'>
                    LINHA DIGITÁVEL SIMULADA: 0009.00000 00000.000000 00000.000000 0 12345678901234
                </div>
            </div>
            <br><small>Nota: Este é um layout simplificado para fins de demonstração. Em produção, use o método `toHtml()` da biblioteca.</small>
        ";
        
        return $html;
    }
}
