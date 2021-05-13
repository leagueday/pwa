import React from 'react'
import { useSelector } from 'react-redux'
import Color from 'color'
import cx from 'classnames'

import { makeStyles } from '@material-ui/core'
import Button from '@material-ui/core/Button'
import Card from '@material-ui/core/Card'
import Modal from '@material-ui/core/Modal'
import TextField from '@material-ui/core/TextField'

import ChannelsOperations from '../../api/ChannelsOperations'
import { selectors } from '../../store'
import { colors } from '../../styling'
import { addScrollStyle } from '../util'

const darkMagenta = Color(colors.magenta).darken(0.33).string()

const useStyles = makeStyles(theme => ({
  channelCards: addScrollStyle(
    darkMagenta,
    theme
  )({
    overflow: 'auto',
  }),
  channels: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
  },
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

const useChannelCardStyles = makeStyles(theme => ({
  channelCard: addScrollStyle(
    darkMagenta,
    theme
  )({
    backgroundColor: colors.brandBlack,
    display: 'flex',
    flexDirection: 'column',
    fontFamily: theme.typography.family.secondary,
    fontSize: '85%',
    padding: '0.5em',
    marginBottom: '0.25em',
    marginRight: '0.25em',
    overflowX: 'auto',
    ['&:last-child']: {
      marginBottom: 0,
    },
  }),
  inlineButton: {
    height: '1.5em',
    margin: '0 0.5em',
  },
  line: {
    display: 'flex',
    marginBottom: '0.25em',
    ['&:last-child']: {
      marginBottom: 0,
    },
  },
  lineAttributeName: {
    color: colors.white30,
    marginRight: '0.5em',
  },
  lineAttributeValue: {
    color: colors.white80,
    marginLeft: 'auto',
    whiteSpace: 'nowrap',
  },
}))

const useModalStyles = makeStyles(theme => ({
  attributeLine: {
    alignItems: 'baseline',
    display: 'flex',
    marginBottom: '0.25em',
    width: '100%',
  },
  attributeLineName: {
    color: colors.white30,
    fontFamily: theme.typography.family.secondary,
    marginRight: '0.5em',
  },
  attributeLineTextField: {
    flex: 1,
    marginLeft: 'auto',
  },
  attributeLineValue: {
    color: colors.white80,
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
    marginTop: '0.5em',
    width: '100%',
  },
  modal: {
    alignItems: 'center',
    display: 'flex',
    fontSize: '85%',
    height: '100%',
    justifyContent: 'center',
  },
  modalCard: {
    backgroundColor: colors.brandBlack,
    color: colors.white80,
    display: 'flex',
    flexDirection: 'column',
    width: '75%',
    padding: '0.5em',
  },
  modalCardContent: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
  },
  title: {
    fontWeight: theme.typography.weight.bold,
    textDecoration: 'underline',
  },
}))

const fieldValidators = {
  tag: tag => [tag ? !tag.match(/[^a-z]/) : true, 'only lowercase letters'],
}

const AddOrEditModalFieldLine = ({
  attributeName,
  channel,
  classes,
  onAttributeChange,
  specialValidator,
}) => {
  const onChange = event => onAttributeChange(attributeName, event.target.value)

  const validator = specialValidator
    ? specialValidator
    : fieldValidators[attributeName]

  const value = channel[attributeName]
  const [isValid, diagnostic] = validator ? validator(value) : [true]

  return (
    <div className={classes.attributeLine}>
      <div className={classes.attributeLineName}>{attributeName}</div>
      <TextField
        className={classes.attributeLineTextField}
        error={!isValid}
        helperText={isValid ? null : diagnostic}
        size="small"
        onChange={onChange}
        value={value ? value : ''}
      />
    </div>
  )
}

const AddOrEditModal = ({
  channel,
  isOpen,
  onAttributeChange,
  onClose,
  onOk,
  op,
  validateChildren,
}) => {
  const classes = useModalStyles()

  const taggedValidateChildren = channel ? validateChildren(channel.tag) : null

  const okDisabled = !(channel && channel.tag
    ? fieldValidators.tag(channel.tag)[0] &&
      taggedValidateChildren(channel.children)[0]
    : false)

  return (
    <Modal open={isOpen} onClose={onClose}>
      <div className={classes.modal}>
        <Card className={classes.modalCard}>
          {channel && (
            <div className={classes.modalCardContent}>
              <div className={classes.title}>
                {op === 'add' ? 'Add New Channel' : 'Edit Channel'}
              </div>
              {op === 'add' ? (
                <AddOrEditModalFieldLine
                  attributeName="tag"
                  channel={channel}
                  classes={classes}
                  onAttributeChange={onAttributeChange}
                />
              ) : (
                <div className={classes.attributeLine}>
                  <div className={classes.attributeLineName}>tag</div>
                  <div className={classes.attributeLineValue}>
                    {channel.tag}
                  </div>
                </div>
              )}
              <AddOrEditModalFieldLine
                attributeName="title"
                channel={channel}
                classes={classes}
                onAttributeChange={onAttributeChange}
              />
              <AddOrEditModalFieldLine
                attributeName="imageUrl"
                channel={channel}
                classes={classes}
                onAttributeChange={onAttributeChange}
              />
              <AddOrEditModalFieldLine
                attributeName="largeImageUrl"
                channel={channel}
                classes={classes}
                onAttributeChange={onAttributeChange}
              />
              <AddOrEditModalFieldLine
                attributeName="color"
                channel={channel}
                classes={classes}
                onAttributeChange={onAttributeChange}
              />
              <AddOrEditModalFieldLine
                attributeName="locationNote"
                channel={channel}
                classes={classes}
                onAttributeChange={onAttributeChange}
              />
              <AddOrEditModalFieldLine
                attributeName="backgrounder"
                channel={channel}
                classes={classes}
                onAttributeChange={onAttributeChange}
              />
              <AddOrEditModalFieldLine
                attributeName="backgrounderMore"
                channel={channel}
                classes={classes}
                onAttributeChange={onAttributeChange}
              />
              <AddOrEditModalFieldLine
                attributeName="scheduleNote"
                channel={channel}
                classes={classes}
                onAttributeChange={onAttributeChange}
              />
              <AddOrEditModalFieldLine
                attributeName="scheduleLink"
                channel={channel}
                classes={classes}
                onAttributeChange={onAttributeChange}
              />
              <AddOrEditModalFieldLine
                attributeName="children"
                channel={channel}
                classes={classes}
                onAttributeChange={onAttributeChange}
                specialValidator={taggedValidateChildren}
              />
              <div className={classes.buttonRow}>
                <div className={classes.buttonCell}>
                  <Button
                    className={classes.button}
                    color="primary"
                    disabled={okDisabled}
                    onClick={onOk}
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
            </div>
          )}
        </Card>
      </div>
    </Modal>
  )
}

const ChannelCardAttribute = ({ attributeName, channel, classes }) =>
  channel[attributeName] ? (
    <div className={classes.line}>
      <div className={classes.lineAttributeName}>{attributeName}</div>
      <div className={classes.lineAttributeValue}>{channel[attributeName]}</div>
    </div>
  ) : null

const ChannelCard = ({ channel, isMaintenanceOpsEnabled, showEditModal }) => {
  const classes = useChannelCardStyles()

  return (
    <Card className={classes.channelCard} elevation={2}>
      <ChannelCardAttribute
        attributeName="tag"
        channel={channel}
        classes={classes}
      />
      <ChannelCardAttribute
        attributeName="title"
        channel={channel}
        classes={classes}
      />
      <ChannelCardAttribute
        attributeName="imageUrl"
        channel={channel}
        classes={classes}
      />
      <ChannelCardAttribute
        attributeName="largeImageUrl"
        channel={channel}
        classes={classes}
      />
      <ChannelCardAttribute
        attributeName="color"
        channel={channel}
        classes={classes}
      />
      <ChannelCardAttribute
        attributeName="locationNote"
        channel={channel}
        classes={classes}
      />
      <ChannelCardAttribute
        attributeName="backgrounder"
        channel={channel}
        classes={classes}
      />
      <ChannelCardAttribute
        attributeName="backgrounderMore"
        channel={channel}
        classes={classes}
      />
      <ChannelCardAttribute
        attributeName="scheduleNote"
        channel={channel}
        classes={classes}
      />
      <ChannelCardAttribute
        attributeName="scheduleLink"
        channel={channel}
        classes={classes}
      />
      {channel.children && (
        <div className={classes.line}>
          <div className={classes.lineAttributeName}>children</div>
          <div className={classes.lineAttributeValue}>
            {channel.children.join(', ')}
          </div>
        </div>
      )}
      <div className={classes.line}>
        <Button
          className={classes.inlineButton}
          disabled={!isMaintenanceOpsEnabled}
          color="primary"
          onClick={showEditModal}
          size="small"
          variant="contained"
        >
          Edit
        </Button>
      </div>
    </Card>
  )
}

const Channels = ({ className }) => {
  const classes = useStyles()

  const [channels, setChannels] = React.useState()

  const validateChildren = React.useMemo(() => {
    if (!channels) return () => () => [false]

    const channelTags = channels.map(channel => channel.tag)

    return thisTag => children => {
      if (!children) return [true]
      const trimmedChildren = children.replaceAll(/\s/g, '')
      const childrenList = trimmedChildren.split(',')
      return [
        !childrenList.some(
          child => channelTags.indexOf(child) < 0 || child === thisTag
        ),
        'comma-separated list of valid channel tags',
      ]
    }
  }, [channels])

  // mechanism to refresh data
  const [refreshCounter, setRefreshCounter] = React.useState(1)
  const refreshData = () => setRefreshCounter(refreshCounter + 1)

  // request credentials
  const user = useSelector(selectors.getUser)
  const bearerToken = user?.token?.access_token

  // add/edit modal controller
  const [addEditChannelModal, setAddEditChannelModal] = React.useState({
    channel: null,
    op: null,
  })
  const showAddChannelModal = () =>
    setAddEditChannelModal({
      channel: {},
      op: 'add',
    })
  const showEditChannelModal = channel =>
    setAddEditChannelModal({
      channel,
      op: 'edit',
    })
  const hideAddEditChannelModal = () =>
    setAddEditChannelModal({
      channel: null,
      op: null,
    })

  const onAttributeChange = (name, value) =>
    setAddEditChannelModal({
      ...addEditChannelModal,
      channel: { ...addEditChannelModal.channel, [name]: value },
    })

  // data loader
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
  }, [bearerToken, refreshCounter])

  const isMaintenanceOpsEnabled = !!channels

  const confirmAddOrEdit = () => {
    const opFun =
      addEditChannelModal.op === 'add'
        ? ChannelsOperations.add
        : ChannelsOperations.update

    opFun(bearerToken, addEditChannelModal.channel)
      .then(refreshData)
      .then(hideAddEditChannelModal)
  }

  return (
    <Card className={cx(classes.channels, className)}>
      <div className={classes.title}>Channels</div>
      <div className={classes.instructions}>
        <div className={classes.instructionsLine}>
          Edit or{' '}
          <span>
            <Button
              className={classes.inlineButton}
              disabled={!isMaintenanceOpsEnabled}
              color="primary"
              onClick={showAddChannelModal}
              size="small"
              variant="contained"
            >
              Add
            </Button>
          </span>{' '}
          a channel.
        </div>
      </div>
      <div className={classes.channelCards}>
        {channels &&
          channels.map(channel => (
            <ChannelCard
              key={channel.tag}
              channel={channel}
              isMaintenanceOpsEnabled={isMaintenanceOpsEnabled}
              showEditModal={() => showEditChannelModal(channel)}
            />
          ))}
      </div>
      <AddOrEditModal
        channel={addEditChannelModal.channel}
        validateChildren={validateChildren}
        isOpen={!!addEditChannelModal.op}
        onAttributeChange={onAttributeChange}
        onClose={hideAddEditChannelModal}
        onOk={confirmAddOrEdit}
        op={addEditChannelModal.op}
      />
    </Card>
  )
}

export default Channels
