import { Label } from '@mui/icons-material';
import React from 'react';

const CustomButton = ({ callBack, Label, Icon }) => {
    return (
        <div>
            <button onClick={callBack} class="items-center cursor-pointer rounded-md bg-slate-800 py-2 px-4 border border-transparent text-center text-xs text-white transition-all shadow-sm hover:shadow-lg focus:bg-slate-700 focus:shadow-none active:bg-slate-700 hover:bg-slate-700 active:shadow-none flex justify-between disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none" type="button">
                {Label}
                <span className='ml-2' >
                    {Icon}
                </span>
            </button>
        </div>
    );
}

export default CustomButton;
