import * as idb_keyval from 'idb-keyval'

const now = () => Date.now() / 1000

export class IdbKvSet {
  #store

  constructor(storeName) {
    this.#store = new idb_keyval.Store(`LeagueDay_${storeName}`, storeName)
  }

  async add(key) {
    return idb_keyval.set(key, 1, this.#store)
  }

  async clear() {
    return idb_keyval.clear(this.#store)
  }

  async has(key) {
    return idb_keyval.get(key, this.#store).then(
      maybeVal => !!maybeVal
    )
  }

  async list() {
    return idb_keyval.keys(this.#store)
  }

  async remove(key) {
    return idb_keyval.del(key, this.#store)
  }
}

export class IdbKvTimedExpiryCache {
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
    if (!cacheRecord) return IdbKvTimedExpiryCache.MISS

    const t = cacheRecord.t
    if (!t) return IdbKvTimedExpiryCache.MISS

    const isFresh = now() - t < this.#freshness
    return isFresh ? IdbKvTimedExpiryCache.FRESH : IdbKvTimedExpiryCache.STALE
  }

  async get(key) {
    const maybeCacheRecord = await idb_keyval.get(key, this.#store)

    return [this._getRecordCacheStatus(maybeCacheRecord), maybeCacheRecord?.data]
  }

  async set(key, value) {
    const cacheRecord = { t: now(), data: value }

    return idb_keyval.del(key, this.#store).then(
      () => idb_keyval.set(key, cacheRecord, this.#store)
    )
  }
}
