var bool1 = false;
var user = document.getElementById('login_user');  
var password = document.getElementById('login_pwd');

$(document).ready(function () {	
	initialTipLogin();

    function handleReturn(call) {
    	
		document.getElementById('login_user').innerHTML = call;
    	switch (call) {
		case 'custom_login':
			alert(1);
			$.ajax({           	
				url: "./php/save.php",
				type: "POST", 
				data: "username=" + $("#login_user").val(),
				success: function (call) {}
			});
			//$.post("save.php", {"username": user });
            location = "../user page/user.html?user="+ $("#login_user").val(); // 登录成功后指定跳转页面  
			break;
		case 'user_noexist':
			indexShowTooltip('login_user','Account Not Existed');
			break;
		case 'password_error':
			$("#login_pwd").val('');
			indexShowTooltip('login_pwd','Wrong Password!');
			break;
		default:
			break;
		}
	}
    
    $('#login-button').click(function () {
		
		$.ajax({           	
            url: "./php/login.php",
            type: "POST",
            data: "username=" + $("#login_user").val() + "&password=" + $("#login_pwd").val(),// + "&verify=" + $("#verify").val(),
            success: function (call) {
                handleReturn(call);        
            }
        });
    });
});

document.onkeydown = function(e){ 
    var ev = document.all ? window.event : e;
    if(ev.keyCode==13) {
    	if ($(".registerForm").css("display") == "none")
    		setTimeout(function () { $("#login-button" ).click(); }, 20);
    	else 
    		setTimeout(function () { $("#register-button" ).click(); }, 20);
     }
}


function initialTipLogin(){
	if (!bool1) {
		bool1 = true;
		$("#login_user").tooltipster({
			contentCloning: true,
			theme: 'tooltipster-noir',
			position: 'left'
		});
		$("#login_pwd").tooltipster({
			contentCloning: true,
			theme: 'tooltipster-noir',
			position: 'left'
		});
	}
	
}