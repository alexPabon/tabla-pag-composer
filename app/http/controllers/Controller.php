<?php

namespace App\http\controllers;

class Controller{
    public $path;
    protected $currentPage;
    protected $search;
    protected $limit;
    protected $orderBy;
    protected $order;

    public function __construct()
    {
        $this->path = env('APP_URL').class_basename(__CLASS__).'/';
        $this->currentPage = empty($_GET['page'])?1:intval($_GET['page']); 
        $this->search = empty($_GET['search'])?'': htmlspecialchars($_GET['search']);
        if($this->search=='plus')
            $this->search = "+";
        $this->limit = empty($_GET['limit'])?'5': intval($_GET['limit']);
        $this->order['column'] = empty($_GET['column'])?'id': htmlspecialchars($_GET['column']);
        $this->order['order'] = empty($_GET['order'])?'DESC': htmlspecialchars($_GET['order']);
        $this->orderBy = (object) $this->order;
    }
}