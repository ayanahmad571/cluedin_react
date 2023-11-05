import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 0,
  },
  firstRow: {
    flexDirection: 'row',
    margin: 10,
    marginBottom: 0,
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
    borderBottomRightRadius: 0,
    borderBottomLeftRadius: 0,
    overflow: 'hidden',
    backgroundColor: '#384353',
  },
  secondRow: {
    flexDirection: 'row',
    margin: 10,
    marginTop: 0,
    borderTopRightRadius: 0,
    borderTopLeftRadius: 0,
    borderBottomRightRadius: 10,
    borderBottomLeftRadius: 10,
    overflow: 'hidden',
    backgroundColor: '#384353',
  },
  thirdRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    margin: 10,
    marginBottom: 0,
    borderRadius: 10,
    backgroundColor: '#091b26',
    borderBottomRightRadius: 0,
    borderBottomLeftRadius: 0, // Remove bottom left radius
  },
  forthRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    margin: 10,
    marginTop: 0,
    borderRadius: 10,
    backgroundColor: '#091b26',
    borderTopRightRadius: 0,
    borderTopLeftRadius: 0, // Remove top left radius
  },
  fifthRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    margin: 10,
    marginBottom: 0,
    borderRadius: 10,
    backgroundColor: '#fa7268',
    borderBottomRightRadius: 0,
    borderBottomLeftRadius: 0, // Remove bottom left radius
  },
  sixthRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    margin: 10,
    marginTop: 0,
    marginBottom: 1,
    borderRadius: 10,
    backgroundColor: '#fa7268',
    borderTopRightRadius: 0,
    borderTopLeftRadius: 0, // Remove top left radius
  },
  sevenRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    margin: 10,
    marginTop: 1,
    marginBottom: 0,
    borderRadius: 10,
    backgroundColor: '#5c7829',
    borderBottomRightRadius: 0,
    borderBottomLeftRadius: 0, // Remove bottom left radius
  },
  eightRow: {
    justifyContent: 'center',
    margin: 10,
    marginTop: 0,
    borderRadius: 10,
    backgroundColor: '#5c7829',
    borderTopRightRadius: 0,
    borderTopLeftRadius: 0, // Remove top left radius
  },
  optionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16, // Adjust as needed
    paddingVertical: 8, // Adjust as needed
    borderBottomWidth: 1, // Add a border to separate rows
    borderColor: '#ccc', // Customize border color
  },
  optionRowText: {
    fontSize: 20,
    fontWeight: '500',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    margin: 10,
  },
  buttonAnswer: {
    backgroundColor: '#F4FAFF',
    padding: 10,
    borderRadius: 10,
    width: '70%',
    alignItems: 'center',
  },
  disabledButtonAnswer: {
    backgroundColor: 'black',
    padding: 10,
    borderRadius: 10,
    width: '70%',
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#F4FAFF',
    padding: 10,
    borderRadius: 10,
    width: '32%',
    alignItems: 'center',
  },
  usedClueButton: {
    backgroundColor: '#919191',
  },
  usedAnsButton: {
    backgroundColor: '#919191',
    color: 'red',
  },
  usedAnsButtonText: {
    backgroundColor: '#919191',
    fontSize: 18,
    color: 'red',
  },
  buttonText: {
    fontSize: 18,
  },
  box: {
    flex: 1,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  boxL: {
    flex: 1,
    padding: 10,
    justifyContent: 'center',
  },
  boxText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  boxTextL: {
    color: 'white',
    fontSize: 18,
  },
  boxTextTitle: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 24,
  },
  boxTextNormal: {
    color: 'white',
    fontSize: 16,
    fontWeight: '200',
  },
  countdown: {
    color: 'white',
    fontSize: 18,
  },
});
