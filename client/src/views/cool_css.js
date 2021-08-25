import {withStyles} from "@material-ui/core";

export const palette = {
    accent: '#f9bf7f',
    accentActive: '#fa7f38',
    main: '#ffebc5',
    text: '#8a7764',
};

export const GlobalCss = withStyles({
    '@global': {
        '.MuiButton-root': {
            backgroundColor: palette.accent,
            color: palette.text,
            cursor: 'pointer',
            margin: '5px',
            "&:hover": {
                backgroundColor: palette.accentActive
            },
            "&:active": {
                backgroundColor: palette.accentActive
            },
        },
        '.MuiOutlinedInput-adornedEnd': {
            width: '270px',
        },
        '.MuiInputBase-input': {
            color: palette.text,
        },
        '.MuiPaperBase-root': {
            width: '270px',
        },
        '.MuiSvgIcon-root': {
            color: palette.accentActive,
        },
        '.MuiFormLabel-root.Mui-focused': {
            color: palette.accentActive,
        },
        '.MuiFormLabel-root': {
            color: palette.accent,
        },
        '.MuiOutlinedInput-notchedOutline': {
            borderColor: palette.accent,
        },
        '.MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline': {
            borderColor: palette.accent,
        },
        '.MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
            borderColor: palette.accentActive,
        },
        '.MuiGrid-item': {
            margin: '7px',
        },
    },
})(() => null);