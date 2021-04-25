import React from 'react'
import { useSelector } from 'react-redux'
import Color from 'color'
import cx from 'classnames'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'

import { makeStyles } from '@material-ui/core'
import Button from '@material-ui/core/Button'
import Card from '@material-ui/core/Card'
import Modal from '@material-ui/core/Modal'
import TextField from '@material-ui/core/TextField'

import ChannelsOperations from '../../api/ChannelsOperations'
import FacetsOperations from '../../api/FacetsOperations'
import PodcastsListOperations from '../../api/PodcastsListOperations'
import { selectors } from '../../store'
import { colors } from '../../styling'
import { addScrollStyle } from '../util'

const darkBlue = Color(colors.blue).darken(0.67).string()
const darkMagenta = Color(colors.magenta).darken(0.67).string()
const darkOrange = Color(colors.orange).darken(0.67).string()

const useStyles = makeStyles(theme => ({
  facets: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
  },
  facetsList: addScrollStyle(
    darkMagenta,
    theme
  )({
    fontSize: '85%',
    overflow: 'auto',
  }),
  inlineButton: {
    height: '1.5em',
    margin: '0 0.5em',
  },
  instructions: {
    border: `1px solid ${darkMagenta}`,
    color: colors.white80,
    display: 'flex',
    flexDirection: 'column',
    margin: '1em',
    padding: '1em',
  },
  instructionsLine: {
    display: 'flex',
    marginBottom: '0.5em',
    width: '100%',
    ['&:last-child']: {
      marginBottom: 0,
    },
  },
  title: {
    fontWeight: theme.typography.weight.bold,
    textDecoration: 'underline',
  },
}))

const useFacetCardStyles = makeStyles(theme => ({
  attributeLine: {
    display: 'flex',
    width: '100%',
  },
  attributeLineName: {
    color: colors.white30,
    marginRight: '0.5em',
  },
  attributeLineValue: {
    color: colors.white80,
  },
  elementsContainer: {},
  elementItem: {
    whiteSpace: 'nowrap',
  },
  facetCard: ({ kind }) =>
    addScrollStyle(
      darkMagenta,
      theme
    )({
      backgroundColor: kind === 'channels' ? darkBlue : darkOrange,
      marginBottom: '0.25em',
      overflowX: 'auto',
      padding: '0.5em',
      ['&:last-child']: {
        marginBottom: 0,
      },
    }),
}))

const useModalStyles = makeStyles(theme => ({
  allElementsBin: {
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden',
    width: '50%',
  },
  bin: {},
  binTitle: {
    fontStyle: 'oblique',
    textAlign: 'center',
  },
  button: {
    marginRight: '0.5em',
    ['&:last-child']: {
      marginRight: 0,
    },
  },
  buttonCell: {
    display: 'flex',
    marginLeft: 'auto',
  },
  buttonRow: {
    display: 'flex',
    marginTop: 'auto',
    width: '100%',
  },
  element: {
    userSelect: 'none',
    whiteSpace: 'nowrap',
  },
  elements: addScrollStyle(
    darkMagenta,
    theme
  )({
    display: 'flex',
    flexDirection: 'column',
    maxHeight: '100%',
    overflow: 'scroll',
    padding: '0.25em',
  }),
  facet: {
    padding: '2em 0.5em',
  },
  facetBin: {
    display: 'flex',
    flexDirection: 'column',
    marginRight: '0.25em',
    width: '50%',
  },
  facetTitleEntry: {
    flex: 1,
  },
  facetTitleLabel: {
    color: colors.white30,
    marginRight: '0.5em',
  },
  facetTitleRow: {
    alignItems: 'baseline',
    display: 'flex',
    marginBottom: '0.5em',
    width: '100%',
  },
  facetTitleValue: {},
  modal: {
    alignItems: 'center',
    display: 'flex',
    fontSize: '85%',
    justifyContent: 'center',
  },
  modalCard: {
    backgroundColor: colors.brandBlack,
    color: colors.white80,
    display: 'flex',
    flexDirection: 'column',
    height: '85%',
    width: '75%',
    padding: '0.5em',
  },
  title: {
    fontWeight: theme.typography.weight.bold,
    marginBottom: '0.25em',
    textDecoration: 'underline',
  },
  twoBins: {
    display: 'flex',
    marginBottom: '0.25em',
    maxHeight: '85%',
  },
}))

const getKeyForPodcast = podcast => podcast?.url
const getKeyForChannel = channel => channel?.tag

const PodcastElement = ({ classes, element }) => (
  <div className={classes.element}>{element?.url}</div>
)

const ChannelElement = ({ classes, element }) => (
  <div className={classes.element}>{element?.tag}</div>
)

const Id = ({ classes, id }) => <div className={classes.element}>{id}</div>

const getLeftListStyle = isDraggingOver => ({
  backgroundColor: colors.darkerGray,
  overflow: 'auto',
  padding: '2.25em 0.25em 2.25em 0.25em',
})

const getRightListStyle = isDraggingOver => ({
  backgroundColor: colors.darkerGray,
  overflow: 'auto',
  padding: '0.25em',
})

const getItemStyle = (isDragging, draggableStyle) => ({
  userSelect: 'none',
  ...draggableStyle,
})

const AddEditModal = ({
  channels,
  facet,
  onClose,
  onOk,
  op,
  open,
  podcastsList,
}) => {
  const classes = useModalStyles()

  const [workingElements, setWorkingElements] = React.useState()
  const [workingTitle, setWorkingTitle] = React.useState('')

  React.useEffect(() => {
    if (facet) {
      setWorkingElements(facet.elements)
      setWorkingTitle(facet.title)
    }
  }, [facet])

  const [title, binTitle, allElements, Element, getKey] = (() => {
    if (!facet) return ['', '', [], () => {}]

    if (op === 'add') {
      if (facet.kind === 'channels') {
        return [
          'Add Channels Facet',
          'All Defined Channels',
          channels,
          ChannelElement,
          getKeyForChannel,
        ]
      } else {
        return [
          'Add Podcasts Facet',
          'All Podcasts',
          podcastsList,
          PodcastElement,
          getKeyForPodcast,
        ]
      }
    } else {
      if (facet.kind === 'channels') {
        return [
          'Edit Channels Facet',
          'All Defined Channels',
          channels,
          ChannelElement,
          getKeyForChannel,
        ]
      } else {
        return [
          'Edit Podcasts Facet',
          'All Podcasts',
          podcastsList,
          PodcastElement,
          getKeyForPodcast,
        ]
      }
    }
  })()

  const okDisabled = false

  const onDragEnd = result => {
    console.log('onDragEnd', result)

    const destinationId = result.destination.droppableId
    const destinationIndex = result.destination.index
    const sourceId = result.source.droppableId
    const sourceIndex = result.source.index
    const draggableId = result.draggableId.substr(1)

    const add = (destinationIndex, idMoving, nextElements) => {
      if (!nextElements) nextElements = workingElements

      setWorkingElements(
        nextElements
          .slice(0, destinationIndex)
          .concat([idMoving])
          .concat(nextElements.slice(destinationIndex))
      )
    }

    const remove = sourceIndex => {
      setWorkingElements(
        workingElements
          .slice(0, sourceIndex)
          .concat(workingElements.slice(sourceIndex + 1))
      )
    }

    const reorderFacet = (destinationIndex, sourceIndex) => {
      if (destinationIndex === sourceIndex) return

      const idMoving = facet.elements[sourceIndex]

      const trimmedElements = facet.elements
        .slice(0, sourceIndex)
        .concat(facet.elements.slice(sourceIndex + 1))

      add(destinationIndex, idMoving, trimmedElements)
    }

    if (destinationId === 'facet') {
      if (sourceId === 'facet') {
        reorderFacet(destinationIndex, sourceIndex)
      } else if (sourceId === 'allElements') {
        add(destinationIndex, draggableId)
      }
    } else if (destinationId === 'allElements') {
      if (sourceId === 'facet') {
        remove(sourceIndex)
      }
    }
  }

  return (
    <Modal className={classes.modal} open={open} onClose={onClose}>
      <Card className={classes.modalCard}>
        <div className={classes.title}>{title}</div>
        <div className={classes.facetTitleRow}>
          <div className={classes.facetTitleLabel}>title</div>
          {op === 'add' ? (
            <TextField
              className={classes.facetTitleEntry}
              size="small"
              onChange={event => setWorkingTitle(event.target.value)}
              value={workingTitle}
            />
          ) : (
            <div className={classes.facetTitleValue}>{facet?.title}</div>
          )}
        </div>
        <DragDropContext onDragEnd={onDragEnd}>
          <div className={classes.twoBins}>
            <div className={classes.facetBin}>
              <div className={classes.binTitle}>Facet Elements</div>
              <Droppable droppableId="facet">
                {(provided, snapshot) => (
                  <div
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                    style={getLeftListStyle(snapshot.isDraggingOver)}
                  >
                    {workingElements &&
                      workingElements.map((id, index) => (
                        <Draggable
                          key={id}
                          draggableId={'F' + id}
                          index={index}
                        >
                          {(provided, snapshot) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              style={getItemStyle(
                                snapshot.isDragging,
                                provided.draggableProps.style
                              )}
                            >
                              <Id classes={classes} id={id} />
                            </div>
                          )}
                        </Draggable>
                      ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </div>
            <div className={classes.allElementsBin}>
              <div className={classes.binTitle}>{binTitle}</div>
              <Droppable droppableId="allElements">
                {(provided, snapshot) => (
                  <div
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                    style={getRightListStyle(snapshot.isDraggingOver)}
                  >
                    {allElements &&
                      allElements.map((element, index) => (
                        <Draggable
                          key={getKey(element)}
                          draggableId={'A' + getKey(element)}
                          index={index}
                        >
                          {(provided, snapshot) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              style={getItemStyle(
                                snapshot.isDragging,
                                provided.draggableProps.style
                              )}
                            >
                              <Element
                                key={getKey(element)}
                                classes={classes}
                                element={element}
                              />
                            </div>
                          )}
                        </Draggable>
                      ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </div>
          </div>
        </DragDropContext>
        <div className={classes.buttonRow}>
          <div className={classes.buttonCell}>
            <Button
              className={classes.button}
              color="primary"
              disabled={okDisabled}
              onClick={() =>
                onOk(op, workingTitle, facet.kind, workingElements)
              }
              size="small"
              variant="contained"
            >
              Ok
            </Button>
            <Button
              className={classes.button}
              color="primary"
              onClick={onClose}
              size="small"
              variant="contained"
            >
              Cancel
            </Button>
          </div>
        </div>
      </Card>
    </Modal>
  )
}

const FacetCard = ({ facet, isMaintenanceOpsEnabled, onEditClick }) => {
  const classes = useFacetCardStyles({ kind: facet.kind })

  return (
    <Card className={classes.facetCard}>
      <div className={classes.attributeLine}>
        <div className={classes.attributeLineName}>title</div>
        <div className={classes.attributeLineValue}>{facet.title}</div>
      </div>
      <div className={classes.attributeLine}>
        <div className={classes.attributeLineName}>kind</div>
        <div className={classes.attributeLineValue}>{facet.kind}</div>
      </div>
      <div className={classes.elementsContainer}>
        <ul>
          {facet &&
            facet.elements.map(element => (
              <li key={element} className={classes.elementItem}>
                {element}
              </li>
            ))}
        </ul>
      </div>
      <Button
        disabled={!isMaintenanceOpsEnabled}
        color="primary"
        onClick={onEditClick}
        size="small"
        variant="contained"
      >
        Edit
      </Button>
    </Card>
  )
}

const Facets = ({ className }) => {
  const classes = useStyles()

  const [facets, setFacets] = React.useState()
  const [channels, setChannels] = React.useState()
  const [podcastsList, setPodcastsList] = React.useState()

  // mechanism to refresh data
  const [refreshCounter, setRefreshCounter] = React.useState(1)
  const refreshData = () => setRefreshCounter(refreshCounter + 1)

  // request credentials
  const user = useSelector(selectors.getUser)
  const bearerToken = user?.token?.access_token

  // data loader (facets)
  React.useEffect(() => {
    if (bearerToken) {
      FacetsOperations.fetch(bearerToken).then(facets => {
        facets.sort((a, b) => {
          const { kind: aKind, title: aTitle } = a
          const { kind: bKind, title: bTitle } = b

          return aKind === bKind
            ? aTitle.localeCompare(bTitle)
            : aKind.localeCompare(bKind)
        })
        setFacets(facets)
      })
    }
  }, [bearerToken, refreshCounter])

  // data loader (channels, used for editing)
  React.useEffect(() => {
    if (bearerToken) {
      ChannelsOperations.fetch(bearerToken).then(channels => {
        channels.sort((a, b) => {
          const { tag: aTag } = a
          const { tag: bTag } = b

          return aTag.localeCompare(bTag)
        })
        setChannels(channels)
      })
    }
  }, [bearerToken])

  // data loader (podcastsList, used for editing)
  React.useEffect(() => {
    if (bearerToken) {
      PodcastsListOperations.fetch(bearerToken).then(list => {
        list.sort((a, b) => {
          const { url: aUrl } = a
          const { url: bUrl } = b
          return aUrl.localeCompare(bUrl)
        })
        setPodcastsList(list)
      })
    }
  }, [bearerToken])

  // add/edit modal controller
  const [addEditFacetModal, setAddEditFacetModal] = React.useState({
    facet: null,
    op: null,
  })
  const showAddChannelsFacetModal = () =>
    setAddEditFacetModal({
      facet: { kind: 'channels', title: '', elements: [] },
      op: 'add',
    })
  const showAddPodcastsFacetModal = () =>
    setAddEditFacetModal({
      facet: { kind: 'podcasts', title: '', elements: [] },
      op: 'add',
    })
  const hideAddEditModal = () => setAddEditFacetModal({ facet: null, op: null })
  const onEditClick = facet => () => {
    setAddEditFacetModal({ facet, op: 'edit' })
  }
  const onModalConfirm = (op, title, kind, elements) => {
    const oper = op === 'add' ? FacetsOperations.add : FacetsOperations.update
    const newFacet = { title, kind, elements }
    oper(bearerToken, newFacet).then(refreshData).then(hideAddEditModal)
  }

  const isMaintenanceOpsEnabled = !!facets && !!channels && !!podcastsList

  return (
    <Card className={cx(classes.facets, className)}>
      <div className={classes.title}>Facets Manager</div>
      <div className={classes.instructions}>
        <div className={classes.instructionsLine}>
          Edit Facets by tapping the related button below, or{' '}
          <span>
            <Button
              className={classes.inlineButton}
              disabled={!isMaintenanceOpsEnabled}
              color="primary"
              onClick={showAddChannelsFacetModal}
              size="small"
              variant="contained"
            >
              Add Channels Facet
            </Button>
          </span>
          , or{' '}
          <span>
            <Button
              className={classes.inlineButton}
              disabled={!isMaintenanceOpsEnabled}
              color="primary"
              onClick={showAddPodcastsFacetModal}
              size="small"
              variant="contained"
            >
              Add Podcasts Facet
            </Button>
          </span>
          .
        </div>
      </div>
      <div className={classes.facetsList}>
        {facets &&
          facets.map(facet => (
            <FacetCard
              key={facet.title}
              facet={facet}
              isMaintenanceOpsEnabled={isMaintenanceOpsEnabled}
              onEditClick={onEditClick(facet)}
            />
          ))}
      </div>
      <AddEditModal
        channels={channels}
        facet={addEditFacetModal.facet}
        onClose={hideAddEditModal}
        onOk={onModalConfirm}
        op={addEditFacetModal.op}
        open={!!addEditFacetModal.op}
        podcastsList={podcastsList}
      />
    </Card>
  )
}

export default Facets
