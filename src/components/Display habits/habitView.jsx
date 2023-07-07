import {FlatList, ScrollView, StyleSheet, Text, View} from 'react-native';
import React, {createRef, useEffect, useState} from 'react';
import HabitBox from './habitBox';
import {Col, Row, Grid} from 'react-native-easy-grid';
import {daysIntoYear, monthNames} from '../../consts/date';
import {NUM_OF_DAYS} from '../../consts/globals';
import NameBox from './NameBox';
import DateBox from './dateBox';

const HabitsView = ({habits, editMode, onDeleteHabit}) => {
  const [dateNames, setDateNames] = useState([]);

  const [dataSourceCords, setDataSourceCords] = useState([]);
  let ref = createRef();

  const year = new Date().getFullYear();
  const day = daysIntoYear(new Date());

  useEffect(() => {
    console.log(day);
    const newDateNames = [];
    const today = new Date();
    for (let i = 0; i < NUM_OF_DAYS; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() - i);
      newDateNames.push(
        date.getDate().toString() + '\n' + monthNames[date.getMonth()],
      );
    }

    setDateNames(newDateNames);
  }, []);

  useEffect(() => {
    console.log(ref.current.scrollTo);
    ref.current.scrollTo({
      x: 0,
      y: dataSourceCords[new Date().getDate() - 1],
      animated: true,
    });
  }, [dataSourceCords, ref]);

  return (
    <View style={styles.grid}>
      <Grid style={styles.grid}>
        <ScrollView horizontal={true}>
          <Col>
            <Row style={{height: 50, marginBottom: 10}}>
              <DateBox text={''} onEdge={true} />
              {Object.keys(habits).map((name, index) => (
                <NameBox
                  key={index}
                  text={name}
                  editMode={editMode}
                  onDeleteHabit={() => onDeleteHabit(name)}
                  onEdge={index === Object.keys(habits).length - 1}
                />
              ))}
            </Row>

            <ScrollView ref={ref}>
              <Row>
                <Col style={{width: 75}}>
                  {dateNames.map((dateName, index) => (
                    <DateBox key={index} text={dateName} />
                  ))}
                </Col>
                {Object.values(habits).map((habitData, index) => (
                  <Col key={index}>
                    {habitData.data[year]
                      .slice(day - NUM_OF_DAYS, day)
                      .reverse()
                      .map((habit, i) => (
                        <HabitBox
                          name={Object.keys(habits)[index]}
                          key={i}
                          initialState={habit}
                          index={[year, day - i - 1]}
                          onLayout={event => {
                            const layout = event.nativeEvent.layout;
                            dataSourceCords[i] = layout.y;
                            setDataSourceCords(dataSourceCords);
                          }}
                        />
                      ))}
                  </Col>
                ))}
              </Row>
            </ScrollView>
          </Col>
        </ScrollView>
      </Grid>
    </View>
  );
};

export default HabitsView;

const styles = StyleSheet.create({
  grid: {
    width: '100%',
    height: '100%',
    marginHorizontal: 5,
    justifyContent: 'flex-start',
  },
});