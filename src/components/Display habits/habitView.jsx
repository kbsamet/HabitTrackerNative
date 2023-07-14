import {
  AppState,
  Dimensions,
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {
  createRef,
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';
import HabitBox from './habitBox';
import {Col, Row, Grid} from 'react-native-easy-grid';
import {daysIntoYear, monthNames} from '../../consts/date';
import {NUM_OF_DAYS} from '../../consts/globals';
import NameBox from './NameBox';
import DateBox from './dateBox';
import NoteBox from './noteBox';
import NoteDivider from './noteDivider';
import {isCloseToBottom} from '../../consts/helpers';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

const HabitsView = forwardRef(function HabitsView(
  {
    habits,
    editMode,
    setEditMode,
    onDeleteHabit,
    isLandscape,
    onMoveHabit,
    refreshHabits,
  },
  viewRef,
) {
  const [dateNames, setDateNames] = useState([]);

  const [dataSourceCords, setDataSourceCords] = useState([]);
  const [expandedNoteIndex, setExpandedNoteIndex] = useState(-1);
  let ref = createRef();
  const appState = useRef(AppState.currentState);
  const [appStateVisible, setAppStateVisible] = useState(appState.current);
  const [day, setDay] = useState(daysIntoYear(new Date()));
  const [year, setYear] = useState(new Date().getFullYear());
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const subscription = AppState.addEventListener('change', nextAppState => {
      if (
        appState.current.match(/inactive|background/) &&
        nextAppState === 'active'
      ) {
        console.log('App has come to the foreground!');
        setDay(daysIntoYear(new Date()));
        setYear(new Date().getFullYear());
        refreshHabits();
      }

      appState.current = nextAppState;
      setAppStateVisible(appState.current);
    });

    return () => {
      subscription.remove();
    };
  }, []);

  useEffect(() => {
    const newDateNames = [];
    const today = new Date();
    for (
      let i = 0;
      i < Math.min(NUM_OF_DAYS + offset, daysIntoYear(today));
      i++
    ) {
      const date = new Date(today);
      date.setDate(today.getDate() - i);
      newDateNames.push(
        date.getDate().toString() + '\n' + monthNames[date.getMonth()],
      );
    }

    setDateNames(newDateNames);
  }, [offset]);

  const scrollToIndex = index => {
    ref.current.scrollTo({
      x: 0,
      y: dataSourceCords[index],
      animated: true,
    });
  };

  useImperativeHandle(viewRef, () => ({
    scrollToIndex(index) {
      ref.current.scrollTo({
        x: 0,
        y: dataSourceCords[index],
        animated: true,
      });
    },
  }));

  return !habits ? (
    <View />
  ) : (
    <View style={styles.grid}>
      <Grid style={styles.grid}>
        <ScrollView horizontal={true}>
          <Col>
            <Row style={{height: 50, marginBottom: 10}}>
              <DateBox
                text={''}
                onEdge={true}
                scrollToTop={() => scrollToIndex(0)}
              />
              {Object.keys(habits).map((name, index) => (
                <NameBox
                  key={index}
                  text={name}
                  editMode={editMode}
                  onDeleteHabit={() => onDeleteHabit(name)}
                  onEdge={index === Object.keys(habits).length - 1}
                  isLandscape={isLandscape}
                  onMoveHabit={onMoveHabit}
                  setEditMode={setEditMode}
                />
              ))}
            </Row>

            <ScrollView
              ref={ref}
              onScroll={e => {
                if (isCloseToBottom(e.nativeEvent)) {
                  if (day - NUM_OF_DAYS - offset < 0) {
                    return;
                  }
                  setOffset(offset + 10);
                }
              }}
              scrollEventThrottle={400}>
              <Row>
                <Col style={{width: 75}}>
                  {dateNames.map((dateName, index) => (
                    <>
                      <DateBox
                        key={index}
                        text={dateName}
                        setExpandedNoteIndex={setExpandedNoteIndex}
                        index={index}
                        expandedNoteIndex={expandedNoteIndex}
                        setDataSourceCords={setDataSourceCords}
                      />
                      <NoteDivider
                        setExpandedNoteIndex={setExpandedNoteIndex}
                        index={index}
                        expanded={index === expandedNoteIndex}
                        key={'note' + index}
                      />
                    </>
                  ))}
                </Col>
                {Object.keys(habits).map((habitName, index) => (
                  <Col key={index}>
                    {habits[habitName].data[year]
                      .slice(Math.max(0, day - NUM_OF_DAYS - offset), day)
                      .reverse()
                      .map((habit, i) => (
                        <>
                          <HabitBox
                            name={habitName}
                            key={i}
                            initialState={habit}
                            index={[year, day - i - 1]}
                            isLandscape={isLandscape}
                          />
                          <NoteBox
                            expanded={i === expandedNoteIndex}
                            key={'note' + i}
                            habitName={habitName}
                            index={[year, day - i - 1]}
                            note={habits[habitName].notes[year][day - i - 1]}
                            isLandscape={isLandscape}
                            onPress={() => scrollToIndex(i)}
                          />
                        </>
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
});

export default HabitsView;

const styles = StyleSheet.create({
  grid: {
    width: '100%',
    height: '100%',
    marginHorizontal: 5,
    justifyContent: 'flex-start',
  },
});
