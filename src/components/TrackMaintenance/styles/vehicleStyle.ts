import { Platform, StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
  },

  wrapper: {
    flex: 1,
  },

  header: {
    height: 39,
    lineHeight: 39,
    flexDirection: 'row',
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

  sortButton: {
    right: 10,
    position: 'absolute',
  },

  iconTune: {
    lineHeight: 39,
    fontWeight: 'bold',
  },

  listContent: {
    flex: 15,
    flexDirection: 'row',
    justifyContent: 'center',
  },

  oddRow: {
    backgroundColor: '#FFFFFF',
  },

  evenRow: {
    backgroundColor: '#E8E9EA',
  },

  listItem: {
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },

  listItemText: {
    fontSize: 12,
  },

  modalSort: {

  },

  modalSortContent: {
    margin: 20,
    top: '10%',
    height: 550,
    padding: 35,
    elevation: 5,
    shadowRadius: 4,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOpacity: 0.25,
    alignItems: 'center',
    backgroundColor: 'white',

    shadowOffset: {
      width: 0,
      height: 2,
    },
  },

  modalSortContentPeriodic: {
    margin: 20,
    top: '10%',
    height: 400,
    padding: 35,
    elevation: 5,
    shadowRadius: 4,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOpacity: 0.25,
    alignItems: 'center',
    backgroundColor: 'white',

    shadowOffset: {
      width: 0,
      height: 2,
    },
  },

  modalSortContentAccessory: {
    margin: 20,
    top: '5%',
    height: '100%'  ,
    padding: 35,
    elevation: 5,
    shadowRadius: 4,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOpacity: 0.25,
    alignItems: 'center',
    backgroundColor: 'white',

    shadowOffset: {
      width: 0,
      height: 2,
    },
  },

  listAccessory: {
    flex: 1,
    height: 50,
    width: '100%',
    borderWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#C4C4C4',
  },

  listAccessoryText: {
    width: '100%',
    paddingLeft: 10,
  },

  modalSortHeaderText: {
    fontSize: 24,
  },

  modalSortField: {
    flex: 1,
    flexDirection: 'row',
  },

  modalSortFunctional: {
    flex: 1,
    width: '100%',
    flexDirection: 'column'
  },

  keywordInputText: {
    height: 45,
    fontSize: 16,
    width: '100%',
    borderWidth: 1,
    paddingTop: 10,
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 10,
    borderRadius: 45,
    borderColor: '#444444',
    textAlignVertical: 'top',
  },

  modalSortColLeft: {
    justifyContent: 'center',
    alignItems: 'flex-start',
  },

  modalSortColRight: {
    alignItems: 'flex-end',
    justifyContent: 'center',
  },

  dropdownButton: {
    borderRadius: 45,
  },

  dropdownButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
  },

  dropdownContent: {
    borderRadius: 15,
  },

  dropdownRow: {
    height: 40,
  },

  dropdownRowText: {
    fontSize: 16,
  },

  horizontalBar: {
    opacity: 0.2,
    marginBottom: 30,
    borderBottomWidth: 1,
    borderBottomColor: '#444444',
  },

  buttonCancel: {
    flex: 1,
    marginBottom: Platform.OS !== 'ios' ? 40 : 0,
    // elevation: 5,
    // shadowRadius: 3.84,
    // shadowColor: '#000',
    // shadowOpacity: 0.25,

    // shadowOffset: {
    //   width: 0,
    //   height: 2,
    // },
  },

  buttonApply: {
    flex: 1,
    marginBottom: Platform.OS !== 'ios' ? 40 : 0,
    // elevation: 5,
    // shadowRadius: 3.84,
    // shadowColor: '#000',
    // shadowOpacity: 0.25,

    // shadowOffset: {
    //   width: 0,
    //   height: 2,
    // },
  },

  buttonCancelText: {
    fontSize: 18,
    color: '#562B08',
    fontWeight: 'bold',
  },

  buttonApplyText: {
    fontSize: 18,
    color: 'green',
    fontWeight: 'bold',
  },

  yearMonthPicker: {
    flex: 1,
    color: '#C4C4C4',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 5,
  },

  previousYearMonthIcon: {
    fontSize: 30,
    marginRight: 50,
    color: '#0FAE71',
  },

  yearMonthPickerText: {
    fontSize: 22,
    color: '#0FAE71',
    fontWeight: 'bold',
  },

  nextYearMonthIcon: {
    fontSize: 30,
    marginLeft: 50,
    color: '#0FAE71',
  },

  contentTable: {
    flex: 1,
  },

  contentTableTh: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#0D2064',
  },

  contentTableThText: {
    fontSize: 14,
    color: '#FFFFFF',
  },

  leftBorderTh: {
    borderLeftWidth: 1,
    borderLeftColor: '#FFFFFF',
  },

  textValidate: {
    color: 'red',
    marginTop: 10,
    marginBottom: 10
  }
});
