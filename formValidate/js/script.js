function getLength(str){
	return str.replace(/[^\x00-\xff]/g,'aa').length;
}
function findStr(str,n){
	var tmp=0;
	for(var i=0;i<str.length;i++){
		if(str.charAt(i)==n){
			tmp++;
		}
	}
	return tmp;
}
window.onload=function(){
	var allInput=document.getElementsByTagName("input");
	var userName=allInput[0];
	var password=allInput[1];
	var passwordConfirm=allInput[2];
	var allP=document.getElementsByTagName("p");
	var userNameMsg=allP[0];
	var passwordMsg=allP[1];
	var passwordConfirmMsg=allP[2];
	var phone=document.getElementById("phone");
	var phoneMsg=allP[3];
	var count=document.getElementById("count");
	var allEm=document.getElementsByTagName("em");
	var name_length=0;
	//用户名
	userName.onfocus=function(){
		userNameMsg.style.display="block";
		userNameMsg.innerHTML='<i class="ati"></i>5-25个字符，一个汉字为两个字符,推荐使用中文会员名';
	};
	userName.onkeyup=function(){
		count.style.visibility="visible";
		name_length=getLength(this.value);
		count.innerHTML=name_length+"个字符";
		if(name_length===0){
			count.style.visibility="hidden";
		}
	};
	userName.onblur=function(){
		//含有非法字符
		var re=/[^\w\u4e00-\u9fa5]/g;
		if(re.test(this.value)){
			userNameMsg.innerHTML='<i class="ati"></i>含有非法字符';
		}
		//不能为空
		else if(this.value===""){
			userNameMsg.innerHTML='<i class="ati"></i>不能为空';
		}
		//长度超过25个字符
		
		else if(name_length>25){
			userNameMsg.innerHTML='<i class="ati"></i>长度超过25个字符';
		}
		//长度不能少于6个字符
		else if(name_length<6){
			userNameMsg.innerHTML='<i class="ati"></i>长度不能少于6个字符';
		}		
		//OK
		else{
			userNameMsg.innerHTML='<i class="pass"></i>OK';
		}
    };
	//密码
	password.onfocus=function(){
		passwordMsg.style.display="block";
		passwordMsg.innerHTML='<i class="ati"></i>6-16个字符，请使用字母加数字或符号的组合密码，不能单独使用字母、数字、符号';
	};
	password.onkeyup=function(){
		//大于5个字符，强度为中
		if(this.value.length>5){
			allEm[1].className="active";
			passwordConfirm.removeAttribute("disabled");
			passwordConfirmMsg.style.display="block";
		}
		else{
			allEm[1].className="";
			passwordConfirm.setAttribute("disabled","true");
			passwordConfirmMsg.style.display="none";
			passwordConfirm.value="";
		}
		//大于10个字符，强度为强
		if(this.value.length>10){
			allEm[2].className="active";			
		}
		else{
			allEm[2].className="";			
		}
		
	};
	password.onblur=function(){

		var m=findStr(this.value,this.value[0]);
		var nonnumeric=/[^\d]/g;//全局匹配的非数字,即字母和其他的一些符号
		var nonLetter=/[^a-zA-Z]/g;//匹配所有a-zA-Z之外的东西
		console.log(this.value);
		console.log("m="+m);
		console.log("nonnumeric"+nonnumeric);
		console.log("nonLetter"+nonLetter);
		//不能为空		
		if(this.value===""){
			
			passwordMsg.style.display="block";
			passwordMsg.innerHTML='<i class="ati"></i>不能为空';
		}
		//不能用相同的字符
		else if(m==this.value.length){
			passwordMsg.innerHTML='<i class="ati"></i>不能用相同的字符';
		}
		//长度应为6-16个字符
		else if(this.value.length<6||this.value.length>16){
			passwordMsg.innerHTML='<i class="ati"></i>长度应为6-16个字符';
		}
		//不能全为数字
		else if(!nonnumeric.test(this.value)){
			passwordMsg.innerHTML='<i class="ati"></i>不能全为数字';
		}

		//不能全为字母
		else if(!nonLetter.test(this.value)){
			passwordMsg.innerHTML='<i class="ati"></i>不能全为字母';
		}
		else{
			passwordMsg.innerHTML='<i class="pass"></i>OK';
		}
		//OK
		
	};
	//确认密码
	passwordConfirm.onblur=function(){
		if(this.value!==password.value){
			passwordConfirmMsg.innerHTML='<i class="ati"></i>输入错误,请在输入一遍';
		}
		else{
			passwordConfirmMsg.innerHTML='<i class="pass"></i>OK';		}
	};
	//联系方式
	phone.onfocus=function(){
		phoneMsg.style.display="block";
		phoneMsg.innerHTML='<i class="ati"></i>11位数字';
	};
	phone.onblur=function(){
		var numeric=/[\d]{11}/g;
		if(this.value.length<11){
			phoneMsg.innerHTML='<i class="ati"></i>小于11位数字,请重新输入';
		}
		else if(this.value.length>11){
			phoneMsg.innerHTML='<i class="ati"></i>大于11位数字,请重新输入';
		}
		else{
			if(numeric.test(this.value)){
				phoneMsg.innerHTML='<i class="pass"></i>OK';
			}
			else{
				phoneMsg.innerHTML='<i class="ati"></i>请不要输入出数字之外的符号,请重新输入11位数字';
			}
			
		}
	};
};