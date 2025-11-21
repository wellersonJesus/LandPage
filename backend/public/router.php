<?php
<?php
// Simple router for PHP built-in server.
// Only allow API files under /api/* to be served. All other requests return JSON 404.

$uri = urldecode(parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH));

// Serve only files under /api if they exist (lets PHP execute them)
if (preg_match('#^/api/#', $uri)) {
    $file = __DIR__ . $uri;
    if ($file !== __FILE__ && file_exists($file)) {
        return false; // let the built-in server serve the file (or execute PHP)
    }

    // api route not found
    header('Content-Type: application/json; charset=utf-8', true, 404);
    echo json_encode(['ok' => false, 'message' => 'API endpoint not found']);
    exit;
}

// For any non-API requests return JSON 404 (no styling, no HTML)
header('Content-Type: application/json; charset=utf-8', true, 404);
echo json_encode(['ok' => false, 'message' => 'API server only. Frontend must be served separately.']);
exit;