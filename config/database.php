<?php

use Illuminate\Database\Capsule\Manager as Capsule;


/**
 * ----------------------------------------------|
 * Configuracion de las DB a las que nos vamos a conectar.
 * Editar credenciales desde .env para la conexion
 * ----------------------------------------------|
 */
$capsule = new Capsule();

$connection= [
    'main'=>[
        'driver' => env('DB_CONNECTION','mysql'),
        'host' => env('DB_HOST', '127.0.0.1'),
        'port' => env('DB_PORT', '3306'),
        'database' => env('DB_DATABASE', 'forge'),
        'username' => env('DB_USERNAME', 'forge'),
        'password' => env('DB_PASSWORD', ''),
        'unix_socket' => env('DB_SOCKET', ''),
        'charset' => 'utf8mb4',
        'collation' => 'utf8mb4_unicode_ci',
        'prefix' => '',
        'prefix_indexes' => true,
    ],
    'secondary'=>[
        'driver' => env('DB_CONNECTION_II','mysql'),
    'host' => env('DB_HOST_II', '10.38.38.123'),
    'port' => env('DB_PORT_II', '3306'),
    'database' => env('DB_DATABASE_II', 'DDLpbx_comb'),
    'username' => env('DB_USERNAME_II', 'root'),
    'password' => env('DB_PASSWORD_II', ''),
    'unix_socket' => env('DB_SOCKET_II', ''),
    'charset' => 'utf8mb4',
    'collation' => 'utf8mb4_unicode_ci',
    'prefix' => '',
    'prefix_indexes' => true,
    ]
];

$capsule->addConnection($connection['main'],'main');
$capsule->addConnection($connection['secondary'],'secondary');

$capsule->bootEloquent();