import React from 'react'

import { makeStyles } from '@material-ui/core/styles'

import BottomBlock from '../BottomBlock'
import SideButtons from '../SideButtons'
import ChannelTile from './ChannelTile'
import Connector from './Connector'

const PAGE_LENGTH = 6

const useStyles = makeStyles({
  buttonChannelTilesRow: {
    display: 'flex',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  tile: {
    flex: 1,
    height: '100%',
    marginRight: '1vw',
    ['&:last-child']: {
      marginRight: 0,
    },
  },
})

const EmptyTile = () => {
  return (
    <div />
  )
}

const ButtonChannelTilesRow = ({id, channels, title}) => {
  const classes = useStyles()

  let baseIndex = 0

  return (
    <Connector channels={channels} id={id} pageSize={PAGE_LENGTH}>{
      ({displayChannels, goNextPage, goPrevPage, numPages, pageNum}) => (
        <BottomBlock numPages={numPages} pageNum={pageNum} titleRest={title}>
          <SideButtons
            accentColor="magenta"
            onLeftClick={goPrevPage}
            onRightClick={goNextPage}>
            <div className={classes.buttonChannelTilesRow}>
              {[
                ...displayChannels.map(
                  channel => (
                    <div key={baseIndex++} className={classes.tile}>
                      <ChannelTile channel={channel}/>
                    </div>
                  )
                ),
                ...(
                  () => {
                    const result = []
                    for (let i = displayChannels.length; i < PAGE_LENGTH; i++) {
                      result.push(
                        <div key={baseIndex++} className={classes.tile}>
                          <EmptyTile/>
                        </div>
                      )
                    }
                    return result
                  }
                )()
              ]}
            </div>
          </SideButtons>
        </BottomBlock>
      )
    }</Connector>
  )
}

export default ButtonChannelTilesRow
