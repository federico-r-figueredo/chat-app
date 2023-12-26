<?php

    $server_name = 'localhost';
    $user_name = 'root';
    $password = '';
    $database = 'chat-app';

    // create connection
    $connection = mysqli_connect($server_name, $user_name, $password, $database);

    // check connection
    if (!$connection) {
        die('Connection failed' . mysqli_connect_error());
    }
    
    $result = [];
    $message = isset($_POST['message']) ? $_POST['message'] : null;
    $author = isset($_POST['author']) ? $_POST['author'] : null;

    if (!empty($message) && !empty($author)) {
        $sql = "INSERT INTO `chat` (`Message`, `Author`) VALUES ('" . $message . "', '" . $author . "')";
        $result['send_status'] = mysqli_query($connection, $sql);
    }

    $start = isset($_GET['start']) ? intval($_GET['start']) : 0;
    $items = mysqli_query($connection, "SELECT * FROM `chat` WHERE `ID` > " . $start);
    while ($row = mysqli_fetch_assoc($items)) {
        $result['items'][] = $row;
    }

    mysqli_close($connection);

    header('Access-Control-Allow-Origin: *');
    header('Content-Type: application/json');

    print(json_encode($result));
?>