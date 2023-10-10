<?php
    include_once("db_connect.php");
    $status = 200;
    $data = array();
    $count = 0;

    $stmt = $con->prepare("SELECT * FROM contact ORDER BY lastName");
    $stmt->execute();
    $result = $stmt->get_result();
    $count = $result->num_rows;
    $stmt->close();

    while($row = mysqli_fetch_assoc($result))
    {
        $data[] = $row;
    }


    $myObj = array(
        'status' => $status,
        'data' => $data,
        'count' => $count
    );

    $myJSON = json_encode($myObj, JSON_FORCE_OBJECT);
    echo $myJSON;
?>