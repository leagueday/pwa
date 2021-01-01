import * as IdbKv from 'idb-keyval'

const dbName = 'LeagueDay'

const stores = { }

const getStore =
  storeName =>
    stores[storeName] ?? (
      () => {
        const store = new IdbKv.Store(dbName, storeName)
        stores[storeName] = store
        return store
      }
    )()

export const setupIdbKv =
  storeName =>
    (
      store => ({
        get: key => key ? IdbKv.get(key, store) : null,
        set: (key, value) => IdbKv.set(key, value, store),
      })
    )(
      getStore(storeName)
    )
