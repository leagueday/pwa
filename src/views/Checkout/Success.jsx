import React, { useEffect } from 'react';
import BasicLayout from '../BasicLayout';
import { base } from '../..';
import { selectors } from '../../store';
import { useSelector } from 'react-redux';

const Success = () => {
  const userProfile = useSelector(selectors.getUserData);

  useEffect(() => {
    if (userProfile) {
      base('UserProfile').update(
        [
          {
            id: userProfile.id,
            fields: {
              subscriptions: 'true',
            },
          },
        ],
        function (err, records) {
          console.log('edit profile ', records);
          if (err) {
            console.error(err);
            return;
          }
        }
      );
    }
  }, [userProfile]);

  return (
    <BasicLayout home>
      <div>
        <h1>Thanks for your order!</h1>
        <p>Enjoy the stream!</p>
        <p><a href="https://leaguedayapp.gg/channel/lol">League of Legends channel page</a></p>
      </div>
    </BasicLayout>
  );
};

export default Success;
