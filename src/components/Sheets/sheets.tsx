import { SheetDefinition, registerSheet } from "react-native-actions-sheet";
import OnBoarding from "./OnBoarding/onBoarding";
import OnBoardingSecurity from "./OnBoarding/onBoardingSecurity";
import RegisterPasswordSheet from "./RegisterPassword/registerPassword";
import PasswordDetailsSheet from "./PasswordDetails/passwordDetailsSheet";
import UpdatePasswordSheet from "./UpdatePassword/updatePasswordSheet";
import { Password } from "../../interfaces/password";

registerSheet("OnBoarding-sheet", OnBoarding);
registerSheet("OnBoardingSecurity-sheet", OnBoardingSecurity);
registerSheet("RegisterPassword-sheet", RegisterPasswordSheet);
registerSheet("PasswordDetails-sheet", PasswordDetailsSheet);
registerSheet("UpdatePassword-sheet", UpdatePasswordSheet);

declare module "react-native-actions-sheet" {
  interface Sheets {
    "PasswordDetails-sheet": SheetDefinition<{
      payload: {
        password: Password;
        passwords: Password[];
      };
    }>;

    "UpdatePassword-sheet": SheetDefinition<{
      payload: {
        password: Password;
        passwords: Password[];
      };
    }>;
  }
}
