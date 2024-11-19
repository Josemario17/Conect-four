import React, { useState } from 'react'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../ui/card'
import { Input } from '../ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Button } from '../ui/button';
import { useGameStore } from '../../GameStore/StepsStore';
import { Alert, AlertDescription, AlertTitle } from '../ui/alert';
import { AlertCircle } from 'lucide-react';

type formDataItems = {
    name: string,
    firstTurn: "" | "random" | "player1" | "player2",
    timeToTurn: "" | "20" | "40"
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
    const [formData, setFormData] = useState<formDataItems>({
        name: "",
        firstTurn: "",
        timeToTurn: ""
    });
    const [error, setError] = useState(false);

    const HandleChange = (field: string, value: string) => {
        setFormData({
            ...formData,
            [field]: value
        });
    };

    const verification = () => {
        return formData.name !== "" && formData.firstTurn !== "" && formData.timeToTurn !== "";
    };

    const submitOptions = () => {
        if (verification()) {
            addOptions({
                name: formData.name,
                firstTurn: formData.firstTurn === "" ? "player1" : formData.firstTurn,
                timeToTurn: formData.timeToTurn === "" ? "40" : formData.timeToTurn
            });
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
                            <SelectItem value="random">Autómatico</SelectItem>
                            <SelectItem value="player1">Eu começo</SelectItem>
                            <SelectItem value="player2">Outro Jogador</SelectItem>
                        </SelectContent>
                    </Select>
                    <PText className="text-white">Tempo por cada Turno</PText>
                    <Select onValueChange={(value) => HandleChange("timeToTurn", value)}>
                        <SelectTrigger className="w-full">
                            <SelectValue placeholder="Segundos" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="20">20 Segundos</SelectItem>
                            <SelectItem value="40">40 Segundos</SelectItem>
                        </SelectContent>
                    </Select>
                </CardContent>
                <CardFooter className="w-full justify-end gap-4">
                    <Button variant={"ghost"} size={"lg"}>
                        Jogar com Alguém
                    </Button>
                    <Button onClick={submitOptions} variant={"secondary"} size={"lg"}>
                        Jogar com um Robô
                    </Button>
                </CardFooter>
            </Card>

            {error && <ErrorMessage />}
        </>
    );
}


export { PText }