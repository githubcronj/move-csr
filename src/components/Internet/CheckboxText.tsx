import React from 'react';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';

interface initialProps {
    checked: boolean;
    onChange: any;
    className?: string;
    label: string;
    name?: string;
    disabled?: boolean;
}

const CheckboxText = (props: initialProps) => {
    let slug: any = localStorage.getItem('slug');
    slug = JSON.parse(slug);
    return (
        <div>
            <FormControlLabel
                control={
                    <Checkbox
                        className={props.className}
                        checked={props.checked}
                        onChange={props.onChange}
                        name={props.name}
                        disabled={props.disabled ? props.disabled : false}
                        // color="primary"
                        style={{
                            color: `${
                                props.checked
                                    ? // ? slug && slug.primary_color
                                      //     // ? `${slug.primary_color}`
                                      '#0066F5'
                                    : '#949494'
                            }`,
                        }}
                    />
                }
                label={props.label}
            />
        </div>
    );
};

export default CheckboxText;
