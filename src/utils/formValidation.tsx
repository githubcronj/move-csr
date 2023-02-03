export const formatPhoneInput = (phone: string) => {
  let phone_number = phone;
  phone_number = phone_number.replace(/\D/g,'');
  
  phone_number = phone_number.substring(0,10);
  const size = phone_number.length;
  if(size < 4){
          phone_number = phone_number;
  }else if(size < 7){
          phone_number = phone_number.substring(0,3)+'-'+phone_number.substring(3,6);
  }else{
          phone_number = phone_number.substring(0,3)+'-'+phone_number.substring(3,6)+'-'+phone_number.substring(6,10);
  }
  return phone_number; 
}

export const validateEmail = (email: string) => {
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

export const validateYear = (year: number | null) => {
        var d = new Date();
        var n = d.getFullYear();
        if (year !== null && year >= 1900 && year <= n) return true;
        else return false;
    };