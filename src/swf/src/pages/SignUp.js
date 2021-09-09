import {useRef} from "react";
import SubmitButton from "../components/SubmitButton";
import FormLayout from "../components/FormLayout";
import {useForm} from "react-hook-form";

const SignUp = ({serverSubmit, errorMessage, setErrorMessage, loading}) => {
    const {register, handleSubmit, watch, formState: {errors, isValid}} = useForm({mode: 'onChange'});
    const password = useRef({});
    password.current = watch("password", "");

    const onSubmit = async data => {
        setErrorMessage("");
        await serverSubmit(data);
    };

    return (
        <FormLayout errorMessage={errorMessage} label="Sign up">
            <form className="mt-5" onSubmit={handleSubmit(onSubmit)}>
                <input
                    {...register("firstName", {
                        required: "First name is required", minLength: {
                            value: 2,
                            message: "First name is required"
                        },
                        maxLength: {
                            value: 18,
                            message: "First name is invalid"
                        },
                        pattern: {
                            value: /^[a-z ,.'-]+$/i,
                            message: "Invalid first name"
                        }
                    })}
                    type="text"
                    className={`${errors.firstName && "ring-2 ring-red-500"} bg-input border-transparent block w-full p-3 rounded-md mb-2 focus:outline-none focus:ring-2 focus:ring-purple-600 text-white`}
                    autoComplete="off"
                    autoFocus
                    placeholder="First Name"
                />
                {errors.firstName &&
                <p className="mb-3 text-normal text-red-500 ">{errors.firstName.message}</p>}

                {/* Last Name */}
                <input
                    {...register("lastName", {
                        required: "Last name is required", minLength: {
                            value: 2,
                            message: "Last name is required"
                        },
                        maxLength: {
                            value: 18,
                            message: "Last name is invalid"
                        },
                        pattern: {
                            value: /^[a-z ,.'-]+$/i,
                            message: "Invalid last name"
                        }
                    })}
                    type="text"
                    className={`${errors.lastName && "ring-2 ring-red-500"} bg-input mt-5 border-transparent block w-full p-3 rounded-md mb-2 focus:outline-none focus:ring-2 focus:ring-purple-600 text-white`}
                    autoComplete="off"
                    placeholder="Last Name"
                />
                {errors.lastName &&
                <p className="mb-3 text-normal text-red-500 ">{errors.lastName.message}</p>}

                {/* Email */}
                <input
                    {...register("email", {
                        pattern: {
                            value:
                                /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                            message: "Invalid email"
                        }
                    })}
                    type="email"
                    className={`${errors.email && "ring-2 ring-red-500"} bg-input mt-5 border-transparent block w-full p-3 rounded-md mb-2 focus:outline-none focus:ring-2 focus:ring-purple-600 text-white`}
                    autoComplete="off"
                    placeholder="Email"
                />
                {errors.email &&
                <p className="mb-3 text-normal text-red-500 ">{errors.email.message}</p>}

                {/* Password */}
                <input
                    {...register("password", {
                        required: "You must specify a password",
                        minLength: {
                            value: 6,
                            message: "Password must have at least 6 characters"
                        },
                    })}
                    type="password"
                    className={`${errors.password && "ring-2 ring-red-500"} bg-input mt-5 border-transparent block w-full p-3 rounded-md mb-2 focus:outline-none focus:ring-2 focus:ring-purple-600 text-white`}
                    autoComplete="off"
                    placeholder="Password"
                />
                {errors.password &&
                <p className="mb-3 text-normal text-red-500 ">{errors.password.message}</p>}

                {/* Verify Password */}
                <input
                    {...register("verifyPassword", {
                        validate: value =>
                            value === password.current || "The passwords do not match"
                    })}
                    type="password"
                    className={`${errors.verifyPassword && "ring-2 ring-red-500"} bg-input mt-5 border-transparent block w-full p-3 rounded-md mb-2 focus:outline-none focus:ring-2 focus:ring-purple-600 text-white`}
                    autoComplete="off"
                    placeholder="Verify Password"
                />
                {errors.verifyPassword &&
                <p className="mb-3 text-normal text-red-500 ">{errors.verifyPassword.message}</p>}

                <SubmitButton loading={loading} isValid={isValid} value="Create Account"/>
            </form>
        </FormLayout>
    )
}

export default SignUp;