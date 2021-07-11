<?php

namespace App\http\controllers;



use Dompdf\Exception;
use Illuminate\Support\Str;


class FrontController
{
    /**
     * GESTION DE PETICIONES(dispacher)
     * metodo principal del controlador frontal
     * Controller $c
     * method $m
     * param $p
     * @throws \Exception
     */
    public static function main(){
        try {

            $c = empty($_GET['c'])?DEFAULT_CONTROLLER : ucfirst($_GET['c']);

            $m = empty($_GET['m'])?DEFAULT_METHOD : $_GET['m'];

            $p = empty($_GET['p'])?'' : $_GET['p'];

            $p2 = empty($_GET['p2'])?'' : $_GET['p2'];

            $url = env('APP_URL').Str::lower($c);
            $routeController = '\\App\\http\\controllers\\'.$c.'Controller';

            if(!is_callable([$routeController, DEFAULT_METHOD])){                
                
                if($p != ''){
                    throw new Exception("No existe la url!");
                }
                else if($m != DEFAULT_METHOD){
                    throw new Exception("No existe la url: ".$url.'/'.Str::lower($m));
                }
                else{
                    throw new Exception("No existe la url: ". $url);
                }
            }                

                

            $controller = new $routeController;

            // Llama al metodo pasando el parametro
            $controller->$m($p);



        }catch (Exception $e){
            $error = $e->getMessage();

            include __DIR__.'/../../../resources/views/errors/error.php';
            
        }
    }

}