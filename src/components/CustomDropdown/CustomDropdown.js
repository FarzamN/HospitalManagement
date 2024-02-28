import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { Colors } from '../../utils/Colors'
import { Font } from '../../utils/font'
import Icon, { IconType } from 'react-native-dynamic-vector-icons'
import { SubHead } from '../Texts'


const CustomDropdown = (props) => {
    return (
        <View style={{ marginVertical: 15 }}>
            <SubHead bold text={props.Heading} />
            <TouchableOpacity
                activeOpacity={0.5}
                onPress={() => props.setSelect(!props.select)}
                style={{
                    height: 50,
                    borderRadius: 10,
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginTop: 10,
                    borderWidth: 1.2,
                    borderColor: '#E9E9E9',
                    backgroundColor: '#F8F8F8',
                    justifyContent: 'space-between',
                    paddingHorizontal: 20
                }}>
                <Text
                    style={{
                        fontSize: 14,
                        color: Colors.Grey,
                        fontFamily: Font.font500,

                    }}>{props.selectData?.length > 0 ? `Selected ${props.Heading} ` + `(${props.selectData?.length})` : props.label}</Text>

                <Icon
                    size={20}
                    name={props.select ? 'keyboard-arrow-down' : 'keyboard-arrow-up'}
                    color='black'
                    type={IconType.MaterialIcons}
                />


            </TouchableOpacity>
            {
                props.select && props.selectData?.length > 0 &&
                <View
                    style={{
                        borderRadius: 10,
                        flexDirection: 'row',
                        flexWrap: 'wrap',
                        // alignItems: 'center',
                        marginTop: 10,
                        borderWidth: 1.2,
                        borderColor: '#E9E9E9',
                        backgroundColor: '#F8F8F8',
                        paddingHorizontal: 15,
                        paddingVertical: 10
                    }}>
                    {props.selectData?.map((mnt, inx) => {
                        return (
                            <View
                                key={inx}
                                style={{
                                    paddingVertical: 5,
                                    paddingHorizontal: 10,
                                    justifyContent: 'center',
                                    alignItems: "center",
                                    margin: 3,
                                    backgroundColor: 'grey',
                                    borderRadius: 14
                                }}
                            >
                                <Text
                                    style={{
                                        fontSize: 10,
                                        color: Colors.White,
                                        fontFamily: Font.font400,
                                        top: 1
                                    }}>{mnt?.value}</Text>
                            </View>
                        )
                    })}
                </View>
            }
            {
                props.select &&
                <View
                    style={{
                        padding: 10,
                        //  backgroundColor: 'grey',
                        marginTop: 10,
                        borderWidth: 1,
                        borderColor: '#E9E9E9',
                        backgroundColor: '#F8F8F8',
                        borderRadius: 8
                    }}>
                    {
                        props?.data.map((item, index) => {
                            const findData = props.selectData?.find((mnt) => mnt?.key == item?.key)
                            console.log('findData', findData)
                            return (
                                <TouchableOpacity
                                    onPress={() => props.boxPress(item)}
                                    activeOpacity={0.5}
                                    style={{
                                        flexDirection: 'row',
                                        height: 25,
                                        marginBottom: 5
                                    }}
                                    key={index}>
                                    <View style={{
                                        height: '100%',
                                        width: '10%',
                                        justifyContent: 'center',
                                        alignItems: 'center'
                                    }}>
                                        {
                                            findData?.key == item?.key ?
                                                <Icon
                                                    size={16}
                                                    name={'check-square'}
                                                    color='black'
                                                    type={IconType.FontAwesome}
                                                />
                                                :
                                                <Icon
                                                    size={14}
                                                    name={'checkbox-passive'}
                                                    color='black'
                                                    type={IconType.Fontisto}
                                                />
                                        }
                                        {/* <View style={{
                                            height: 13,
                                            width: 13,
                                            borderRadius: 2,
                                            borderWidth: 1,
                                            borderColor: 'grey',
                                        }}></View> */}
                                    </View>
                                    <View style={{ height: '100%', width: '90%', justifyContent: 'center' }}>
                                        <Text
                                            style={{
                                                fontSize: 13,
                                                color: Colors.Black,
                                                fontFamily: Font.font400,
                                                top: 1
                                            }}>{item?.value}</Text>
                                    </View>
                                </TouchableOpacity>
                            )
                        })
                    }
                </View>
            }
        </View>
    )
}

export default CustomDropdown

const styles = StyleSheet.create({})