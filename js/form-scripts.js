let $form = $("#contactForm");
let $address = $("#address");
$name = $("#name");

$name.suggestions({
    token: "b0b38328e16af8e0a929aa6ea19caf1ee6a5656f",
    type: "NAME",

    onSelect: function(suggestion) {
        // console.log(suggestion);
    }
});

$address.suggestions({
    token: "b0b38328e16af8e0a929aa6ea19caf1ee6a5656f",
    type: "ADDRESS",

    onSelect: function(suggestion) {
        // console.log(suggestion);
    }
});



$form.validator().on("submit", function (event) {
    if (event.isDefaultPrevented()) {
        // handle the invalid form...
        formError();
        submitMSG(false, "Заполните пожалуйста все поля и подтвердите согласие");
    } else {
        // everything looks good!
        event.preventDefault();
        submitForm();
    }
});


function submitForm(){
    // Initiate Variables With Form Content
    var name = $("#name").val();
    var email = $("#email").val();
    var phone = $("#phone").val();
    var address = $("#address").val();

    $.ajax({
        type: "POST",
        url: "php/form-process.php",
        data: "name=" + name + "&email=" + email + "&phone=" + phone + "&address=" + address,
        success : function(text){
            if (text == "success"){
                formSuccess();
            } else {
                formError();
                submitMSG(false,text);
            }
        }
    });
}

function formSuccess(){
    $("#contactForm")[0].reset();
    submitMSG(true, "Ваша заявка принята!")
}

function formError(){
    $("#contactForm").removeClass().addClass('shake animated').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
        $(this).removeClass();
    });
}

function submitMSG(valid, msg){
    if(valid){
        var msgClasses = "h3 text-center tada animated text-success";
    } else {
        var msgClasses = "h3 text-center text-danger";
    }
    $("#msgSubmit").removeClass().addClass(msgClasses).text(msg);
}

var phoneMask = IMask(
document.getElementById('phone'), {
    mask: '+{7}(000)000-00-00'
});
