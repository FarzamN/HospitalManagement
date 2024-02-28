import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import Home from '../screens/User/Dashboard/Home';
import Notification from '../screens/User/Dashboard/Notification';
import AllUpcomingShift from '../screens/User/Dashboard/AllUpcomingShift';
import OtherProfile from '../screens/User/Dashboard/Profile/OtherProfile';
import Profile from '../screens/User/Dashboard/Profile';
import EditProfile from '../screens/User/Dashboard/EditProfile';
import RecentJobs from '../screens/User/Dashboard/RecentJobs';
import RecentFilter from '../screens/User/Dashboard/RecentFilter';

import Shift from '../screens/User/Shifts/UserShift';
import NewShift from '../screens/User/Shifts/NewShift';
import ListedShift from '../screens/User/Shifts/ListedShift';
import AddShiftDetail from '../screens/User/Shifts/AddShiftDetail';
import ListShiftDetail from '../screens/User/Shifts/ListShiftDetail';
import EditShift from '../screens/User/Shifts/EditShift';
import WriteReview from '../screens/User/Shifts/WriteReview';
import RoleNPrem from '../screens/User/Shifts/RolePrem';
import ManageMember from '../screens/User/Shifts/ManageMember';
import EditMember from '../screens/User/Shifts/EditMember';
import ManageService from '../screens/User/Shifts/ManageService';
import EditService from '../screens/User/Shifts/EditService';
import Detail from '../screens/User/Shifts/Detail';
import PlaceBits from '../screens/User/Shifts/PlaceBits';
import ViewBits from '../screens/User/Shifts/ViewBits';
import EditShiftDetail from '../screens/User/Shifts/EditShiftDetail';

import Chat from '../screens/User/Chat';
import ChatInbox from '../screens/User/Chat/ChatInbox';

import JobsAwards from '../screens/User/Jobs/JobsAwards';
import JobsAwardsDetails from '../screens/User/Jobs/JobsAwardsDetails';

import FavJob from '../screens/User/FavJob';

import Term from '../screens/User/Term';
import Boost from '../screens/User/Shifts/ListedShift/Boost';

import Search from '../screens/User/Search';

import InvoiceMain from '../screens/User/Invoice/InvoiceMain';
import CreateInvoice from '../screens/User/Invoice/CreateInvoice';

import ChangePassword from '../screens/User/Dashboard/ChangePassword';
import {SelectCountry, SelectState} from '../screens/Authentication';
import BoostAfterPost from '../screens/User/Shifts/ListedShift/BoostAfterPost';
import TodaysDetail from '../screens/User/Dashboard/Home/CheckFolder/TodaysDetail';
import AllTodaysShift from '../screens/User/Dashboard/Home/CheckFolder/AllTodaysShift';

import AllCheck from '../screens/User/Dashboard/Home/CheckFolder/AllCheck';
import CheckDetails from '../screens/User/Dashboard/Home/CheckFolder/CheckDetails';
import CreateAccountAdmin from '../screens/User/Shifts/ManageMember/CreateAccountAdmin';
import SingleInvoice from '../screens/User/Invoice/InvoiceMain/SingleInvoice';
import EditManageRole from '../screens/User/Shifts/RolePrem/EditManageRole';
import EditInvoice from '../screens/User/Invoice/InvoiceMain/EditInvoice';

import FacCompleted from '../screens/User/Shifts/FacCompleted';
import FacOngoing from '../screens/User/Shifts/FacOngoing';
const UserNavigator = () => {
  const Tab = createBottomTabNavigator();
  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName="home"
        screenOptions={{
          headerShown: false,
          tabBarStyle: {
            display: 'none',
          },
        }}>
        <Tab.Screen name="Home" component={AllDashboard} />
        <Tab.Screen name="Shifts" component={StaffShifts} />
        <Tab.Screen name="FacStaff" component={FacStaff} />
        <Tab.Screen name="AdminStaff" component={AdminStaff} />
        <Tab.Screen name="AllSearch" component={AllSearch} />
        <Tab.Screen name="AllInvoice" component={AllInvoice} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default UserNavigator;

const Stack = createNativeStackNavigator();

const AllDashboard = () => {
  return (
    <Stack.Navigator
      screenOptions={{headerShown: false, animation: 'ios'}}
      initialRouteName="home">
      <Stack.Screen name="home" component={Home} />
      <Stack.Screen name="allUpcomingShift" component={AllUpcomingShift} />
      <Stack.Screen name="alert" component={Notification} />
      <Stack.Screen name="otherProfile" component={OtherProfile} />
      <Stack.Screen name="profile" component={Profile} />
      <Stack.Screen name="editProfile" component={EditProfile} />
      <Stack.Screen name="selectCountry" component={SelectCountry} />
      <Stack.Screen name="selectState" component={SelectState} />
      <Stack.Screen name="recentJobs" component={RecentJobs} />
      <Stack.Screen name="recentFilter" component={RecentFilter} />
      <Stack.Screen name="chatInbox" component={ChatInbox} />
      <Stack.Screen name="chat" component={Chat} />
      <Stack.Screen name="jobsAwards" component={JobsAwards} />
      <Stack.Screen name="jobsAwardsDetails" component={JobsAwardsDetails} />
      <Stack.Screen name="favJob" component={FavJob} />
      <Stack.Screen name="term" component={Term} />
      <Stack.Screen name="changePassword" component={ChangePassword} />
      <Stack.Screen name="listedShift" component={ListedShift} />
      <Stack.Screen name="listShiftDetail" component={ListShiftDetail} />
      <Stack.Screen name="editShift" component={EditShift} />
      <Stack.Screen name="addShiftDetail" component={AddShiftDetail} />
      <Stack.Screen name="editShiftDetail" component={EditShiftDetail} />
      <Stack.Screen name="detail" component={Detail} />
      <Stack.Screen name="placeBits" component={PlaceBits} />
      <Stack.Screen name="viewBits" component={ViewBits} />

      <Stack.Screen name="boostAfterPost" component={BoostAfterPost} />
      <Stack.Screen name="todaysDetail" component={TodaysDetail} />
      <Stack.Screen name="allTodaysShift" component={AllTodaysShift} />

      <Stack.Screen name="check" component={AllCheck} />
      <Stack.Screen name="checkDetails" component={CheckDetails} />

      <Stack.Screen name="manageMember" component={ManageMember} />
      <Stack.Screen name="editMember" component={EditMember} />
      <Stack.Screen name="manageService" component={ManageService} />
      <Stack.Screen name="editService" component={EditService} />

      <Stack.Screen name="writeReview" component={WriteReview} />

      <Stack.Screen name="createAccountAdmin" component={CreateAccountAdmin} />

      <Stack.Screen name="facCompleted" component={FacCompleted} />
      <Stack.Screen name="facOngoing" component={FacOngoing} />
    </Stack.Navigator>
  );
};
const StaffShifts = () => (
  <Stack.Navigator
    screenOptions={{headerShown: false, animation: 'ios'}}
    initialRouteName="shift">
    <Stack.Screen name="shift" component={Shift} />
    <Stack.Screen name="detail" component={Detail} />
  </Stack.Navigator>
);

const FacStaff = () => (
  <Stack.Navigator
    screenOptions={{headerShown: false, animation: 'ios'}}
    initialRouteName="newShift">
    <Stack.Screen name="newShift" component={NewShift} />
    <Stack.Screen name="listedShift" component={ListedShift} />
    <Stack.Screen name="addShiftDetail" component={AddShiftDetail} />
    <Stack.Screen name="boost" component={Boost} />
    <Stack.Screen name="listShiftDetail" component={ListShiftDetail} />
    <Stack.Screen name="editShift" component={EditShift} />

    <Stack.Screen name="writeReview" component={WriteReview} />
  </Stack.Navigator>
);

const AdminStaff = () => (
  <Stack.Navigator
    screenOptions={{headerShown: false, animation: 'ios'}}
    initialRouteName="roleNPrems">
    <Stack.Screen name="roleNPrems" component={RoleNPrem} />
    <Stack.Screen name="manageMember" component={ManageMember} />
    <Stack.Screen name="editMember" component={EditMember} />
    <Stack.Screen name="manageService" component={ManageService} />
    <Stack.Screen name="editService" component={EditService} />
    <Stack.Screen name="editRole" component={EditManageRole} />
  </Stack.Navigator>
);

const AllSearch = () => (
  <Stack.Navigator
    screenOptions={{headerShown: false, animation: 'ios'}}
    initialRouteName="search">
    <Stack.Screen name="search" component={Search} />
    <Stack.Screen name="otherProfile" component={OtherProfile} />
  </Stack.Navigator>
);

const AllInvoice = () => (
  <Stack.Navigator
    screenOptions={{headerShown: false, animation: 'ios'}}
    initialRouteName="invoice">
    <Stack.Screen name="invoice" component={InvoiceMain} />
    <Stack.Screen name="createInvoice" component={CreateInvoice} />
    <Stack.Screen name="SingleInvoice" component={SingleInvoice} />
    <Stack.Screen name="editInvoice" component={EditInvoice} />
  </Stack.Navigator>
);
