<?php
/**
 * Приём лидов с форм сайта (калькулятор, контакты).
 * Отправляет данные на e-mail и сохраняет в лог-файл.
 *
 * Разместите этот файл в корне public_html вместе с остальными файлами сайта.
 * Замените RECIPIENT_EMAIL на реальный адрес.
 */

header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['error' => 'Method not allowed']);
    exit;
}

// === НАСТРОЙКИ ===
define('RECIPIENT_EMAIL', 'dispatcher@arenda-bmk.example.ru'); // <-- ЗАМЕНИТЕ
define('LOG_FILE', __DIR__ . '/leads.log');
// =================

$raw = file_get_contents('php://input');
$data = json_decode($raw, true);

if (!$data) {
    http_response_code(400);
    echo json_encode(['error' => 'Invalid JSON']);
    exit;
}

// Логируем в файл
$logLine = date('Y-m-d H:i:s') . ' | ' . json_encode($data, JSON_UNESCAPED_UNICODE) . PHP_EOL;
file_put_contents(LOG_FILE, $logLine, FILE_APPEND | LOCK_EX);

// Формируем e-mail
$source = $data['source'] ?? 'unknown';
$lead = $data['lead'] ?? [];
$calc = $data['calc'] ?? null;

$subject = "Новая заявка с сайта [{$source}]";
$body = "Источник: {$source}\n\n";

foreach ($lead as $key => $value) {
    if ($key === 'consent') continue;
    $body .= ucfirst($key) . ": {$value}\n";
}

if ($calc) {
    $body .= "\n--- Данные калькулятора ---\n";
    $body .= json_encode($calc, JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT);
}

$headers = "From: noreply@" . $_SERVER['HTTP_HOST'] . "\r\n";
$headers .= "Content-Type: text/plain; charset=utf-8\r\n";

mail(RECIPIENT_EMAIL, $subject, $body, $headers);

echo json_encode(['ok' => true]);
