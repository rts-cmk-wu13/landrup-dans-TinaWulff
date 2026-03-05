'use client'

import { useActionState } from "react";
import { loginUser } from "./action";   
import { useRouter } from 'next/navigation';
import { useEffect } from "react";

const initialState = {
    values: {
        username: '',
        password: ''
    },
    errors: undefined
};

export default function LoginForm() {

    const [state, formAction, isPending] = useActionState(loginUser, initialState);

    return (
        <form action={formAction} 
        className="mx-7 flex flex-col gap-6">
            <h1 className="text-4xl my-4">Log ind</h1>
            <div>
                <input className="bg-[#E9E9E9] w-full text-[#003147] p-3 text-lg"
                 type="text"
                 name="username"
                 defaultValue={state.values.username}
                 placeholder="Brugernavn"/>
                {/* defaultvalue indsættes ud fra state, her er state enten inistialState eller den opdaterede state, med brugerens input values, optional chaining er derfor ikke nødvendig her, fordi vi har defineret en inistialState. */}
                {state.errors?.username && <p>{state.errors.username}</p>}
            </div>
            <div>
                <input className="bg-[#E9E9E9] w-full text-[#003147] p-3 text-lg"
                type="password"
                name="password"
                defaultValue={state.values.password}
                placeholder="Adgangskode"/>
                {state.errors?.password && <p>{state.errors.password}</p>}
            </div>
            <div className="mx-10 flex justify-center">
                { state.errors?.form && <p>{state.errors.form}</p> }
                <button className="text-[#003147] bg-[#E9E9E9] p-3 w-full max-w-[300px] rounded-lg text-lg"
                type="submit"
                disabled={isPending}>{ isPending ? "Logger ind..." : "Log ind" }</button>
            </div>
            <p className="self-center text-xl">Er du endnu ikke bruger? <a className="underline" href="/opret-bruger">Opret dig her.</a></p>
        </form>
    )
}

