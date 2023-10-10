<?php
    include_once("db_connect.php");
    $retVal = "Edit failed.";
    $isValid = true;
    $status = 400;

    $id = trim($_REQUEST['id']);
    $fname = trim($_REQUEST['fname']);
    $lname = trim($_REQUEST['lname']);
    $emailAdd = trim($_REQUEST['emailAdd']);
    $contactNum = trim($_REQUEST['contactNum']);
    $curEmail = trim($_REQUEST['curEmail']);

    // Check if email already exists
    if($isValid){
        $stmt = $con->prepare("SELECT * FROM contact WHERE email = ?");
        $stmt->bind_param("s", $emailAdd);
        $stmt->execute();
        $result = $stmt->get_result();
        $stmt->close();
        if($result->num_rows > 0){
            if($curEmail != $emailAdd){
                $isValid = false;
                $retVal = "Edit failed. Email already exists.";
            }
        }
    }

    // Update records
    if($isValid){
        try {
            $stmt = $con->prepare("UPDATE contact SET firstName = '$fname', lastName = '$lname', email = '$emailAdd', number = '$contactNum' WHERE id = '$id'");
            $stmt->execute();
            $stmt->close();
            $status = 200;
            $retVal = "Contact edited.";
        } catch (Exception $e) {
            $retVal = $e->getMessage();
        }
    }

    $myObj = array(
        'status' => $status,
        'message' => $retVal  
    );

    $myJSON = json_encode($myObj, JSON_FORCE_OBJECT);
    echo $myJSON;
?>