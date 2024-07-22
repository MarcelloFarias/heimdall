import { SheetDefinition, registerSheet } from "react-native-actions-sheet";
import OnBoarding from "./OnBoarding/onBoarding";
import RegisterPasswordSheet from "./RegisterPassword/registerPassword";
import PasswordDetailsSheet from "./PasswordDetails/passwordDetailsSheet";
import UpdatePasswordSheet from "./UpdatePassword/updatePasswordSheet";
import ConfigurePassword from "./ConfigurePassword/configurePasswordSheet";
import Biometry from "./Biometry/biometrySheet";
import ConfirmPassword from "./ConfirmPassword/confirmPasswordSheet";
import ChangeAccessPassword from "./ChangeAccessPassword/ChangeAccessPasswordSheet";
import { Password } from "../../interfaces/password";

registerSheet("OnBoarding-sheet", OnBoarding);
registerSheet("RegisterPassword-sheet", RegisterPasswordSheet);
registerSheet("PasswordDetails-sheet", PasswordDetailsSheet);
registerSheet("UpdatePassword-sheet", UpdatePasswordSheet);
registerSheet("ConfigurePassword-sheet", ConfigurePassword);
registerSheet("Biometry-sheet", Biometry);
registerSheet("ConfirmPassword-sheet", ConfirmPassword);
registerSheet("ChangeAccessPassword-sheet", ChangeAccessPassword);

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

    "ConfirmPassword-sheet": SheetDefinition<{
      payload: {
        onConfirm: () => void;
      };
    }>;
  }
}
