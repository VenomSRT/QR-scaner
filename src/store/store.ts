import {makeAutoObservable, runInAction} from 'mobx';
import {PermissionsAndroid, Platform} from 'react-native';
import {Actions} from 'react-native-router-flux';

class Store {
  qrValue: string[][] = [];
  errorStatus: boolean = false;
  errorMessage: string = '';

  constructor() {
    makeAutoObservable(this);
  }

  onBarcodeScan(value: string) {
    let transformatedValue: string[][] = [];

    switch (true) {
      case value.startsWith('tel:'):
        transformatedValue = [['TEL', value.slice(4), '']];
        break;

      case value.startsWith('SMSTO:'):
        transformatedValue = [['SMSTO:', value.slice(6), '']];
        break;

      case value.startsWith('http:'):
      case value.startsWith('https:'):
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

    this.qrValue = transformatedValue;
  }

  openScanner = () => {
    if (Platform.OS === 'android') {
      const requestCameraPermission = async () => {
        try {
          const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.CAMERA,
          );
          if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            runInAction(() => {
              Actions.scanner();
            });
          } else {
            this.qrValue = [];
            this.setError(undefined, true);
          }
        } catch (error) {
          this.qrValue = [];
          this.setError(error, true);
        }
      };

      requestCameraPermission();
    } else {
      runInAction(() => {
        this.qrValue = [];
      });
    }
  };

  setError(error: any = {message: ''}, status: boolean) {
    this.errorStatus = status;
    this.errorMessage = error.message;
  }

  resetScanner() {
    this.qrValue = [];
  }
}

export default new Store();
