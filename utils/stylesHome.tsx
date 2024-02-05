import {StyleSheet} from 'react-native';
import { CLUEDIN_DARK_SCHEME, CLUEDIN_THEME } from './constants';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: CLUEDIN_DARK_SCHEME.background,
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
    backgroundColor: CLUEDIN_DARK_SCHEME.home.row1_bg,
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
    backgroundColor: CLUEDIN_DARK_SCHEME.home.row1_bg,
  },
  thirdRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    margin: 10,
    marginBottom: 0,
    borderRadius: 10,
    backgroundColor: CLUEDIN_DARK_SCHEME.home.row2_bg,
    borderBottomRightRadius: 0,
    borderBottomLeftRadius: 0, // Remove bottom left radius
  },
  forthRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    margin: 10,
    marginTop: 0,
    borderRadius: 10,
    backgroundColor: CLUEDIN_DARK_SCHEME.home.row2_bg,
    borderTopRightRadius: 0,
    borderTopLeftRadius: 0, // Remove top left radius
  },
  fifthRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    margin: 10,
    marginBottom: 0,
    borderRadius: 10,
    backgroundColor: CLUEDIN_DARK_SCHEME.home.row3_bg,
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
    backgroundColor: CLUEDIN_DARK_SCHEME.home.row3_bg,
    borderTopRightRadius: 0,
    borderTopLeftRadius: 0, // Remove top left radius
  },
  sevenRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    margin: 10,
    marginTop: 1,
    marginBottom: 0,
    borderRadius: 20,
    padding: 10,
    backgroundColor: CLUEDIN_THEME.white,
  },
  eightRow: {
    justifyContent: 'center',
    margin: 10,
    marginTop: 0,
    borderRadius: 10,
    backgroundColor: CLUEDIN_DARK_SCHEME.home.row3_bg,
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
    borderColor: CLUEDIN_THEME.light_grey, // Customize border color
  },
  optionRowText: {
    fontSize: 16,
    fontWeight: '300',
    color: CLUEDIN_DARK_SCHEME.home.row3_bg_text,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    margin: 10,
  },
  buttonAnswer: {
    backgroundColor: CLUEDIN_DARK_SCHEME.home.clue_btn_bg,
    padding: 10,
    borderRadius: 10,
    width: '70%',
    alignItems: 'center',
  },
  disabledButtonAnswer: {
    backgroundColor: CLUEDIN_THEME.yellow,
    padding: 10,
    borderRadius: 10,
    width: '70%',
    alignItems: 'center',
  },
  button: {
    backgroundColor: CLUEDIN_DARK_SCHEME.home.clue_btn_bg,
    padding: 10,
    borderRadius: 10,
    width: '32%',
    alignItems: 'center',
  },
  usedClueButton: {
    backgroundColor: CLUEDIN_THEME.light_grey,
  },
  usedAnsButton: {
    backgroundColor: CLUEDIN_DARK_SCHEME.home.used_ans_bg,
    color: CLUEDIN_DARK_SCHEME.home.used_ans_bg_text,
  },
  usedAnsButtonText: {
    backgroundColor: CLUEDIN_DARK_SCHEME.home.used_ans_bg,
    fontSize: 16,
    color: CLUEDIN_DARK_SCHEME.home.used_ans_bg_text,
    textDecorationLine: 'line-through',
    textDecorationStyle: 'solid',
  },
  buttonText: {
    fontSize: 16,
    color: CLUEDIN_THEME.black,
  },
  ansButtonText: {
    fontSize: 16,
    color: CLUEDIN_THEME.black,
  },
  ansDisButtonText: {
    fontSize: 16,
    color: CLUEDIN_THEME.yellow,
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
    color: CLUEDIN_DARK_SCHEME.home.row2_bg_text,
    fontSize: 18,
    fontWeight: 'bold',
  },
  boxTextL: {
    color: CLUEDIN_DARK_SCHEME.home.row2_bg_text,
    fontSize: 18,
  },
  boxTextTitle: {
    color: CLUEDIN_DARK_SCHEME.home.row2_bg_text,
    fontWeight: 'bold',
    fontSize: 24,
  },
  boxTextNormal: {
    color: CLUEDIN_DARK_SCHEME.home.row2_bg_text,
    fontSize: 16,
    fontWeight: '200',
  },
  countdown: {
    color: CLUEDIN_DARK_SCHEME.home.row2_bg_text,
    fontSize: 18,
  },
  blackText: {
    color: CLUEDIN_THEME.black
  },
  summary_title: {
    fontWeight: '700',
    fontSize: 24,
    marginBottom: 5,
  },
  summary_boxTextNormal: {
    color: CLUEDIN_THEME.black,
    fontSize: 16,
    fontWeight: '200',
  },
  onBgTitle: {
    color: CLUEDIN_THEME.white,
    fontWeight: '600',
    fontSize: 25,
    marginBottom: 10,
    textAlign: 'center',
  }
});
