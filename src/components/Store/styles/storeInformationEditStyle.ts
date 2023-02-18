import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
  },

  wrapper: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },

  header: {
    height: 39,
    lineHeight: 39,
    flexDirection: 'row',
    backgroundColor: '#F2F2F2',
  },

  headerIcon: {
    flex: 1,
    marginLeft: 15,
  },

  iconBack: {
    lineHeight: 39,
    fontWeight: 'bold',
  },

  headerText: {
    flex: 5,
    paddingRight: 65,
    alignItems: 'center',
  },

  titleScreen: {
    fontSize: 20,
    lineHeight: 39,
    color: '#0FAE71',
    fontWeight: 'bold',
  },

  listHeader: {
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#0D2064',
  },

  listHeaderText: {
    fontSize: 18,
    lineHeight: 39,
    color: '#FFFFFF',
    fontWeight: 'bold',
  },

  editButton: {
    right: 10,
    position: 'absolute',
  },

  iconPen: {
    lineHeight: 39,
    fontWeight: 'bold',
  },

  basicInformation: {},

  deliveryInformation: {
    borderTopWidth: 2,
    borderTopColor: '#FFFFFF',
  },

  deliveryProcedure: {
    borderTopWidth: 2,
    borderTopColor: '#FFFFFF',
  },

  routeInformation: {
    borderTopWidth: 2,
    borderTopColor: '#FFFFFF',
  },

  parkingInformation: {
    borderTopWidth: 2,
    borderTopColor: '#FFFFFF',
  },

  rowHeader: {
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F2F2F2',
  },

  rowHeaderText: {
    fontSize: 20,
  },

  iconDown: {
    fontSize: 25,
    lineHeight: 39,
    paddingLeft: 10,
    paddingBottom: 5,
    color: '#818181',
    fontWeight: 'bold',
  },

  animatedButton: {
    bottom: 0,
    height: 45,
    elevation: 12,
    borderRadius: 10,
    shadowRadius: 7.49,
    width: '50%',
    marginLeft: 10,
    shadowOpacity: 0.37,
    shadowColor: '#000000',
    backgroundColor: '#DDDDDD',

    shadowOffset: {
      width: 0,
      height: 6,
    },
  },

  updateInformation: {
    flex: 1,
    height: 50,
    marginVertical: 10,
    elevation: 5,
    borderRadius: 45,
    shadowRadius: 3.84,
    shadowOpacity: 0.25,
    alignItems: 'center',
    marginHorizontal: 100,
    shadowColor: '#000000',
    justifyContent: 'center',
    backgroundColor: '#0D2064',

    shadowOffset: {
      width: 0,
      height: 2,
    },
  },

  updateInformationBar: {
    flex: 1,
    height: 50,
    marginVertical: 10,
    alignItems: 'center',
    shadowColor: '#000000',
    justifyContent: 'center',
    backgroundColor: '#0D2064',
  },


  updateInformationText: {
    padding: 10,
    fontSize: 20,
    color: '#FFFFFF',
    fontWeight: 'bold',
  },

  basicInformationTable: {
    margin: 5,
    borderWidth: 1,
    borderColor: '#C4C4C4',
  },

  deliveryInformationTable: {
    margin: 5,
    borderWidth: 1,
    borderColor: '#C4C4C4',
  },

  deliveryProcedureTable: {
    margin: 5,
    borderWidth: 1,
    borderColor: '#C4C4C4',
  },

  businessClassification: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },

  deliveryDestinationCode: {
    borderTopWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderTopColor: '#C4C4C4',
  },

  deliveryDestinationNameKana: {
    borderTopWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderTopColor: '#C4C4C4',
  },

  deliveryDestinationName: {
    borderTopWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderTopColor: '#C4C4C4',
  },

  postCode: {
    borderTopWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderTopColor: '#C4C4C4',
  },

  smallAddress: {
    borderTopWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderTopColor: '#C4C4C4',
  },

  tel: {
    borderTopWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderTopColor: '#C4C4C4',
  },

  deliveryFrequency: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },

  quantityPerDelivery: {
    borderTopWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderTopColor: '#C4C4C4',
  },

  scheduledTime: {
    borderTopWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderTopColor: '#C4C4C4',
  },

  specifyDeliveryTime: {
    borderTopWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderTopColor: '#C4C4C4',
  },

  casualBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },

  vehicleRegulation: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },

  vehicleHeightWidth: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },

  heightWidth: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },

  parkingPlaceDesignation: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },

  trollyUse: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },

  storagePlace: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },

  storageSpecialNote: {
    borderRadius: 0,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },

  emptyDelivery: {
    borderTopWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderTopColor: '#C4C4C4',
  },

  keyUse: {
    borderTopWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderTopColor: '#C4C4C4',
  },

  keyUseRemark: {
    borderTopWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderTopColor: '#C4C4C4',
  },

  securityUse: {
    borderTopWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderTopColor: '#C4C4C4',
  },

  facilityRule: {
    borderTopWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderTopColor: '#C4C4C4',
  },

  certificationRequire: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },

  elevatorRemark: {
    borderTopWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderTopColor: '#C4C4C4',
  },

  waitingPlace: {
    borderTopWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderTopColor: '#C4C4C4',
  },

  deliveryRouteMapOtherPrecaution: {
    height: 120,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },

  deliveryPlace: {
    height: 340,
    flexDirection: 'row',
    justifyContent: 'center',
  },

  businessClassificationFirstInput: {
    height: 40,
    fontSize: 14,
    width: '100%',
    paddingTop: 10,
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 10,
    borderLeftWidth: 1,
    borderColor: '#C4C4C4',
    textAlignVertical: 'top',
  },

  businessClassificationSecondInput: {
    height: 40,
    fontSize: 14,
    width: '100%',
    paddingTop: 10,
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 10,
    borderLeftWidth: 1,
    borderColor: '#C4C4C4',
    textAlignVertical: 'top',
  },

  deliveryDestinationCodeInput: {
    height: 40,
    fontSize: 14,
    width: '100%',
    paddingTop: 10,
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 10,
    borderLeftWidth: 1,
    borderColor: '#C4C4C4',
    textAlignVertical: 'top',
  },

  deliveryDestinationNameKanaInput: {
    height: 40,
    fontSize: 14,
    width: '100%',
    paddingTop: 10,
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 10,
    borderLeftWidth: 1,
    borderColor: '#C4C4C4',
    textAlignVertical: 'top',
  },

  deliveryDestinationNameInput: {
    height: 40,
    fontSize: 14,
    width: '100%',
    paddingTop: 10,
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 10,
    borderLeftWidth: 1,
    borderColor: '#C4C4C4',
    textAlignVertical: 'top',
  },

  postCodeInput: {
    height: 40,
    fontSize: 14,
    width: '100%',
    paddingTop: 10,
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 10,
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderColor: '#C4C4C4',
    textAlignVertical: 'top',
  },

  largeAddressInput: {
    height: 40,
    fontSize: 14,
    width: '100%',
    paddingTop: 10,
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 10,
    borderLeftWidth: 1,
    borderColor: '#C4C4C4',
    textAlignVertical: 'top',
  },

  smallAddressInput: {
    height: 40,
    fontSize: 14,
    width: '100%',
    paddingTop: 10,
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 10,
    borderLeftWidth: 1,
    borderColor: '#C4C4C4',
    textAlignVertical: 'top',
  },

  telInput: {
    height: 40,
    fontSize: 14,
    width: '100%',
    paddingTop: 10,
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 10,
    borderLeftWidth: 1,
    borderColor: '#C4C4C4',
    textAlignVertical: 'top',
  },

  deliveryFrequencyInput: {
    height: 40,
    fontSize: 14,
    width: '100%',
    paddingTop: 10,
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 10,
    borderLeftWidth: 1,
    borderColor: '#C4C4C4',
    textAlignVertical: 'top',
  },

  quantityPerDeliveryInput: {
    height: 40,
    fontSize: 14,
    width: '100%',
    paddingVertical: 10,
    textAlign: 'center',
  },

  deliveryTimeRequireInput: {
    height: 40,
    fontSize: 14,
    width: '100%',
    paddingTop: 10,
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 10,
    borderLeftWidth: 1,
    borderColor: '#C4C4C4',
    textAlignVertical: 'top',
  },

  scheduledTimeInput: {
    height: 40,
    fontSize: 14,
    width: '100%',
    paddingVertical: 10,
    textAlign: 'center',
  },

  specifyDeliveryTimeFirstInput: {
    height: 40,
    fontSize: 14,
    width: '100%',
    paddingVertical: 10,
    textAlign: 'center',
  },

  specifyDeliveryTimeSecondInput: {
    height: 40,
    fontSize: 14,
    width: '100%',
    paddingVertical: 10,
    textAlign: 'center',
  },

  heightInput: {
    height: 40,
    fontSize: 14,
    width: '100%',
    paddingVertical: 10,
    textAlign: 'center',
  },

  widthInput: {
    height: 40,
    fontSize: 14,
    width: '100%',
    paddingVertical: 10,
    textAlign: 'center',
  },

  casualInput: {
    height: 40,
    fontSize: 14,
    width: '100%',
    paddingVertical: 10,
    textAlign: 'center',
  },

  vehicleRegulationInput: {
    height: 40,
    fontSize: 14,
    width: '100%',
    paddingTop: 10,
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 10,
    borderLeftWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#C4C4C4',
    textAlignVertical: 'top',
  },

  heightPerWidthInput: {
    height: 40,
    fontSize: 14,
    width: '100%',
    paddingTop: 10,
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 10,
    borderTopWidth: 1,
    borderLeftWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#C4C4C4',
    textAlignVertical: 'top',
  },

  parkingPlaceDesinationInput: {
    height: 40,
    fontSize: 14,
    width: '100%',
    paddingTop: 10,
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 10,
    borderLeftWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#C4C4C4',
    textAlignVertical: 'top',
  },

  parkingPlaceDesignationRemarkInput: {
    height: 40,
    fontSize: 14,
    width: '100%',
    paddingTop: 10,
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 10,
    borderTopWidth: 1,
    borderLeftWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#C4C4C4',
    textAlignVertical: 'top',
  },

  deliverySlipInput: {
    height: 40,
    fontSize: 14,
    width: '100%',
    paddingTop: 10,
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 10,
    borderLeftWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#C4C4C4',
    textAlignVertical: 'top',
  },

  deliverySlipRemarkInput: {
    height: 40,
    fontSize: 14,
    width: '100%',
    paddingTop: 10,
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 10,
    borderTopWidth: 1,
    borderLeftWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#C4C4C4',
    textAlignVertical: 'top',
  },

  trolleyUseInput: {
    height: 40,
    fontSize: 14,
    width: '100%',
    paddingTop: 10,
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 10,
    borderLeftWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#C4C4C4',
    textAlignVertical: 'top',
  },

  trolleyUseRemarkInput: {
    height: 40,
    fontSize: 14,
    width: '100%',
    paddingTop: 10,
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 10,
    borderTopWidth: 1,
    borderLeftWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#C4C4C4',
    textAlignVertical: 'top',
  },

  storagePlaceInput: {
    height: 40,
    fontSize: 14,
    width: '100%',
    paddingTop: 10,
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 10,
    borderLeftWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#C4C4C4',
    textAlignVertical: 'top',
  },

  storageSpecialNoteInput: {
    height: 40,
    fontSize: 14,
    width: '100%',
    paddingTop: 10,
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 10,
    borderLeftWidth: 1,
    textAlignVertical: 'top',
    borderLeftColor: '#C4C4C4',
  },

  emptyDeliveryInput: {
    height: 40,
    fontSize: 14,
    width: '100%',
    paddingTop: 10,
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 10,
    borderLeftWidth: 1,
    textAlignVertical: 'top',
    borderLeftColor: '#C4C4C4',
  },

  keyUseInput: {
    height: 40,
    fontSize: 14,
    width: '100%',
    paddingTop: 10,
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 10,
    borderLeftWidth: 1,
    textAlignVertical: 'top',
    borderLeftColor: '#C4C4C4',
  },

  keyUseRemarkInput: {
    height: 40,
    fontSize: 14,
    width: '100%',
    paddingTop: 10,
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 10,
    borderLeftWidth: 1,
    textAlignVertical: 'top',
    borderLeftColor: '#C4C4C4',
  },

  securityUseInput: {
    height: 40,
    fontSize: 14,
    width: '100%',
    paddingTop: 10,
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 10,
    borderLeftWidth: 1,
    textAlignVertical: 'top',
    borderLeftColor: '#C4C4C4',
  },

  cancellationMethodInput: {
    height: 40,
    fontSize: 14,
    width: '100%',
    paddingTop: 10,
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 10,
    borderLeftWidth: 1,
    borderBottomWidth: 1,
    textAlignVertical: 'top',
    borderLeftColor: '#C4C4C4',
    borderBottomColor: '#C4C4C4',
  },

  graceTimeInput: {
    height: 40,
    fontSize: 14,
    width: '100%',
    paddingTop: 10,
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 10,
    borderLeftWidth: 1,
    borderBottomWidth: 1,
    textAlignVertical: 'top',
    borderLeftColor: '#C4C4C4',
    borderBottomColor: '#C4C4C4',
  },

  companyNameInput: {
    height: 40,
    fontSize: 14,
    width: '100%',
    paddingTop: 10,
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 10,
    borderLeftWidth: 1,
    borderBottomWidth: 1,
    textAlignVertical: 'top',
    borderLeftColor: '#C4C4C4',
    borderBottomColor: '#C4C4C4',
  },

  companyTelInput: {
    height: 40,
    fontSize: 14,
    width: '100%',
    paddingTop: 10,
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 10,
    borderLeftWidth: 1,
    textAlignVertical: 'top',
    borderLeftColor: '#C4C4C4',
  },

  facilityRuleInput: {
    height: 40,
    fontSize: 14,
    width: '100%',
    paddingTop: 10,
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 10,
    borderLeftWidth: 1,
    textAlignVertical: 'top',
    borderLeftColor: '#C4C4C4',
  },

  permitLicenseInput: {
    height: 40,
    fontSize: 14,
    width: '100%',
    paddingTop: 10,
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 10,
    borderLeftWidth: 1,
    borderBottomWidth: 1,
    textAlignVertical: 'top',
    borderLeftColor: '#C4C4C4',
    borderBottomColor: '#C4C4C4',
  },

  receptionEntryInput: {
    height: 40,
    fontSize: 14,
    width: '100%',
    paddingTop: 10,
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 10,
    borderLeftWidth: 1,
    borderBottomWidth: 1,
    textAlignVertical: 'top',
    borderLeftColor: '#C4C4C4',
    borderBottomColor: '#C4C4C4',
  },

  certificationRequireInput: {
    height: 40,
    fontSize: 14,
    width: '100%',
    paddingTop: 10,
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 10,
    borderLeftWidth: 1,
    borderRightWidth: 1,
    textAlignVertical: 'top',
    borderLeftColor: '#C4C4C4',
    borderRightColor: '#C4C4C4',
  },

  certificationRequireRemarkInput: {
    height: 40,
    fontSize: 14,
    width: '100%',
    paddingTop: 10,
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 10,
    borderLeftWidth: 1,
    textAlignVertical: 'top',
    borderLeftColor: '#C4C4C4',
  },

  elevatorUseInput: {
    height: 40,
    fontSize: 14,
    width: '100%',
    paddingTop: 10,
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 10,
    borderLeftWidth: 1,
    borderRightWidth: 1,
    textAlignVertical: 'top',
    borderLeftColor: '#C4C4C4',
    borderRightColor: '#C4C4C4',
  },

  elevatorUseRemarkInput: {
    height: 40,
    fontSize: 14,
    width: '100%',
    paddingTop: 10,
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 10,
    borderLeftWidth: 1,
    textAlignVertical: 'top',
    borderLeftColor: '#C4C4C4',
  },

  waitingPlaceInput: {
    height: 40,
    fontSize: 14,
    width: '100%',
    paddingTop: 10,
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 10,
    borderLeftWidth: 1,
    borderRightWidth: 1,
    textAlignVertical: 'top',
    borderLeftColor: '#C4C4C4',
    borderRightColor: '#C4C4C4',
  },

  waitingPlaceRemarkInpout: {
    height: 40,
    fontSize: 14,
    width: '100%',
    paddingTop: 10,
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 10,
    borderLeftWidth: 1,
    textAlignVertical: 'top',
    borderLeftColor: '#C4C4C4',
  },

  deliveryPlaceInput: {
    margin: 5,
    height: 35,
    fontSize: 14,
    paddingTop: 10,
    borderWidth: 1,
    paddingLeft: 10,
    paddingRight: 10,
    borderRadius: 15,
    paddingBottom: 10,
    borderColor: '#C4C4C4',
    textAlignVertical: 'bottom',
  },

  deliveryRouteMapOtherPrecautionInput: {
    height: 120,
    fontSize: 14,
    maxHeight: 120,
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderTopWidth: 1,
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderColor: '#C4C4C4',
    textAlignVertical: 'top',
  },

  deliveryDirectionMapOtherPrecautionInput: {
    height: 120,
    fontSize: 14,
    maxHeight: 120,
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderTopWidth: 1,
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderColor: '#C4C4C4',
    textAlignVertical: 'top',
  },

  parkingPositionOtherPrecautionInput: {
    height: 120,
    fontSize: 14,
    maxHeight: 120,
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderTopWidth: 1,
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderColor: '#C4C4C4',
    textAlignVertical: 'top',
  },

  certificationRequireNoteInput: {
    height: 40,
    fontSize: 14,
    width: '100%',
    paddingTop: 10,
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 10,
    borderTopWidth: 1,
    borderLeftWidth: 1,
    textAlignVertical: 'top',
    borderColor: '#C4C4C4',
  },

  headerCol: {
    flex: 1,
    height: '100%',
    alignItems: 'center',
    backgroundColor: '#FFF2CC',
  },

  specialHeaderCol: {
    flex: 1,
    height: '100%',
    alignItems: 'center',
    backgroundColor: '#FFF2CC',
  },

  mainHeader: {
    borderBottomWidth: 1,
    borderBottomColor: '#C4C4C4',
  },

  subHeader: {
    borderLeftWidth: 1,
    borderBottomWidth: 1,
    borderLeftColor: '#C4C4C4',
    borderBottomColor: '#C4C4C4',
  },

  borderLeft: {
    borderLeftWidth: 1,
    borderLeftColor: '#C4C4C4',
  },

  dashedBorderSubHeader: {
    flex: 1,
    borderRadius: 0,
    flexDirection: 'row',
  },

  mapSection: {
    margin: 5,
    height: 600,
    borderWidth: 1,
    borderColor: '#C4C4C4',
  },

  map: {
    flex: 6,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    marginVertical: 10,
    borderColor: '#C4C4C4',
  },

  mapImage: {
    width: '100%',
    height: '100%',
  },

  mapTitle: {
    flex: 1,
    borderRightWidth: 1,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: '#C4C4C4',
    justifyContent: 'center',
    backgroundColor: '#FFF2CC',
  },

  mapTitleText: {
    padding: 10,
    fontSize: 12,
  },

  otherPrecautionTitle: {
    marginTop: 5,
    marginBottom: 10,
    marginHorizontal: 5,
    backgroundColor: '#FFF2CC',
  },

  otherPrecautionTitleText: {
    padding: 10,
  },

  dropdownButton: {
    height: 40,
    width: '100%',
    borderRadius: 0,
    borderLeftWidth: 1,
    backgroundColor: '#FFFFFF',
    borderLeftColor: '#C4C4C4',
  },

  dropdownButtonText: {
    fontSize: 14,
    color: '#000000',
  },

  dropdownContent: {
    borderRadius: 5,
  },

  dropdownRow: {
    height: 40,
  },

  dropdownRowText: {
    fontSize: 12,
  },

  iconAddDeliveryPlace: {
    lineHeight: 45,
    fontWeight: 'bold',
  },

  iconDriveFolderUpload: {
    marginLeft: 10,
    lineHeight: 40,
    fontWeight: 'bold',
  },

  deliveryPlaceList: {
    flex: 4,
    margin: 5,
    padding: 10,
    flexDirection: 'column',
  },

  deliveryPlaceText: {
    marginTop: 5,
  },

  routeMapUploadButton: {
    bottom: 0,
    height: 45,
    elevation: 12,
    borderRadius: 15,
    shadowRadius: 7.49,
    shadowOpacity: 0.37,
    marginHorizontal: 10,
    position: 'absolute',
    shadowColor: '#000000',
    backgroundColor: '#DDDDDD',

    shadowOffset: {
      width: 0,
      height: 6,
    },
  },

  routeMapUploadField: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },

  routeMapUploadButtonText: {
    fontSize: 12,
    fontWeight: 'bold',
  },

  modalValidateContent: {
    top: '30%',
    height: 180,
    borderWidth: 2,
    marginHorizontal: 10,
    alignItems: 'center',
    borderStyle: 'dashed',
    borderColor: '#E0144C',
    backgroundColor: '#FFFFFF',
    justifyContent: 'flex-start',
  },

  modalPermissionContent: {
    top: '30%',
    height: 200,
    borderWidth: 2,
    marginHorizontal: 10,
    alignItems: 'center',
    borderStyle: 'dashed',
    borderColor: '#E0144C',
    backgroundColor: '#FFFFFF',
    justifyContent: 'flex-start',
  },

  modalSortHeaderText: {
    padding: 20,
    fontSize: 18,
  },

  allowButton: {
    height: 40,
    width: '100%',
    borderTopWidth: 0.2,
    borderTopColor: '#CCCCCC',
    alignItems: 'center',
    justifyContent: 'center',
  },

  notAllowButton: {
    height: 40,
    width: '100%',
    borderTopWidth: 0.2,
    borderTopColor: '#CCCCCC',
    alignItems: 'center',
    justifyContent: 'center',
  },

  dropdownButtonSpecial: {
    height: 40,
    width: '100%',
    borderRadius: 0,
    borderLeftWidth: 1,
    borderBottomWidth: 1,
    backgroundColor: '#FFFFFF',
    borderLeftColor: '#C4C4C4',
    borderBottomColor: '#C4C4C4',
  },

  deliveryManualBox: {
    flex: 1,
    height: 60,
    marginTop: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },

  deliveryManualBar: {
    flex: 9,
    height: 60,
    marginTop: 30,
  },

  deliveryManualTextInput: {
    padding: 10,
    borderWidth: 0.8,
    borderRadius: 10,
    marginHorizontal: 10,
    borderColor: '#C4C4C4',
  },

  plusCircleIcon: {
    fontSize: 22,
    color: '#82CD47',
  },

  minusCircleIcon: {
    fontSize: 20,
    color: '#CF0A0A',
  },

  confirmButton: {
    bottom: 20,
    width: 150,
    height: 40,
    marginTop: 20,
    borderRadius: 45,
    alignItems: 'center',
    position: 'absolute',
    justifyContent: 'center',
    backgroundColor: '#082D4F',
  },
});
