import * as idb_keyval from 'idb-keyval'

const now = () => Date.now() / 1000

export class IdbKv {
  static MISS = 1
  static FRESH = 2
  static STALE = 3

  #freshness
  #store

  constructor(storeName, freshness) {
    this.#store = new idb_keyval.Store(`LeagueDay_${storeName}`, storeName)
    this.#freshness = freshness
  }

  _getRecordCacheStatus(cacheRecord) {
    if (!cacheRecord) return IdbKv.MISS

    const t = cacheRecord.t
    if (!t) return IdbKv.MISS

    const isFresh = now() - t < this.#freshness
    return isFresh ? IdbKv.FRESH : IdbKv.STALE
  }

  async get(key) {
    const maybeCacheRecord = await idb_keyval.get(key, this.#store)

    return [this._getRecordCacheStatus(maybeCacheRecord), maybeCacheRecord?.data]
  }

  async set(key, value) {
    const cacheRecord = { t: now(), data: value }

    return idb_keyval.set(key, cacheRecord, this.#store)
  }
}
