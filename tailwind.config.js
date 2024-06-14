module.exports = {
  content: ['./**/*.{html,js}', '*.{html,js}'],
  theme: {
    extend: {

      dir: {
        'ltr': 'ltr',
        'rtl': 'rtl',
      },

      colors: {
        mainColor: "#2271b1",
        darkleftsidbarText: "#CBD5E1",
        darkmodetext: "#CBD5E1",
        darkmodebg: "#0f172a",
        lightmodetext: "#64748B",
        lightBlue: "#f1f5f9",
        white: "#ffffff",
        black: "#000000",
        black100: "rgba(0, 0, 0, .4)",
        lightgray: "#74788D",
        darkmodelightbg: "#334155",
        lightdarkblue: "#3c434a",
        lightDark: "rgb(15 23 42)",
        darkblue: "#1e293b",
        darkblue500: "#2c3338",
        darkbggray: "#A0AEC04D",
        darktextgray: "#e2e8f0",
        grey: "#A0AEC033",
        grey100: "#50575e",
        grey200: "#9AA2AF",
        grey300: "#757575",
        darkgrey: "#6b6b6b",
        gray300: "#D1D5DB",
        darkcardbg: "#515457",
        gray50:"#f3f4f6",
        gray100: "rgba(107, 114, 128, .4)",
        gray500: "#6b7280",
        gray200: "#e5e7eb",
        gray700: "#374151",
        blue100: "#E8F0FE",
        babyblue: "#94a3b8",
        babyblue100:"#58afe0",
        gray400: "#9ca3af",
        darkbabyblue: "#475569",
        darkbabyblue500: "#1e293b",
        lightbabyblue: "#BDC5E2",
        andigo: "#3582c4",
        darkandigo: "#1a4998",
        darklayoutbody: "#0f1729",
        lightblack: "rgb(71 ,85, 105 )",

        // primary:"#5156BE",
        primary: "#4669FA",
        primaryRing: "rgb(81,86,190, 0.3)",
        primaryHover: "#4a4ead",
        primaryText: "#ffffff",

        // secondary:"#74788D",
        secondary: "#A0AEC0",
        secondaryRing: "rgb(116, 120, 141 , 0.3)",
        secondaryHover: "#5F6273",
        secondaryText: "#ffffff",

        // success:"#2AB57D",
        success: "#50C793",
        successRing: "rgb(42, 181, 125, 0.3)",
        successHover: "#229466",
        successText: "#ffffff",

        // info:"#4BA6EF",
        info: "#0CE7FA",
        infoRing: "rgb(75, 166, 239, 0.3)",
        infoHover: "#4497D9",
        infoText: "#ffffff",

        // warning:"#FFBF53",
        warning: "#FA916B",
        warningRing: "rgb(255, 191, 83, 0.3)",
        warningHover: "#E8AE4B",
        warningText: "#ffffff",

        // danger:"#FD625E",
        danger: "#F1595C",
        dangerRing: "rgb(253 , 98 , 94 , 0.3)",
        dangerHover: "#E65955",
        dangerText: "#ffffff",

        // dark:"#2A2A2A",
        dark: "#0F172A",
        darkRing: "rgb(115, 115, 115, 0.3)",
        darkHover: "#1F1F1F",
        darkText: "#ffffff",

        // light:"#D9DAE0",
        light: "#F1F5F9",
        lightRing: "rgb(116, 120, 141, 0.3)",
        lightHover: "#A7A9B6",
        lightText: "#0F172A",

        link: "#ffffff",
        linkRing: "",
        linkHover: "#5156BE",
        // linkText:"#5156BE",
        linkText: "#0F172A",



        accordionTitle: "#475569",
        accordionBorder: "#e5e7eb",
        accordionTitleBackGround: "#FFFFFF",
        accordionTitleBackGroundClicked: "#F8FAFC",
        accordionBodyText: "#475569",
        accordionBodyBackGround: "#FFFFFF",
        accordionArrow: "rgb(15 23 42)",


        leftSidebarbg: "#ffffff",


        secondColor: "#c3c4c7",
        offwhite: "#f0f0f1",
        tbColor: "#ccc",
        shadowColor: "rgba(0,0,0,.04)",
        sbgColor: "#f6f7f7",
        sbColor: "#3582c4",
        stxtColor: "#0a4b78",
        sshColor: "#3582c4",
        sActivebgColor: "#f6f7f7",
        sActiveBColor: "#8c8f94",
        blue100: "#8c8f94",
        blue200: "#1C9CEB",
        blue300: "#395599",
        blue400: "#0A63BC",
        red400: "#EA4335",
        red300: "#e74c3c",
        txtHover: "rgb(153, 182, 245)",
        // headerBg:"rgb(22, 22, 27)",
        leftSidebarBgCell: "#ffffff",
        leftSidebarBgCellText: "#475569",
        leftSidebarGroupTitleText: "#1E293B",


        navtxt: "rgb(89, 91, 97)",
        backColor: "rgb(154, 170, 221)",
        eSectionB: "rgb(240, 182, 248)",
        eSectionB2: "rgb(235, 140, 243)",
        eSectionB3: "rgb(241, 200, 247)"

      },

      boxShadow: {
        'customChart': " 2px 2px 3px rgb(204, 186, 186)  , -2px -2px  3px rgb(204, 186, 186)",
        'customTable': " 0 1px 1px rgba(0, 0, 0, .04)",
        "usernameField": "0 0 0 1px #2271b1",
        "setPassField": "0 0 0 1px #3582c4",
        'btnShadow': " 1px 1px 2px rgb(204, 186, 186)  , -1px -1px  2px rgb(204, 186, 186)",
        'btnShadowPrimary': " 1px 1px 2px rgb(81, 34, 190, .5) , -1px -1px  2px rgb(81, 34, 190, .5)",
        'btnShadowSecondary': " 1px 1px 2px #74778c , -1px -1px  2px #74778c",
        'accordionShadow': " 0px 0px 1px rgba(40, 41, 61, .08),  0px .5px 2px rgba(96, 97, 112, .16)",

        'darkcolorpickershadow': " 0px 0px 1px #0f172a,  0px .5px 2px #4669FA",
        'lightcolorpickershadow': " 0px 0px 1px #6b6b6b,  0px .5px 2px #74788D",
        "colorPickerShadow": "0 0.15em 1.5em 0 rgba(0,0,0,0.1), 0 0 1em 0 rgba(0,0,0,0.03)",

        "leftsidbarShadow": "0 10px 15px -3px rgb(0 0 0 / .1), 0 4px 6px -4px rgb(0 0 0 / .1)",
        "headerShadow": "0px 0px 1px rgba(40, 41, 61, .08), 0px .5px 2px rgba(96, 97, 112, .16);",
        "darkheaderShadow": "0px 0px 0px rgba(255, 255, 255, .60) ",
        "colorpickcontrollshadow": "0 1px 5px rgba(0,0,0,.1)",
        "lightGray": " 0 1px 10px #0000001a, 0 2px 15px #0000000d",
        "videoNameShadow": "inset 0 0 0 1px rgba(0,0,0,.15)",
        "cardShadow": "inset 0 0 15px rgba(0,0,0,.1), inset 0 0 0 1px rgba(0,0,0,.05)",
        "lightbabyblueShadow": "1px 1px 8px #e3dede40, -1px -1px 7px #e3dede40",
        "darkblueShadow": " 1px 1px 1px rgb(115, 115, 115, 0.1) , -1px -1px 1px rgb(115, 115, 115, 0.1) ",
        
        "grayShadow": "1px 1px 8px gray, -1px -1px 7px gray",
        "darkblueShadow100": " 1px 1px 1px rgb(115, 115, 115, 0.8) , -1px -1px 1px rgb(115, 115, 115, 0.8) ",
        
        "basicShadow" : "0px 0px 1px rgba(40, 41, 61, .08), 0px .5px 2px rgba(96, 97, 112, .16);",
        "lightGray100": " 1px 2px 10px -1px rgba(180,173,173,0.75)",
      },

      screens: {
        "xs": '0',
        'sm': '768px',
        'md': '992px ',
        'lg': '1200px ',
        'xm': '1300px ',
        'xl': '1480px',
      },
    },
  },
  plugins: [],
};
