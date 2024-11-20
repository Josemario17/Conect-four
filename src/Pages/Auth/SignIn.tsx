import Conteiner from "../../Components/Common/Conteiner";
import Title from "../../Components/Common/Title";
import GameOptions from "../../Components/Layout/GameOptions";
import { SignInForm } from "../../Components/Layout/SignInForm";
import { Card } from "../../Components/ui/card";

export default function SignIn() {
  return (
    <div className="mx-auto">
      <Title>
        Conect Four - Login
      </Title>
      <Conteiner>
        <Card className="bg-[#1A1831]/70 text-white max-w-xl mx-auto p-10">
          <SignInForm />
        </Card>
      </Conteiner>
    </div>
  )
}
