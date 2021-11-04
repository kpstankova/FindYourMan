import {  makeStyles } from "@material-ui/core/styles";

export const wrapperStyles = makeStyles(()=>({
    dialogRoot: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: '1000px',
      height: 'auto',
      margin: '0 auto',
    },
    // dialogPaper:{
    //   borderRadius: '25px !important',
    // },
    dialogPaperWidthSm:{
      maxWidth:'none'
    }
}))

export interface RegisterWrapperProps {
    toggleRegisterAsRoleModal: boolean;
    resetTogglesModalAction: () => void;
    toggleRegisterModalAction: () => void;
    setRegisterRoleAction: (data: string) => void;
}