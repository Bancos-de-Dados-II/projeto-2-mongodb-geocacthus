import { useContext, useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "../ui/dialog";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import { Star } from "lucide-react";
import { AuthContext } from "../../context/AuthContext";

const ReviewModal = ({ open, onOpenChange, onSubmit }) => {
    const { user } = useContext(AuthContext);
    const [userName, setUserName] = useState("");
    const [comment, setComment] = useState("");
    const [rating, setRating] = useState(0);

    const handleSubmit = () => {
        if (!comment || rating === 0) {
            alert("Preencha todos os campos!");
            return;
        }

        if (!user) {
            alert("Erro: Usuário não encontrado!");
            return;
        }
        onSubmit({ userName: user.name, comment, rating });
        setComment("");
        setRating(0);
        onOpenChange(false);
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Adicionar Avaliação</DialogTitle>
                </DialogHeader>

                <div className="flex flex-col gap-4">
                    <Textarea
                        placeholder="Escreva sua avaliação..."
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                    />

                    <div className="flex gap-2">
                        {[1, 2, 3, 4, 5].map((star) => (
                            <Star
                                key={star}
                                className={`w-6 h-6 cursor-pointer ${rating >= star ? "text-yellow-500" : "text-gray-300"}`}
                                onClick={() => setRating(star)}
                            />
                        ))}
                    </div>
                </div>

                <DialogFooter>
                    <Button variant="outline" onClick={() => onOpenChange(false)}>Cancelar</Button>
                    <Button variant="default" onClick={handleSubmit}>Enviar</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default ReviewModal;
