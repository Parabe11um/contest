let $form = $("#contactForm");
let $address = $("#address");



$address.suggestions({
    token: "0724ee8967e8155974ef623a1e2f5b6e96d35253",
    type: "ADDRESS",

    onSelect: function(suggestion) {
        // console.log(suggestion);
    }
});



$form.validator().on("submit", function (event) {
    if (event.isDefaultPrevented()) {
        // handle the invalid form...
        formError();
        submitMSG(false, "Заполните пожалуйста все поля корректно");
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
    var policy = $("#address").val();
    var rules = $("#address").val();

    $.ajax({
        type: "POST",
        url: "php/form-process.php",
        data: "name=" + name + "&email=" + email + "&phone=" + phone + "&address=" + address + policy + rules,
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
