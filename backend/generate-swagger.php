<?php
require 'vendor/autoload.php';

use Symfony\Component\Yaml\Yaml;

$source = __DIR__ . '/swagger.yaml';
$target = __DIR__ . '/public/swagger/swagger.json';

$data = Yaml::parseFile($source);
file_put_contents($target, json_encode($data, JSON_PRETTY_PRINT));

echo "Swagger JSON gerado em: $target\n";
