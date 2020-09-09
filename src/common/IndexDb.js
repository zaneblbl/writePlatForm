export default class IndexDb{
  constructor(){
  }

  dataBaseName=''
  version=1
  db=''

  openDb(){
    let request = window.indexedDB.open(this.dataBaseName, this.version);
    let self=this
    request.onsuccess = function () {
      self.db = request.result;
      console.log('数据库打开成功');
    };

    request.onerror = function () {
      console.log('数据库打开报错');
    };
    request.onupgradeneeded = function (event) {
      self.db = event.target.result;
      let objectStore = null
      if (!self.db.objectStoreNames.contains('chapter')) {
        objectStore = self.db.createObjectStore('chapter', { keyPath: 'id' });
        objectStore.createIndex('name', 'name', {});
        objectStore.createIndex('content', 'content', {});
      }
    }
  }


}