import React, { useState } from 'react'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../ui/card'
import { Input } from '../ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Button } from '../ui/button';
import { useGameStore } from '../../GameStore/StepsStore';
import { Alert, AlertDescription, AlertTitle } from '../ui/alert';
import { AlertCircle } from 'lucide-react';
import { useGameRunStore } from '../../GameStore/GameRunStore';

type formDataItems = {
    name: string,
    firstTurn: "" | "player1" | "player2",
}

type pText = {
    children: React.ReactNode;
    className?: string;
}

const PText = ({ children, className }: pText) => {
    return <p className={className}>{children}</p>
}

const ErrorMessage = () => {
    return (
        <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Erro nas configurações!</AlertTitle>
            <AlertDescription>
                Configure todas as opções para começar.
            </AlertDescription>
        </Alert>
    )
}
export default function GameOptions() {
    const { addOptions, setStep } = useGameStore();
    const { initialGame } = useGameRunStore()
    const [formData, setFormData] = useState<formDataItems>({ name: "", firstTurn: "",});
    const [error, setError] = useState(false);
    const HandleChange = (field: string, value: string) => setFormData({...formData, [field]: value});
    const verification = () => formData.name !== "" && formData.firstTurn !== "" ? true : false;

    const submitOptions = () => {
        if (verification()) {
            addOptions({name: formData.name});
            initialGame(formData.firstTurn === "" ? "player1" : formData.firstTurn)
            setStep("game");
        } else {
            setError(true);
            setTimeout(() => setError(false), 3000);
        }
    };

    return (
        <>
            <Card className="bg-[#1A1831]/70 text-white max-w-xl mx-auto">
                <CardHeader>
                    <CardTitle>Opções do Jogo</CardTitle>
                    <CardDescription>Comece por Escolher a Opção</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3 w-full">
                    <Input
                        onChange={(e) => HandleChange("name", e.target.value)}
                        id="name"
                        placeholder="Qual é o seu Nome Player 1?"
                    />
                    <PText className="my-1 text-white">Quem Joga Primeiro?</PText>
                    <Select onValueChange={(value) => HandleChange("firstTurn", value)}>
                        <SelectTrigger className="w-full">
                            <SelectValue placeholder="Jogador" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="player1">Eu começo</SelectItem>
                            <SelectItem value="player2">Outro Jogador</SelectItem>
                        </SelectContent>
                    </Select>
                </CardContent>
                <CardFooter className="w-full grid grid-cols-1 lg:grid-cols-2 md:grid-cols-1 gap-4">
                    <Button variant={"ghost"} size={"lg"}>Jogar com Alguém</Button>
                    <Button onClick={submitOptions} variant={"secondary"} size={"lg"}>Jogar com um Robô</Button>
                </CardFooter>
            </Card>

            {error && <ErrorMessage />}
        </>
    );
}


export { PText }