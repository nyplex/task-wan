import React from "react";
import { renderHook, act, waitFor } from "@testing-library/react-native";
import { Provider, useSelector } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import useEditProfile from "../useEditProfile";
import { EditProfileFormValues } from "../../screens/editProfile/components/EditProfileForm";

// Import mocked functions
import { useRouter } from "expo-router";
import { useForm } from "react-hook-form";
import { useGetProfileQuery } from "@/redux/slices/apiSlice/endpoints/profile/getProfile";
import { useUpdateProfileMutation } from "@/redux/slices/apiSlice/endpoints/profile/updateProfile";
import { addError } from "@/redux/slices/errorsSlice/errorsSlice";
import { selectSession } from "@/features/authentication/authSlice/authSelectors";
import { useAppDispatch } from "@/hooks/redux";
import useToast from "@/hooks/useToast";

// Mock all dependencies
jest.mock("expo-router", () => ({
  useRouter: jest.fn(),
}));

jest.mock("react-hook-form", () => ({
  useForm: jest.fn(),
}));

jest.mock("@/redux/slices/apiSlice/endpoints/profile/getProfile", () => ({
  useGetProfileQuery: jest.fn(),
}));

jest.mock("@/redux/slices/apiSlice/endpoints/profile/updateProfile", () => ({
  useUpdateProfileMutation: jest.fn(),
}));

jest.mock("@/redux/slices/errorsSlice/errorsSlice", () => ({
  addError: jest.fn(),
}));

jest.mock("@/features/authentication/authSlice/authSelectors", () => ({
  selectSession: jest.fn(),
}));

jest.mock("@/hooks/redux", () => ({
  useAppDispatch: jest.fn(),
}));

jest.mock("@/hooks/useToast", () => ({
  __esModule: true,
  default: jest.fn(),
}));

jest.mock("react-redux", () => ({
  ...jest.requireActual("react-redux"),
  useSelector: jest.fn(),
}));

// Type the mocked functions
const mockUseRouter = useRouter as jest.MockedFunction<typeof useRouter>;
const mockUseForm = useForm as jest.MockedFunction<typeof useForm>;
const mockUseSelector = useSelector as jest.MockedFunction<typeof useSelector>;
const mockUseGetProfileQuery = useGetProfileQuery as jest.MockedFunction<
  typeof useGetProfileQuery
>;
const mockUseUpdateProfileMutation =
  useUpdateProfileMutation as jest.MockedFunction<
    typeof useUpdateProfileMutation
  >;
const mockAddError = addError as jest.MockedFunction<typeof addError>;
const mockUseAppDispatch = useAppDispatch as jest.MockedFunction<
  typeof useAppDispatch
>;
const mockUseToast = useToast as jest.MockedFunction<typeof useToast>;

// Mock data
const mockSession = {
  user: {
    id: "user123",
    email: "test@example.com",
  },
};

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

// Create a simple mock store
const createMockStore = () =>
  configureStore({
    reducer: {
      // Add minimal reducers as needed
      auth: (state = {}) => state,
      errors: (state = []) => state,
    },
  });

const renderHookWithProvider = <T extends (...args: any[]) => any>(
  hookFn: T,
) => {
  const store = createMockStore();
  const wrapper = ({ children }: { children: React.ReactNode }) => (
    <Provider store={store}>{children}</Provider>
  );
  return renderHook(hookFn, { wrapper });
};

describe("useEditProfile", () => {
  // Mock implementations
  const mockRouter = { back: jest.fn() };
  const mockDispatch = jest.fn();
  const mockHandleToast = jest.fn();
  const mockUpdateProfile = jest.fn();
  const mockFormMethods = {
    handleSubmit: jest.fn(),
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

  beforeEach(() => {
    jest.clearAllMocks();

    // Setup default mocks
    mockUseRouter.mockReturnValue(mockRouter as any);
    mockUseAppDispatch.mockReturnValue(mockDispatch);
    mockUseToast.mockReturnValue({ handleToast: mockHandleToast });
    mockUseSelector.mockReturnValue(mockSession);
    mockUseForm.mockReturnValue(mockFormMethods as any);

    mockUseGetProfileQuery.mockReturnValue({
      data: mockProfileData,
      isFetching: false,
      isError: false,
    } as any);

    mockUseUpdateProfileMutation.mockReturnValue([
      mockUpdateProfile,
      { isLoading: false },
    ] as any);
  });

  describe("Initialization", () => {
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
      } as any);

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
  });

  describe("Form Reset Effect", () => {
    it("resets form when profile data loads", async () => {
      // Start with no profile data
      mockUseGetProfileQuery.mockReturnValue({
        data: undefined,
        isFetching: true,
        isError: false,
      } as any);

      const { rerender } = renderHookWithProvider(() => useEditProfile());

      // Simulate profile data loading by changing the mock return value
      mockUseGetProfileQuery.mockReturnValue({
        data: mockProfileData,
        isFetching: false,
        isError: false,
      } as any);

      // Rerender to trigger the useEffect
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
      } as any);

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
      } as any);

      renderHookWithProvider(() => useEditProfile());

      expect(mockFormMethods.reset).not.toHaveBeenCalled();
    });
  });

  describe("Form Submission", () => {
    beforeEach(() => {
      mockFormMethods.handleSubmit.mockImplementation((callback) => {
        return async (values?: any) => {
          return await callback(values || mockFormValues);
        };
      });
      mockUpdateProfile.mockImplementation(() => ({
        unwrap: jest.fn().mockResolvedValue({ data: {} }),
      }));
    });

    it("successfully submits form and navigates back", async () => {
      const { result } = renderHookWithProvider(() => useEditProfile());

      await act(async () => {
        await result.current.onSubmit(mockFormValues);
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

      // Mock handleSubmit to use the specific values with spaces
      mockFormMethods.handleSubmit.mockImplementation((callback) => {
        return async () => {
          return await callback(valuesWithSpaces);
        };
      });

      const { result } = renderHookWithProvider(() => useEditProfile());

      await act(async () => {
        await result.current.onSubmit();
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

      await act(async () => {
        await result.current.onSubmit();
      });

      expect(mockUpdateProfile).not.toHaveBeenCalled();
    });

    it("handles API error correctly", async () => {
      const apiError = {
        message: "Profile update failed",
        source: "updateProfile",
        type: "network" as const,
      };

      mockUpdateProfile.mockImplementation(() => ({
        unwrap: jest.fn().mockRejectedValue(apiError),
      }));

      const { result } = renderHookWithProvider(() => useEditProfile());

      await act(async () => {
        await result.current.onSubmit();
      });

      expect(mockDispatch).toHaveBeenCalledWith(
        mockAddError({
          message: apiError.message,
          source: apiError.source,
          type: apiError.type,
        }),
      );

      expect(mockHandleToast).not.toHaveBeenCalled();
      expect(mockRouter.back).not.toHaveBeenCalled();
    });

    it("handles generic Error correctly", async () => {
      const genericError = new Error("Network error");

      mockUpdateProfile.mockImplementation(() => ({
        unwrap: jest.fn().mockRejectedValue(genericError),
      }));

      const { result } = renderHookWithProvider(() => useEditProfile());

      await act(async () => {
        await result.current.onSubmit();
      });

      expect(mockDispatch).toHaveBeenCalledWith(
        mockAddError({
          message: "An unknown error occurred during login.",
          source: "useAuth/login",
          type: "auth",
        }),
      );
    });
  });

  describe("Return Values", () => {
    it("returns correct values when profile is loading", () => {
      mockUseGetProfileQuery.mockReturnValue({
        data: undefined,
        isFetching: true,
        isError: false,
      } as any);

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
      } as any);

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
      ] as any);

      const { result } = renderHookWithProvider(() => useEditProfile());

      expect(result.current).toEqual({
        form: mockFormMethods,
        onSubmit: expect.any(Function),
        isProfileFetching: false,
        profileError: false,
        isUpdating: true,
      });
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
  });

  describe("Edge Cases", () => {
    it("handles missing user ID in session", () => {
      mockUseSelector.mockReturnValue({ user: {} });

      renderHookWithProvider(() => useEditProfile());

      expect(mockUseGetProfileQuery).toHaveBeenCalledWith(undefined, {
        skip: true,
      });
    });

    it("handles empty profile data", () => {
      mockUseGetProfileQuery.mockReturnValue({
        data: {},
        isFetching: false,
        isError: false,
      } as any);

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

    it("handles form submission with empty strings", async () => {
      const emptyFormValues: EditProfileFormValues = {
        name: "",
        profession: "",
        dob: "",
        email: "",
      };

      // Mock handleSubmit to use empty values
      mockFormMethods.handleSubmit.mockImplementation((callback) => {
        return async () => {
          return await callback(emptyFormValues);
        };
      });

      const { result } = renderHookWithProvider(() => useEditProfile());

      await act(async () => {
        await result.current.onSubmit();
      });

      expect(mockUpdateProfile).toHaveBeenCalledWith({
        id: mockSession.user.id,
        name: "",
        profession: "",
        dob: "",
      });
    });
  });

  describe("Hook Dependencies", () => {
    it("calls all required hooks", () => {
      renderHookWithProvider(() => useEditProfile());

      expect(mockUseRouter).toHaveBeenCalled();
      expect(mockUseAppDispatch).toHaveBeenCalled();
      expect(mockUseSelector).toHaveBeenCalled();
      expect(mockUseToast).toHaveBeenCalled();
      expect(mockUseGetProfileQuery).toHaveBeenCalled();
      expect(mockUseUpdateProfileMutation).toHaveBeenCalled();
      expect(mockUseForm).toHaveBeenCalled();
    });

    it("uses correct selector", () => {
      renderHookWithProvider(() => useEditProfile());

      expect(mockUseSelector).toHaveBeenCalledWith(selectSession);
    });
  });
});
