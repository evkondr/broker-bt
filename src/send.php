<?php
    $_POST = json_decode(file_get_contents("php://input"), true);
    if(isset($_POST['name']) and isset($_POST['phone'])){
        $to = "sales@broker-bt.ru";; // Здесь нужно написать e-mail, куда будут приходить письма
        $phone = urldecode(htmlspecialchars($_POST['phone'])); // this is the sender's Email address
        $name = urldecode(htmlspecialchars($_POST['name']));
        $email = urldecode(htmlspecialchars($_POST['email']));
        $messageText = urldecode(htmlspecialchars($_POST['message']));
        $subject = "Отправлено с сайта с БРОКЕР-БТ";
        $message = $name . " оставил сообщение:" . "\r\n" . $messageText . "\r\n" . "Телефон: " . $phone;
        $headers = 'MIME-Version: 1.0' . "\r\n";
      	$headers = 'Content-type: text/html; charset=utf-8' . "\r\n";
        $headers .= "From:" . $email;

        mail($to,$subject,$message,$headers);
        echo "Сообщение отправлено. Спасибо Вам " . $name . ", мы скоро свяжемся с Вами.";
    }else{
        echo "Упс... Что-то пошло не так";
    }

?>