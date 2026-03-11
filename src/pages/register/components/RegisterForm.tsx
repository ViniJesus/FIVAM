import Input from "@/components/input/Input";
import React, { useState } from "react";

const RegisterForm = () => {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  return (
    <form className="mt-4 flex flex-col gap-3">
      <Input value={nome} setValue={setNome} type="text" label="Nome" />
      <Input value={email} setValue={setEmail} type="text" label="Email" />
      <Input value={senha} setValue={setSenha} type="password" label="Senha" />

      <button className="bg-primary hover:bg-hover mt-10 w-full rounded-md px-4 py-2.5 text-white transition-all duration-300">
        Criar Conta
      </button>
    </form>
  );
};

export default RegisterForm;
