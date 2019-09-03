import { Dimensions } from "react-native";

const dimensions = Dimensions.get('window');

export const theme = {
  color: {
    primary: '#2ecc71',
    secondary: '#f7941e',
    grey: '#d5d5d5'
  },
  dimensions
}

export const fullScreen = {
  width: dimensions.width,
  height: dimensions.height
}

export const backgroundGray = {
  backgroundColor: '#efefef'
}

export const backgroundPrimary = {
  backgroundColor: theme.color.primary
}

export const backgroundSecondary = {
  backgroundColor: theme.color.secondary
}

export const backgroundGrey = {
  backgroundColor: theme.color.grey
}

export const container = {
  flex: 1, 
  paddingHorizontal: 10
}

export const centeredItems = {
  justifyContent: "center",
  alignItem: "center"
}

export const floatLeft = {
  padding: 5, 
  flexDirection: "row"
}

export const formGroup = {
  paddingBottom: 15,
  paddingLeft: 0,
  marginLeft: -15
}

export const textCenter = {
  textAlign: "center"
}

export const textRight = {
  textAlign: "right"
}

export const uppercase = {
  textTransform: "uppercase"
}

export const textBold = {
  fontWeight: "700"
}

export const borderRadius = {
  borderTopStartRadius: 5, 
  borderTopEndRadius: 5, 
  borderBottomStartRadius: 5, 
  borderBottomEndRadius: 5
}

export const pt10 = {
  paddingTop: (10/100)*dimensions.height
}

export const pt5 = {
  paddingTop: (5/100)*dimensions.height
}
