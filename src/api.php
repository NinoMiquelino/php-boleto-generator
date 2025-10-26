<?php
require_once __DIR__ . '/../vendor/autoload.php'; 
require_once 'BoletoGenerator.php';

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *'); 
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

$method = $_SERVER['REQUEST_METHOD'] ?? 'GET';
$action = $_GET['action'] ?? '';
$response = ['success' => false, 'data' => null, 'error' => ''];
$generator = new BoletoGenerator();

if ($method === 'OPTIONS') {
    http_response_code(200);
    exit;
}

try {
    switch ($action) {
        case 'config':
            if ($method === 'GET') {
                // Rota: GET /api.php?action=config (Carregar Configuração)
                $response['success'] = true;
                $response['data'] = $generator->getConfig();
            } elseif ($method === 'POST') {
                // Rota: POST /api.php?action=config (Salvar Configuração)
                $input = json_decode(file_get_contents('php://input'), true);
                $generator->saveConfig($input);
                $response['success'] = true;
                $response['data'] = ['message' => 'Configuração salva com sucesso.'];
            }
            break;

        case 'generate':
            if ($method === 'POST') {
                // Rota: POST /api.php?action=generate (Emitir Boleto)
                $input = json_decode(file_get_contents('php://input'), true);
                $htmlBoleto = $generator->generateBoletoHtml($input);
                
                $response['success'] = true;
                $response['data'] = [
                    'html' => $htmlBoleto,
                    'message' => 'Boleto gerado em HTML.'
                ];
            }
            break;

        default:
            http_response_code(400);
            throw new Exception("Ação inválida ou não especificada.", 400);
    }

} catch (Exception $e) {
    $code = $e->getCode() ?: 500;
    http_response_code($code);
    $response['success'] = false;
    $response['error'] = $e->getMessage();
}

echo json_encode($response);
