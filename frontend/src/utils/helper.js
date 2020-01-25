import * as Fingerprint2 from 'fingerprintjs2';

export const getFingerPrint = async () => {
    const secure = await (new Promise(resolve => {
            new Fingerprint2().get((result, components, third) => resolve({result,components,third}));
    }));

    return secure
}
