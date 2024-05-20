import { registerSheet } from "react-native-actions-sheet";
import OnBoarding from "./OnBoarding/onBoarding";
import OnBoardingSecurity from "./OnBoarding/onBoardingSecurity";

registerSheet("OnBoarding-sheet", OnBoarding);
registerSheet("OnBoardingSecurity-sheet", OnBoardingSecurity);

export {};
