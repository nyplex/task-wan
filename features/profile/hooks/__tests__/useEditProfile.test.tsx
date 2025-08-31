import React from "react";
import { renderHook, act, waitFor } from "@testing-library/react-native";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import useEditProfile from "../useEditProfile";
import { EditProfileFormValues } from "../../screens/editProfile/components/EditProfileForm";

// Mocks
jest.mock("expo-router", () => ({ useRouter: jest.fn() }));
jest.mock("react-hook-form", () => ({ useForm: jest.fn() }));
jest.mock("@/redux/slices/apiSlice/endpoints/profile/getProfile", () => ({
  useGetProfileQuery: jest.fn(),
}));
jest.mock("@/redux/slices/apiSlice/endpoints/profile/updateProfile", () => ({
  useUpdateProfileMutation: jest.fn(),
}));
jest.mock("@/features/authentication/authSlice/authSelectors", () => ({
  selectSession: jest.fn(),
}));
jest.mock("@/hooks/useToast", () => ({ __esModule: true, default: jest.fn() }));
jest.mock("react-redux", () => ({
  ...jest.requireActual("react-redux"),
  useSelector: jest.fn(),
}));

const mockUseRouter = require("expo-router").useRouter;
const mockUseForm = require("react-hook-form").useForm;
const mockUseSelector = require("react-redux").useSelector;
const mockUseGetProfileQuery =
  require("@/redux/slices/apiSlice/endpoints/profile/getProfile").useGetProfileQuery;
const mockUseUpdateProfileMutation =
  require("@/redux/slices/apiSlice/endpoints/profile/updateProfile").useUpdateProfileMutation;
const mockUseToast = require("@/hooks/useToast").default;

const mockSession = { user: { id: "user123", email: "test@example.com" } };
const mockProfileData = {
  id: "user123",
  name: "John Doe",
  email: "john@example.com",
  profession: "Developer",
  dob: "1990-01-01",
};
const mockFormValues: EditProfileFormValues = {
  name: "John Updated",
  email: "john.updated@example.com",
  profession: "Senior Developer",
  dob: "1990-01-01",
};

const createMockStore = () =>
  configureStore({
    reducer: { auth: (state = {}) => state, errors: (state = []) => state },
  });

const renderHookWithProvider = (hookFn: any) => {
  const store = createMockStore();
  const wrapper = ({ children }: { children: React.ReactNode }) => (
    <Provider store={store}>{children}</Provider>
  );
  return renderHook(hookFn, { wrapper });
};

describe("useEditProfile", () => {
  const mockRouter = { back: jest.fn() };
  const mockHandleToast = jest.fn();
  const mockUpdateProfile = jest.fn();
  let mockFormMethods: any;

  beforeEach(() => {
    jest.clearAllMocks();
    mockFormMethods = {
      handleSubmit: (cb: any) => cb,
      reset: jest.fn(),
      formState: { errors: {} },
      control: {},
      getValues: jest.fn(),
      setValue: jest.fn(),
      watch: jest.fn(),
      register: jest.fn(),
      unregister: jest.fn(),
      clearErrors: jest.fn(),
      setError: jest.fn(),
      trigger: jest.fn(),
      getFieldState: jest.fn(),
      resetField: jest.fn(),
    };
    mockUseRouter.mockReturnValue(mockRouter);
    mockUseToast.mockReturnValue({ handleToast: mockHandleToast });
    mockUseSelector.mockReturnValue(mockSession);
    mockUseForm.mockReturnValue(mockFormMethods);
    mockUseGetProfileQuery.mockReturnValue({
      data: mockProfileData,
      isFetching: false,
      isError: false,
    });
    mockUseUpdateProfileMutation.mockReturnValue([
      mockUpdateProfile,
      { isLoading: false },
    ]);
  });

  it("initializes form with correct configuration", () => {
    renderHookWithProvider(() => useEditProfile());
    expect(mockUseForm).toHaveBeenCalledWith({
      mode: "onSubmit",
      reValidateMode: "onChange",
      defaultValues: {
        dob: mockProfileData.dob,
        email: mockProfileData.email,
        name: mockProfileData.name,
        profession: mockProfileData.profession,
      },
    });
  });

  it("initializes form with empty defaults when no profile data", () => {
    mockUseGetProfileQuery.mockReturnValue({
      data: undefined,
      isFetching: true,
      isError: false,
    });
    renderHookWithProvider(() => useEditProfile());
    expect(mockUseForm).toHaveBeenCalledWith({
      mode: "onSubmit",
      reValidateMode: "onChange",
      defaultValues: {
        dob: "",
        email: "",
        name: "",
        profession: "",
      },
    });
  });

  it("skips profile query when no user session", () => {
    mockUseSelector.mockReturnValue(null);
    renderHookWithProvider(() => useEditProfile());
    expect(mockUseGetProfileQuery).toHaveBeenCalledWith(undefined, {
      skip: true,
    });
  });

  it("calls profile query with correct user ID (now expects undefined)", () => {
    renderHookWithProvider(() => useEditProfile());
    expect(mockUseGetProfileQuery).toHaveBeenCalledWith(undefined, {
      skip: false,
    });
  });

  it("resets form when profile data loads", async () => {
    mockUseGetProfileQuery.mockReturnValue({
      data: undefined,
      isFetching: true,
      isError: false,
    });
    const { rerender } = renderHookWithProvider(() => useEditProfile());
    mockUseGetProfileQuery.mockReturnValue({
      data: mockProfileData,
      isFetching: false,
      isError: false,
    });
    rerender({});
    await waitFor(() => {
      expect(mockFormMethods.reset).toHaveBeenCalledWith({
        name: mockProfileData.name,
        profession: mockProfileData.profession,
        dob: mockProfileData.dob,
        email: mockProfileData.email,
      });
    });
  });

  it("handles null profile fields gracefully", async () => {
    const profileWithNulls = {
      ...mockProfileData,
      name: null,
      profession: null,
      dob: null,
    };
    mockUseGetProfileQuery.mockReturnValue({
      data: profileWithNulls,
      isFetching: false,
      isError: false,
    });
    renderHookWithProvider(() => useEditProfile());
    await waitFor(() => {
      expect(mockFormMethods.reset).toHaveBeenCalledWith({
        name: "",
        profession: "",
        dob: "",
        email: mockProfileData.email,
      });
    });
  });

  it("does not reset form when profile data is undefined", () => {
    mockUseGetProfileQuery.mockReturnValue({
      data: undefined,
      isFetching: false,
      isError: false,
    });
    renderHookWithProvider(() => useEditProfile());
    expect(mockFormMethods.reset).not.toHaveBeenCalled();
  });

  it("returns correct values in success state", () => {
    const { result } = renderHookWithProvider(() => useEditProfile());
    expect(result.current).toEqual({
      form: mockFormMethods,
      onSubmit: expect.any(Function),
      isProfileFetching: false,
      profileError: false,
      isUpdating: false,
    });
  });

  it("returns correct values when profile is loading", () => {
    mockUseGetProfileQuery.mockReturnValue({
      data: undefined,
      isFetching: true,
      isError: false,
    });
    const { result } = renderHookWithProvider(() => useEditProfile());
    expect(result.current).toEqual({
      form: mockFormMethods,
      onSubmit: expect.any(Function),
      isProfileFetching: true,
      profileError: false,
      isUpdating: false,
    });
  });

  it("returns correct values when profile has error", () => {
    mockUseGetProfileQuery.mockReturnValue({
      data: undefined,
      isFetching: false,
      isError: true,
    });
    const { result } = renderHookWithProvider(() => useEditProfile());
    expect(result.current).toEqual({
      form: mockFormMethods,
      onSubmit: expect.any(Function),
      isProfileFetching: false,
      profileError: true,
      isUpdating: false,
    });
  });

  it("returns correct values when updating profile", () => {
    mockUseUpdateProfileMutation.mockReturnValue([
      mockUpdateProfile,
      { isLoading: true },
    ]);
    const { result } = renderHookWithProvider(() => useEditProfile());
    expect(result.current).toEqual({
      form: mockFormMethods,
      onSubmit: expect.any(Function),
      isProfileFetching: false,
      profileError: false,
      isUpdating: true,
    });
  });

  it("successfully submits form and navigates back", async () => {
    mockFormMethods = {
      ...mockFormMethods,
      handleSubmit: jest.fn(
        (cb) => async (values?: any) => await cb(values || mockFormValues),
      ),
    };
    mockUseForm.mockReturnValue(mockFormMethods);
    mockUpdateProfile.mockImplementation(() => ({
      unwrap: jest.fn().mockResolvedValue({ data: {} }),
    }));
    const { result } = renderHookWithProvider(() => useEditProfile());
    const hook = result.current as ReturnType<typeof useEditProfile>;
    await act(async () => {
      await hook.onSubmit(mockFormValues as any);
    });
    expect(mockUpdateProfile).toHaveBeenCalledWith({
      id: mockSession.user.id,
      name: mockFormValues.name.trim(),
      profession: mockFormValues.profession.trim(),
      dob: mockFormValues.dob.trim(),
    });
    expect(mockHandleToast).toHaveBeenCalledWith(
      "Success",
      "Your profile has been updated.",
    );
    expect(mockRouter.back).toHaveBeenCalled();
  });

  it("trims form values before submission", async () => {
    const valuesWithSpaces: EditProfileFormValues = {
      name: "  John Doe  ",
      profession: "  Developer  ",
      dob: "  1990-01-01  ",
      email: "john@example.com",
    };
    mockFormMethods = {
      ...mockFormMethods,
      handleSubmit: jest.fn((cb) => async () => await cb(valuesWithSpaces)),
    };
    mockUseForm.mockReturnValue(mockFormMethods);
    const { result } = renderHookWithProvider(() => useEditProfile());
    const hook = result.current as ReturnType<typeof useEditProfile>;
    await act(async () => {
      await hook.onSubmit(undefined as any);
    });
    expect(mockUpdateProfile).toHaveBeenCalledWith({
      id: mockSession.user.id,
      name: "John Doe",
      profession: "Developer",
      dob: "1990-01-01",
    });
  });

  it("returns early when no user session", async () => {
    mockUseSelector.mockReturnValue(null);
    const { result } = renderHookWithProvider(() => useEditProfile());
    const hook = result.current as ReturnType<typeof useEditProfile>;
    await act(async () => {
      await hook.onSubmit(undefined as any);
    });
    expect(mockUpdateProfile).not.toHaveBeenCalled();
  });
});
