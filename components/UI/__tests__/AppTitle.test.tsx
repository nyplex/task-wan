import { render } from "@testing-library/react-native";
import AppTitle from "../AppTitle";

describe("<AppTitle />", () => {
  it("Text renders correctly on AppTitle", () => {
    const { getByTestId } = render(<AppTitle />);
    const box = getByTestId("AppTitle");
    const [text1, text2] = box.children;
    expect(text1.props.children).toBe("TASK-WAN");
    expect(text2.props.children).toBe("Management App");
    expect(text1.props.size).toBe("headingXL");
    expect(text1.props.weight).toBe("bold");
    expect(text1.props.className).toBe("text-primary-0 text-center");
    expect(text2.props.size).toBe("body");
    expect(text2.props.weight).toBe("semi-bold");
    expect(text2.props.color).toBe("secondary");
    expect(text2.props.className).toBe("tracking-[4.3px] text-center");
  });
});
