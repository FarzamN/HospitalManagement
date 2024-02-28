import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Platform,
  Keyboard,
  Alert,
  PermissionsAndroid,
} from 'react-native';
import React, {useState, useEffect, useCallback, useRef} from 'react';

import Feather from 'react-native-vector-icons/Feather';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import OneSignal from 'react-native-onesignal';
import {useDispatch, useSelector} from 'react-redux';
import {useFocusEffect} from '@react-navigation/native';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {PERMISSIONS, request} from 'react-native-permissions';
import AudioRecorderPlayer from 'react-native-audio-recorder-player';
import FS from 'react-native-fs';
import Message from './Message';
import {Background, ChatHeader, ImagePickerModal} from '../../../components';
import EmojiSelector, {Categories} from 'react-native-emoji-selector';

import {
  getChatMessages,
  getMessageProfile,
  get_chat_count_api,
  sendMsg,
} from '../../../redux/actions/UserAction';
import {GlobalStyle} from '../../../Constants/GlobalStyle';
import {Colors} from '../../../utils/Colors';
import {Font} from '../../../utils/font';
import {chatData} from '../../../Constants/Data';
import AnimatedLottieView from 'lottie-react-native';

const audioRecorderPlayer = new AudioRecorderPlayer();
const dirs = FS.DocumentDirectoryPath;

const Chat = ({navigation, route}) => {
  const {id, role} = route.params;
  console.log(id, role);
  const dispatch = useDispatch();
  const get_messages_data = useSelector(state => state.get_messages_data);
  const chat_profile = useSelector(state => state.chat_profile);

  const scrollViewRef = useRef();
  const chatId = id;
  const [SelectImage, setSelectImage] = useState(false);
  const [isEmojiVisible, setEmojiVisible] = useState(false);
  const [text, setText] = useState('');
  const [recordTime, setRecordTime] = useState('00:00');
  const [show2, setShow2] = useState(true);
  const [paused, setPaused] = useState(false);
  const [isRecording, setIsRecording] = useState(false);

  OneSignal.setNotificationWillShowInForegroundHandler(
    notificationReceivedEvent => {
      let notification = notificationReceivedEvent.getNotification();
      OneSignal.add;
      const one_data = notification.additionalData;
      notificationReceivedEvent.complete(notification);
      if (one_data?.foo == 'NewMassage') {
        // const chatId = data?.name_user_id ? data?.name_user_id:  data?.user_id
        dispatch(getChatMessages(chatId));
        console.log({one_data});
      } else {
        console.log('first');
      }
    },
  );

  useEffect(() => {
    dispatch(getChatMessages(chatId));
    dispatch(getMessageProfile(chatId));
    dispatch(get_chat_count_api());
  }, [chatId]);

  useEffect(() => {
    if (chatData?.length == 0) {
      scrollViewRef.current.scrollToEnd({animated: true});
    }
  }, []);

  const requestCameraPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
        PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
        {
          title: 'App Permission',
          message: 'App needs access ',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted == PermissionsAndroid.RESULTS.GRANTED) {
        console.log('You can use the camera');
        setSelectImage(true);
      } else {
        console.log('Camera permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  };
  const VideoPicker = async () => {
    let options = {
      title: 'Video Picker',
      mediaType: 'video',
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
      selectionLimit: 4,
    };
    try {
      launchImageLibrary(options, res => {
        if (res.didCancel) {
          console.log('User cancelled image picker');
        } else if (res.errorMessage) {
          console.log('ImagePicker Error: ', res.errorMessage);
        } else {
          const mediaData = res?.assets?.map(item => ({
            name: item?.fileName,
            uri: item?.uri,
            type: item?.type,
          }));
          dispatch(sendMsg(chatId, mediaData, 'media', setText));
          closePicker();
        }
      });
    } catch (error) {
      console.log(error);
    }
  };
  const photoPicker = () => {
    let options = {
      storageOptions: {
        mediaType: 'photo',
        path: 'image',
        includeExtra: true,
      },
      selectionLimit: 5,
    };
    launchImageLibrary(options, res => {
      if (res.didCancel) {
        console.log('User cancelled image picker');
      } else if (res.errorMessage) {
        console.log('ImagePicker Error:', res.errorMessage);
      } else {
        const mediaData = res?.assets?.map(item => ({
          name: item?.fileName,
          uri: item?.uri,
          type: item?.type,
        }));
        // dispatch(sendMsg(chatId, mediaData, 'media', setText));
        dispatch(sendMsg(chatId, mediaData, 'media', setText));

        closePicker();
      }
    });
  };
  const closePicker = () => setSelectImage(false);
  const sendMessage = () => {
    dispatch(sendMsg(chatId, text, 'msg', setText));
    setText('');
  };
  const satartRecor = async () => {
    try {
      let result;
      if (Platform.OS === 'android') {
        result = await request(PERMISSIONS.ANDROID.RECORD_AUDIO);
      } else if (Platform.OS === 'ios') {
        result = await request(PERMISSIONS.IOS.MICROPHONE);
      }
      if (result === 'granted') {
        setIsRecording(true);
        setShow2(false);
        onStartRecord();
        setIsRecording(true);
      } else {
        console.log('Permission denied');
      }
    } catch (error) {
      console.log(error);
    }
  };
  const onStartRecord = async () => {
    try {
      const path = Platform.select({
        ios: `${dirs}/hello.m4a`,
        android: `${dirs}/hello.mp4`,
      });

      const uri = await audioRecorderPlayer.startRecorder(path);
      console.log('uri', uri);
      // setRecordingUri(uri)
      // setVoiceNotes(uri)

      audioRecorderPlayer.addRecordBackListener(e => {
        setRecordTime(audioRecorderPlayer.mmssss(e.currentPosition));
      });
    } catch (error) {
      console.error(error, 'onStartRecord');
    }
  };
  const remove = async () => {
    try {
      const result = await audioRecorderPlayer.stopRecorder();
      audioRecorderPlayer.removeRecordBackListener(e => {
        setRecordTime(0);
      });
      setRecordTime('00:00');
      setShow2(true);
      // setVoiceNotes(result)catch error in sendMsg
    } catch (error) {
      console.error(error, 'remove');
    }
  };
  const onPauseRecord = async () => {
    await audioRecorderPlayer.pauseRecorder();
    setPaused(true);
  };
  const onResumeRecord = async () => {
    await audioRecorderPlayer.resumeRecorder();
    setPaused(false);
  };
  const sendNotes = async () => {
    try {
      const result = await audioRecorderPlayer.stopRecorder();
      dispatch(
        sendMsg(
          chatId,
          {
            uri: result,
            name: 'audio.mp3',
            type: 'audio/mp3',
          },
          'audio',
          setText,
        ),
      );

      setRecordTime('00:00');
      setShow2(true);
      setIsRecording(false);
    } catch (error) {
      console.error(error, 'sendNotes');
    }
  };
  const handleEmojiSelect = emoji => {
    setText(prevText => prevText + emoji);
    setEmojiVisible(false);
  };
  const onSmile = () => {
    Keyboard.dismiss();
    setEmojiVisible(pre => !pre);
  };
  return (
    <Background>
      <ChatHeader
        name={chat_profile.name}
        source={chat_profile?.profile_pic}
        Online={chat_profile.status == 'Active' ? 'online' : 'offline'}
        active_status={chat_profile.status == 'Active'}
        onPress={() => navigation.navigate('otherProfile', {id, role})}
      />
      <View style={GlobalStyle.Trans_Container}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.ScrollView}
          ref={scrollViewRef}
          inverted
          onContentSizeChange={() => scrollViewRef.current.scrollToEnd()}>
          {get_messages_data?.map((item, index) => (
            <Message
              message_data={item}
              key={index.toString()}
              profile_image={chat_profile?.profile_pic}
            />
          ))}
        </ScrollView>

        <View style={styles.ChatInput}>
          {show2 ? (
            <View style={GlobalStyle.Row}>
              <View style={[GlobalStyle.Row, styles.inputBox]}>
                {/* <TouchableOpacity
                  onPress={onSmile}
                  style={[styles.Box, {backgroundColor: 'transparent'}]}>
                  <FontAwesome5 name={'smile'} color={'#18516E'} size={24} />
                </TouchableOpacity> */}
                <TextInput
                  value={text}
                  onChangeText={newText => setText(newText)}
                  style={styles.TextInput}
                  placeholderTextColor={Colors.placeholderTextColor}
                  placeholder="Type a message..."
                />
                {text && (
                  <View style={{flex: 0.1}}>
                    <TouchableOpacity onPress={sendMessage}>
                      <Feather name={'send'} size={20} color={'#18516E'} />
                    </TouchableOpacity>
                  </View>
                )}
              </View>
              {!text && (
                <>
                  {/* <TouchableOpacity
                    style={{marginRight: 10}}
                    onPress={() => satartRecor()}>
                    <Feather name={'mic'} color={'#18516E'} size={20} />
                  </TouchableOpacity> */}
                  <TouchableOpacity
                    style={{marginRight: 10}}
                    onPress={() => requestCameraPermission()}>
                    <MaterialIcons
                      name={'insert-photo'}
                      color={'#18516E'}
                      size={28}
                    />
                  </TouchableOpacity>
                </>
              )}
            </View>
          ) : (
            <View style={styles.Main}>
              <AnimatedLottieView
                source={require('../../../assets/lottie/wave.json')}
                autoPlay
                loop
                style={{width: `60%`}}
              />
              <TouchableOpacity
                onPress={() => remove()}
                style={[styles.Box, {marginLeft: 5}]}>
                <MaterialCommunityIcons
                  name={'delete'}
                  color={'#18516E'}
                  size={20}
                />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={
                  isRecording && !paused ? onPauseRecord : onResumeRecord
                }
                style={[styles.Box, {marginLeft: 5}]}>
                <Text
                  style={{
                    fontSize: 10,
                    fontWeight: '700',
                  }}>
                  {recordTime}
                </Text>
                <FontAwesome name="microphone" color={'red'} size={23} />
              </TouchableOpacity>

              <TouchableOpacity
                onPress={sendNotes}
                style={[styles.Box, {marginLeft: 5}]}>
                <Feather name={'send'} color={'#18516E'} size={20} />
              </TouchableOpacity>
            </View>
          )}
        </View>
      </View>

      <ImagePickerModal
        VidType
        CamType
        isVisible={SelectImage}
        PressCamera={photoPicker}
        PressPicture={VideoPicker}
        onClose={closePicker}
      />
      {isEmojiVisible && (
        <View
          style={{
            height: 220,
            backgroundColor: 'white',
            overflow: 'hidden',
          }}>
          <EmojiSelector
            showSectionTitles={false}
            showHistory={false}
            category={Categories.symbols}
            onEmojiSelected={handleEmojiSelect}
            showSearchBar={false}
          />
        </View>
      )}
    </Background>
  );
};

const styles = StyleSheet.create({
  Main: {
    flexDirection: 'row',
    margin: 0,
    justifyContent: 'center',
  },
  ScrollView: {
    flexGrow: 1,
    justifyContent: 'flex-end',
    paddingHorizontal: 20,
  },
  Box: {
    height: 40,
    width: 40,
    borderRadius: 40,
    alignItems: 'center',
    alignSelf: 'center',
    justifyContent: 'center',
  },
  TextInput: {
    top: 1,
    color: Colors.Black,
    fontFamily: Font.font500,
    width: '90%',
    // backgroundColor: 'red',
    paddingLeft: 30,
    flex: 0.9,
  },
  inputBox: {
    flex: 1,
  },
  ChatInput: {
    justifyContent: 'center',
    // paddingVertical: 10,
    borderWidth: 1,
    borderColor: '#18516E',
    borderRadius: 50,
    height: 50,
    margin: 10,
    alignItems: 'center',
    overflow: 'hidden',
  },
});
export default Chat;
