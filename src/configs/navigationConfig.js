import React from "react";
import * as Icon from "react-feather";
const navigationConfig = [
  {
    id: "dashboard",
    title: "Dashboard",
    type: "item",
    icon: <Icon.Home size={20} />,
    permissions: ["admin", "editor"],
    navLink: "/",
  },

  {
    type: "groupHeader",
    groupTitle: "Component",
  },

  {
    id: "user",
    title: "User Management ",
    type: "collapse",
    icon: <Icon.Users size={20} />,
    children: [
      {
        id: "userList",
        title: "Users List",
        type: "item",
        icon: <Icon.Users size={12} />,
        permissions: ["admin", "editor"],
        navLink: "/app/user/userList",
      },
      {
        id: "astrologerList",
        title: "Astrologer",
        type: "item",
        icon: <Icon.User size={12} />,
        permissions: ["admin", "editor"],
        navLink: "/app/astrology/astrologerList",
      },
    ],
  },

  {
    type: "groupHeader",
    groupTitle: "Kundli Management",
  },

  {
    id: "kundlidetail",
    title: "Kundli Detail Users",
    type: "item",
    icon: <Icon.BarChart2 size={20} />,
    permissions: ["admin", "editor"],
    navLink: "/app/kundlimanage/kundliuserdetail",
  },

  {
    id: "kundlimatch",
    title: "Kundli Match Users",
    type: "item",
    icon: <Icon.BarChart2 size={20} />,
    permissions: ["admin", "editor"],
    navLink: "/app/kundlimanage/kundlimatchlist",
  },

  {
    type: "groupHeader",
    groupTitle: "Horoscopes",
  },
  {
    id: "horoscopes",
    title: "Horoscopes",
    type: "collapse",
    icon: <Icon.Box size={20} />,
    children: [
      {
        id: "horoscopeList",
        title: "Horoscope ",
        type: "item",
        icon: <Icon.FileText size={12} />,
        permissions: ["admin", "editor"],
        navLink: "/app/horoscopes/horoscopesList",
      },

      //     {
      //       id: "todayHoroscopeList",
      //       title: "Today Horoscope",
      //       type: "item",
      //       icon: <Icon.FileText size={12} />,
      //       permissions: ["admin", "editor"],
      //       navLink: "/app/horoscopes/todayshoroscope/todayHoroscopeList",
      //     },

      //     {
      //       id: "weeklyHoroscopeList",
      //       title: "Weekly Horoscope",
      //       type: "item",
      //       icon: <Icon.FileText size={12} />,
      //       permissions: ["admin", "editor"],
      //       navLink: "/app/horoscopes/weeklyhoroscope/weeklyHoroscopeList",
      //     },

      //     {
      //       id: "monthlyHoroscopeList",
      //       title: "Monthly Horoscope",
      //       type: "item",
      //       icon: <Icon.FileText size={12} />,
      //       permissions: ["admin", "editor"],
      //       navLink: "/app/horoscopes/monthlyhoroscope/monthlyHoroscopeList",
      //     },

      //     {
      //       id: "yearlyHoroscopeList",
      //       title: "Yearly Horoscope",
      //       type: "item",
      //       icon: <Icon.FileText size={12} />,
      //       permissions: ["admin", "editor"],
      //       navLink: "/app/horoscopes/yearlyhoroscope/yearlyHoroscopeList",
      //     },

      //     {
      //       id: "dailyHoroscopeList",
      //       title: "Daily Horoscope",
      //       type: "item",
      //       icon: <Icon.FileText size={12} />,
      //       permissions: ["admin", "editor"],
      //       navLink: "/app/horoscopes/dailyhoroscope/dailyHoroscopeList",
      //     },

      //     {
      //       id: "tomorrowHoroscopeList",
      //       title: "Tomorrow Horoscope",
      //       type: "item",
      //       icon: <Icon.FileText size={12} />,
      //       permissions: ["admin", "editor"],
      //       navLink: "/app/horoscopes/tomorrowhoroscope/tomorrowHoroscopeList",
      //     },

      //     {
      //       id: "yesterdayHoroscopeList",
      //       title: "Yesterday Horoscope",
      //       type: "item",
      //       icon: <Icon.FileText size={12} />,
      //       permissions: ["admin", "editor"],
      //       navLink: "/app/horoscopes/yesterdayhoroscope/yesterdayHoroscopeList",
      //     },

      //     // {
      //     //   id: "YearlyHoroscopeList",
      //     //   title: "Yearly Horoscope",
      //     //   type: "item",
      //     //   icon: <Icon.FileText size={20} />,
      //     //   permissions: ["admin", "editor"],
      //     //   navLink: "/app/horoscopes/yearlyhoroscope/YearlyHoroscopeList",
      //     // },
    ],
  },
  // {
  //   id: "horoscopesList",
  //   title: "Horoscopes List44",
  //   type: "item",
  //   icon: <Icon.Box size={20} />,
  //   permissions: ["admin", "editor"],
  //   navLink: "/app/horoscopes/horoscopesList",
  // },

  {
    id: "horoscopeCategoryList",
    title: "Horoscope Category",
    type: "item",
    icon: <Icon.Box size={20} />,
    permissions: ["admin", "editor"],
    navLink: "/app/horoscopecategory/horoscopeCategoryList",
  },
  // {
  //   id: "rashimanagement",
  //   title: "Rashi Management",
  //   type: "collapse",
  //   icon: <Icon.BarChart2 size={20} />,
  //   children: [
  //     {
  //       id: "rashi",
  //       title: "Rashi List",
  //       type: "item",
  //       icon: <Icon.Circle size={12} />,
  //       permissions: ["admin", "editor"],
  //       navLink: "/app/rashimanagement/rashi/rashiList",
  //     },
  //     {
  //       id: "rashiHoroscopeList",
  //       title: "Rashi Horoscope List",
  //       type: "item",
  //       icon: <Icon.Circle size={12} />,
  //       permissions: ["admin", "editor"],
  //       navLink: "/app/rashimanagement/rashihoroscope/rashiHoroscopeList",
  //     },
  //   ],
  // },

  {
    type: "groupHeader",
    groupTitle: "Order Management",
  },

  {
    id: "orderlist",
    title: "All Orders",
    type: "item",
    icon: <Icon.Box size={20} />,
    permissions: ["admin", "editor"],
    navLink: "/app/ordermanage/allorderlist",
  },
  {
    type: "groupHeader",
    groupTitle: " Event",
  },
  {
    id: "rashimanagement",
    title: "Rashi Management",
    type: "collapse",
    icon: <Icon.BarChart2 size={20} />,
    children: [
      {
        id: "eventList",
        title: "Event List",
        type: "item",
        icon: <Icon.Box size={20} />,
        permissions: ["admin", "editor"],
        navLink: "/app/event/addEvent/EventList",
      },
      {
        id: "bookEventList",
        title: "Book Event List",
        type: "item",
        icon: <Icon.Box size={20} />,
        permissions: ["admin", "editor"],
        navLink: "/app/event/bookEvent/bookEventList",
      },
    ],
  },

  {
    type: "groupHeader",
    groupTitle: " Event",
  },
  {
    id: "rashimanagementa",
    title: "Book Puja",
    type: "collapse",
    icon: <Icon.BarChart2 size={20} />,
    children: [
      {
        id: "bannerPoojaLista",
        title: "Banner Pooja List",
        type: "item",
        icon: <Icon.Box size={20} />,
        permissions: ["admin", "editor"],
        navLink: "/app/event/bennerPooja/bannerPoojaList",
      },
      {
        id: "pojatyoelost",
        title: "Pooja type List",
        type: "item",
        icon: <Icon.Box size={20} />,
        permissions: ["admin", "editor"],
        navLink: "/app/event/addEvent/EventList",
      },
      {
        id: "bookEventLisat",
        title: "Pooja List",
        type: "item",
        icon: <Icon.Box size={20} />,
        permissions: ["admin", "editor"],
        navLink: "/app/event/bookEvent/bookEventList",
      },
    ],
  },

  {
    type: "groupHeader",
    groupTitle: "Porduct Management",
  },

  {
    id: "productmanager",
    title: "Product Management",
    type: "collapse",
    icon: <Icon.Box size={20} />,
    children: [
      {
        id: "categoryList",
        title: "Category List",
        type: "item",
        icon: <Icon.Circle size={12} />,
        permissions: ["admin", "editor"],
        navLink: "/app/productmanager/category/categoryList",
      },
      {
        id: "productList",
        title: "Product List",
        type: "item",
        icon: <Icon.Circle size={12} />,
        permissions: ["admin", "editor"],
        navLink: "/app/productmanager/product/productList",
      },
      {
        id: "astrologerproducts",
        title: "Astrologer Products",
        type: "item",
        icon: <Icon.Circle size={12} />,
        permissions: ["admin", "editor"],
        navLink: "/app/productmanager/astrologerproduct",
      },
    ],
  },

  {
    id: "callstatus",
    title: "Call Management",
    type: "collapse",
    icon: <Icon.PhoneCall size={20} />,
    children: [
      {
        id: "callComplete",
        title: "Complete Call",
        type: "item",
        icon: <Icon.PhoneIncoming size={12} />,
        permissions: ["admin", "editor"],
        navLink: "/app/callmanagement/completecall",
      },
      {
        id: "callreject",
        title: "Reject Call",
        type: "item",
        icon: <Icon.PhoneMissed size={12} />,
        permissions: ["admin", "editor"],
        navLink: "/app/callmanagement/callgreject",
      },
      {
        id: "calltansaction",
        title: "Call Transac. History",
        type: "item",
        icon: <Icon.PhoneMissed size={12} />,
        permissions: ["admin", "editor"],
        navLink: "",
      },
    ],
  },

  {
    id: "chatlist",
    title: "Chat List",
    type: "item",
    icon: <Icon.MessageCircle size={20} />,
    permissions: ["admin", "editor"],
    navLink: "/app/chat/chatList",
  },

  {
    id: "chatintakelist",
    title: "Conversion take List",
    type: "item",
    icon: <Icon.MessageCircle size={20} />,
    permissions: ["admin", "editor"],
    navLink: "/app/chatintakeform/chatintakelist",
  },

  // {
  //   id: 'askQuestionList',
  //   title: 'All users Question List',
  //   type: 'item',
  //   icon: <Icon.MessageCircle size={20} />,
  //   permissions: ['admin', 'editor'],
  //   navLink: '/app/askQuestionList',
  // },

  {
    id: "rechargepackage",
    title: "Recharge Package",
    type: "collapse",
    icon: <Icon.Package size={20} />,
    children: [
      {
        id: "allPlan",
        title: "All Plan List",
        type: "item",
        icon: <Icon.Circle size={12} />,
        permissions: ["admin", "editor"],
        navLink: "/app/packagemanager/allPlan",
      },
      {
        id: "userrecharge",
        title: "User Recharge",
        type: "item",
        icon: <Icon.Circle size={12} />,
        permissions: ["admin", "editor"],
        navLink: "/app/packagemanager/userrecharge",
      },
      {
        id: "packageoffer",
        title: "Package Offer",
        type: "item",
        icon: <Icon.Circle size={12} />,
        permissions: ["admin", "editor"],
        navLink: "/app/packagemanager/packageoffer",
      },
    ],
  },

  {
    id: "packageList",
    title: "Package List ",
    type: "item",
    icon: <Icon.Compass size={20} />,
    permissions: ["admin", "editor"],
    navLink: "/app/poojapackage/packageList",
  },

  {
    id: "discount",
    title: "Discount/offer",
    type: "item",
    icon: <Icon.Percent size={20} />,
    permissions: ["admin", "editor"],
    navLink: "/app/coupons/couponslist",
  },

  {
    id: "reportstatus",
    title: "Report",
    type: "collapse",
    icon: <Icon.BarChart2 size={20} />,
    children: [
      {
        id: "adminearning",
        title: "Admin Recharge",
        type: "item",
        icon: <Icon.Circle size={12} />,
        permissions: ["admin", "editor"],
        navLink: "/app/status/statusList",
      },
      {
        id: "astroearning",
        title: "Astrologer Earning",
        type: "item",
        icon: <Icon.Circle size={12} />,
        permissions: ["admin", "editor"],
        navLink: "/app/status/daily",
      },
    ],
  },

  {
    id: "withdrawrequest",
    title: "Withdraw Request ",
    type: "item",
    icon: <Icon.DollarSign size={20} />,
    permissions: ["admin", "editor"],
    navLink: "/app/withdraw/WithdrawRequest",
  },
  {
    id: "blogmngment",
    title: "Blog Management",
    type: "collapse",
    icon: <Icon.Package size={20} />,
    children: [
      {
        id: "blogList",
        title: "Blog ",
        type: "item",
        icon: <Icon.Video size={20} />,
        permissions: ["admin", "editor"],
        navLink: "/app/blogmngment/blog/blogList",
      },
      {
        id: "blogCateList",
        title: "Blog Category",
        type: "item",
        icon: <Icon.Video size={20} />,
        permissions: ["admin", "editor"],
        navLink: "/app/blogmngment/blogCategory/blogCateList",
      },
    ],
  },

  {
    id: "commissionset",
    title: "Commission Set ",
    type: "item",
    icon: <Icon.DollarSign size={20} />,
    permissions: ["admin", "editor"],
    navLink: "/app/packagemanager/commission",
  },
  {
    id: "payouts",
    title: "Payouts ",
    type: "item",
    icon: <Icon.DollarSign size={20} />,
    permissions: ["admin", "editor"],
    navLink: "/app/report/payoutlist",
  },

  {
    id: "transaction",
    title: "All Transaction",
    type: "item",
    icon: <Icon.DollarSign size={20} />,
    permissions: ["admin", "editor"],
    navLink: "/app/transaction/transactionHistory",
  },

  {
    id: "ratinglist",
    title: "Astro Rating and Review",
    type: "item",
    icon: <Icon.Star size={20} />,
    permissions: ["admin", "editor"],
    navLink: "/app/reviewrating/ratinglist",
  },

  // {
  //   type: "groupHeader",
  //   groupTitle: "Wallet Management",
  // },
  // {
  //   id: "walletcustom",
  //   title: "Customer Wallet",
  //   type: "item",
  //   icon: <Icon.DollarSign size={20} />,
  //   permissions: ["admin", "editor"],
  //   navLink: "/app/wallet/walletcustom",
  // },
  // {
  //   id: "wallettansaction",
  //   title: "Wallet Transaction",
  //   type: "item",
  //   icon: <Icon.DollarSign size={20} />,
  //   permissions: ["admin", "editor"],
  //   navLink: "/app/wallet/wallettransaction",
  // },

  {
    type: "groupHeader",
    groupTitle: "CMS",
  },

  {
    id: "pagesetup",
    title: "Page Setup ",
    type: "collapse",
    icon: <Icon.Settings size={20} />,
    children: [
      {
        id: "bannerList",
        title: "Banner List",
        type: "item",
        icon: <Icon.Circle size={12} />,
        permissions: ["admin", "editor"],
        navLink: "/app/pagesetup/banner/bannerList",
      },
      {
        id: "notifiList",
        title: "Notification List",
        type: "item",
        icon: <Icon.Circle size={12} />,
        permissions: ["admin", "editor"],
        navLink: "/app/pagesetup/notification/notifiList",
      },
      {
        id: "contactus",
        title: "Contact Us",
        type: "item",
        icon: <Icon.Circle size={12} />,
        permissions: ["admin", "editor"],
        navLink: "/app/pagesetup/contactus/contactUsList",
      },
      {
        id: "aboutUsList",
        title: "About Us",
        type: "item",
        icon: <Icon.Circle size={12} />,
        permissions: ["admin", "editor"],
        navLink: "/app/pagesetup/aboutus/aboutUsList",
      },
      {
        id: "termsandcondition",
        title: "Terms And Conditions",
        type: "item",
        icon: <Icon.Circle size={12} />,
        permissions: ["admin", "editor"],
        navLink: "/app/pagesetup/termscondition/termConditionList",
      },
      {
        id: "faqList",
        title: "FAQ List",
        type: "item",
        icon: <Icon.Circle size={12} />,
        permissions: ["admin", "editor"],
        navLink: "/app/pagesetup/faq/faqList",
      },
      {
        id: "privacyPolicyList",
        title: "Privacy Policy",
        type: "item",
        icon: <Icon.Circle size={12} />,
        permissions: ["admin", "editor"],
        navLink: "/app/pagesetup/privacypolicy/privacyPolicyList",
      },
      {
        id: "helpus",
        title: "Help Us",
        type: "item",
        icon: <Icon.Circle size={12} />,
        permissions: ["admin", "editor"],
        navLink: "/app/helpUs/HelpUs",
      },
    ],
  },
];
export default navigationConfig;
