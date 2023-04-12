
    function clearerrors(){
    errors = document.getElementsByClassName('formerror');
    for(let items of errors)
{
    items.innerHTML = "";
}
}

    function seterror(id,error){
    //sets error inside tag of id
    element = document.getElementById(id);
    element.getElementsByClassName('formerror')[0].innerHTML= error;
}

    function validationform(){

    var returval=true;
    clearerrors();

    //perform validation and if validation fails,set the value of return val to false
    var name=document.forms['myForm']["fname"].value;
    if(name.length <5 )
{
    seterror("name","*Length of name is too short!")
    returval = false;
}

    if(name.length==0 )
{
    seterror("name","*Length of name cannot be zero!")
    returval = false;
}


    var email=document.forms['myForm']["femail"].value;
    if(email.length >20 )
{
    seterror("email","*Length of email is too long!")
    returval = false;
}

    var phone=document.forms['myForm']["fphone"].value;
    if(phone.length !=11 )
{
    seterror("phone","*phone number should be of 11 digits!")
    returval = false;
}

    var password=document.forms['myForm']["fpass"].value;
    if(password.length <6 )
{
    seterror("pass","*password should be atleast 6 characters long!")
    returval = false;
}


    var cpassword = document.forms['myForm']["cpass"].value;
    if(cpassword != password )
{
    seterror("cpass","*pass not matched!")
    returval = false;
}


    return returval;

}
