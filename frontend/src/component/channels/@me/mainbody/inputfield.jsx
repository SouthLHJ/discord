import TextField, { TextFieldProps } from '@mui/material/TextField';
import { OutlinedInputProps } from '@mui/material/OutlinedInput';
import { alpha, styled } from '@mui/material/styles';
import Switch, { SwitchProps } from '@mui/material/Switch';
import Stack from '@mui/material/Stack';
import { InputBase } from '@mui/material';
import { CustomColor } from '../../../../customs/colors';

export const InputField = styled((props) => (
    <TextField
    //   InputProps={{ disableUnderline: true }}
      {...props}
      sx={{
        autocomplete : "off"
      }}
    />
  ))(({ theme }) => ({
    '& .MuiOutlinedInput-root' : {
        color : "lightgray",
        borderColor : CustomColor.darkgray,
        backgroundColor : CustomColor.darkgray,
        '& .Mui-focused.MuiOutlinedInput-notchedOutline' :{
            borderColor: CustomColor.darkgray,
            backgroundColor : CustomColor.darkgray,
        },
    },
    '& .MuiFilledInput-root': {
      border: '1px solid ',
      overflow: 'hidden',
      borderTopLeftRadius: 10,
      borderTopRightRadius: 10,
      borderColor : theme.palette.mode === 'dark' ? "red" : CustomColor.gray ,
      backgroundColor: theme.palette.mode === 'light' ? '#fcfcfb' : CustomColor.darkgray,
      transition: theme.transitions.create([
        'border-color',
        'background-color',
        'box-shadow',
      ]),
      '&:hover': {
        backgroundColor: 'transparent',
        borderColor : CustomColor.gray,
      },
      '&.Mui-error' :{
        color : "red",
        borderColor : "red"
      }
      
    },
    '&.Mui-focused': {
        borderColor: CustomColor.gray,
        backgroundColor : CustomColor.darkgray,
    },
    
}));


export const SelectField = styled(InputBase)(({ theme }) => ({
    'label + &': {
      marginTop: theme.spacing(3),
    },
    '& .MuiInputBase-input': {
      height : "35px",
      borderRadius: 4,
      position: 'relative',
      display: "flex",
      alignItems: "center",
      color : "white",
      backgroundColor: CustomColor.darkgray,
      borderColor: CustomColor.darkgray,
      fontSize: 16,
      padding: '10px 26px 10px 12px',
      transition: theme.transitions.create(['border-color', 'box-shadow']),
      // Use the system font instead of the default Roboto font.
      fontFamily: [
        '-apple-system',
        'BlinkMacSystemFont',
        '"Segoe UI"',
        'Roboto',
        '"Helvetica Neue"',
        'Arial',
        'sans-serif',
        '"Apple Color Emoji"',
        '"Segoe UI Emoji"',
        '"Segoe UI Symbol"',
      ].join(','),
      '&:focus': {
        borderRadius: 4,
        borderColor: CustomColor.darkgray,
      },
    },
  }));
  