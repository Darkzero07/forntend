import HomePage from "../components/pages/home";
import ArenaBookingPage from "../components/pages/arenaBooking";
import ContactPage from "../components/pages/contact";
import PaymentPage from "../components/pages/payment";
import SlipUploadPage from "../components/pages/slipUpload";
import RegisterPage from "../components/pages/register";
import LoginPage from "../components/pages/login";
import ProfilePage from "../components/pages/profile";
import DashboardPage from "../components/pages/dashboard";
import TimePickerPage from "../components/pages/timepicker"
import bookingResultPage from "../components/pages/bookingResult";


const components = {
  home: {
    url: "/",
    component: HomePage,
  },
  arenaBooking: {
    url: "/arenaBooking",
    component: ArenaBookingPage,
  },
  contact: {
    url: "/contact",
    component: ContactPage,
  },
  payment: {
    url: "/payment/:booking_id",
    component: PaymentPage,
  },
  slipUpload: {
    url: "/slipUpload/:booking_id",
    component: SlipUploadPage,
  },
  register: {
    url: "/register",
    component: RegisterPage,
  },
  login: {
    url: "/login",
    component: LoginPage,
  },
  profile: {
    url: "/profile",
    component: ProfilePage,
  },
  dashboard: {
    url: "/dashboard",
    component: DashboardPage,
  },
  timePicker: {
    // url: "/timepicker",
    url: "/timepicker/:arena_id/:arena_priceHour",
    component: TimePickerPage,
  },
  bookingResult: {
    url: "/bookingresult/:booking_id",
    component: bookingResultPage,
  },
};

export default {
  guest: {
    allowedRoutes: [
      components.login,
      components.register,
      components.home,
      components.arenaBooking,
      components.contact,
    ],
    redirectRoute: "/login",
  },
  user: {
    allowedRoutes: [
      components.home,
      components.arenaBooking,
      components.contact,
      components.payment,
      components.slipUpload,
      components.profile,
      components.timePicker,
      components.bookingResult,
    ],
    redirectRoute: "/profile",
  },
  admin: {
    allowedRoutes: [
      components.home,
      components.arenaBooking,
      components.contact,
      components.payment,
      components.slipUpload,
      components.profile,
      components.dashboard,
      components.timePicker,
      components.bookingResult,
    ],
    redirectRoute: "/dashboard",
  },
};
