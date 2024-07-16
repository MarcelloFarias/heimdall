import { SheetDefinition, registerSheet } from "react-native-actions-sheet";
import OnBoarding from "./OnBoarding/onBoarding";
import RegisterPasswordSheet from "./RegisterPassword/registerPassword";
import PasswordDetailsSheet from "./PasswordDetails/passwordDetailsSheet";
import UpdatePasswordSheet from "./UpdatePassword/updatePasswordSheet";
import ConfifurePassword from "./ConfigurePassword/configurePasswordSheet";
import { Password } from "../../interfaces/password";

registerSheet("OnBoarding-sheet", OnBoarding);
registerSheet("RegisterPassword-sheet", RegisterPasswordSheet);
registerSheet("PasswordDetails-sheet", PasswordDetailsSheet);
registerSheet("UpdatePassword-sheet", UpdatePasswordSheet);
registerSheet("ConfigurePassword-sheet", ConfifurePassword);

declare module "react-native-actions-sheet" {
  interface Sheets {
    "PasswordDetails-sheet": SheetDefinition<{
      payload: {
        password: Password;
      };
    }>;

    "UpdatePassword-sheet": SheetDefinition<{
      payload: {
        password: Password;
      };
    }>;
  }
}
