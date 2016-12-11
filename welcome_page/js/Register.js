var bool2 = false;
var usedName = false;
var usedEmail = false;
var usedPwd = false;

$(function(){
	
	$("#switch-reg").click(function(){
		$(".loginForm").slideUp(200,function(){
			$(".registerForm").slideDown(400);
			initialTipRegister();
		});
	});

	$("#switch-login").click(function(){
		$(".registerForm").slideUp(200,function(){
			$(".loginForm").slideDown(400);
		});
	});
	
	function handleReturn(call) {
		switch (call) {
		case 'user_existed':
			indexShowTooltip('reg_user','Account Already Existed');
			break;
		case 'invalid_username_length':
			indexShowTooltip('reg_user','length must be 6-16  and only accept a-z, A-Z, 0-9, _ ');
			break;
		case 'invalid_username_character':
			indexShowTooltip('reg_user','length must be 6-16  and only accept a-z, A-Z, 0-9, _ ');
			break;	
		case 'invalid_email_format':
			indexShowTooltip('reg_email','email format should be valid.');
			break;	
		case 'repwd_not_equal':
			$("#reg_pwd").val('');
			$("#reg_repwd").val('');
			//alert("two different pwd enter");
			indexShowTooltip('reg_repwd','two different pwd enter');
			break;
		case 'invalid_pwd_length':
			$("#reg_pwd").val('');
			$("#reg_repwd").val('');
			//alert("pwd length should between 8-16");
			indexShowTooltip('reg_repwd','pwd length should between 8-16');
			break;
		case 'invalid_pwd_character':
			$("#reg_pwd").val('');
			$("#reg_repwd").val('');
			//alert("invalid pwd format");
			indexShowTooltip('reg_repwd','invalid pwd format');
			break;
		 case 'signup_successful':
			$.ajax({           	
				url: "./php/save.php",
				type: "POST", 
				data: "username=" + $("#reg_user").val(),	
			});
		 	location = "../user page/user.html?user="+ $("#reg_user").val(); 
		 	break;
		default:
			break;
		}
	}

 
	$("#register-button").click(function(){
		$.ajax({
			url: "./php/register.php",
			type: "POST",
			data: "user_name=" + $("#reg_user").val() + 
				  "&email=" + $("#reg_email").val() +
				  "&password=" + $("#reg_pwd").val() + 
				  "&repassword=" + $("#reg_repwd").val(),
			success: function(result) {
				handleReturn(result);
			}
		})
	})	
})

/**
 * tooltip showing the wrong info
 * @param selector
 * @param errorInfo
 */
function indexShowTooltip(selector,errorInfo){
	$("#"+selector).tooltipster('content', errorInfo);
	$("#"+selector).tooltipster('enable');
	$("#"+selector).tooltipster('show',function(){
		setTimeout(function(){
			$("#"+selector).tooltipster('disable');
		},1000)
	});
}

function initialTipRegister(){
	if (!bool2) {
		bool2 = true;
		$("#reg_user").tooltipster({
			contentCloning: true,
			theme: 'tooltipster-noir',
			position: 'left'
		});
		$("#reg_email").tooltipster({
			contentCloning: true,
			theme: 'tooltipster-noir',
			position: 'left'
		});
		$("#reg_repwd").tooltipster({
			contentCloning: true,
			theme: 'tooltipster-noir',
			position: 'left'
		});
	}
	
}



