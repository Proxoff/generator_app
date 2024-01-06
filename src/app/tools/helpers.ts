import { Subject } from 'rxjs';

export const uploadFileData = (accept?: string, multiple?: boolean) => {
  const input = document.createElement('input');
  const loadSubject: Subject<string> = new Subject();

  let filesLoaded = 0;

  input.type = 'file';
  input.multiple = multiple;
  input.accept = accept;

  input.click();

  input.onchange = () => {
    for (const file of Array.from(input.files)) {
      const fileReader = new FileReader();

      fileReader.readAsDataURL(file);

      fileReader.onload = progressEvent => {
        loadSubject.next((progressEvent.target as any).result);

        filesLoaded++;

        if (filesLoaded >= input.files.length) {
          loadSubject.complete();
        }
      };
    }
  };

  return loadSubject;
};

export const downloadURI = (uri, name) => {
  const link = document.createElement('a');

  link.download = name;
  link.href = uri;

  document.body.appendChild(link);

  link.click();

  document.body.removeChild(link);
};
