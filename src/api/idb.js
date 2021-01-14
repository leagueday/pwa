import * as idb_keyval from 'idb-keyval'

const now = () => Date.now() / 1000

export class IdbKvMap {
  #store

  constructor(storeName) {
    this.#store = new idb_keyval.Store(`LeagueDay_${storeName}`, storeName)
  }

  async set(key, val) {
    return idb_keyval.set(key, val, this.#store)
  }

  async clear() {
    return idb_keyval.clear(this.#store)
  }

  async get(key) {
    return idb_keyval.get(key, this.#store)
  }

  async list() {
    return idb_keyval.keys(this.#store)
  }

  async remove(key) {
    return idb_keyval.del(key, this.#store)
  }
}

export class IdbKvSet extends IdbKvMap {
  constructor(storeName) {
    super(storeName)
  }

  async add(key) {
    return super.set(key, 1)
  }

  async has(key) {
    return super.get(key).then(
      maybeVal => !!maybeVal
    )
  }
}

export class IdbKvTimedExpiryCache {
  static MISS = 'miss'
  static FRESH = 'fresh'
  static STALE = 'stale'

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
