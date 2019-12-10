import { NativeModules, Platform } from 'react-native';

const { RNOnfidoSdk } = NativeModules;

const startSDK = (params, successCallback, errorCallback) => {
    RNOnfidoSdk.startSDK(
      params,
      successCallback,
      (error) => {
        let response = {};
        if (Platform.OS === 'android') {
          if (error === 'EUSER_CANCELED101') {
            response = { isCanceled: true };
          } else {
            response = { isCanceled: false, error };
          }
        } else {
          if (error?.code === 'EUSER_CANCELED101') {
              response = { isCanceled: true };
          } else {
              response = { isCanceled: false, error };
          }
        }
        errorCallback(response);
      }
    )
}

const getConstants = () => RNOnfidoSdk.getConstants();

export default { startSDK, getConstants };
