import React from 'react';
import { Button, Alert, AlertTitle, Modal } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { useSelector, useDispatch } from 'react-redux';
import { actions, selectors } from '../../store';
import axios from 'axios';
import { colors } from '../../styling';

const useStyles = makeStyles((theme) => ({
  modalWrapper: {
    position: 'absolute',
    width: 500,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-around',
    backgroundColor: colors.darkGray,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    color: 'white',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    outline: 'none',
    borderRadius: '5px',
    height: 500,
  },
  options: {
    display: 'flex',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
}));

const SubscriptionModal = ({ open, setOpen }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const user = useSelector(selectors.getUser);
  const profile = useSelector(selectors.getUserData);

  const validateUser = (e) => {
    const priceId =
      e.target.name === 'single'
        ? 'price_1JxbxTK8kLgNdK0kExpOHqwS'
        : 'price_1Jxc73K8kLgNdK0k36MGMUk2';
    if (profile) {
      axios
        .post('https://leagueday-api.herokuapp.com/proxies/checkout', { priceId })
        .then((res) => console.log('sub res ', res))
        .catch((err) => console.log('sub error ', err));
    } else if (!user) {
      setOpen(false);
      dispatch(actions.login());
    }
  };
  
  return (
    <Modal open={open} onClose={() => setOpen(false)}>
      <div className={classes.modalWrapper}>
        <h3>
          To stream RIOT games casting coverage, please choose one of the
          following options:
        </h3>
        {user && !profile && (
          <>
            <p>
              You'll need to create a LeagueDay profile to subscribe to RIOT
              games <a href="https://leaguedayapp.gg/create">Take me there</a>
            </p>
          </>
        )}
        <div className={classes.options}>
          <Button
            onClick={validateUser}
            name="single"
            disabled={user && !profile}
          >
            Single Stream
            <br />
            $2.00
          </Button>
          <Button
            onClick={validateUser}
            name="subscription"
            disabled={user && !profile}
          >
            3 month subscription
            <br />
            $5.00
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default SubscriptionModal;
