<?php

namespace App\http\controllers;

use \stdClass;
use App\models\User;
use App\models\UserII;
use Illuminate\Support\Str;
use Dompdf\FrameDecorator\Page;
use Illuminate\Pagination\LengthAwarePaginator;

class UserController extends Controller{

    public function __construct()
    {
        parent::__construct();
        $this->path = env('APP_URL').'user';        
    }
    
    public function index(){        
        
        $records = User::orderBy($this->orderBy->column,$this->orderBy->order)
                        ->where('extension','like',"%$this->search%")
                        ->orWhere('username','like',"%$this->search%")                        
                        ->orWhere('password','like',"%$this->search%")                                                                                           
                        ->paginate($this->limit, ['*'], 'page',$this->currentPage);

        $records->withPath($this->path);
        $records->appends(['search'=>$this->search,'limit'=>$this->limit,'column'=>$this->orderBy->column,'order'=>$this->orderBy->order]);
        $records->currentPage(2);

        $json = json_encode($records);

        echo $json; 
    }

    public function updateToken(){
        $id = isset($_POST['id'])? intval($_POST['id']):'';
        $user = User::find($id);

        $user->token = Str::random(150);
        
        if($user->update()){
            echo json_encode(['token'=>$user->token]);
        }        
    }

    public function editUser(){
        $id = isset($_POST['id'])? intval($_POST['id']):'';

        $user =User::find($id);

        if($user){
            $user->username = htmlspecialchars($_POST['name']);
            $user->extension = intval($_POST['extension']);
            $user->password = htmlspecialchars($_POST['pass']);
            $user->updatedAt = date('Y-m-d H:i:s');

            if($user->update()){
                echo json_encode($user);
            }
        }
        
    }

    public function deleteUser(){
        $id = isset($_POST['id'])? intval($_POST['id']):'';

        $user =User::find($id);
        if($user->delete()){
            echo true;
        }
    }
}