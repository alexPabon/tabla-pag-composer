<?php


namespace App\http\controllers;


class WelcomeController
{
    public function index(){
        include __DIR__.'/../../../resources/views/layouts/view_users.php';
    }    
}