import * as Fingerprint2 from 'fingerprintjs2';

const FILESTACK_PROCESS_API_PREFIX = "https://cdn.filestackcontent.com";

export const getFingerPrint = async () => {
    const secure = await (new Promise(resolve => {
            new Fingerprint2().get((result, components, third) => resolve({result,components,third}));
    }));

    return secure
}

export const getFilestackProcessedImage =  (imageUrl, operations=[]) => {

    const imageKey = imageUrl.split("https://www.filepicker.io/api/file/")[1];
    let oprationsString = FILESTACK_PROCESS_API_PREFIX;
    for(const [key, value] of Object.entries(operations)){

        oprationsString+="/"+key+"=";
        Object.keys(value).forEach((opKey, i)=>{
            if(i===0){
                oprationsString+=opKey+":"+value[opKey];
            }else{
                oprationsString+=","+opKey+":"+value[opKey];
            }
        });
    }

    return oprationsString+"/"+imageKey
}
