import {ScrollView,  Text} from 'react-native';
import React from 'react';
import {CustomButton, SimpleButton} from '../../../../../../components';
import { DetailJobs } from '../../../../../../Constants/Data';
import JobsDetail from '../../../../Shifts/Detail/Tabs/Job/JobsDetail';
import style from '../../style';

const Index = () => {
  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <Text style={style.ProjectText}>70/hr – 100/hr USD</Text>
      <Text style={style.detail}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis a
        imperdiet tortor. Mauris sed nisl id odio dictum pulvinar non finibus
        nibh. Aenean aliquet nulla nec lorem porta luctus.
      </Text>
      <Text style={style.Facility}>Facility</Text>

      {DetailJobs.map(item => <JobsDetail key={item.title} data={item} />)}

      <CustomButton title="70$/hr" />

      <SimpleButton mv={10} title="Cancel" />
    </ScrollView>
  );
};

export default Index;
