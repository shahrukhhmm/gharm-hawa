const otpverification=async(opttime)=>{
    try {
        console.log("millisecound "+opttime);
        const cdatetime=new Date();
         
        var timedifference=(opttime - cdatetime.getTime())/1000;
        timedifference/=60;
        const minute=Math.abs(timedifference);
        console.log("expired time"+minute);

        if(minute>9){
            return true
        }
        return false;

    } catch (error) {
       return( 
        console.log(error.message)
       )
    }
}

export default otpverification;