<?php
    include_once("db_connect.php");
    $retVal = "Addition failed.";
    $isValid = true;
    $status = 400;
    $data = -1;

    $fname = trim($_REQUEST['fname']);
    $lname = trim($_REQUEST['lname']);
    $emailAdd = trim($_REQUEST['emailAdd']);
    $contactNum = trim($_REQUEST['contactNum']);

    // Check if email already exists
    if($isValid){
        $stmt = $con->prepare("SELECT * FROM contact WHERE email = ?");
        $stmt->bind_param("s", $emailAdd);
        $stmt->execute();
        $result = $stmt->get_result();
        $stmt->close();
        if($result->num_rows > 0){
            $isValid = false;
            $retVal = "Email already exists.";
        }
    }

    // Insert records
    if($isValid){
        try {
            $stmt = $con->prepare("INSERT INTO contact(firstName,lastName,email,number) values(?,?,?,?)");
            $stmt->bind_param("ssss",$fname,$lname,$emailAdd,$contactNum);
            $stmt->execute();
            $stmt->close();
            $data = mysqli_insert_id($con);
            $status = 200;
            $retVal = "Contact added.";
        } catch (Exception $e) {
            $retVal = $e->getMessage();
        }
    }

    $myObj = array(
        'status' => $status,
        'data' => $data,
        'message' => $retVal  
    );

    $myJSON = json_encode($myObj, JSON_FORCE_OBJECT);
    echo $myJSON;
?>