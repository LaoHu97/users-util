import { KDN } from './KDN';
Page({
    data : {
      KDN : []
    },
    onChange(event){
        console.log(event.detail,'click right menu callback data')
    },
    onReady(){
        let storeCity = new Array(27);
        const words = ["*","A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"]
        words.forEach((item,index)=>{
            storeCity[index] = {
                key : item,
                list : []
            }
        })

        KDN.forEach((item)=>{
            let firstName = item.code.substring(0,1);
            let index = words.indexOf( firstName );
            storeCity[index].list.push({
                name : item.name,
                key : firstName
            });
        })
        console.log(storeCity);

        // this.data.KDN = storeCity;
        this.setData({
          KDN : storeCity
        })
    }
});
