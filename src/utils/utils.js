
//公共函数组件

export var transDate = (time)=>{
    function times(num){
      return num<10 ? "0"+ num :num;
    }
    var newtime = (typeof time == "string" ? new Date(time) : time );
    return (
     times(newtime.getFullYear())
     + "-" +
      times(newtime.getMonth() + 1) 
     + "-" +
      times(newtime.getDate()) 
     + " " +  
     times(newtime.getHours())
     + ":" + 
     times(newtime.getMinutes())
     + ":" +
     times(newtime.getSeconds())
       );
      
}
