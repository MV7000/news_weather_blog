import { getDownloadURL, listAll } from 'firebase/storage';

export const readDatabase = (setFunc, arrRef) => {
  listAll(arrRef).then(res => {
    res.items.forEach(item => {
      getDownloadURL(item).then(url => {
        setFunc(prev => [...prev, { url, name: item._location.path_ }]);
      });
    });
  });
};
