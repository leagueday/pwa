import * as idb_keyval from 'idb-keyval'

export class IdbKv {
  constructor(tag) {
    this._dbName = `LeagueDay_${tag}`
    this._storeName = tag
    this._store = new idb_keyval.Store(this._dbName, this._storeName)
  }

  get(key) {
    if (!key) return Promise.resolve(null)

    return idb_keyval.get(key, this._store)
  }

  set(key, value) {
    if (!key) return Promise.resolve(null)

    return idb_keyval.set(key, value, this._store)
  }
}
