export default  {
    palette: {
      common:{
        black:"rgba(57, 55, 55, 1)",
        white:"rgba(227, 227, 227, 1)"
      },
      background:{
        paper:"rgba(182, 178, 178, 1)",
        default:"rgba(158, 158, 142, 1)"},
        primary:{"light":"rgba(85, 97, 94, 1)",
        main:"rgba(96, 125, 139, 1)",
        dark:"rgba(56, 57, 58, 1)",
        contrastText:"#fff"
      },
      secondary:{
        light:"rgba(100, 102, 105, 1)",
        main:"rgba(95, 88, 88, 1)",
        dark:"rgba(37, 39, 41, 1)",
        contrastText:"#fff"},
        error:{"light":"#e57373",
        main:"rgba(229, 115, 115, 1)",
        dark:"#d32f2f",
        contrastText:"#fff"
      },
      text:{
        primary:"rgba(53, 50, 50, 1)",
        secondary:"rgba(36, 95, 117, 0.54)",
        disabled:"rgba(0, 0, 0, 0.38)",
        hint:"rgba(0, 0, 0, 0.38)"
      }
      },
      typography: {
        useNextVariants: true
      },
      common: {
        card: {
            maxWidth: 345,
            margin: "auto",
            textAlign: "center"
          },
          button: {
            margin: "20px auto 20px auto",
            float: "right"
          },
          title: {
            textAlign: "center",
            fontSize: 45,
            color: "#00bcd4"
          },
          caption: {
            color: "red",
            margin: 20
          },
          btnLink: {
              margin: "30px auto 10px 0",
              float: "left"
          },
          closeButton: {
              position: 'absolute',
              top: '1%',
              left: '91%'
          },
          invisibleSeparator: {
            border: 'none',
            margin: '0 0 10px 0'
        },
        visibleSeparator: {
          width: '100%',
          borderBottom: '1px solid rgba(0 0 0 0.1)'
      }
      }
      
}