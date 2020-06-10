<?php

$errorMSG = "";

// NAME
if (empty($_POST["name"])) {
    $errorMSG = "Введите ФИО";
} else {
    $name = $_POST["name"];
}

// EMAIL
if (empty($_POST["email"])) {
    $errorMSG .= "Введите email";
} else {
    $email = $_POST["email"];
}

// PHONE
if (empty($_POST["phone"])) {
    $errorMSG .= "Укажите свой номер телефона";
} else {
    $phone = $_POST["phone"];
}

// ADDRESS
if (empty($_POST["address"])) {
    $errorMSG .= "Укажите адрес где вы нашли сердце";
} else {
    $address = $_POST["address"];
}


$EmailTo = "r.a.bazhenoff@gmail.com";
$Subject = "Регистрация нового уастника конкурса!";

// prepare email body text
$Body = "";
$Body .= "Имя: ";
$Body .= $name;
$Body .= "\n";
$Body .= "Email: ";
$Body .= $email;
$Body .= "\n";
$Body .= "Номер телефона: ";
$Body .= $phone;
$Body .= "\n";
$Body .= "Адрес, где нашли: ";
$Body .= $address;
$Body .= "\n";

// send email

$success = mail($EmailTo, $Subject, $Body, "From:".$EmailTo);

// redirect to success page
if ($success && $errorMSG == ""){
   echo "success";
}else{
    if($errorMSG == ""){
        echo "Ошибка отправки формы";
    } else {
        echo $errorMSG;
    }
}