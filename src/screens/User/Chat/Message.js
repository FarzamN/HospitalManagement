import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  Dimensions,
  PermissionsAndroid,
} from 'react-native';
import React, {useState, useRef, useEffect} from 'react';
import {useSelector} from 'react-redux';
import moment from 'moment';
import Entypo from 'react-native-vector-icons/Entypo';
import ReactNativeModal from 'react-native-modal';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {createThumbnail} from 'react-native-create-thumbnail';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Sound from 'react-native-sound';
import Slider from '@react-native-community/slider';
import RNFS from 'react-native-fs';
import * as Progress from 'react-native-progress';
import {Colors} from '../../../utils/Colors';
import {Font} from '../../../utils/font';
import {GlobalStyle} from '../../../Constants/GlobalStyle';
import VideoPlayer from 'react-native-video-player';

const {width} = Dimensions.get('screen');

const MessageDisplay = ({message_data, profile_image}) => {
  const userDetails = useSelector(state => state.userDetails);
  const formatCommentTime = timestamp => {
    const inputMoment = moment(timestamp, moment.ISO_8601);
    const currentDate = moment();

    const diffInSeconds = currentDate.diff(inputMoment, 'seconds');
    const diffInMinutes = currentDate.diff(inputMoment, 'minutes');
    const diffInHours = currentDate.diff(inputMoment, 'hours');
    const diffInDays = currentDate.diff(inputMoment, 'days');
    const diffInWeeks = currentDate.diff(inputMoment, 'weeks');
    const diffInMonths = currentDate.diff(inputMoment, 'months');
    const diffInYears = currentDate.diff(inputMoment, 'years');

    if (diffInSeconds < 60) {
      return `${diffInSeconds === 0 ? 1 : diffInSeconds} ${
        diffInSeconds === 1 ? 'sec' : 'secs'
      } ago`;
    } else if (diffInMinutes < 60) {
      return `${diffInMinutes === 0 ? 1 : diffInMinutes} ${
        diffInMinutes === 1 ? 'min' : 'mins'
      } ago`;
    } else if (diffInHours < 24) {
      return `${diffInHours === 0 ? 1 : diffInHours} ${
        diffInHours === 1 ? 'hour' : 'hours'
      } ago`;
    } else if (diffInDays < 7) {
      return `${diffInDays === 0 ? 1 : diffInDays} ${
        diffInDays === 1 ? 'day' : 'days'
      } ago`;
    } else if (diffInWeeks < 4) {
      return `${diffInWeeks === 0 ? 1 : diffInWeeks} ${
        diffInWeeks === 1 ? 'week' : 'weeks'
      } ago`;
    } else if (diffInMonths < 12) {
      return `${diffInMonths === 0 ? 1 : diffInMonths} ${
        diffInMonths === 1 ? 'month' : 'months'
      } ago`;
    } else {
      return `${diffInYears === 0 ? 1 : diffInYears} ${
        diffInYears === 1 ? 'year' : 'years'
      } ago`;
    }
  };

  const [show, setShow] = useState(false);
  const [showInd, setShowInd] = useState('');
  const scrollViewRef = useRef(null);
  const [isLoading, setIsLoading] = useState(false);
  const videoRef = useRef(null);
  const [pic, setPic] = useState([]);
  const [sound, setSound] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [uri, setUri] = useState(null);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [isDownloaded, setIsDownloaded] = useState(false);
  const [downloadProgress, setDownloadProgress] = useState(0);
  const [isPlaybackComplete, setIsPlaybackComplete] = useState(false);
  const [btnShow, setBtnShow] = useState(true);

  const scrollToIndex = index => {
    setShow(!show);
    setShowInd(index);
  };
  const hydirgn = () => {
    if (scrollViewRef?.current) {
      const itemHeight = Dimensions.get('screen').height / 1.2;
      const scrollY = itemHeight * showInd;
      scrollViewRef?.current?.scrollTo({y: scrollY, animated: true});
    }
  };
  useEffect(() => {
    hydirgn();
  }, [show]);

  useEffect(() => {
    const generateThumbnails = async () => {
      const thumbnailPromises = message_data?.media?.map(async item => {
        if (item?.type === 'video') {
          try {
            const thumbnail = await createThumbnail({
              url: item.url,
              timeStamp: 10000,
            });
            return thumbnail.path;
          } catch (error) {
            console.log('Error generating thumbnail:', error);
            return null;
          }
        } else {
          return null;
        }
      });

      try {
        const thumbnails = await Promise?.all(thumbnailPromises);
        setPic(thumbnails?.filter(thumbnail => thumbnail !== null));
      } catch (error) {
        // console.log('Error generating thumbnails:', error);
      }
    };

    generateThumbnails();
  }, [message_data]);

  const checkID = message_data?.sender_id
    ? message_data?.sender_id
    : message_data?.user_id;

  const checkTiming = message_data?.created_at
    ? message_data?.created_at
    : message_data?.time;

  useEffect(() => {
    const audioFileName = `${message_data.id}_${message_data.created_at}.mp3`;
    const localAudioURI = `${RNFS.ExternalStorageDirectoryPath}/Anee/media/audio/${audioFileName}`;

    RNFS.exists(localAudioURI).then(exists => {
      setIsDownloaded(exists);

      if (exists) {
        setUri(`file://${localAudioURI}`);
        const soundObject = new Sound(`file://${localAudioURI}`, '', error => {
          if (error) {
            // console.error('Error loading audio:', error);
          } else {
            setSound(soundObject);
            setDuration(soundObject.getDuration());
          }
        });
      }
    });
  }, [message_data.id, message_data.created_at]);

  useEffect(() => {
    if (sound && isPlaying && !isPlaybackComplete) {
      const timer = setInterval(() => {
        sound.getCurrentTime(secs => {
          setCurrentTime(secs);
        });
        if (currentTime >= duration) {
          clearInterval(timer);
          setIsPlaying(false);
          setIsPlaybackComplete(true);
          setCurrentTime(0);
          // Reset the slider value here
        }
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [sound, isPlaying, currentTime, duration, isPlaybackComplete]);

  useEffect(() => {
    return () => {
      if (sound) {
        sound.stop();
        sound.release();
        setIsPlaying(false);
        setCurrentTime(0);
      }
    };
  }, [sound]);

  // const downloadAudio = async () => {
  //   if (!isDownloaded) {
  //     const remoteAudioURL = message_data.audio;
      // const audioFileName = `${message_data.id}_${message_data.created_at}.mp3`;
  //     const localAudioDirectory = `${RNFS.ExternalStorageDirectoryPath}/Anee/media/audio`;
  //     const localAudioURI = `${localAudioDirectory}/${audioFileName}`;

  //     try {
  //       // Check and request storage permission
  //       const granted = await PermissionsAndroid.request(
  //         PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
  //         {
  //           title: 'Storage Permission',
  //           message: 'App needs access to your storage to download files.',
  //           buttonNeutral: 'Ask Me Later',
  //           buttonNegative: 'Cancel',
  //           buttonPositive: 'OK',
  //         },
  //       );
  //       if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
  //         console.log('Storage permission denied');
  //         return; // Exit if permission is not granted
  //       }

  //       // Create directory if not exists
  //       await RNFS.mkdir(localAudioDirectory, {
  //         // Create intermediate directories if they don't exist
  //         intermediates: true,
  //       });

  //       const options = {
  //         fromUrl: remoteAudioURL,
  //         toFile: localAudioURI,
  //         progress: res => {
  //           const percentage = (res.bytesWritten / res.contentLength) * 100;
  //           setDownloadProgress(percentage);
  //         },
  //       };

  //       const downloadResult = await RNFS.downloadFile(options).promise;
  //       setBtnShow(false);
  //       if (downloadResult.statusCode === 200) {
  //         setUri(`file://${localAudioURI}`);
  //         setIsDownloaded(true);

  //         const soundObject = new Sound(
  //           `file://${localAudioURI}`,
  //           '',
  //           error => {
  //             if (error) {
  //               console.error('Error loading audio:', error);
  //             } else {
  //               setSound(soundObject);
  //               setDuration(soundObject.getDuration());
  //             }
  //           },
  //         );
  //       } else {
  //         console.log('Download failed:', downloadResult.statusCode);
  //       }
  //     } catch (error) {
  //       console.log('Error downloading audio:', error);
  //     }
  //   }
  // };
  // const downloadAudio = async () => {
  //   if (!isDownloaded) {
  //     const remoteAudioURL = message_data.audio;
  //     const audioFileName = `${message_data.id}_${message_data.created_at}.mp3`;

  //     const localAudioURI = `${RNFS.ExternalStorageDirectoryPath}/Anee/media/audio/${audioFileName}`;

  //     try {
  //       await RNFS.mkdir(`${RNFS.ExternalStorageDirectoryPath}/Anee`);
  //       await RNFS.mkdir(
  //         `${RNFS.ExternalStorageDirectoryPath}/Anee/media`,
  //       );
  //       await RNFS.mkdir(
  //         `${RNFS.ExternalStorageDirectoryPath}/Anee/media/audio`,
  //       );
  //     } catch (error) {
  //       // console.log('Error creating folders:', error);
  //     }

  //     const options = {
  //       fromUrl: remoteAudioURL,
  //       toFile: localAudioURI,
  //       progress: res => {
  //         const percentage = (res.bytesWritten / res.contentLength) * 100;
  //         setDownloadProgress(percentage);
  //       },
  //     };

  //     const downloadResult = await RNFS.downloadFile(options).promise;
  //     setBtnShow(false);
  //     if (downloadResult.statusCode === 200) {
  //       setUri(`file://${localAudioURI}`);
  //       setIsDownloaded(true);

  //       const soundObject = new Sound(`file://${localAudioURI}`, '', error => {
  //         if (error) {
  //           // console.error('Error loading audio:', error);
  //         } else {
  //           setSound(soundObject);
  //           setDuration(soundObject.getDuration());
  //         }
  //       });
  //     } else {
  //       console.log('Download failed:', downloadResult.statusCode);
  //     }
  //   }
  // };

  const downloadAudio = async () => {
    if (!isDownloaded) {
      const remoteAudioURL = message_data.audio;
      const audioFileName = `${message_data.id}_${message_data.created_at}.mp3`;
  
      const localAudioPath = `${RNFS.ExternalStorageDirectoryPath}/Anee/media/audio/${audioFileName}`;
  
      try {
        await RNFS.mkdir(`${RNFS.ExternalStorageDirectoryPath}/Anee`);
        await RNFS.mkdir(`${RNFS.ExternalStorageDirectoryPath}/Anee/media`);
        await RNFS.mkdir(`${RNFS.ExternalStorageDirectoryPath}/Anee/media/audio`);
      } catch (error) {
        console.log('Error creating folders:', error);
      }
  
      const options = {
        fromUrl: remoteAudioURL,
        toFile: localAudioPath,
        progress: res => {
          const percentage = (res.bytesWritten / res.contentLength) * 100;
          setDownloadProgress(percentage);
        },
      };
  
      try {
        const downloadResult = await RNFS.downloadFile(options).promise;
        setBtnShow(false);
        if (downloadResult.statusCode === 200) {
          // Set local audio path
          setUri(localAudioPath);
          setIsDownloaded(true);
  
          // Load audio file
          const soundObject = new Sound(localAudioPath, '', error => {
            if (error) {
              console.error('Error loading audio:', error);
            } else {
              setSound(soundObject);
              setDuration(soundObject.getDuration());
            }
          });
        } else {
          console.log('Download failed:', downloadResult.statusCode);
        }
      } catch (error) {
        console.error('Download error:', error);
      }
    }
  };

  const togglePlayPause = () => {
    if (sound) {
      setIsPlaying(true);
      if (isPlaying) {
        sound.pause();
        setIsPlaying(false);
      } else {
        // Reset the slider value to 0 when playing again
        setCurrentTime(0);
        sound.play(success => {
          if (success) {
            setIsPlaying(true);
            setIsPlaybackComplete(false);
          } else {
            // console.error('Playback failed');
          }
        });
      }
    }
  };
  const handleSliderChange = value => {
    if (sound) {
      const position = value * duration;
      // console.log('position', position);
      sound.setCurrentTime(position);
      setCurrentTime(position);
    }
  };
  const handleForward = () => {
    if (sound) {
      const newPosition = currentTime + 10; // Forward by 10 seconds
      if (newPosition < duration) {
        sound.setCurrentTime(newPosition);
        setCurrentTime(newPosition);
      }
    }
  };
  const handleBackward = () => {
    if (sound) {
      const newPosition = currentTime - 10; // Backward by 10 seconds
      if (newPosition >= 0) {
        sound.setCurrentTime(newPosition);
        setCurrentTime(newPosition);
      }
    }
  };
  // Function to format time in HH:MM:SS format
  const formatTime = timeInSeconds => {
    const hours = Math.floor(timeInSeconds / 3600);
    const minutes = Math.floor((timeInSeconds % 3600) / 60);
    const seconds = Math.floor(timeInSeconds % 60);
    return `${hours}:${minutes < 10 ? '0' : ''}${minutes}:${
      seconds < 10 ? '0' : ''
    }${seconds}`;
  };

  // Calculate remaining time
  const remainingTime = duration - currentTime;
  return (
    <View style={styles.MainView}>
      {/* {message_data.type == 'other' ? ( */}
      {checkID != userDetails?.id ? (
        // message_data?.message || message_data?.text ? (
        message_data?.message_type == 'text' ? (
          <View style={{marginVertical: 10}}>
            <View style={GlobalStyle.Row}>
              <View style={styles.ImageBox}>
                <Image
                  source={{
                    uri: message_data?.user_profile
                      ? message_data?.user_profile
                      : profile_image,
                  }}
                  style={{
                    height: '100%',
                    width: '100%',
                    borderRadius: 8,
                  }}
                  resizeMode="contain"
                />
              </View>

              <View style={styles.OtherBox}>
                <Text style={styles.Message}>
                  {message_data?.message
                    ? message_data?.message
                    : message_data?.text}
                </Text>
              </View>
            </View>
            <Text style={styles.OtherTime}>
              {formatCommentTime(checkTiming)}
            </Text>
          </View>
        ) : message_data?.message_type == 'audio' ? (
          <View>
            <View style={GlobalStyle.Row}>
              <View style={styles.ImageBox}>
                <Image
                  source={{
                    uri: message_data?.user_profile
                      ? message_data?.user_profile
                      : profile_image,
                  }}
                  style={{
                    height: '100%',
                    width: '100%',
                    borderRadius: 8,
                  }}
                  resizeMode="contain"
                />
              </View>

              <View
                style={[
                  styles.newVoice,
                  {
                    flexDirection: 'row-reverse',
                    backgroundColor: Colors.OtherBox,
                    justifyContent: 'center',
                    paddingHorizontal: 15,
                    // paddingVertical: 18,
                    borderRadius: 20,
                    borderBottomLeftRadius: 0,
                    // marginLeft: 8,
                    width: '85%',
                    left: 6,
                  },
                ]}>
                <View
                  style={{
                    flex: 0.2,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  {isDownloaded ? (
                    <TouchableOpacity
                      onPress={togglePlayPause}
                      style={styles.sendVoice}>
                      {isPlaying ? (
                        <Ionicons name={'pause'} color={'#fff'} size={25} />
                      ) : (
                        <Entypo
                          name={'controller-play'}
                          color={'#fff'}
                          size={25}
                        />
                      )}
                    </TouchableOpacity>
                  ) : downloadProgress > 0 && downloadProgress < 99 ? (
                    <Progress.Circle
                      showsText
                      size={40}
                      borderWidth={0}
                      progress={downloadProgress / 100}
                      indeterminate={downloadProgress === 0}
                      animated={true}
                      textStyle={{
                        fontFamily: Font.Poppins800,
                        fontSize: 12,
                        color: Colors.Purple,
                        justifyContent: 'center',
                      }}
                      fill="#00000000"
                      color={Colors.Purple}
                      unfilledColor={'#E3DAEE'}
                    />
                  ) : (
                    <TouchableOpacity
                      onPress={downloadAudio}
                      style={styles.sendVoice}>
                      {/* <Text>Download</Text> */}
                      <MaterialCommunityIcons
                        name={'download'}
                        color={'#fff'}
                        size={25}
                      />
                    </TouchableOpacity>
                  )}
                </View>
                <View
                  style={{
                    flex: 0.8,
                  }}>
                  <View
                    style={{
                      flex: 0.7,
                      justifyContent: 'flex-end',
                    }}>
                    <Slider
                      style={{width: '100%', bottom: 5}}
                      minimumValue={0}
                      maximumValue={duration}
                      value={currentTime}
                      onValueChange={handleSliderChange}
                      thumbTintColor={Colors.YourBox}
                    />
                  </View>
                  <View
                    style={{
                      flex: 0.3,
                      justifyContent: 'center',
                      alignItems: 'flex-start',
                      paddingLeft: 12,
                    }}>
                    <Text
                      style={{
                        fontSize: 10,
                        fontFamily: Font.Gilroy400,
                        color: Colors.SignUpGrey,
                      }}>
                      Duration: {formatTime(duration)}
                    </Text>
                  </View>
                </View>
              </View>
            </View>

            <Text style={[styles.Time, {alignSelf: 'flex-start'}]}>
              {formatCommentTime(checkTiming)}
            </Text>
          </View>
        ) : message_data?.message_type == 'images' ||
          message_data?.message_type == 'video' ? (
          <View style={{marginVertical: 10}}>
            <View style={GlobalStyle.Row}>
              <View style={styles.ImageBox}>
                <Image
                  source={{
                    uri: message_data?.user_profile
                      ? message_data?.user_profile
                      : profile_image,
                  }}
                  style={{
                    height: '100%',
                    width: '100%',
                    borderRadius: 8,
                  }}
                  resizeMode="contain"
                />
              </View>

              <View
                style={{
                  // borderTopRightRadius: 0,
                  // justifyContent: 'flex-start',
                  paddingHorizontal: 4,
                  paddingVertical: 10,
                  borderRadius: 18,
                  flexDirection: 'row',
                  maxWidth: 258,
                  flexWrap: 'wrap',
                  overflow: 'hidden',
                  backgroundColor: Colors.OtherBox,
                  borderBottomLeftRadius: 0,
                  marginLeft: 8,
                }}>
                {message_data?.media?.length > 0 &&
                  message_data?.media?.map((item, index) => {
                    return index <= 3 && item?.type == 'video' ? (
                      index <= 2 ? (
                        <TouchableOpacity
                          activeOpacity={0.8}
                          onPress={() => scrollToIndex(index)}
                          key={index}
                          style={{
                            height: 150,
                            width: 120,
                            overflow: 'hidden',
                            borderRadius: 10,
                            margin: 2,
                            borderWidth: 1,
                            borderColor: 'white',
                            justifyContent: 'center',
                            alignItems: 'center',
                            backgroundColor: 'black',
                          }}>
                          <Image
                            resizeMode="cover"
                            source={{uri: pic[index]}}
                            style={styles.ThmbnlImg}
                          />
                          <MaterialCommunityIcons
                            color={'#ffffff'}
                            name="play"
                            size={32}
                          />
                        </TouchableOpacity>
                      ) : (
                        <TouchableOpacity
                          onPress={() => scrollToIndex(index)}
                          activeOpacity={0.8}
                          key={index}
                          style={styles.VideoCon}>
                          <View style={styles.MainShowCon}>
                            <Image
                              resizeMode="cover"
                              source={{uri: pic[index]}}
                              style={styles.ThmbnlImg}
                            />

                            <Entypo name="plus" color={'white'} size={20} />
                            <Text
                              style={{
                                color: 'white',
                                fontFamily: Font.Gilroy500,
                                fontSize: 17,
                              }}>
                              {message_data?.media?.length}
                            </Text>
                          </View>
                        </TouchableOpacity>
                      )
                    ) : null;
                  })}
                {message_data?.media?.length > 0 &&
                  message_data?.media?.map((item, index) => {
                    console.log('item?.url', item?.url);
                    return index <= 3 && item?.type == 'images' ? (
                      index <= 2 ? (
                        <TouchableOpacity
                          onPress={() => scrollToIndex(index)}
                          key={index}
                          style={{
                            height: 150,
                            width: 120,
                            overflow: 'hidden',
                            borderRadius: 10,
                            margin: 2,
                            borderWidth: 1,
                            borderColor: 'white',
                          }}>
                          <Image
                            resizeMode="cover"
                            source={{uri: item?.url}}
                            style={{
                              height: '100%',
                              width: '100%',
                            }}
                          />
                        </TouchableOpacity>
                      ) : (
                        <TouchableOpacity
                          onPress={() => scrollToIndex(index)}
                          activeOpacity={0.5}
                          key={index}
                          style={styles.MainIMgCon}>
                          <Image
                            resizeMode="cover"
                            source={{uri: item?.url}}
                            style={{
                              height: '100%',
                              width: '100%',
                              opacity: 0.5,
                            }}
                          />
                          <View style={styles.LastShowCount}>
                            <Entypo name="plus" color={'white'} size={20} />
                            <Text
                              style={{
                                color: 'white',
                                fontFamily: Font.Gilroy500,
                                fontSize: 17,
                              }}>
                              {message_data?.media?.length}
                            </Text>
                          </View>
                        </TouchableOpacity>
                      )
                    ) : null;
                  })}
              </View>
            </View>
            <Text style={styles.OtherTime}>
              {formatCommentTime(message_data?.created_at)}
            </Text>
          </View>
        ) : null
      ) : null}

      {checkID == userDetails?.id ? (
        // message_data?.message || message_data?.text ? (
        message_data?.message_type == 'text' ? (
          <View style={styles.Container}>
            <View style={styles.YourBox}>
              <Text style={[styles.Message, {color: Colors.White}]}>
                {message_data?.message
                  ? message_data?.message
                  : message_data?.text}
              </Text>
            </View>
            <Text style={styles.Time}>{formatCommentTime(checkTiming)}</Text>
          </View>
        ) : message_data?.message_type == 'audio' ? (
          <>
            <View
              style={[
                styles.newVoice,
                {
                  // borderBottomRightRadius: 0,
                  // borderTopLeftRadius: 30,
                  // borderBottomLeftRadius: 30,
                  flexDirection: 'row',
                  backgroundColor: Colors.YourBox,
                  borderTopRightRadius: 0,
                  justifyContent: 'center',
                  paddingHorizontal: 15,
                  // paddingVertical: 18,
                  borderRadius: 20,
                  marginLeft: 8,
                },
              ]}>
              <View
                style={{
                  flex: 0.2,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                {isDownloaded ? (
                  <TouchableOpacity
                    onPress={togglePlayPause}
                    style={styles.sendVoice}>
                    {isPlaying ? (
                      <Ionicons name={'pause'} color={'#fff'} size={25} />
                    ) : (
                      <Entypo
                        name={'controller-play'}
                        color={'#fff'}
                        size={25}
                      />
                    )}
                  </TouchableOpacity>
                ) : downloadProgress > 0 && downloadProgress < 99 ? (
                  <Progress.Circle
                    showsText
                    size={40}
                    borderWidth={0}
                    progress={downloadProgress / 100}
                    indeterminate={downloadProgress === 0}
                    animated={true}
                    textStyle={{
                      fontFamily: Font.Poppins800,
                      fontSize: 12,
                      color: Colors.Purple,
                      justifyContent: 'center',
                    }}
                    fill="#00000000"
                    color={Colors.Purple}
                    unfilledColor={'#E3DAEE'}
                  />
                ) : (
                  <TouchableOpacity
                    onPress={downloadAudio}
                    style={styles.sendVoice}>
                    {/* <Text>Download</Text> */}
                    <MaterialCommunityIcons
                      name={'download'}
                      color={'#fff'}
                      size={25}
                    />
                  </TouchableOpacity>
                )}
              </View>
              <View
                style={{
                  flex: 0.8,
                }}>
                <View
                  style={{
                    flex: 0.7,
                    justifyContent: 'flex-end',
                  }}>
                  <Slider
                    style={{width: '100%', bottom: 5}}
                    minimumValue={0}
                    maximumValue={duration}
                    value={currentTime}
                    onValueChange={handleSliderChange}
                    thumbTintColor={Colors.White}
                  />
                </View>
                <View
                  style={{
                    flex: 0.3,
                    justifyContent: 'center',
                    alignItems: 'flex-start',
                    paddingLeft: 12,
                  }}>
                  <Text
                    style={{
                      fontSize: 10,
                      fontFamily: Font.Gilroy400,
                      color: Colors.White,
                    }}>
                    Duration: {formatTime(duration)}
                  </Text>
                </View>
              </View>
            </View>
            <Text style={styles.Time}>{formatCommentTime(checkTiming)}</Text>
          </>
        ) : message_data?.message_type == 'images' ||
          message_data?.message_type == 'video' ? (
          <View style={styles.Container}>
            <View style={styles.MainBoxCon}>
              {message_data?.media?.length > 0 &&
                message_data?.media?.map((item, index) => {
                  return index <= 3 && item?.type == 'video' ? (
                    index <= 2 ? (
                      <TouchableOpacity
                        activeOpacity={0.8}
                        onPress={() => scrollToIndex(index)}
                        key={index}
                        style={styles.VideoCon}>
                        <Image
                          resizeMode="cover"
                          source={{uri: pic[index]}}
                          style={styles.ThmbnlImg}
                        />
                        <MaterialCommunityIcons
                          color={'#ffffff'}
                          name="play"
                          size={32}
                        />
                      </TouchableOpacity>
                    ) : (
                      <TouchableOpacity
                        onPress={() => scrollToIndex(index)}
                        activeOpacity={0.8}
                        key={index}
                        style={styles.VideoCon}>
                        <View style={styles.MainShowCon}>
                          <Image
                            resizeMode="cover"
                            source={{uri: pic[index]}}
                            style={styles.ThmbnlImg}
                          />

                          <Entypo name="plus" color={'white'} size={20} />
                          <Text
                            style={{
                              color: 'white',
                              fontFamily: Font.Gilroy500,
                              fontSize: 17,
                            }}>
                            {message_data?.media?.length}
                          </Text>
                        </View>
                      </TouchableOpacity>
                    )
                  ) : null;
                })}
              {message_data?.media?.length > 0 &&
                message_data?.media?.map((item, index) => {
                  return index <= 3 && item?.type == 'images' ? (
                    index <= 2 ? (
                      <TouchableOpacity
                        onPress={() => scrollToIndex(index)}
                        key={index}
                        style={styles.MainIMgCon}>
                        <Image
                          resizeMode="cover"
                          source={{uri: item?.url}}
                          style={{
                            height: '100%',
                            width: '100%',
                          }}
                        />
                      </TouchableOpacity>
                    ) : (
                      <TouchableOpacity
                        onPress={() => scrollToIndex(index)}
                        activeOpacity={0.5}
                        key={index}
                        style={styles.MainIMgCon}>
                        <Image
                          resizeMode="cover"
                          source={{uri: item?.url}}
                          style={{
                            height: '100%',
                            width: '100%',
                            opacity: 0.5,
                          }}
                        />
                        <View style={styles.LastShowCount}>
                          <Entypo name="plus" color={'white'} size={20} />
                          <Text
                            style={{
                              color: 'white',
                              fontFamily: Font.Gilroy500,
                              fontSize: 17,
                            }}>
                            {message_data?.media?.length}
                          </Text>
                        </View>
                      </TouchableOpacity>
                    )
                  ) : null;
                })}
            </View>
            <Text style={styles.Time}>{formatCommentTime(checkTiming)}</Text>
          </View>
        ) : null
      ) : null}

      <ReactNativeModal
        isVisible={show}
        style={{
          justifyContent: 'center',
          margin: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.8)',
        }}
        animationIn={'zoomIn'}
        animationOut={'zoomOut'}>
        <View
          style={{
            flex: 1,
          }}>
          <View
            style={{
              flex: 0.1,
              justifyContent: 'center',
              paddingLeft: 15,
            }}>
            <TouchableOpacity onPress={() => setShow(false)}>
              <View style={styles.ModalCnclBtn}>
                <Entypo name="cross" color={'black'} size={20} />
              </View>
            </TouchableOpacity>
          </View>
          <ScrollView
            ref={scrollViewRef}
            showsHorizontalScrollIndicator={false}
            style={{
              flex: 0.9,
              overflow: 'hidden',
              marginTop: 10,
            }}>
            {message_data?.media?.length > 0 &&
              message_data?.media?.map((item, index) => {
                return item?.type == 'images' ? (
                  <View
                    key={index}
                    style={{
                      height: Dimensions.get('screen').height / 1.2,
                      width: '100%',
                      overflow: 'hidden',
                      marginBottom: 10,
                    }}>
                    <Image
                      resizeMode="contain"
                      source={{uri: item?.url}}
                      style={{
                        height: '100%',
                        width: '100%',
                      }}
                    />
                  </View>
                ) : item?.type == 'video' ? (
                  <View key={index} style={styles.ModalCardMain}>
                    {isLoading ? (
                      <View style={styles.StartLoading}>
                        <ActivityIndicator size="large" color="#ffffff" />
                      </View>
                    ) : null}
                    <VideoPlayer
                      autoplay={false}
                      onLoadStart={() => setIsLoading(true)}
                      ref={videoRef}
                      onLoad={() => setIsLoading(false)}
                      style={{
                        width: '100%',
                        height: '100%',
                      }}
                      resizeMode="contain"
                      video={{uri: item?.url}}
                      videoWidth={width}
                      disableFullscreen
                      thumbnail={{
                        uri: pic[index],
                      }}
                    />
                  </View>
                ) : null;
              })}
          </ScrollView>
        </View>
      </ReactNativeModal>
    </View>
  );
};

export default MessageDisplay;

const styles = StyleSheet.create({
  VideoCon: {
    height: 150,
    width: 125,
    overflow: 'hidden',
    borderRadius: 10,
    margin: 2,
    borderWidth: 1,
    borderColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
  },
  ThmbnlImg: {
    height: '100%',
    width: '100%',
    position: 'absolute',
    zIndex: -99,
    opacity: 0.2,
  },
  MainShowCon: {
    height: '100%',
    width: '100%',
    position: 'absolute',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  MainIMgCon: {
    height: 150,
    width: 120,
    overflow: 'hidden',
    borderRadius: 10,
    margin: 2,
    borderWidth: 1,
    borderColor: 'white',
  },
  LastShowCount: {
    height: '100%',
    width: '100%',
    position: 'absolute',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  MainBoxCon: {
    backgroundColor: Colors.YourBox,
    borderTopRightRadius: 0,
    justifyContent: 'flex-start',
    paddingHorizontal: 4,
    paddingVertical: 10,
    borderRadius: 18,
    flexDirection: 'row',
    maxWidth: 265,
    // maxWidth: '82%',
    flexWrap: 'wrap',
    overflow: 'hidden',
  },
  ModalCnclBtn: {
    height: 30,
    width: 30,
    backgroundColor: 'white',
    borderRadius: 6,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
  },
  ModalCardMain: {
    height: 500,
    width: '100%',
    overflow: 'hidden',
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: 'white',
    borderStyle: 'dashed',
    backgroundColor: 'black',
  },
  StartLoading: {
    height: '100%',
    width: '100%',
    position: 'absolute',
    zIndex: 999,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000000',
  },
  ImgTime: {
    alignItems: 'center',
  },
  ImageBox: {
    borderRadius: 8,
    height: 40,
    width: 40,
    alignItems: 'center',
    backgroundColor: Colors.GreyBox,
    alignSelf: 'flex-end',
  },
  OtherTime: {
    color: Colors.MessageTime,
    fontSize: 12,
    fontFamily: Font.Poppins500,
    marginTop: 5,
  },
  Time: {
    marginTop: 5,
    color: Colors.MessageTime,
    fontSize: 12,
    fontFamily: Font.Poppins500,
    alignSelf: 'flex-end',
  },
  OtherBox: {
    backgroundColor: Colors.OtherBox,
    justifyContent: 'center',
    paddingHorizontal: 10,
    paddingVertical: 7,
    borderRadius: 7,
    marginLeft: 8,
  },
  Container: {
    alignItems: 'flex-end',
    marginVertical: 10,
  },
  Message: {
    color: Colors.Black,
    fontSize: 16,
    fontFamily: Font.Poppins500,
    textAlign: 'left',
  },
  YourBox: {
    backgroundColor: Colors.YourBox,
    justifyContent: 'center',
    paddingHorizontal: 10,
    paddingVertical: 7,
    borderRadius: 7,
    marginLeft: 8,
  },
  messageBox: {
    marginVertical: 5,
    borderRadius: 12,
    padding: 10,
    maxWidth: '80%',
    borderWidth: 1.2,
    borderColor: 'lightgrey',
  },
  messageBox1: {
    borderRadius: 12,
    maxWidth: '80%',
    maxHeight: 200,
    elevation: 1,
  },
  messageText: {
    color: '#333',
    fontFamily: Font.Poppins500,
    fontSize: 11,
  },
  timeText: {
    color: '#000000',
    fontSize: 10,
  },
  sendVoice: {
    backgroundColor: Colors.YourBox,
    height: 40,
    width: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 100,
    paddingLeft: 2,
  },
  newVoice: {
    height: 55,
    // width: '90%',
    backgroundColor: '#F0F0F5',
    overflow: 'hidden',
    margin: 2,
  },
});

// https://github.com/souvik-ghosh/react-native-create-thumbnail/issues/76
// react native thumbnail error resolve ye add kro line 192
// try {
//   retriever.release();
// } catch(IOException e) {
//   e.printStackTrace();
// }
