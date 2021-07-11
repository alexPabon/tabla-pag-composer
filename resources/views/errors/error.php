<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous">
    <script src="https://unpkg.com/axios/dist/axios.min.js"></script>    
    <script src="<?php echo env('APP_URL').'/js/common.js'?>"></script>
    <style>
        tr:hover{
            background: #c9c9cafc;
        }

        tr{
            transition: background 0.3s linear 0.1s;
        }

        .hidden{
            display: none;
        }

        .buttons{
            cursor: pointer;
        }

        .order_des{
            color: #00ff6b;
        }

        .order_asc{
            color: #a5ff05;
        }

        .bg-light{
            background-color: #ededed !important;
        }

    </style>
</head>

<body>    
    <p class="alert alert-danger"><?= $error ?></p>      
</body>
</html>