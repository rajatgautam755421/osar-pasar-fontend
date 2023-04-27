import {
  AccessTime,
  CancelPresentation,
  CurrencyRupeeOutlined,
  DeliveryDining,
  DeliveryDiningOutlined,
  Fingerprint,
  FitnessCenter,
  LocalShipping,
  LocationCity,
  LocationOn,
  LocationSearching,
  Mail,
  Money,
  MoneyOutlined,
  Phone,
  Public,
  Radar,
  Security,
} from "@mui/icons-material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import SubscriptionsIcon from "@mui/icons-material/Subscriptions";
import DashboardIcon from "@mui/icons-material/Dashboard";
import FeedbackIcon from "@mui/icons-material/Feedback";
import ManIcon from "@mui/icons-material/Man";
import EmailIcon from "@mui/icons-material/Email";
import WaterfallChartIcon from "@mui/icons-material/WaterfallChart";
import GroupIcon from "@mui/icons-material/Group";
import { getAllMunicipalNames } from "./generalHelper";
import provienceInfo from "./provienceInfo.json";
import PersonIcon from "@mui/icons-material/Person";

export const RECIEVER_ROLE = "Reciever";
export const SENDER_ROLE = "Sender";
export const ADMIN_ROLE = "Admin";
export const API_URL = "http://localhost:5000/api/v1";

export const GENERAL_ROLES = [RECIEVER_ROLE, SENDER_ROLE];
export const ALL_ROLES = [RECIEVER_ROLE, SENDER_ROLE, ADMIN_ROLE];

export const GENERAL_USERS_TABS = [
  {
    label: "Track My Order",
    route: "/my-track",
    Icon: WaterfallChartIcon,
  },
  {
    label: "Create New Order",
    route: "/create-new-order",
    Icon: AddCircleIcon,
  },
  {
    label: "Feedback",
    route: "/feedback",
    Icon: FeedbackIcon,
  },
  {
    label: "Subscribe",
    route: "/subscribe",
    Icon: SubscriptionsIcon,
  },
  {
    label: "Profile",
    route: "/profile",
    Icon: PersonIcon,
  },
];

export const ADMIN_TABS = [
  {
    label: "Dashboard",
    route: "/dashboard",
    Icon: DashboardIcon,
  },
  {
    label: "Mail",
    route: "/mail",
    Icon: EmailIcon,
  },
  {
    label: "Users",
    route: "/users",
    Icon: GroupIcon,
  },
];

export const LOGIN_FIELDS = [
  {
    label: "Email",
    key: "email",
    type: "email",
  },
  {
    label: "Password",
    key: "password",
    type: "password",
  },
];

export const REGISTER_FIELDS = [
  {
    label: "Name",
    key: "name",
    type: "text",
  },
  {
    label: "Phone Number",
    key: "phone",
    type: "text",
  },
  {
    label: "Email",
    key: "email",
    type: "email",
  },
  {
    label: "Complete Address",
    key: "completeAddress",
    type: "text",
  },
  {
    label: "Password",
    key: "password",
    type: "password",
  },
  {
    label: "Confirm Password",
    key: "confirmPassword",
    type: "password",
  },
];

export const CONTACT_FORM_FIELDS = [
  {
    label: "Name",
    key: "name",
    type: "text",
  },
  {
    label: "Phone Number",
    key: "phone",
    type: "number",
  },
  {
    label: "Message",
    key: "message",
    type: "textArea",
  },
];
export const OUR_SERVICES_INFO = [
  {
    title: "Fast Delivery",
    icon: (
      <DeliveryDiningOutlined
        style={{ fontSize: "50px", textAlign: "center" }}
      />
    ),
  },
  {
    title: "Minimal Cost",
    icon: <CurrencyRupeeOutlined style={{ fontSize: "50px" }} />,
  },
  {
    title: "Can Cancel Delivery Order Any Time",
    icon: <CancelPresentation style={{ fontSize: "50px" }} />,
  },
  {
    title: "Service All Over Nepal",
    icon: <Public style={{ fontSize: "50px" }} />,
  },
  {
    title: "Complete Protection of Your Courier",
    icon: <Security style={{ fontSize: "50px" }} />,
  },
  {
    title: "Refund In Case of Any Levelling",
    icon: <MoneyOutlined style={{ fontSize: "50px" }} />,
  },
];

export const CREATE_ORDER_FIELDS = (provienceName = "", districtName = "") => [
  {
    label: "Reciever's Name",
    key: "recieverName",
    type: "text",
    icon: <ManIcon style={{ width: "20px", height: "20px" }} />,
  },
  {
    label: "Reciever's Phone Number",
    key: "recieverPhone",
    type: "text",
    icon: <Phone style={{ width: "20px", height: "20px" }} />,
  },
  {
    label: "Reciever's Email Address",
    key: "recieverEmail",
    type: "email",
    icon: <Mail style={{ width: "20px", height: "20px" }} />,
  },

  {
    label: "Courier Delivery Provience",
    key: "deliveryProvience",
    type: "dropdown",
    options: [...Object.keys(provienceInfo)],
  },
  {
    label: "Couruer Delivery District",
    key: "deliveryDistrict",
    type: "dropdown",
    options: provienceName
      ? [...Object.keys(provienceInfo?.[provienceName])]
      : [],
    disabled: !provienceName,
  },
  {
    label: "Couruer Delivery Municipality",
    key: "deliveryMunicipality",
    type: "dropdown",
    options:
      provienceName && districtName
        ? [...getAllMunicipalNames(provienceInfo, provienceName, districtName)]
        : [],

    disabled: !provienceName || !districtName,
  },
  {
    label: "Courier Delivery Tole",
    key: "deliveryTole",
    type: "text",
    icon: <Mail style={{ width: "20px", height: "20px" }} />,
  },
  {
    label: "Type of Parcel",
    key: "typeOfParcel",
    type: "dropdown",
    options: [
      "Standard Delivery Services",
      "Same Day Delivery",
      "Overnight Shipping Services",
      "Rush and On-Demand Deliveries",
      "Luggage Delivery Services",
      "Parcel Services",
    ],
    icon: <LocalShipping style={{ width: "20px", height: "20px" }} />,
  },
  {
    label: "Size of Courier in kg.",
    key: "courierSize",
    type: "Number",
    icon: <FitnessCenter style={{ width: "20px", height: "20px" }} />,
  },
  {
    label: "Choose Your Appropriate Delivery Time",
    key: "pickupTime",
    type: "time",
    icon: <AccessTime style={{ width: "20px", height: "20px" }} />,
  },
];

export const ORDER_FIELDS_SHOWN_TO_USER = [
  {
    label: "Order Id",
    key: "_id",
    icon: <Fingerprint style={{ width: "20px", height: "20px" }} />,
  },
  {
    label: "Status",
    key: "status",
    icon: <Radar style={{ width: "20px", height: "20px" }} />,
  },
  {
    label: "Reciever's Name",
    key: "recieverName",
    icon: <ManIcon style={{ width: "20px", height: "20px" }} />,
  },
  {
    label: "Reciever's Phone Number",
    key: "recieverPhone",
    icon: <Phone style={{ width: "20px", height: "20px" }} />,
  },
  {
    label: "Reciever's Email Address",
    key: "recieverEmail",
    icon: <Mail style={{ width: "20px", height: "20px" }} />,
  },
  {
    label: "Couruer Delivery Provience",
    key: "deliveryProvience",
  },
  {
    label: "Couruer Delivery District",
    key: "deliveryDistrict",
    icon: <LocationSearching style={{ width: "20px", height: "20px" }} />,
  },
  {
    label: "Couruer Delivery Municipality",
    key: "deliveryMunicipality",
    icon: <LocationCity style={{ width: "20px", height: "20px" }} />,
  },
  {
    label: "Courier Delivery Tole",
    key: "deliveryTole",
    icon: <LocationOn style={{ width: "20px", height: "20px" }} />,
  },
  {
    label: "Type of Parcel",
    key: "typeOfParcel",
    icon: <LocalShipping style={{ width: "20px", height: "20px" }} />,
  },
  {
    label: "Size of Courier in kg.",
    key: "courierSize",
    icon: <FitnessCenter style={{ width: "20px", height: "20px" }} />,
  },
  {
    label: "Choose Your Appropriate Delivery Time",
    key: "pickupTime",
    icon: <AccessTime style={{ width: "20px", height: "20px" }} />,
  },
];

export const LOGO =
  "data:image/png;base64,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";

export const subscriptionDiscount = {
  Popular: 20,
  Business: 40,
  Special: 60,
};

export const recommendations = [
  {
    name: "Popular",
    isRecon: false,
    cost: 400,
    features: ["20% discount on each order", "Good customer support"],
  },
  {
    name: "Business",
    isRecon: false,
    cost: 800,
    features: [
      "40% discount on each order",
      "Applicable to each and every bussiness",
      "Better Customer Support",
    ],
  },
  {
    name: "Special",
    isRecon: false,
    cost: 1100,
    features: [
      "60% discount on each order",
      "No restriction to weight",
      "Best Customer Support",
    ],
  },
];

export const profileFields = [
  {
    label: "Name",
    key: "name",
  },
  {
    label: "Phone",
    key: "phone",
  },
  {
    label: "Complete Address",
    key: "completeAddress",
  },
];
