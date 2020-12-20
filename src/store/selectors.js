export const getLayoutState = store => store.layout

export const getSidebarVis = store => getLayoutState(store)?.sidebarVis
