import { render } from "@testing-library/react-native";
import LogoutBottomSheet from "../LogoutBottomSheet";

describe("<LogoutBottomSheet />", () => {
  it("Text renders correctly on AppTitle", () => {
    const { getAllByRole, getByText } = render(
      <LogoutBottomSheet
        onPressCancel={() => {}}
        onPressLogout={() => {}}
      />
    );
    const btns = getAllByRole("button");
    expect(btns).toBeDefined();
    expect(btns.length).toBe(2);
    const text = getByText("Logout of Taskwan?");
    expect(text).toBeDefined();
    const cancelBtn = getByText("Cancel");
    expect(cancelBtn).toBeDefined();
  });
});
