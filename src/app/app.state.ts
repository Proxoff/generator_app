import { StorageState } from './app.models';

export const appState: StorageState = {
  templates: [
    {
      id: '1',
      name: 'Base',
      canvas: {
        width: 600,
        height: 600,
        scale: 100,
      },
      text: {
        value: '',
        autoResize: false,
        minFontSize: 25,
        maxFontSize: 40,
        fontSize: 30,
        lineHeight: 1,
        fontFamily: 'BebasNeue-Bold',
        align: 'center',
        borders: {
          x: 0,
          y: 0,
          width: 600,
          height: 600
        }
      },
      image: {
        src: '',
      }
    }
  ],
  texts: [
    {
      value: 'text'
    }
  ]
};
