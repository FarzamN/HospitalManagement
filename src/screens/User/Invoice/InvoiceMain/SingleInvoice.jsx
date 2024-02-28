import {useDispatch, useSelector} from 'react-redux';
import {View, Image, ScrollView, Alert} from 'react-native';
import React, {useEffect, useState} from 'react';
import {
  Background,
  CustomButton,
  Header,
  Heading,
  Loader,
  SubHead,
} from '../../../../components';
import RNHTMLtoPDF from 'react-native-html-to-pdf';
import style from '../CreateInvoice/style';
import {single_invoice_api} from '../../../../redux/actions/UserAction';
import {GlobalStyle} from '../../../../Constants/GlobalStyle';
import {Colors} from '../../../../utils/Colors';
import SButton from '../../Shifts/SButton';

import RNPrint from 'react-native-print';

import Toast from 'react-native-simple-toast';
import {PERMISSIONS, request, check, RESULTS} from 'react-native-permissions';
import moment from 'moment';
import {iOS} from '../../../../Constants/Responsive';
import Img from '../../../../assets/image/Logos/colorlogo.png';

const SingleInvoice = ({navigation, route}) => {
  const {id, invoice_by} = route.params;
  const [load, setLoad] = useState(false);
  const [pdfLoader, setPdfLoader] = useState(false);
  const [checkPermission, setCheckPermission] = useState(true);
  const dispatch = useDispatch();
  const sid = useSelector(state => state.single_invoice_data);
  const userDetails = useSelector(state => state.userDetails);
  const admin = userDetails.role_id == 2;

  const checkStoragePermission = async () => {
    try {
      const result = await check(PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE);
      if (result !== 'granted') {
        const requestResult = await request(
          PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE,
        );
        if (requestResult !== 'granted') {
          Alert.alert(
            'Permission Denied',
            'Storage permission is required to download PDF files.',
          );
        }
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    checkStoragePermission();
    dispatch(single_invoice_api(id, invoice_by, setLoad));
  }, []);

  const handleEdit = () => {
    navigation.navigate('editInvoice', {id, invoice_by});
  };

  useEffect(() => {
    if (admin) {
      const hasUpdate = userDetails.permissions.update.includes('Invoice');
      setCheckPermission(hasUpdate);
    }
  }, []);

  const downloadPDF = async () => {
    setPdfLoader(true);
    const newDate = new Date();
    const date = moment(newDate).format('DD-MMM-YYYY');
    try {
      let permissionResult;
      if (iOS) {
        permissionResult = await request(
          PERMISSIONS.IOS.WRITE_EXTERNAL_STORAGE,
        );
      } else {
        permissionResult = await request(
          PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE,
        );
      }

      if (permissionResult === RESULTS.GRANTED) {
        const results = await RNHTMLtoPDF.convert({
          html: `<!DOCTYPE html>
          <html lang="en">
          
          <head>
              <meta charset="UTF-8">
              <meta http-equiv="X-UA-Compatible" content="IE=edge">
              <meta name="viewport" content="width=device-width, initial-scale=1.0">
              <link rel="stylesheet" type="text/css" href="assets/css/bootstrap.min.css">
              <title>Reciept</title>
          </head>
          
          <body>
              <script src="https://cdn.tailwindcss.com"></script>
          
              <div class="max-w-3xl p-6 mx-auto my-6 bg-white border rounded shadow-sm" id="invoice">
          
                  <div class="grid items-center grid-cols-2">
                      <div class="text-left">
                          <p>
                              NURSE STAFFING & CONCIERGE SERVICE
                          </p>
                          <p>
                              ${sid?.user?.facility_name || sid?.bank_name}
                          </p>
                          <p>
                              EAU CLAIRE, WI 54701
                          </p>
                      </div>
          
                      <div class="flex items-center justify-end">
                          <!--  Company logo  -->
                          <img src=${Img} alt="company-logo"
                              height="100" width="100">
                      </div>
                  </div>
          
                  <!-- Client info -->
                  <div class="grid items-center grid-cols-2 mt-8">
                      <div class="text-gray-500">
                          <p>
                              ${sid.address}
                          </p>
                      </div>
          
                      <div class="text-right">
                          <h1 class="leading-[5px] font-medium text-gray-800">
                              INVOICE
                          </h1>
                          <p class="mt-3 space-x-2">
                              <span class="font-semibold text-left">Invoice #</span>
                              <span class="font-semibold text-right text-gray-500">${
                                sid.transaction_id
                              }</span>
                          </p>
                          <p class="space-x-2">
                              <span class="font-semibold text-left">Invoice Date</span>
                              <span class="font-semibold text-right text-gray-500">${
                                sid.created_at
                              }</span>
                          </p>
                          <p class="space-x-2">
                              <span class="font-semibold text-left">Due Date</span>
                              <span class="font-semibold text-right text-gray-500">${
                                sid.due_date
                              }</span>
                          </p>
                      </div>
                  </div>
          
                  <!-- Invoice Items -->
                  <div class="flow-root mt-8 -mx-4 sm:mx-0">
                      <table class="min-w-full">
                          <colgroup>
                              <col class="sm:w-1/6">
                              <col class="w-full sm:w-1/2">
                              <col class="sm:w-1/6">
                              <col class="sm:w-1/6">
                          </colgroup>
                          <thead class="text-gray-900 border-b border-gray-300">
                              <tr class="bg-blue-400">
                                  <th scope="col"
                                      class="hidden px-3 py-3.5 text-left text-sm font-semibold text-white sm:table-cell">
                                      item</th>
                                  <th scope="col" class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-white sm:pl-0">
                                      Description</th>
                                  <th scope="col"
                                      class="hidden px-3 py-3.5 text-right text-sm font-semibold text-white sm:table-cell">
                                      Unit Price</th>
                                  <th scope="col"
                                      class="hidden px-3 py-3.5 text-right text-sm font-semibold text-white sm:table-cell">
                                      Quantity</th>
                                  <th scope="col" class="py-3.5 pl-3 pr-4 text-right text-sm font-semibold text-white">
                                      Amount</th>
                              </tr>
                          </thead>
                          <tbody class="border">
                              <tr class="border-b border-gray-200">
                                  <td class="py-3.5 pl-4 pr-3 text-sm max-w-0">
                                      <div class="font-medium text-gray-900">
                                          Service
                                      </div>
                                  </td>
                                  <td class="hidden px-3 py-3.5 text-sm text-left text-gray-500 sm:table-cell">
                                      Late Fee
                                  </td>
                                  <td class="hidden px-3 py-3.5 text-sm text-right text-gray-500 sm:table-cell">$100.00</td>
                                  <td class="hidden px-3 py-3.5 text-sm text-right text-gray-500 sm:table-cell">12.00</td>
                                  <td class="py-3.5 pl-3 pr-4 text-sm text-right text-gray-500">$12000.00</td>
                              </tr>
          
                              <!-- Notes -->
                              <tr>
                                  <td colspan="6" class="h-[100px]" />
                              </tr>
                              <tr>
                                  <td colspan="6" class="p-4 text-gray-500">
                                      <span>
                                          <u>NOTES:</u> Service Date: 05/14/2023-05/20/2023
                                      </span>
                                      <br />
                                      <span>
                                          *Payment due 30 days from invoice date
                                      </span>
                                      <br />
                                      <span>
                                          *Any unpaid balances after 30 days from the date of receipt at the compound rate of 3 %
                                          per day (Annual Percentage Rate of 10%) or the maximum legal rate, whichever is higher,
                                          calculated from the date of receipt.
                                      </span>
                                      <br />
                                      <span>
                                          Employee: [Name], [Name], [Name], [Name]
                                      </span>
                                      <br />
                                      <span>
                                          08/01/23: 11 days late, late fee: $1000.00
                                      </span>
                                      <br />
                                      <span>
                                          08/07/23: 17 days late, Late fee: $1000.00
                                      </span>
                                      <br />
                                      <br />
                                      <span>
                                          08/15/23: Check #14297 Amount paid: $${
                                            sid.total_amount
                                          } (${sid.address})
                                      </span>
                                      <br />
                                      <span>
                                          Remaining balance: 25 days late $12000.00
                                      </span>
                                      <br />
                                      <span>
                                          *09/12/23-53 days late, late fee $12000.00 not paid
                                      </span>
                                  </td>
                              </tr>
                          </tbody>
                          <tfoot class="border-r">
                              <tr>
                                  <th scope="row" colspan="3"
                                      class="hidden pt-6 pl-4 pr-3 text-sm font-normal text-center text-gray-500 sm:table-cell sm:pl-0">
                                      &nbsp;</th>
                                  <th scope="row" colspan="1"
                                      class="pt-6 pl-4 pr-3 text-sm font-normal text-center text-gray-500 border-b border-l sm:table-cell sm:pl-0">
                                      Subtotal</th>
                                  <td class="pt-6 !pr-6 text-sm text-center text-gray-500 border-b sm:pr-0">$${
                                    sid.sd
                                  }</td>
                              </tr>
                              <tr>
                                  <th scope="row" colspan="3"
                                      class="hidden pt-6 pl-4 pr-3 text-sm font-normal text-center text-gray-500 sm:table-cell sm:pl-0">
                                      &nbsp;</th>
                                  <th scope="row" colspan="1"
                                      class="pt-4 pl-4 pr-3 text-sm font-normal text-center text-gray-500 border-l sm:table-cell sm:pl-0">
                                      Total</th>
                                  <td class="pt-4 !pr-6 text-sm text-center text-gray-500 sm:pr-0">$${
                                    sid.total_amount
                                  }</td>
                              </tr>
                              <tr>
                                  <th scope="row" colspan="3"
                                      class="hidden pt-6 pl-4 pr-3 text-sm font-normal text-center text-gray-500 sm:table-cell sm:pl-0">
                                      &nbsp;</th>
                                  <th scope="row" colspan="1"
                                      class="pt-4 pl-4 pr-3 text-sm font-normal text-center text-gray-500 border-b border-l sm:table-cell sm:pl-0">
                                      Amount Paid</th>
                                  <td class="pt-4 !pr-6 text-sm text-center text-gray-500 border-b sm:pr-0">0.00</td>
                              </tr>
                              <tr>
                                  <th scope="row" colspan="3"
                                      class="hidden pt-6 pl-4 pr-3 text-sm font-normal text-center text-gray-500 sm:table-cell sm:pl-0">
                                      &nbsp;</th>
                                  <th scope="row" colspan="1"
                                      class="py-2 pl-4 pr-3 text-sm font-semibold text-center text-gray-900 border-b border-l sm:table-cell sm:pl-0">
                                      Balance Due</th>
                                  <td class="py-2 !pr-4 text-sm font-semibold text-center text-gray-900 border-b sm:pr-0">
                                      $10,500.00
                                  </td>
                              </tr>
                          </tfoot>
                      </table>
                  </div>
              </div>
          </body>
          
          </html>`,
          fileName: `anee${date}`,
          base64: true,
        });

        await RNPrint.print({filePath: results.filePath});
        setPdfLoader(false);
      } else {
        setPdfLoader(false);
        Toast.show('Permission Not Granted');
      }
    } catch (error) {
      setPdfLoader(true);
      console.log('Error requesting storage permission:', error);
    }
  };
  return (
    <Background>
      {!admin ? (
        <Header back title="Invoice Detail" gap />
      ) : (
        <Header
          back
          title="Invoice Detail"
          manage={invoice_by == 'Admin' && checkPermission}
          gap={invoice_by != 'Admin' || !checkPermission}
          bTitle={' Edit '}
          onPress={handleEdit}
        />
      )}
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={GlobalStyle.Padding}>
        {invoice_by != 'Admin' ? (
          <>
            <Image
              style={style.image}
              source={{uri: sid?.user?.profile_image}}
            />
            <Heading
              style={style.name}
              center
              text={sid?.user?.facility_name}
            />

            <View style={GlobalStyle.Vertical_Space} />
            <SubHead bold text={`Due Date: ${sid.due_date}`} />

            <View style={GlobalStyle.Vertical_Space} />
            <View style={GlobalStyle.Space_Between}>
              <SubHead bold text={`from: ${sid.from}`} />
              <SubHead bold text={`to: ${sid.to}`} />
            </View>
            <View style={GlobalStyle.Vertical_Space} />
            <SubHead bold text={`Total Amount: ${'$' + sid.total_amount}`} />

            <View style={GlobalStyle.Vertical_Space} />
          </>
        ) : (
          <>
            <View style={GlobalStyle.Space_Between}>
              <SubHead text={sid.title} />
              <SubHead style={{color: Colors.Purple}} text={'$' + sid.amount} />
            </View>
            <View style={style.line} />

            <SubHead bold text={`Client: ${sid.client}`} />
            <View style={GlobalStyle.Vertical_Space} />
            <SubHead bold text={`Telephone: ${sid.telephone}`} />
            <View style={GlobalStyle.Vertical_Space} />
            <SubHead bold text={`Email: ${sid.email}`} />
            <View style={GlobalStyle.Vertical_Space} />
            <SubHead bold text={`Company: ${sid.company}`} />
            <View style={GlobalStyle.Vertical_Space} />
            <SubHead bold text={`VAT: ${sid.vat}`} />
            <View style={GlobalStyle.Vertical_Space} />
            <SubHead bold text={`Address: ${sid.address}`} />
            <View style={GlobalStyle.Vertical_Space} />
            <SubHead bold text={`Details: ${sid.description}`} />
            <View style={GlobalStyle.Vertical_Space} />
            <View style={GlobalStyle.Space_Between}>
              <SubHead bold style={{color: Colors.LightGrey}} text="Bill to" />
              <SubHead bold text={sid.bill_to} />
            </View>

            <View style={GlobalStyle.Vertical_Space} />
            <View style={GlobalStyle.Space_Between}>
              <SubHead
                bold
                style={{color: Colors.LightGrey}}
                text="Amount Due"
              />
              <SubHead bold text={'$' + sid.amount_due} />
            </View>

            <View style={GlobalStyle.Vertical_Space} />
            <View style={GlobalStyle.Space_Between}>
              <SubHead
                bold
                style={{color: Colors.LightGrey}}
                text="Payment Due"
              />
              <SubHead bold text={sid.due_date} />
            </View>
          </>
        )}

        <SButton
          ReStyle={GlobalStyle.fullButton}
          title="Invoice status"
          placeHolder={sid.status}
        />
        <View style={GlobalStyle.Vertical_Space} />
        <CustomButton
          loader={pdfLoader}
          title="Generated PDF"
          round
          onPress={downloadPDF}
        />
      </ScrollView>
      <Loader visible={load} />
    </Background>
  );
};

export default SingleInvoice;
