export default class IndexDb{
  constructor(){
  }

  dataBaseName:string=''
  version:number=1
  db:IDBDatabase

  openDb(){
    let request = window.indexedDB.open(this.dataBaseName, this.version);
    let self=this
    request.onsuccess = function (event:any) {
      self.db = request.result;
      console.log('数据库打开成功');
    };

    request.onerror = function (event:any) {
      console.log('数据库打开报错');
    };
    request.onupgradeneeded = function (event:any) {
      self.db = event.target.result;
      let objectStore:any = null
      if (!self.db.objectStoreNames.contains('chapter')) {
        objectStore = self.db.createObjectStore('chapter', { keyPath: 'id' });
        objectStore.createIndex('name', 'name', {});
        objectStore.createIndex('content', 'content', {});
      }
    }
  }


}