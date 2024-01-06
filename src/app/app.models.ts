export interface Image {
  id: string;
  src: string;
  dateCreate?: string;
  dateLastUpdate?: string;
}

export interface Post {
  id: string;
  title: string;
  image: Image;
}

export interface Template {
  id: string;
  name: string;
  canvas: {
    width: number,
    height: number,
    scale: number,
  };
  text: {
    value: string,
    autoResize: false,
    minFontSize: number,
    maxFontSize: number,
    fontSize: number,
    lineHeight: number,
    fontFamily: string,
    align: string,
    borders: {
      x: number,
      y: number,
      width: number,
      height: number
    }
  };
  image: {
    src: string,
  };
}

export interface Text {
  value: string;
}

export interface StorageState {
  templates: Template[];
  texts: Text[];
}
