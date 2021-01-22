import {makeAutoObservable, action} from 'mobx';
import {PermissionsAndroid, Platform} from 'react-native';

class Store {
  qrValue: any = [];
  scannerOpened: boolean = false;
  errorStatus: boolean = false;
  errorMessage: string = '';

  constructor() {
    makeAutoObservable(this);
  }

  onBarcodeScan(value: string) {
    console.log(value);

    let transformatedValue: any = [];

    switch (true) {
      case value.startsWith('tel:'):
        transformatedValue = [['TEL', value.slice(4), '']];
        break;

      case value.startsWith('SMSTO:'):
        transformatedValue = [['SMSTO:', value.slice(6), '']];
        break;

      case value.startsWith('http:'):
      case value.startsWith('https:'):
      case value.startsWith('www'):
        transformatedValue = [['URL', value, '']];
        break;

      case value.startsWith('BEGIN:'):
        transformatedValue = value
          .split('\n')
          .filter(
            (field) => !field.includes('VCARD') && !field.includes('VERSION'),
          )
          .map((elem, i, arr) => {
            if (elem.startsWith('URL:')) {
              return ['URL', elem.slice(4), ','];
            }

            if (i < arr.length - 1) {
              return [...elem.split(':'), ','];
            }
            return [...elem.split(':'), ''];
          });
        break;

      case value.length > 0:
        transformatedValue = [['TEXT', value, '']];
        break;

      default:
        break;
    }

    console.log(transformatedValue);

    this.qrValue = transformatedValue;
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

  resetScanner() {
    this.qrValue = '';
    this.scannerOpened = false;
  }
}

export default new Store();
