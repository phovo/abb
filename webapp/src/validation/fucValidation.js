import React from "react";
import { isEmail, isEmpty } from 'validator';

export const email = (value) => {
    if (!isEmail(value)) {
        return <small className="form-text text-danger">Invalid email format</small>;
    }
}

export const minLength = (value) => {
    if (value.trim().length < 6) {
        return <small className="form-text text-danger">Password must be at least 6 characters long</small>;
    }
}

export const required = (value) => {
    if (isEmpty(value)) {
        return <small className="form-text text-danger">This field is required</small>;
    }
}

