import {actions, constants as storeConsts} from '../../store'

export const isMatchingFilter = (storeFilter, filterKind, filterParam) => {
  if (!storeFilter || !filterKind) return false

  if (filterKind !== storeFilter.kind) return false

  return (filterKind === storeConsts.FILTER_KIND_CAT && filterParam === storeFilter.cat) ||
    (filterKind === storeConsts.FILTER_KIND_SUBCAT && filterParam === storeFilter.subcat) ||
    (
      filterKind === storeConsts.FILTER_KIND_FEATURED ||
      filterKind === storeConsts.FILTER_KIND_MY_LIST
    )
}

export const makeFilterOnclick = (dispatch, filterKind, filterParam) => () => {
  dispatch(actions.setFilter(
    filterKind,
    filterKind === storeConsts.FILTER_KIND_CAT ? filterParam : null,
    filterKind === storeConsts.FILTER_KIND_SUBCAT ? filterParam : null))
}
