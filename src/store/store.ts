import {makeAutoObservable} from 'mobx';
import {PermissionsAndroid, Platform} from 'react-native';

class Store {
  qrValue: string = '';
  scannerOpened: boolean = false;
  errorStatus: boolean = false;
  errorMessage: string = '';

  constructor() {
    makeAutoObservable(this);
  }

  onBarcodeScan(value: string) {
    this.qrValue = value;
    this.scannerOpened = false;
  }

  openScanner = () => {
    if (Platform.OS === 'android') {
      const requestCameraPermission = async () => {
        try {
          const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.CAMERA,
          );
          if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            this.qrValue = '';
            this.scannerOpened = true;
          } else {
            this.setError(undefined, true);
          }
        } catch (error) {
          this.setError(error, true);
        }
      };

      requestCameraPermission();
    } else {
      this.qrValue = '';
      this.scannerOpened = true;
    }
  };

  setError(error: any = {message: ''}, status: boolean) {
    this.errorStatus = status;
    this.errorMessage = error.message;
  }
}

export default new Store();
