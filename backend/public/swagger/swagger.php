<?php

$swaggerJson = file_get_contents(__DIR__ . '/../swagger/swagger.yaml');

header('Content-Type: application/json');
echo $swaggerJson;
