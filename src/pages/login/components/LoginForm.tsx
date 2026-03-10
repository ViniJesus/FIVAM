import Input from "@/components/input/Input";
import React, { useState } from "react";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  return (
    <form className="mt-4 flex flex-col gap-3">
      <Input value={email} setValue={setEmail} type="text" label="Email" />
      <Input value={senha} setValue={setSenha} type="password" label="Senha" />
    </form>
  );
};

export default LoginForm;
