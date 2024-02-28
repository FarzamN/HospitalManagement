import {View, StatusBar, ScrollView} from 'react-native';
import React, {useState, useCallback} from 'react';
import {Colors} from '../../../../utils/Colors';
import {CustomButton, Header, SubHead,Background} from '../../../../components';
import {GlobalStyle} from '../../../../Constants/GlobalStyle';
import Thumb from '../RecentJobs/RangeSlider/Thumb';
import Rail from '../RecentJobs/RangeSlider/Rail';
import RailSelected from '../RecentJobs/RangeSlider/RailSelected';
import RnRangeSlider from 'rn-range-slider';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import SButton from '../../Shifts/SButton';
import moment from 'moment';

const RecentFilter = () => {
  const [selectJob, setSelectJob] = useState([]);
  const [showStartTime, setShowStartTime] = useState(false);
  const [startTime, setStartTime] = useState('');

  const [showEndTime, setShowEndTime] = useState(false);
  const [endTime, setEndTime] = useState('');

  const [startArea, setStartArea] = useState(17);
  const [endArea, setEndArea] = useState(45);
  const [low, setLow] = useState(17);
  const [high, setHigh] = useState(45);
  const renderThumb = useCallback(name => <Thumb name={name} />, []);
  const renderRail = useCallback(() => <Rail />, []);
  const renderRailSelected = useCallback(() => <RailSelected />, []);

  const onTypeSelect = item => {
    selectJob.includes(item.title)
      ? setSelectJob(selectJob.filter(prev => prev !== item.title))
      : setSelectJob([...selectJob, item.title]);
  };

  const handleStartTime = date => {
    const formattedDate = moment(date).format('DD-MM-YYYY');
    setStartTime(formattedDate);
    setShowStartTime(false);
  };
  const handleEndTime = date => {
    const formattedDate = moment(date).format('DD-MM-YYYY');
    setEndTime(formattedDate);
    setShowEndTime(false);
  };
  return (
    <Background>
      <Header back title="Filter job" gap />
      <StatusBar backgroundColor={Colors.White} barStyle="dark-content" />
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={GlobalStyle.Padding}>
        <View style={GlobalStyle.Space_Between}>
          <SButton
            onPress={() => setShowStartTime(true)}
            placeHolder={startTime || 'Start Date'}
            title="Start Date"
          />
          <SButton
            onPress={() => setShowEndTime(true)}
            placeHolder={endTime || 'End Date'}
            title="End Date"
          />
        </View>
        <View style={GlobalStyle.Vertical_Space} />
        <SubHead text="Salary Range" bold style={{fontSize: 18}} />
        <RnRangeSlider
          style={{marginVertical: 15}}
          min={0}
          max={100}
          step={1}
          disabled={false}
          disableRange={false}
          renderThumb={renderThumb}
          renderRail={renderRail}
          renderRailSelected={renderRailSelected}
          onValueChanged={(low, high) => {
            setLow(low);
            setHigh(high);
          }}
        />
        <View style={GlobalStyle.Space_Between}>
          <SubHead text={`${low}$/hr`} />
          <SubHead text={`${high}$/hr`} />
        </View>


        <View style={GlobalStyle.Vertical_Space} />
        <SubHead text="Distance" bold style={{fontSize: 18}} />
        <RnRangeSlider
          style={{marginVertical: 15}}
          min={0}
          max={100}
          step={1}
          disabled={false}
          disableRange={false}
          renderThumb={renderThumb}
          renderRail={renderRail}
          renderRailSelected={renderRailSelected}
          onValueChanged={(low, high) => {
            setStartArea(low);
            setEndArea(high);
          }}
        />
        <View style={GlobalStyle.Space_Between}>
          <SubHead text={startArea} />
          <SubHead text={endArea} />
        </View>

        <SubHead text="Job Type" bold style={{fontSize: 18}} />
        {/* <View style={GlobalStyle.MapContainer}>
          {jobTypeData.map(item => (
            <Pressable
              key={item.title.toString()}
              style={[
                style.jobTypeBox,
                {
                  backgroundColor: selectJob.includes(item.title)
                    ? Colors.Purple
                    : '#F4F3F8',
                },
              ]}
              onPress={() => onTypeSelect(item)}>
              <Text
                style={[
                  style.JobTypeTitle,
                  {
                    color: selectJob.includes(item.title)
                      ? Colors.White
                      : Colors.Black,
                  },
                ]}>
                {item.title}
              </Text>
            </Pressable>
          ))}
        </View> */}
        <CustomButton title="show Result" />
      </ScrollView>
      <DateTimePickerModal
        themeVariant="light"
        isVisible={showStartTime}
        mode="date"
        onConfirm={date => handleStartTime(date)}
        onCancel={() => setShowStartTime(false)}
      />

      <DateTimePickerModal
        themeVariant="light"
        isVisible={showEndTime}
        mode="date"
        onConfirm={date => handleEndTime(date)}
        onCancel={() => setShowEndTime(false)}
      />
    </Background>
  );
};

export default RecentFilter;
