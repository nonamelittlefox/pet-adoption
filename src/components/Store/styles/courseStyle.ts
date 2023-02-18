import { StyleSheet } from 'react-native';

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
    flex: 1,
  },

  oddRow: {
    backgroundColor: '#FFFFFF',
  },

  evenRow: {
    backgroundColor: '#E8E9EA',
  },

  listItem: {
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },

  listItemText: {
    fontSize: 20,
  },

  modalSort: {},

  modalSortContent: {
    margin: 20,
    height: 350,
    top: '30%',
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
    flexDirection: 'column',
  },

  keywordInputText: {
    height: 45,
    fontSize: 16,
    width: '100%',
    borderWidth: 1,
    paddingTop: 10,
    paddingLeft: 20,
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

  buttonCancel: {},

  buttonApply: {},

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

  noDataTextArea: {
    flex: 1,
    height: 50,
    borderWidth: 1,
    alignItems: 'center',
    borderColor: '#C4C4C4',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
  },

  noDataText: {
    fontSize: 18,
  }
});
