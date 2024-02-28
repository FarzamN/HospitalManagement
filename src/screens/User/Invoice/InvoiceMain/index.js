import React, {useState, useEffect} from 'react';
import InvoiceCard from './InvoiceCard';
import InvoiceBanner from './InvoiceBanner';
import InvoiceHeader from './InvoiceHeader';
import {
  FlatList,
  RefreshControl,
  ScrollView,
  StatusBar,
  View,
} from 'react-native';
import {Colors} from '../../../../utils/Colors';
import {inVoiceFilterData} from '../../../../Constants/Data';
import BottomTab from '../../../../navigation/BottomTab';
import {
  Empty,
  Header,
  ShowMore,
  Background,
  Skeleton,
} from '../../../../components';
import {useDispatch, useSelector} from 'react-redux';
import {get_all_invoice_api} from '../../../../redux/actions/UserAction';

const InvoiceMain = ({navigation}) => {
  const dispatch = useDispatch();
  const [load, setLoad] = useState(false);
  const [select, setSelect] = useState('All');
  const [refreshing, setRefreshing] = useState(false);
  const invoiceData = useSelector(state => state.get_all_invoice);
  const userDetails = useSelector(state => state.userDetails);
  const [value, setValue] = useState('All');
  const admin = userDetails.role_id == 2;

  const [checkPermission, setCheckPermission] = useState({
    add: true,
    edit: true,
    view: true,
  });

  useEffect(() => {
    if (admin) {
      const hasAdd = userDetails.permissions.add.includes('Invoice');
      const hasView = userDetails.permissions.view.includes('Invoice');
      const hasUpdate = userDetails.permissions.update.includes('Invoice');

      setCheckPermission({
        add: hasAdd,
        edit: hasUpdate,
        view: hasView,
      });
    }
  }, []);

  useEffect(() => {
    dispatch(get_all_invoice_api(setLoad));
  }, []);

  const onRefresh = () => {
    setRefreshing(true);
    dispatch(get_all_invoice_api(setLoad));
    setRefreshing(false);
  };

  const onSelect = item => {
    setSelect(item.title);
    setValue(item.title);
  };
  const isAdminPermission =
    checkPermission.add || checkPermission.edit || checkPermission.view;

  return (
    <Background>
      <StatusBar backgroundColor={Colors.White} barStyle="dark-content" />
      <Header back title="Invoice" gap />
      <ScrollView nestedScrollEnabled showsVerticalScrollIndicator={false}>
        {isAdminPermission ? (
          <>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
              }}>
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                {inVoiceFilterData.map(item => (
                  <InvoiceHeader
                    key={item.title}
                    data={item}
                    focus={select == item.title}
                    onPress={() => onSelect(item)}
                  />
                ))}
              </ScrollView>
            </View>
            {admin && checkPermission.add ? (
              <InvoiceBanner
                onPress={() => navigation.navigate('createInvoice')}
              />
            ) : null}
            {load ? (
              <>
                <Skeleton />
                <Skeleton />
                <Skeleton />
              </>
            ) : (
              <FlatList
                contentContainerStyle={{marginHorizontal: 15}}
                data={invoiceData}
                nestedScrollEnabled
                scrollEnabled={false}
                ListEmptyComponent={<Empty title="No Invoice found" />}
                ListHeaderComponent={() => (
                  <ShowMore
                    more={'See More'}
                    fontSize={16}
                    text="List of invoice"
                    onPress={() => navigation.navigate('invoiceList')}
                  />
                )}
                keyExtractor={(_, i) => i.toString()}
                renderItem={({item, index}) => {
                  if (value === 'All') {
                    return <InvoiceCard data={item} i={index} />;
                  } else {
                    return item.status === value ? (
                      <InvoiceCard data={item} i={index} />
                    ) : null;
                  }
                }}
                refreshControl={
                  <RefreshControl
                    onRefresh={onRefresh}
                    refreshing={refreshing}
                    tintColor={Colors.Main}
                    colors={[Colors.Purple]}
                    progressBackgroundColor={Colors.OTPContainer}
                  />
                }
              />
            )}
          </>
        ) : (
          <Empty title={`You don't have\npermission to View\nthis page`} />
        )}
      </ScrollView>
      <BottomTab bottle />
    </Background>
  );
};

export default InvoiceMain;
