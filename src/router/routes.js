const routes = [
  {
    path: "/auth",
    component: () => import("layouts/AuthLayout.vue"),
    children: [
      {
        path: "login/",
        name: "login",
        component: () => import("src/pages/auth/LoginPage.vue"),
      },
      {
        path: "register/",
        component: () => import("src/pages/auth/RegisterPage.vue"),
      },
      {
        path: "register/info",
        name: "reg_info",
        component: () => import("src/pages/auth/RegisterInfoPage.vue"),
      },
      {
        path: "resetpassword/",
        component: () => import("src/pages/auth/ResetPwPage.vue"),
      },

      {
        path: "autherror",
        component: () => import("src/pages/AuthError.vue"),
      },
      {
        path: "",
        redirect: "/auth/login",
      },
    ],
  },

  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      { path: "", redirect: "/accounts/register_live_account" },
      {
        // # account
        path: "/accounts",

        component: () => import("src/pages/accounts/account.vue"),
        name: "accounts",
        children: [
          {
            path: "",
            redirect: "/accounts/register_live_account",
          },
          {
            path: "register_live_account",
            name: "register_live_account",
            children: [
              {
                path: "",
                component: () =>
                  import("src/components/account/register_real_landing.vue"),
                name: "reg_live_landing",
              },

              {
                path: "register",
                component: () =>
                  import("src/components/account/register_real.vue"),
                name: "accounts_real_form",
              },
              {
                path: "/live_accounts",
                component: () => import("src/components/account/live.vue"),
                name: "accounts_live",
              },
            ],
          },

          {
            path: "register_demo_account",

            name: "register_demo_account",
            children: [
              {
                path: "",
                component: () =>
                  import("src/components/account/register_demo_landing.vue"),

                name: "reg_demo_landing",
              },

              {
                path: "register",
                path: "register_demo",
                component: () =>
                  import("src/components/account/register_demo.vue"),
                name: "accounts_demo_form",
              },

              {
                path: "/demo_accounts",

                children: [
                  {
                    path: "",
                    name: "accounts_demo",
                    component: () => import("src/components/account/demo.vue"),
                  },
                  {
                    path: "demo_deposit",
                    component: () =>
                      import("src/components/account/deposit_demo.vue"),
                    name: "demo_deposit",
                  },
                ],
              },
            ],
          },
        ],
      },

      {
        // # Wallet
        path: "wallet",
        component: () => import("src/pages/wallet/wallet.vue"),
        name: "wallet",
        redirect: "/wallet/deposit",
        children: [
          {
            path: "deposit",
            component: () =>
              import("src/components/wallet/deposit_methods.vue"),
            children: [
              {
                path: "",
                name: "deposit_methods",
                component: () => import("src/components/wallet/deposit.vue"),
              },
              {
                path: "deposit_methods",
                name: "trc_deposit",
                component: () => import("src/components/wallet/deposit.vue"),
              },
              {
                path: "trc",
                name: "trc_deposit",
                component: () =>
                  import("src/components/wallet/deposit_TRC.vue"),
              },
              {
                path: "eth",
                name: "eth_deposit",
                component: () =>
                  import("src/components/wallet/deposit_ETH.vue"),
              },
            ],
          },

          {
            path: "transfer",
            name: "wallet_transfer",
            component: () => import("src/components/wallet/transfer.vue"),
          },
          {
            path: "withdraw",
            name: "wallet_withdraw",
            component: () => import("src/components/wallet/withdraw.vue"),
          },
          {
            path: "history",
            name: "wallet_history",
            component: () => import("src/components/wallet/historytable.vue"),
          },
        ],
      },
      {
        path: "wallet/balance",
        component: () => import("src/pages/wallet/balance.vue"),
        name: "balance",
      },
      {
        path: "platform",
        component: () => import("src/pages/platform.vue"),
        name: "platform",
        children: [
          {
            path: "",
            redirect: "/platform/mt4",
          },
          {
            path: "mt4",
            component: () => import("src/components/platform/mt4.vue"),
            name: "mt4",
          },
        ],
      },
      {
        path: "contact",
        component: () => import("src/pages/contactus.vue"),
        name: "contact",
      },
      {
        path: "faq",
        component: () => import("src/pages/faq.vue"),
        name: "faq",
      },
      {
        path: "cs",
        component: () => import("src/pages/cs.vue"),
        name: "cs",
      },
      {
        path: "accounts/register",
        name: "home",
        component: () => import("src/pages/accounts/register.vue"),
      },
      {
        path: "",
        redirect: "/accounts/",
      },
      {
        // # Profile
        path: "profile",
        name: "prorfile",
        component: () => import("src/pages/profile/profile.vue"),
        children: [
          {
            path: " ",

            redirect: "/profile/personal_info",
          },
          {
            path: "personal_info",

            component: () => import("src/components/profile/personal_info.vue"),
            name: "prorfile_personal_info",
          },
          {
            path: "edit_email",

            component: () => import("src/components/profile/edit_email.vue"),
            name: "prorfile_edit_email",
          },

          {
            path: "password",

            component: () => import("src/components/profile/password.vue"),
            name: "prorfile_password",
          },
          {
            path: "edit_address",

            component: () => import("src/components/profile/address.vue"),
            name: "prorfile_address",
          },
        ],
      },
      {
        path: "/:catchAll(.*)",
        redirect: "/404",
      },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
];
export default routes;
