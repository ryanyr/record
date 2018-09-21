const moment = require('moment');
const uuidV1 = require('uuid/v1');
moment.locale('cn');

module.exports = {
    

    formatDate:function(data){
        // console.log('1:'+data);
        // console.log('2:' + moment(data).utcOffset(0).format("YYYY-MM-DD H:mm"));
        var localeTime = moment(data).utcOffset(0).format("YYYY-MM-DD H:mm");
        var year = moment(localeTime).year();
        var month = moment(localeTime).month();
        var date = moment(localeTime).date();
        var hour = moment(localeTime).hour();
        var minute = moment(localeTime).minute();
        var str = year.toString() +'年'+ month.toString() +'月'+ date.toString() +'日' + ' '+ hour.toString() + ':' + minute.toString();
        return str;
    },

    generateUUID:function(){
        return uuidV1();
    }
}