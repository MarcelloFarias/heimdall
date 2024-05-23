import { SheetDefinition, registerSheet } from "react-native-actions-sheet";
import OnBoarding from "./OnBoarding/onBoarding";
import OnBoardingSecurity from "./OnBoarding/onBoardingSecurity";
import RegisterPasswordSheet from "./RegisterPassword/registerPassword";

registerSheet("OnBoarding-sheet", OnBoarding);
registerSheet("OnBoardingSecurity-sheet", OnBoardingSecurity);
registerSheet("RegisterPassword-sheet", RegisterPasswordSheet);

declare module "react-native-actions-sheet" {
  interface Sheets {
    "RegisterPassword-sheet": SheetDefinition<{
      payload: {
        setPasswords: any;
      };
    }>;
  }
}
