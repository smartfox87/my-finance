import SvgHome from "@/assets/sprite/home.svg";
import SvgBudgets from "@/assets/sprite/budgets.svg";
import SvgStatistics from "@/assets/sprite/statistics.svg";
import SvgExpenses from "@/assets/sprite/expenses.svg";
import SvgProfile from "@/assets/sprite/profile.svg";
import SvgAccounts from "@/assets/sprite/accounts.svg";
import SvgIncomes from "@/assets/sprite/incomes.svg";
import SvgSettings from "@/assets/sprite/settings.svg";
import SvgContact from "@/assets/sprite/contact.svg";

export const INIT_NAV_LIST = [
  {
    icon: <SvgHome className="h-5 w-5" />,
    full_name: "navigation.home",
    url: "/",
  },
  {
    icon: <SvgAccounts className="h-5 w-5" />,
    full_name: "navigation.accounts.full",
    short_name: "navigation.accounts.short",
    mobile_nav: true,
    url: "/accounts",
  },
  {
    icon: <SvgIncomes className="-m-0.5 h-6 w-6" />,
    full_name: "navigation.incomes.full",
    short_name: "navigation.incomes.short",
    mobile_nav: true,
    url: "/incomes",
  },
  {
    icon: <SvgExpenses className="-m-0.5 h-6 w-6" />,
    full_name: "navigation.expenses.full",
    short_name: "navigation.expenses.short",
    mobile_nav: true,
    url: "/expenses",
  },
  {
    icon: <SvgBudgets className="h-5 w-5" />,
    full_name: "navigation.budgets.full",
    short_name: "navigation.budgets.short",
    mobile_nav: true,
    url: "/budgets",
  },
  {
    icon: <SvgStatistics className="h-5 w-5" />,
    full_name: "navigation.statistics.full",
    short_name: "navigation.statistics.short",
    mobile_nav: true,
    url: "/statistics",
  },
  {
    icon: <SvgProfile className="h-5 w-5" />,
    full_name: "navigation.profile",
    url: "/profile",
  },
  {
    icon: <SvgSettings className="h-5 w-5" />,
    full_name: "navigation.settings",
    url: "/settings",
  },
  {
    icon: <SvgContact className="h-5 w-5" />,
    full_name: "navigation.contact_us",
    url: "/contact",
  },
];
