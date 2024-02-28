import { TouchableOpacity } from 'react-native'
import React from 'react'
import { SubHead } from '../../../../components'

const EditHeader = ({ text, onPress }) => {
    return (
        <TouchableOpacity onPress={onPress}>
            <SubHead white text={text} />
        </TouchableOpacity>
    )
}

export default EditHeader