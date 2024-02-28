import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {PieChart} from 'react-native-chart-kit';
import {Colors} from '../../../../utils/Colors';
import {admin_dashboard_api, graph_api} from '../../../../redux/actions/UserAction';
import {StatusSkeleton} from '../../../../components';

const PieChartComponent = ({date}) => {
  const dispatch = useDispatch();
  const [load, setLoad] = React.useState(false);
  const userDetails = useSelector(state => state.userDetails);
  const admin = userDetails.role_id == '2';

  const graph_data = useSelector(state => state.graph_data);
  useEffect(() => {
    if (admin) {
      dispatch(graph_api(date, setLoad));
      dispatch(admin_dashboard_api(date));
    }
  }, [date]);

  return load ? (
    <>
      <StatusSkeleton noMargin />
    </>
  ) : (
    <PieChart
      data={graph_data}
      width={300}
      height={200}
      chartConfig={{
        backgroundColor: Colors.White,
        backgroundGradientFrom: Colors.White,
        backgroundGradientTo: Colors.White,
        color: () => Colors.Black,
        width: '100%',
      }}
      accessor="population"
      backgroundColor="transparent"
      paddingLeft="15"
      absolute
    />
  );
};

export default PieChartComponent;
