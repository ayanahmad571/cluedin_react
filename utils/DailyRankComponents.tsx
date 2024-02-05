import React, {useEffect, useState} from 'react';
import {View, Text} from 'react-native';
import {CLUEDIN_THEME} from './constants';
import DailyRankComponent from './DailyRankComponent';

const DailyRankComponents = ({allData, curData}) => {
  const [showContent, setshowContent] = useState(false);

  useEffect(() => {
    if (allData.length > 0) {
      setshowContent(true);
    }
    // console.log(allData);
  }, [allData]);

  return showContent === false ? (
    <></>
  ) : (
    <View
      style={{
        padding: 10,
        borderRadius: 10,
      }}>
      <Text
        style={{
          color: CLUEDIN_THEME.white,
          fontWeight: '600',
          fontSize: 25,
          marginBottom: 10,
          textAlign:'center',
        }}>
        Today's Participants
      </Text>
      <DailyRankComponent userData={curData} cur={true} />
      {allData.map((userData, index) => (
        <DailyRankComponent key={index} userData={userData} />
      ))}
    </View>
  );
};

export default DailyRankComponents;
