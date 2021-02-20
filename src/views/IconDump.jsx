import React from 'react'

import { makeStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'

import * as colors from '../styling/colors'

import IcoArrangeListActive from './icons/IcoArrangeListActive'
import IcoArrangeList from './icons/IcoArrangeList'
import IcoButtonOntheair from './icons/IcoButtonOntheair'
import IcoButtonWhite from './icons/IcoButtonWhite'
import IcoDropDown1 from './icons/IcoDropDown1'
import IcoDropDown from './icons/IcoDropDown'
import IcoGlobeC from './icons/IcoGlobeC'
import IcoGlobeM from './icons/IcoGlobeM'
import IcoGlobeV from './icons/IcoGlobeV'
import IcoGlobeY from './icons/IcoGlobeY'
import IcoGlobe from './icons/IcoGlobe'
import IcoHome1 from './icons/IcoHome1'
import IcoHome2 from './icons/IcoHome2'
import IcoHome from './icons/IcoHome'
import Ico15fwd from './icons/Ico15fwd'
import Ico15rwdHover from './icons/Ico15rwdHover'
import Ico1aPlayingNeutral from './icons/Ico1aPlayingNeutral'
import Ico1bPlayingLive from './icons/Ico1bPlayingLive'
import Ico2aPlay from './icons/Ico2aPlay'
import Ico2bPlay from './icons/Ico2bPlay'
import Ico3aPause from './icons/Ico3aPause'
import Ico3bPause from './icons/Ico3bPause'
import IcoFwd15 from './icons/IcoFwd15'
import IcoLilPlayHover from './icons/IcoLilPlayHover'
import IcoLilPlay from './icons/IcoLilPlay'
import IcoLilPlusActive from './icons/IcoLilPlusActive'
import IcoLilPlusHover from './icons/IcoLilPlusHover'
import IcoLilPlus from './icons/IcoLilPlus'
import IcoMinusButton from './icons/IcoMinusButton'
import IcoModuleAdjust from './icons/IcoModuleAdjust'
import IcoPlusHover1 from './icons/IcoPlusHover1'
import IcoPlusHover from './icons/IcoPlusHover'
import IcoPlus from './icons/IcoPlus'
import IcoRwd15 from './icons/IcoRwd15'
import IcoSearch from './icons/IcoSearch'
import IcoSkipHover from './icons/IcoSkipHover'
import IcoSkip from './icons/IcoSkip'
import IcoVol100UpHover from './icons/IcoVol100UpHover'
import IcoVol100 from './icons/IcoVol100'
import IcoVol25Hover from './icons/IcoVol25Hover'
import IcoVol25 from './icons/IcoVol25'
import IcoVol50Hover from './icons/IcoVol50Hover'
import IcoVol50 from './icons/IcoVol50'
import IcoList from './icons/IcoList'
import IcoMinus1 from './icons/IcoMinus1'
import IcoMinus from './icons/IcoMinus'
import IcoNavBackHover from './icons/IcoNavBackHover'
import IcoNavBackNeutral from './icons/IcoNavBackNeutral'
import IcoNavBack from './icons/IcoNavBack'
import IcoNavFwdHover from './icons/IcoNavFwdHover'
import IcoNavFwdNeutral from './icons/IcoNavFwdNeutral'
import IcoNavFwd from './icons/IcoNavFwd'
import IcoPause from './icons/IcoPause'
import IcoResize from './icons/IcoResize'
import IcoSettingsAdjust1 from './icons/IcoSettingsAdjust1'
import IcoSettingsAdjust2 from './icons/IcoSettingsAdjust2'
import IcoSettingsAdjust from './icons/IcoSettingsAdjust'
import IcoUser from './icons/IcoUser'
import IcoSocCloudDownload1 from './icons/IcoSocCloudDownload1'
import IcoSocCloudDownload2 from './icons/IcoSocCloudDownload2'
import IcoSocCloudDownload3 from './icons/IcoSocCloudDownload3'
import IcoSocCloudDownload4 from './icons/IcoSocCloudDownload4'
import IcoSocCloudDownload5 from './icons/IcoSocCloudDownload5'
import IcoSocCloudDownload6 from './icons/IcoSocCloudDownload6'
import IcoSocCloudDownload7 from './icons/IcoSocCloudDownload7'
import IcoSocCloudDownload from './icons/IcoSocCloudDownload'
import IcoSocDiscord1 from './icons/IcoSocDiscord1'
import IcoSocDiscord2 from './icons/IcoSocDiscord2'
import IcoSocDiscord3 from './icons/IcoSocDiscord3'
import IcoSocDiscord4 from './icons/IcoSocDiscord4'
import IcoSocDiscord5 from './icons/IcoSocDiscord5'
import IcoSocDiscord6 from './icons/IcoSocDiscord6'
import IcoSocDiscord7 from './icons/IcoSocDiscord7'
import IcoSocDiscord from './icons/IcoSocDiscord'
import IcoSocInstagram1 from './icons/IcoSocInstagram1'
import IcoSocInstagram2 from './icons/IcoSocInstagram2'
import IcoSocInstagram3 from './icons/IcoSocInstagram3'
import IcoSocInstagram4 from './icons/IcoSocInstagram4'
import IcoSocInstagram5 from './icons/IcoSocInstagram5'
import IcoSocInstagram6 from './icons/IcoSocInstagram6'
import IcoSocInstagram7 from './icons/IcoSocInstagram7'
import IcoSocInstagram from './icons/IcoSocInstagram'
import IcoSocShare1 from './icons/IcoSocShare1'
import IcoSocShare2 from './icons/IcoSocShare2'
import IcoSocShare3 from './icons/IcoSocShare3'
import IcoSocShare4 from './icons/IcoSocShare4'
import IcoSocShare5 from './icons/IcoSocShare5'
import IcoSocShare6 from './icons/IcoSocShare6'
import IcoSocShare7 from './icons/IcoSocShare7'
import IcoSocShare from './icons/IcoSocShare'
import IcoSocTwitch1 from './icons/IcoSocTwitch1'
import IcoSocTwitch2 from './icons/IcoSocTwitch2'
import IcoSocTwitch3 from './icons/IcoSocTwitch3'
import IcoSocTwitch4 from './icons/IcoSocTwitch4'
import IcoSocTwitch5 from './icons/IcoSocTwitch5'
import IcoSocTwitch6 from './icons/IcoSocTwitch6'
import IcoSocTwitch7 from './icons/IcoSocTwitch7'
import IcoSocTwitch from './icons/IcoSocTwitch'
import IcoSocTwitter1 from './icons/IcoSocTwitter1'
import IcoSocTwitter2 from './icons/IcoSocTwitter2'
import IcoSocTwitter3 from './icons/IcoSocTwitter3'
import IcoSocTwitter4 from './icons/IcoSocTwitter4'
import IcoSocTwitter5 from './icons/IcoSocTwitter5'
import IcoSocTwitter6 from './icons/IcoSocTwitter6'
import IcoSocTwitter7 from './icons/IcoSocTwitter7'
import IcoSocTwitter from './icons/IcoSocTwitter'

const useStyles = makeStyles({
  iconDump: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    width: '100%',
  },
  iconDumpCell: {
  },
  iconDumpGrid: {
  },
  iconDumpHeading: {
    backgroundColor: colors.blackPlum,
    color: colors.vintageTubeFaint,
    fontSize: '150%',
    padding: '1em',
    textAlign: 'center',
    width: '100%',
  },
})

const iconsList = [
  IcoArrangeListActive,
  IcoArrangeList,
  IcoButtonOntheair,
  IcoButtonWhite,
  IcoDropDown1,
  IcoDropDown,
  IcoGlobeC,
  IcoGlobeM,
  IcoGlobeV,
  IcoGlobeY,
  IcoGlobe,
  IcoHome1,
  IcoHome2,
  IcoHome,
  Ico15fwd,
  Ico15rwdHover,
  Ico1aPlayingNeutral,
  Ico1bPlayingLive,
  Ico2aPlay,
  Ico2bPlay,
  Ico3aPause,
  Ico3bPause,
  IcoFwd15,
  IcoLilPlayHover,
  IcoLilPlay,
  IcoLilPlusActive,
  IcoLilPlusHover,
  IcoLilPlus,
  IcoMinusButton,
  IcoModuleAdjust,
  IcoPlusHover1,
  IcoPlusHover,
  IcoPlus,
  IcoRwd15,
  IcoSearch,
  IcoSkipHover,
  IcoSkip,
  IcoVol100UpHover,
  IcoVol100,
  IcoVol25Hover,
  IcoVol25,
  IcoVol50Hover,
  IcoVol50,
  IcoList,
  IcoMinus1,
  IcoMinus,
  IcoNavBackHover,
  IcoNavBackNeutral,
  IcoNavBack,
  IcoNavFwdHover,
  IcoNavFwdNeutral,
  IcoNavFwd,
  IcoPause,
  IcoResize,
  IcoSettingsAdjust1,
  IcoSettingsAdjust2,
  IcoSettingsAdjust,
  IcoUser,
  IcoSocCloudDownload1,
  IcoSocCloudDownload2,
  IcoSocCloudDownload3,
  IcoSocCloudDownload4,
  IcoSocCloudDownload5,
  IcoSocCloudDownload6,
  IcoSocCloudDownload7,
  IcoSocCloudDownload,
  IcoSocDiscord1,
  IcoSocDiscord2,
  IcoSocDiscord3,
  IcoSocDiscord4,
  IcoSocDiscord5,
  IcoSocDiscord6,
  IcoSocDiscord7,
  IcoSocDiscord,
  IcoSocInstagram1,
  IcoSocInstagram2,
  IcoSocInstagram3,
  IcoSocInstagram4,
  IcoSocInstagram5,
  IcoSocInstagram6,
  IcoSocInstagram7,
  IcoSocInstagram,
  IcoSocShare1,
  IcoSocShare2,
  IcoSocShare3,
  IcoSocShare4,
  IcoSocShare5,
  IcoSocShare6,
  IcoSocShare7,
  IcoSocShare,
  IcoSocTwitch1,
  IcoSocTwitch2,
  IcoSocTwitch3,
  IcoSocTwitch4,
  IcoSocTwitch5,
  IcoSocTwitch6,
  IcoSocTwitch7,
  IcoSocTwitch,
  IcoSocTwitter1,
  IcoSocTwitter2,
  IcoSocTwitter3,
  IcoSocTwitter4,
  IcoSocTwitter5,
  IcoSocTwitter6,
  IcoSocTwitter7,
  IcoSocTwitter,
]

const IconDump = () => {
  const classes = useStyles()

  const nextCounter = (
    counter => () => { counter = counter + 1; return counter }
  )(0)

  return (
    <div className={classes.iconDump}>
      <div className={classes.iconDumpHeading}>
        icons
      </div>
      <Grid className={classes.iconDumpGrid} container spacing={1}>
        { iconsList.map(Icon => (
          <Grid
            key={nextCounter()}
            className={classes.iconDumpCell}
            item
            sm={1}
          >
            <Icon />
          </Grid>
        )) }
      </Grid>
    </div>
  )
}

export default IconDump
