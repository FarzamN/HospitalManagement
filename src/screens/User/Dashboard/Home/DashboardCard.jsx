import {View, Image} from 'react-native';
import React, {useEffect} from 'react';
import style from './style';
import {Heading, SubHead} from '../../../../components';
import {useDispatch, useSelector} from 'react-redux';
import {admin_dashboard_api, user_dashboard_api} from '../../../../redux/actions/UserAction';

const DashboardCard = ({upcoming, income}) => {
  const dispatch = useDispatch();
  const userDetails = useSelector(state => state.userDetails);

  const u_d = useSelector(state => state.get_user_dashboard);

  const staff = userDetails.role_id == '1';
  const admin = userDetails.role_id == '2';
  const facility = userDetails.role_id == '3';

  useEffect(() => {
    if (!admin) {
      dispatch(user_dashboard_api());
    } else {
      dispatch(admin_dashboard_api(null))
    }
  }, []);

  return (
    <View style={style.MainContainer}>
      <View style={{flex: 1}}>
        <View
          style={[
            style.container,
            {
              flex: 0.5,
              backgroundColor: '#FEF2E8',
            },
          ]}>
          <Image
            style={style.Image}
            source={require('../../../../assets/image/DashboardIcons/pending.png')}
          />
          <Heading
            style={style.heading}
            text={
              staff
                ? 'Completed\nShifts'
                : admin
                ? 'Total\nFacility'
                : facility
                ? 'All Posted\nShifts'
                : 'Pending\nInvoice'
            }
          />
          <SubHead
            style={style.SubHead}
            text={`${
              admin
                ? u_d.total_facilities ?? 0
                : facility
                ? u_d.posted_shifts_count + ' ' + 'Shifts' ?? 0
                : u_d.completed_shifts_count + ' ' + 'Shifts' ?? 0
            } `}
          />
        </View>

        <View
          style={[
            style.container,
            {
              flex: 0.6,
              backgroundColor: '#F2F0FE',
            },
          ]}>
          <Image
            style={style.Image}
            source={require('../../../../assets/image/DashboardIcons/upcoming.png')}
          />
          <Heading
            style={style.heading}
            text={
              staff
                ? 'Upcoming\nShits'
                : facility
                ? 'Total\nconfirmed Job'
                : 'Amount to\nbe Paid'
            }
          />
          <SubHead
            style={style.SubHead}
            text={`${
              admin
                ? '$' + u_d.total_unpaid ?? 0
                : facility
                ? u_d.confirmed_job_count + ' ' + 'Shifts' ?? 0
                : u_d.upcoming_shifts_count + ' ' + 'Shifts' ?? 0
            } `}
          />
        </View>
      </View>
      <View style={{flex: 1}}>
        <View
          style={[
            style.container,
            {
              flex: 0.6,
              backgroundColor: '#F1F8EC',
            },
          ]}>
          <Image
            style={style.Image}
            source={require('../../../../assets/image/DashboardIcons/income.png')}
          />
          <Heading
            style={style.heading}
            text={
              admin
                ? 'Amount Paid'
                : facility
                ? 'Total Invoice\nAmount'
                : 'Month\nIncome'
            }
          />
          <SubHead
            style={style.SubHead}
            text={
              admin
                ? '$' + u_d.total_income_paid ?? 0
                : facility
                ? '$' + u_d.posted_shifts_count  ?? 0
                : '$' + u_d.total_income ?? 0
            }
          />
        </View>
        <View
          style={[
            style.container,
            {
              flex: 0.5,
              backgroundColor: '#EAEEF6',
            },
          ]}>
          <Image
            style={style.Image}
            source={require('../../../../assets/image/DashboardIcons/recent.png')}
          />
          <Heading
            style={style.heading}
            text={
              admin
                ? 'Total Staff'
                : facility
                ? 'Total\nPending Shifts'
                : 'Recent\nShifts'
            }
          />
          <SubHead
            style={style.SubHead}
            text={`${
              admin
                ? u_d.total_staff ?? 0
                : facility
                ? u_d.pending_shifts_count + ' ' + 'Shifts' ?? 0
                : u_d.recent_shifts_count + ' ' + 'Shifts' ?? 0
            } `}
          />
        </View>
      </View>
    </View>
  );
};

export default DashboardCard;
